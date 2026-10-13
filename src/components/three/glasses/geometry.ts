import * as THREE from "three";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import {
  lensOutline,
  offsetOutline,
  outlineBounds,
  pointAtY,
  type GlassesShape,
} from "@/components/three/glasses/outlines";

/** Metade da distância entre as lentes (ponte de ~17 mm). */
const HALF_GAP = 0.17;
/** Curvatura frontal: as laterais da frente recuam como numa armação real. */
const WRAP = 0.1;
/** Curvatura base da lente/aro (calota esférica). */
const BEND = 0.09;

const ACETATE_RIM = 0.075;
const ACETATE_DEPTH = 0.06;
const ACETATE_BEVEL = { thickness: 0.018, size: 0.014 };
const METAL_WIRE = 0.018;

export type GlassesGeometry = {
  /** Peças do lado direito, já em coordenadas da armação. O lado esquerdo é o espelho. */
  lens: THREE.BufferGeometry;
  rim: THREE.BufferGeometry;
  endpiece: THREE.BufferGeometry;
  hinge: THREE.BufferGeometry;
  temple: THREE.BufferGeometry;
  templeTip: THREE.BufferGeometry | null;
  rivets: THREE.BufferGeometry | null;
  nosePads: THREE.BufferGeometry | null;
  nosePadArms: THREE.BufferGeometry | null;
  /** Peças centrais (não espelhadas). */
  bridge: THREE.BufferGeometry;
  dispose: () => void;
};

/* ------------------------------------------------------------------ utils */

function bendPoint(x: number, y: number, z = 0) {
  return new THREE.Vector3(x, y, z - BEND * (x * x + y * y));
}

function bendGeometry(g: THREE.BufferGeometry) {
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, pos.getZ(i) - BEND * (x * x + y * y));
  }
  pos.needsUpdate = true;
}

/**
 * Solda vértices duplicados e recalcula normais suaves: transforma as facetas
 * do bevel do ExtrudeGeometry em bordas arredondadas, como acetato polido.
 */
function smooth(g: THREE.BufferGeometry, bend = false) {
  g.deleteAttribute("normal");
  g.deleteAttribute("uv");
  g.clearGroups();
  const merged = mergeVertices(g, 1e-5);
  g.dispose();

  // Faces frontal/traseira (tampas) antes da curvatura.
  merged.computeBoundingBox();
  const { min, max } = merged.boundingBox!;
  const pos = merged.attributes.position;
  const capSign = new Int8Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const z = pos.getZ(i);
    capSign[i] = Math.abs(z - max.z) < 1e-5 ? 1 : Math.abs(z - min.z) < 1e-5 ? -1 : 0;
  }

  if (bend) bendGeometry(merged);
  merged.computeVertexNormals();

  // As tampas têm triângulos longos: se a normal da borda (média com o bevel)
  // for interpolada por eles aparecem estrias. Forçamos a normal analítica da
  // superfície curva (z = c - k·r²) nos vértices das tampas.
  const k = bend ? BEND : 0;
  const normal = merged.attributes.normal;
  const n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    if (!capSign[i]) continue;
    n.set(2 * k * pos.getX(i), 2 * k * pos.getY(i), 1).normalize().multiplyScalar(capSign[i]);
    normal.setXYZ(i, n.x, n.y, n.z);
  }
  return merged;
}

/** UV planar: usado pela textura de tartaruga para não esticar entre as peças. */
function planarUV(g: THREE.BufferGeometry, u: "x" | "z", scale = 0.8) {
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (u === "x" ? pos.getX(i) : pos.getZ(i)) * scale;
    uv[i * 2 + 1] = pos.getY(i) * scale;
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return g;
}

function boundsUV(g: THREE.BufferGeometry) {
  g.computeBoundingBox();
  const b = g.boundingBox!;
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - b.min.x) / (b.max.x - b.min.x);
    uv[i * 2 + 1] = (pos.getY(i) - b.min.y) / (b.max.y - b.min.y);
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return g;
}

/**
 * Extrusão de uma seção (superelipse) ao longo de uma curva 3D, com espessura
 * variável. O "lado" da seção fica preso ao eixo X da armação, então a haste
 * não torce como aconteceria com frames de Frenet.
 */
