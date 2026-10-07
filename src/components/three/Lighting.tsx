"use client";

import { Environment } from "@react-three/drei";

/**
 * Iluminação de estúdio para os óculos: key light forte + fill suave + rim
 * light para separar da silhueta escura do fundo, mais um ambiente HDRI
 * discreto para reflexos coerentes nos materiais metal/vidro.
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight
        position={[3, 4, 5]}
        angle={0.35}
        penumbra={0.6}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#2bb5a6" />
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#e6d3a1" />
      <Environment preset="city" environmentIntensity={0.5} />
    </>
  );
}
