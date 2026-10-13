import * as THREE from "three";

export type GlassesQuality = "standard" | "high";

let tortoiseTexture: THREE.CanvasTexture | null = null;
let lensGradient: THREE.CanvasTexture | null = null;

/** PRNG determinístico: a textura sai igual a cada carregamento. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/**
 * Textura de acetato tartaruga gerada em canvas: base âmbar, manchas
 * marrons/escuras sobrepostas e pontos de mel, como o acetato real.
 * Criada uma vez e compartilhada (é usada só no cliente, dentro do Canvas).
 */
export function getTortoiseTexture() {
  if (tortoiseTexture) return tortoiseTexture;
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const rand = rng(7);

  ctx.fillStyle = "#8a5a26";
  ctx.fillRect(0, 0, size, size);

  const blob = (r: number, color: string, alpha: number) => {
    const x = rand() * size;
    const y = rand() * size;
    // Desenha também nas bordas opostas para a textura repetir sem costura.
    for (const dx of [-size, 0, size]) {
      for (const dy of [-size, 0, size]) {
        const g = ctx.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, r);
        g.addColorStop(0, color.replace("A", String(alpha)));
        g.addColorStop(1, color.replace("A", "0"));
        ctx.fillStyle = g;
        ctx.save();
        ctx.translate(x + dx, y + dy);
        ctx.scale(1 + rand() * 1.4, 0.6 + rand() * 0.6);
        ctx.translate(-(x + dx), -(y + dy));
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  };

  // Manchas grandes e difusas (o blur imita a profundidade do acetato).
  ctx.filter = "blur(10px)";
  for (let i = 0; i < 30; i++) blob(50 + rand() * 90, "rgba(200,138,58,A)", 0.7);
  for (let i = 0; i < 45; i++) blob(35 + rand() * 70, "rgba(58,30,12,A)", 0.9);
  ctx.filter = "blur(4px)";
  for (let i = 0; i < 35; i++) blob(14 + rand() * 30, "rgba(26,12,5,A)", 0.85);
  for (let i = 0; i < 25; i++) blob(10 + rand() * 22, "rgba(226,166,86,A)", 0.5);
  ctx.filter = "none";

  tortoiseTexture = new THREE.CanvasTexture(canvas);
  tortoiseTexture.colorSpace = THREE.SRGBColorSpace;
  tortoiseTexture.wrapS = tortoiseTexture.wrapT = THREE.RepeatWrapping;
  tortoiseTexture.anisotropy = 4;
  return tortoiseTexture;
}

/** Degradê vertical de opacidade da lente (mais escura no topo). */
function getLensGradient() {
  if (lensGradient) return lensGradient;
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, "rgb(170,170,170)");
  g.addColorStop(1, "rgb(85,85,85)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 4, 128);
  lensGradient = new THREE.CanvasTexture(canvas);
  return lensGradient;
}

export function createFrameMaterial({
  color,
  metalness,
  roughness,
  tortoise,
  isMetal,
}: {
  color: string;
  metalness: number;
  roughness: number;
  tortoise: boolean;
  isMetal: boolean;
}) {
  if (isMetal) {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: Math.max(metalness, 0.85),
      roughness: Math.min(roughness, 0.3),
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.3,
    });
  }

  // Acetato: plástico denso com verniz. Fosco = verniz difuso; brilhante = espelhado.
  const matte = roughness >= 0.5;
  return new THREE.MeshPhysicalMaterial({
    color: tortoise ? "#ffffff" : color,
    map: tortoise ? getTortoiseTexture() : null,
    metalness: 0,
    roughness: matte ? roughness : Math.max(roughness, 0.25),
    clearcoat: matte ? 0.25 : 1,
    clearcoatRoughness: matte ? 0.45 : 0.04,
    specularIntensity: 0.6,
    sheen: matte ? 0.15 : 0,
    sheenRoughness: 0.8,
    sheenColor: new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.1),
  });
}

export function createLensMaterial({
  color,
  mirror,
  quality,
}: {
  color: string;
  mirror: boolean;
  quality: GlassesQuality;
}) {
  if (quality === "high") {
    // Vidro de verdade: refração com tinta pela absorção (atenuação).
    // Custa um render extra da cena — só no viewer de produto.
    const tint = new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.62);
    return new THREE.MeshPhysicalMaterial({
      // Espelhado: camada metálica fina na cor da lente por cima do vidro.
      color: mirror ? color : tint,
      metalness: mirror ? 0.55 : 0,
      roughness: mirror ? 0.06 : 0.03,
      transmission: 1,
      thickness: 0.05,
      ior: 1.5,
      attenuationColor: tint,
      attenuationDistance: 0.4,
      specularIntensity: 1,
      specularColor: mirror ? new THREE.Color(color) : new THREE.Color("#ffffff"),
      envMapIntensity: mirror ? 2 : 1,
    });
  }

  // Versão leve (home): transparência com degradê + reflexo do ambiente.
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: mirror ? 0.6 : 0,
    roughness: 0.04,
    transparent: true,
    alphaMap: getLensGradient(),
    opacity: mirror ? 1 : 0.9,
    depthWrite: false,
    side: THREE.DoubleSide,
    ior: 1.5,
    specularIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    envMapIntensity: mirror ? 2 : 1.4,
  });
}

/** Pinos, rebites e barris de dobradiça. */
export function createHardwareMaterial() {
  return new THREE.MeshStandardMaterial({ color: "#d4d4d6", metalness: 1, roughness: 0.22 });
}

/** Ponteira de acetato das hastes metálicas. */
export function createTipMaterial(tortoise: boolean) {
  return new THREE.MeshPhysicalMaterial({
    color: tortoise ? "#ffffff" : "#141414",
    map: tortoise ? getTortoiseTexture() : null,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });
}

/** Plaquetas de silicone translúcido. */
export function createPadMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: "#f4f1ea",
    roughness: 0.25,
    transparent: true,
    opacity: 0.55,
    clearcoat: 0.6,
    depthWrite: false,
  });
}