function sweep(
  curve: THREE.Curve<THREE.Vector3>,
  {
    t0 = 0,
    t1 = 1,
    segments = 96,
    radial = 16,
    exponent = 2,
    profile,
  }: {
    t0?: number;
    t1?: number;
    segments?: number;
    radial?: number;
    exponent?: number;
    /** meia-largura (x) e meia-altura (y) da seção em t */
    profile: (t: number) => [number, number];
  },
) {
  const positions: number[] = [];
  const indices: number[] = [];
  const axisX = new THREE.Vector3(1, 0, 0);
  const p = 2 / exponent;
  const spow = (v: number) => Math.sign(v) * Math.abs(v) ** p;

  for (let i = 0; i <= segments; i++) {
    const t = t0 + ((t1 - t0) * i) / segments;
    const P = curve.getPointAt(t);
    const T = curve.getTangentAt(t);
    const side = axisX.clone().addScaledVector(T, -axisX.dot(T)).normalize();
    const up = side.clone().cross(T).normalize();
    const [w, h] = profile(t);
    for (let j = 0; j < radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const v = P.clone()
        .addScaledVector(side, w * spow(Math.cos(a)))
        .addScaledVector(up, h * spow(Math.sin(a)));
      positions.push(v.x, v.y, v.z);
    }
  }

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * radial + j;
      const b = (i + 1) * radial + j;
      const c = (i + 1) * radial + ((j + 1) % radial);
      const d = i * radial + ((j + 1) % radial);
      indices.push(a, b, d, b, c, d);
    }
  }

  // Tampas nas duas pontas.
  const start = curve.getPointAt(t0);
  const end = curve.getPointAt(t1);
  const sIdx = positions.length / 3;
  positions.push(start.x, start.y, start.z);
  const eIdx = sIdx + 1;
  positions.push(end.x, end.y, end.z);
  const last = segments * radial;
  for (let j = 0; j < radial; j++) {
    const jn = (j + 1) % radial;
    indices.push(sIdx, j, jn);
    indices.push(eIdx, last + jn, last + j);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

const smoothstep = (a: number, b: number, t: number) => {
  const x = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
};

/** Fecha a ponta da haste em meia-esfera. */
const tipTaper = (t: number, from = 0.94) =>
  t <= from ? 1 : Math.sqrt(Math.max(0.03, 1 - ((t - from) / (1 - from)) ** 2));

/* ------------------------------------------------------------------ build */

export function buildGlassesGeometry(shape: GlassesShape, isMetal: boolean): GlassesGeometry {
  const outline = lensOutline(shape);
  const bounds = outlineBounds(outline);
  const maxY = bounds.max.y;

  // Lente local → armação: pivô na borda nasal, gira para trás (wrap).
  const toFrame = new THREE.Matrix4()
    .makeTranslation(HALF_GAP, 0, 0)
    .multiply(new THREE.Matrix4().makeRotationY(WRAP))
    .multiply(new THREE.Matrix4().makeTranslation(-bounds.min.x, 0, 0));
  const framePoint = (v: THREE.Vector2, z = 0) => bendPoint(v.x, v.y, z).applyMatrix4(toFrame);

  /* Lente: fina, com espessura e curvatura base. */
  const lensShape = new THREE.Shape(offsetOutline(outline, isMetal ? 0 : 0.012));
  let lens: THREE.BufferGeometry = new THREE.ExtrudeGeometry(lensShape, {
    depth: 0.012,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  lens.translate(0, 0, isMetal ? -0.006 : -0.002);
  lens = boundsUV(smooth(lens, true));
  lens.applyMatrix4(toFrame);

  /* Aro. */
  let rim: THREE.BufferGeometry;
  let outerRim = outline;
  if (isMetal) {
    const curve = new THREE.CatmullRomCurve3(
      outline.map((p) => bendPoint(p.x, p.y)),
      true,
      "centripetal",
    );
    rim = new THREE.TubeGeometry(curve, 220, METAL_WIRE, 12, true);
  } else {
    // Cat-eye: o acetato engrossa no canto superior externo, como nas armações reais.
    const boost = shape === "cat-eye" ? 0.9 : shape === "quadrado" ? 0.15 : 0;
    outerRim = offsetOutline(
      outline,
      (n) => ACETATE_RIM * (1 + boost * Math.max(0, n.x) * Math.max(0, n.y) * 2),
    );
    const rimShape = new THREE.Shape(outerRim);
    rimShape.holes.push(new THREE.Path(offsetOutline(outline, -0.02)));
    rim = new THREE.ExtrudeGeometry(rimShape, {
      depth: ACETATE_DEPTH,
      bevelEnabled: true,
      bevelThickness: ACETATE_BEVEL.thickness,
      bevelSize: ACETATE_BEVEL.size,
      bevelSegments: 5,
    });
    rim.translate(0, 0, -ACETATE_DEPTH / 2);
    rim = smooth(rim, true);
  }
  rim.applyMatrix4(toFrame);
  planarUV(rim, "x");

  /* Rebites decorativos (acetato) no canto da dobradiça. */
  const hingeY = maxY * (isMetal ? 0.35 : 0.45);
  let rivets: THREE.BufferGeometry | null = null;
  if (!isMetal) {
    const mid = offsetOutline(outline, ACETATE_RIM * 0.55);
    const frontZ = ACETATE_DEPTH / 2 + ACETATE_BEVEL.thickness - 0.002;
    rivets = mergeGeometries(
      [hingeY + 0.045, hingeY - 0.045].map((y) => {
        const p = pointAtY(mid, y, 1);
        const g = new THREE.SphereGeometry(1, 16, 8);
        g.scale(0.017, 0.017, 0.007);
        const at = bendPoint(p.x, p.y, frontZ);
        g.translate(at.x, at.y, at.z);
        return g;
      }),
    );
    rivets.applyMatrix4(toFrame);
  }

  /* Ponto externo do aro onde nasce a dobradiça. */
  const outerEdge = pointAtY(outerRim, hingeY, 1);
  const R = framePoint(outerEdge.clone().add(new THREE.Vector2(isMetal ? 0 : ACETATE_BEVEL.size, 0)));

  let endpiece: THREE.BufferGeometry;
  let hinge: THREE.BufferGeometry;
  let H: THREE.Vector3; // início da haste

  if (isMetal) {
    const lug = new THREE.CatmullRomCurve3([
      R,
      R.clone().add(new THREE.Vector3(0.05, 0, -0.02)),
      R.clone().add(new THREE.Vector3(0.075, 0, -0.07)),
      R.clone().add(new THREE.Vector3(0.08, 0, -0.12)),
    ]);
    endpiece = sweep(lug, { segments: 24, radial: 12, profile: () => [0.016, 0.02] });
    H = R.clone().add(new THREE.Vector3(0.08, 0, -0.12));
    hinge = new RoundedBoxGeometry(0.05, 0.065, 0.1, 2, 0.016);
    hinge.translate(H.x, H.y, H.z - 0.01);
  } else {
    endpiece = new RoundedBoxGeometry(0.085, 0.15, 0.2, 3, 0.03);
    endpiece.translate(R.x - 0.03, R.y, R.z - 0.07);
    planarUV(endpiece, "z");
    H = new THREE.Vector3(R.x - 0.03, R.y, R.z - 0.165);
    // Barril da dobradiça, metálico, na face interna.
    hinge = new THREE.CylinderGeometry(0.017, 0.017, 0.11, 16);
    hinge.translate(H.x - 0.04, H.y, H.z + 0.015);
  }

  /* Haste: segue para trás abrindo levemente e desce atrás da orelha. */
  const templeCurve = new THREE.CatmullRomCurve3(
    [
      [0, 0, 0],
      [0.03, 0.01, -0.5],
      [0.09, 0.03, -1.35],
      [0.12, 0.0, -1.8],
      [0.125, -0.17, -2.1],
      [0.115, -0.4, -2.25],
    ].map(([x, y, z]) => H.clone().add(new THREE.Vector3(x, y, z))),
    false,
    "centripetal",
  );

  let temple: THREE.BufferGeometry;
  let templeTip: THREE.BufferGeometry | null = null;
  if (isMetal) {
    temple = sweep(templeCurve, {
      t1: 0.68,
      segments: 120,
      radial: 12,
      profile: () => [0.012, 0.013],
    });
    // Ponteira de acetato sobre o arame.
    templeTip = sweep(templeCurve, {
      t0: 0.6,
      segments: 80,
      radial: 16,
      profile: (t) => {
        const r = THREE.MathUtils.lerp(0.012, 0.022, smoothstep(0.6, 0.67, t)) * tipTaper(t, 0.95);
        return [r, r * 1.1];
      },
    });
    planarUV(templeTip, "z");
  } else {
    temple = sweep(templeCurve, {
      segments: 140,
      radial: 24,
      exponent: 4,
      profile: (t) => {
        const taper = tipTaper(t);
        const h =
          t < 0.25
            ? THREE.MathUtils.lerp(0.058, 0.032, smoothstep(0, 0.25, t))
            : THREE.MathUtils.lerp(0.032, 0.03, smoothstep(0.25, 0.9, t));
        const w = THREE.MathUtils.lerp(0.021, 0.016, t);
        return [w * taper, h * taper];
      },
    });
  }
  planarUV(temple, "z");

  /* Ponte. */
  let bridge: THREE.BufferGeometry;
  if (isMetal) {
    const inner = framePoint(pointAtY(outline, maxY * 0.3, -1));
    const arch = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-inner.x, inner.y, inner.z),
      new THREE.Vector3(0, inner.y + 0.15, inner.z + 0.05),
      inner,
    );
    const parts: THREE.BufferGeometry[] = [new THREE.TubeGeometry(arch, 48, 0.017, 12, false)];
    if (shape === "aviador") {
      // Barra superior característica do aviador.
      const top = framePoint(pointAtY(outline, maxY * 0.82, -1));
      const bar = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-top.x, top.y, top.z),
        new THREE.Vector3(0, top.y + 0.015, top.z + 0.045),
        top,
      );
      parts.push(new THREE.TubeGeometry(bar, 48, 0.014, 12, false));
    }
    bridge = mergeGeometries(parts);
    parts.forEach((g) => g.dispose());
  } else {
    const by = maxY * 0.3;
    const inner = framePoint(pointAtY(outerRim, by, -1));
    const W = inner.x + 0.06;
    const top = by + 0.08;
    const endBot = by - 0.09;
    const midBot = by - 0.015;
    const s = new THREE.Shape();
    s.moveTo(-W, endBot);
    s.quadraticCurveTo(0, 2 * midBot - endBot, W, endBot);
    s.lineTo(W, top);
    s.quadraticCurveTo(0, top + 0.03, -W, top);
    s.closePath();
    bridge = new THREE.ExtrudeGeometry(s, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.016,
      bevelSize: 0.012,
      bevelSegments: 5,
      curveSegments: 32,
    });
    bridge.translate(0, 0, -0.025 + inner.z);
    bridge = smooth(bridge);
  }
  planarUV(bridge, "x");

  /* Plaquetas de nariz (armações de metal). */
  let nosePads: THREE.BufferGeometry | null = null;
  let nosePadArms: THREE.BufferGeometry | null = null;
  if (isMetal) {
    const a = framePoint(pointAtY(outline, -0.1, -1));
    const c = a.clone().add(new THREE.Vector3(-0.045, -0.08, -0.13));
    nosePadArms = sweep(
      new THREE.CatmullRomCurve3([a, a.clone().add(new THREE.Vector3(0.0, -0.01, -0.07)), c]),
      { segments: 24, radial: 8, profile: () => [0.0065, 0.0065] },
    );
    nosePads = new THREE.SphereGeometry(1, 24, 16);
    nosePads.scale(0.03, 0.065, 0.011);
    nosePads.rotateZ(0.15);
    nosePads.rotateY(1.05);
    nosePads.translate(c.x - 0.012, c.y - 0.01, c.z);
  }

  const all = [lens, rim, endpiece, hinge, temple, templeTip, rivets, nosePads, nosePadArms, bridge];

  return {
    lens,
    rim,
    endpiece,
    hinge,
    temple,
    templeTip,
    rivets,
    nosePads,
    nosePadArms,
    bridge,
    dispose: () => all.forEach((g) => g?.dispose()),
  };
}
