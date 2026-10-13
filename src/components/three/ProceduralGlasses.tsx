"use client";

import { useEffect, useMemo } from "react";
import type { FrameVariant, Product } from "@/types/content";
import { buildGlassesGeometry } from "@/components/three/glasses/geometry";
import {
  createFrameMaterial,
  createHardwareMaterial,
  createLensMaterial,
  createPadMaterial,
  createTipMaterial,
  type GlassesQuality,
} from "@/components/three/glasses/materials";

export type ProceduralGlassesProps = {
  shape: Product["shape"];
  frameColor: string;
  lensColor: string;
  metalness?: number;
  roughness?: number;
  pattern?: FrameVariant["pattern"];
  lensFinish?: FrameVariant["lensFinish"];
  /** "high" liga refração real nas lentes (mais caro): use só fora da home. */
  quality?: GlassesQuality;
};

const SIDES = [
  { side: 1, lens: "lens_R", temple: "temple_R" },
  { side: -1, lens: "lens_L", temple: "temple_L" },
] as const;

/**
 * Óculos gerados por código (sem depender de um asset .glb): aro com
 * espessura uniforme e bordas arredondadas, lentes curvas com espessura,
 * ponte, dobradiças, plaquetas e hastes que descem atrás da orelha.
 * Acetato x metal é decidido pelo metalness da variante.
 *
 * Mantém a convenção de nós de um GLB real (frame / lens_L / lens_R /
 * temple_L / temple_R) para quando os modelos definitivos entrarem.
 */
export function ProceduralGlasses({
  shape,
  frameColor,
  lensColor,
  metalness = 0.15,
  roughness = 0.4,
  pattern,
  lensFinish,
  quality = "standard",
}: ProceduralGlassesProps) {
  const isMetal = metalness >= 0.5;
  const tortoise = pattern === "tortoise";

  const geo = useMemo(() => buildGlassesGeometry(shape, isMetal), [shape, isMetal]);
  useEffect(() => () => geo.dispose(), [geo]);

  const materials = useMemo(
    () => ({
      frame: createFrameMaterial({ color: frameColor, metalness, roughness, tortoise, isMetal }),
      lens: createLensMaterial({ color: lensColor, mirror: lensFinish === "mirror", quality }),
      hardware: createHardwareMaterial(),
      tip: createTipMaterial(tortoise),
      pad: createPadMaterial(),
    }),
    [frameColor, lensColor, metalness, roughness, tortoise, isMetal, lensFinish, quality],
  );
  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);

  return (
    <group name="frame" scale={0.78}>
      {SIDES.map(({ side, lens, temple }) => (
        <group key={side} scale={[side, 1, 1]}>
          <group name={lens}>
            <mesh geometry={geo.rim} material={materials.frame} />
            <mesh geometry={geo.lens} material={materials.lens} renderOrder={1} />
            <mesh geometry={geo.endpiece} material={materials.frame} />
            <mesh
              geometry={geo.hinge}
              material={isMetal ? materials.frame : materials.hardware}
            />
            {geo.rivets && <mesh geometry={geo.rivets} material={materials.hardware} />}
            {geo.nosePadArms && <mesh geometry={geo.nosePadArms} material={materials.frame} />}
            {geo.nosePads && (
              <mesh geometry={geo.nosePads} material={materials.pad} renderOrder={2} />
            )}
          </group>
          <group name={temple}>
            <mesh geometry={geo.temple} material={materials.frame} />
            {geo.templeTip && <mesh geometry={geo.templeTip} material={materials.tip} />}
          </group>
        </group>
      ))}
      <mesh name="bridge" geometry={geo.bridge} material={materials.frame} />
    </group>
  );
}
