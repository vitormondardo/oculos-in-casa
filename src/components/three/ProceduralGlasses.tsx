"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { Product } from "@/types/content";

type GlassesShape = Product["shape"];

const RIM_THICKNESS = 0.09;
const LENS_GAP = 0.62; // distância do centro de cada lente ao centro da armação

/**
 * Gera o contorno (THREE.Shape) de uma lente para o formato pedido, centrado
 * em (0,0), com "furo" interno para dar espessura ao aro (rim).
 */
function buildLensOutline(shape: GlassesShape): { outer: THREE.Shape } {
  const outer = new THREE.Shape();

  switch (shape) {
    case "cat-eye": {
      // Contorno cat-eye: canto superior "levantado", inferior arredondado.
      outer.moveTo(-0.5, -0.05);
      outer.bezierCurveTo(-0.55, -0.35, -0.25, -0.48, 0.05, -0.42);
      outer.bezierCurveTo(0.35, -0.36, 0.55, -0.1, 0.55, 0.15);
      outer.bezierCurveTo(0.55, 0.4, 0.35, 0.5, 0.1, 0.44);
      outer.bezierCurveTo(-0.15, 0.5, -0.4, 0.42, -0.48, 0.22);
      outer.bezierCurveTo(-0.55, 0.1, -0.5, -0.05, -0.5, -0.05);
      break;
    }
    case "redondo": {
      outer.absarc(0, 0, 0.5, 0, Math.PI * 2, false);
      break;
    }
    case "quadrado": {
      const r = 0.12;
      const s = 0.5;
      outer.moveTo(-s + r, -s);
      outer.lineTo(s - r, -s);
      outer.quadraticCurveTo(s, -s, s, -s + r);
      outer.lineTo(s, s - r);
      outer.quadraticCurveTo(s, s, s - r, s);
      outer.lineTo(-s + r, s);
      outer.quadraticCurveTo(-s, s, -s, s - r);
      outer.lineTo(-s, -s + r);
      outer.quadraticCurveTo(-s, -s, -s + r, -s);
      break;
    }
    case "aviador": {
      outer.moveTo(-0.55, 0.05);
      outer.bezierCurveTo(-0.58, 0.35, -0.35, 0.5, -0.05, 0.48);
      outer.bezierCurveTo(0.2, 0.46, 0.3, 0.5, 0.45, 0.4);
      outer.bezierCurveTo(0.6, 0.3, 0.58, 0.05, 0.5, -0.15);
      outer.bezierCurveTo(0.42, -0.35, 0.2, -0.48, -0.05, -0.45);
      outer.bezierCurveTo(-0.35, -0.42, -0.52, -0.25, -0.55, 0.05);
      break;
    }
  }

  return { outer };
}

function buildRimGeometry(shape: GlassesShape) {
  const { outer } = buildLensOutline(shape);

  // Aro: extrude do contorno externo com um furo levemente menor (offset uniforme).
  const rimShape = new THREE.Shape(outer.getPoints(64));
  const hole = new THREE.Path(
    outer.getPoints(64).map((p) => p.clone().multiplyScalar(1 - RIM_THICKNESS)),
  );
  rimShape.holes.push(hole);

  const rimGeometry = new THREE.ExtrudeGeometry(rimShape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
    curveSegments: 32,
  });
  rimGeometry.center();

  const lensGeometry = new THREE.ShapeGeometry(
    new THREE.Shape(
      outer.getPoints(64).map((p) => p.clone().multiplyScalar(1 - RIM_THICKNESS * 0.6)),
    ),
    32,
  );
  lensGeometry.center();

  return { rimGeometry, lensGeometry };
}

export type ProceduralGlassesProps = {
  shape: GlassesShape;
  frameColor: string;
  lensColor: string;
  metalness?: number;
  roughness?: number;
};

/**
 * Óculos gerados por código (sem depender de um asset .glb). Segue a mesma
 * convenção de nós de um GLB real: frame / lens_L / lens_R / temple_L / temple_R,
 * para que a lógica de troca de material funcione igual quando os GLBs entrarem.
 */
export function ProceduralGlasses({
  shape,
  frameColor,
  lensColor,
  metalness = 0.15,
  roughness = 0.4,
}: ProceduralGlassesProps) {
  const { rimGeometry, lensGeometry } = useMemo(() => buildRimGeometry(shape), [shape]);

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: frameColor,
        metalness,
        roughness,
        clearcoat: 0.3,
      }),
    [frameColor, metalness, roughness],
  );

  const lensMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: lensColor,
        metalness: 0,
        roughness: 0.05,
        transmission: 0.85,
        thickness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 0.9,
      }),
    [lensColor],
  );

  return (
    <group name="frame" scale={0.85}>
      {/* Lente + aro esquerdo */}
      <group name="lens_L" position={[-LENS_GAP, 0, 0]}>
        <mesh geometry={rimGeometry} material={frameMaterial} castShadow receiveShadow />
        <mesh geometry={lensGeometry} material={lensMaterial} position={[0, 0, 0.01]} />
      </group>

      {/* Lente + aro direito */}
      <group name="lens_R" position={[LENS_GAP, 0, 0]}>
        <mesh geometry={rimGeometry} material={frameMaterial} castShadow receiveShadow />
        <mesh geometry={lensGeometry} material={lensMaterial} position={[0, 0, 0.01]} />
      </group>

      {/* Ponte central */}
      <mesh position={[0, 0.02, 0]} material={frameMaterial} castShadow>
        <boxGeometry args={[0.16, 0.035, 0.035]} />
      </mesh>

      {/* Haste esquerda */}
      <group name="temple_L" position={[-0.62, 0, -0.02]} rotation={[0, -0.35, 0]}>
        <mesh material={frameMaterial} position={[-0.55, 0, 0]} castShadow>
          <boxGeometry args={[1.1, 0.03, 0.02]} />
        </mesh>
      </group>

      {/* Haste direita */}
      <group name="temple_R" position={[0.62, 0, -0.02]} rotation={[0, 0.35, 0]}>
        <mesh material={frameMaterial} position={[0.55, 0, 0]} castShadow>
          <boxGeometry args={[1.1, 0.03, 0.02]} />
        </mesh>
      </group>
    </group>
  );
}
