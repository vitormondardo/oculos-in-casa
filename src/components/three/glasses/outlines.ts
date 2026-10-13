import * as THREE from "three";
import type { Product } from "@/types/content";

export type GlassesShape = Product["shape"];

const SAMPLES = 160;

/** Potência com sinal: base das superelipses (cantos mais "quadrados" com n alto). */
function spow(v: number, p: number) {
  return Math.sign(v) * Math.abs(v) ** p;
}

/**
 * Contorno da lente DIREITA (lado externo = +x, nariz = -x), em sentido
 * anti-horário e centrado na bounding box. Escala: 1 unidade ≈ 50 mm, então a
 * lente tem ~50 mm de largura como uma armação real.
 */
export function lensOutline(shape: GlassesShape): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];

  for (let i = 0; i < SAMPLES; i++) {
    const t = (i / SAMPLES) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    let x: number;
    let y: number;

    switch (shape) {
      case "redondo": {
        // Levemente mais largo que alto, como um "P3" clássico.
        x = 0.47 * c;
        y = 0.44 * s;
        break;
      }
      case "quadrado": {
        x = 0.53 * spow(c, 2 / 5);
        y = 0.39 * spow(s, 2 / 5);
        // Topo um pouco mais largo que a base.
        x *= 1 + 0.05 * (y / 0.39);
        break;
      }
      case "cat-eye": {
        x = 0.5 * spow(c, 2 / 2.6);
        y = 0.35 * spow(s, 2 / 2.6);
        const ox = Math.max(0, x / 0.5);
        const oy = Math.max(0, y / 0.35);
        // Topo sobe em direção à lateral externa...
        if (y > 0) y += 0.1 * (x / 0.5 + 1) * 0.5 * oy;
        // ...e termina na "asa": canto superior externo puxado para cima e para fora.
        y += 0.14 * ox ** 4 * oy;
        x += 0.09 * oy * ox ** 3;
        // Base afunila em direção à lateral externa.
        if (y < 0) y *= 1 - 0.22 * ox;
        break;
      }
      case "aviador": {
        x = 0.55 * c;
        if (s >= 0) {
          // Topo quase reto.
          y = 0.38 * spow(s, 0.55);
        } else {
          // Gota: mais funda na metade externa, nasal cortado em diagonal.
          y = -0.5 * Math.abs(s) * (1 + 0.16 * c);
          if (c < 0) x *= 1 - 0.3 * Math.abs(s);
        }
        break;
      }
    }

    pts.push(new THREE.Vector2(x, y));
  }

  const box = new THREE.Box2().setFromPoints(pts);
  const center = box.getCenter(new THREE.Vector2());
  pts.forEach((p) => p.sub(center));

  if (THREE.ShapeUtils.isClockWise(pts)) pts.reverse();
  return pts;
}

/** Normais externas por vértice de um polígono fechado anti-horário. */
export function outlineNormals(pts: THREE.Vector2[]): THREE.Vector2[] {
  const n = pts.length;
  return pts.map((p, i) => {
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 1) % n];
    const e1 = p.clone().sub(prev);
    const e2 = next.clone().sub(p);
    const n1 = new THREE.Vector2(e1.y, -e1.x).normalize();
    const n2 = new THREE.Vector2(e2.y, -e2.x).normalize();
    return n1.add(n2).normalize();
  });
}

/**
 * Desloca o contorno ao longo das normais (offset de espessura uniforme, ao
 * contrário de escalar, que deixa o aro mais grosso nas pontas). `d` pode
 * variar por vértice em função da normal.
 */
export function offsetOutline(
  pts: THREE.Vector2[],
  d: number | ((normal: THREE.Vector2) => number),
): THREE.Vector2[] {
  const normals = outlineNormals(pts);
  return pts.map((p, i) => {
    const dist = typeof d === "number" ? d : d(normals[i]);
    return p.clone().addScaledVector(normals[i], dist);
  });
}

/** Ponto do contorno na altura `y`, no lado nasal (side < 0) ou externo (side > 0). */
export function pointAtY(pts: THREE.Vector2[], y: number, side: 1 | -1): THREE.Vector2 {
  let best: THREE.Vector2 | null = null;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    if ((a.y - y) * (b.y - y) > 0 || a.y === b.y) continue;
    const t = (y - a.y) / (b.y - a.y);
    const x = a.x + (b.x - a.x) * t;
    if (!best || (side > 0 ? x > best.x : x < best.x)) best = new THREE.Vector2(x, y);
  }
  return best ?? new THREE.Vector2(side * 0.5, y);
}

export function outlineBounds(pts: THREE.Vector2[]) {
  return new THREE.Box2().setFromPoints(pts);
}
