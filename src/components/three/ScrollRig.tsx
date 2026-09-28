"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp3, dampE } from "maath/easing";
import { useSceneStore } from "@/lib/store/scene";
import { getInterpolatedPose } from "@/lib/three/keyframes";
import { ProceduralGlasses } from "@/components/three/ProceduralGlasses";
import { products } from "@/content/products";

const heroProduct = products.find((p) => p.featured) ?? products[0];
const heroVariant = heroProduct.variants[0];

/**
 * Lê a store de scroll a cada frame e move suavemente (damping) o grupo dos
 * óculos e a câmera até a pose alvo da seção atual da narrativa da home.
 */
export function ScrollRig() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const { activeSection, progress, reducedMotion } = useSceneStore.getState();
    const pose = getInterpolatedPose(activeSection, progress);

    if (groupRef.current) {
      const smoothTime = reducedMotion ? 0.001 : 0.35;
      damp3(groupRef.current.position, pose.position, smoothTime, delta);
      dampE(groupRef.current.rotation, pose.rotation, smoothTime, delta);
      const targetScale = pose.scale;
      groupRef.current.scale.x = THREE.MathUtils.damp(
        groupRef.current.scale.x,
        targetScale,
        1 / smoothTime,
        delta,
      );
      groupRef.current.scale.y = groupRef.current.scale.x;
      groupRef.current.scale.z = groupRef.current.scale.x;

      // Leve flutuação contínua para a cena não parecer "morta" entre seções.
      if (!reducedMotion) {
        groupRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.0004;
      }
    }

    const cam = state.camera;
    const smoothTime = reducedMotion ? 0.001 : 0.4;
    damp3(cam.position, pose.camera, smoothTime, delta);
    cam.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <ProceduralGlasses
        shape={heroProduct.shape}
        frameColor={heroVariant.frameColor}
        lensColor={heroVariant.lensColor}
        metalness={heroVariant.metalness}
        roughness={heroVariant.roughness}
      />
    </group>
  );
}
