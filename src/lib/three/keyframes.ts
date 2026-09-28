import type { SectionId } from "@/lib/store/scene";

export type Pose = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  /** posição da câmera para esta seção */
  camera: [number, number, number];
};

/**
 * Uma pose (posição/rotação/escala do óculos + câmera) por seção da home.
 * O ScrollRig interpola entre a pose da seção ativa e a próxima conforme
 * o progresso de scroll, e faz o damping para suavizar a transição.
 */
export const sectionKeyframes: Record<SectionId, Pose> = {
  hero: {
    position: [0, 0, 0],
    rotation: [0, 0.15, 0],
    scale: 1,
    camera: [0, 0, 4.2],
  },
  product: {
    position: [1.1, 0.1, 0],
    rotation: [0.1, -0.6, 0.05],
    scale: 1.15,
    camera: [0, 0, 3.4],
  },
  lenses: {
    position: [-1.1, -0.05, 0.4],
    rotation: [0.05, 0.9, -0.05],
    scale: 1.6,
    camera: [0, 0, 2.6],
  },
  services: {
    position: [1.0, 0.2, -0.3],
    rotation: [-0.1, -1.4, 0.1],
    scale: 1.0,
    camera: [0, 0, 4],
  },
  "how-it-works": {
    position: [-0.9, -0.1, 0],
    rotation: [0.15, 2.0, 0],
    scale: 0.9,
    camera: [0, 0, 4.6],
  },
  cta: {
    position: [0, 0.05, 0],
    rotation: [0, 3.2, 0],
    scale: 1.2,
    camera: [0, 0, 3.8],
  },
};

export const sectionOrder: SectionId[] = [
  "hero",
  "product",
  "lenses",
  "services",
  "how-it-works",
  "cta",
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpVec3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Interpola entre a pose da seção ativa e a próxima da sequência. */
export function getInterpolatedPose(section: SectionId, progress: number): Pose {
  const index = sectionOrder.indexOf(section);
  const nextSection = sectionOrder[Math.min(index + 1, sectionOrder.length - 1)];
  const from = sectionKeyframes[section];
  const to = sectionKeyframes[nextSection];
  const t = Math.min(Math.max(progress, 0), 1);

  return {
    position: lerpVec3(from.position, to.position, t),
    rotation: lerpVec3(from.rotation, to.rotation, t),
    scale: lerp(from.scale, to.scale, t),
    camera: lerpVec3(from.camera, to.camera, t),
  };
}
