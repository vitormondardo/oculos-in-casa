"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { ProceduralGlasses } from "@/components/three/ProceduralGlasses";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { Product } from "@/types/content";

/**
 * Pinta o fundo da cena com a cor do card. A lente com refração (transmission)
 * precisa de algo opaco atrás para refratar; com o canvas transparente ela
 * ficaria acinzentada e "leitosa".
 */
function MatchCardBackground() {
  const get = useThree((s) => s.get);
  useEffect(() => {
    const { gl, scene } = get();
    const card = gl.domElement.closest<HTMLElement>("[data-viewer-card]");
    if (!card) return;
    scene.background = new THREE.Color(getComputedStyle(card).backgroundColor);
    return () => {
      scene.background = null;
    };
  }, [get]);
  return null;
}

export function ProductViewer({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  return (
    <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
      <div
        data-viewer-card
        className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface"
      >
        <Canvas camera={{ position: [1.3, 0.7, 4.4], fov: 35 }} dpr={[1, 1.75]}>
          <MatchCardBackground />
          <ambientLight intensity={0.2} />
          <spotLight position={[3, 4, 5]} angle={0.4} penumbra={0.6} intensity={1.6} />
          <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#2bb5a6" />
          <Environment preset="studio" environmentIntensity={0.6} />
          {/* Recuado para que o centro de rotação fique no meio da armação, não na frente. */}
          <group position={[0, 0.05, 0.45]} rotation={[0, Math.PI / 8, 0]}>
            <ProceduralGlasses
              shape={product.shape}
              frameColor={variant.frameColor}
              lensColor={variant.lensColor}
              metalness={variant.metalness}
              roughness={variant.roughness}
              pattern={variant.pattern}
              lensFinish={variant.lensFinish}
              quality="high"
            />
          </group>
          <ContactShadows position={[0, -0.42, 0]} opacity={0.45} scale={4} blur={2.4} far={1} />
          <OrbitControls
            enablePan={false}
            minDistance={2.5}
            maxDistance={7}
            autoRotate
            autoRotateSpeed={1.2}
          />
        </Canvas>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-kicker">
          {product.category}
        </p>
        <h1 className="text-headline font-display italic">{product.name}</h1>
        {product.price && (
          <p className="mt-2 text-xl font-light text-foreground">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        )}
        <p className="mt-4 max-w-md text-muted">{product.description}</p>

        <div className="mt-8">
          <p className="mb-2 text-sm font-medium text-muted">Cor: {variant.label}</p>
          <div className="flex gap-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                aria-label={v.label}
                aria-pressed={v.id === variantId}
                className={`h-11 w-11 cursor-pointer rounded-full border-2 transition-transform duration-200 ${
                  v.id === variantId ? "scale-110 border-accent" : "border-line-strong"
                }`}
                style={{ backgroundColor: v.frameColor }}
              />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <WhatsAppButton produto={product.name}>Quero este modelo</WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
