"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ProceduralGlasses } from "@/components/three/ProceduralGlasses";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { Product } from "@/types/content";

export function ProductViewer({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  return (
    <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        <Canvas camera={{ position: [0, 0, 3.2], fov: 35 }} dpr={[1, 1.75]} shadows>
          <ambientLight intensity={0.3} />
          <spotLight position={[3, 4, 5]} angle={0.4} penumbra={0.6} intensity={2} castShadow />
          <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#8fb8ff" />
          <Environment preset="city" environmentIntensity={0.5} />
          <group rotation={[0, Math.PI / 8, 0]}>
            <ProceduralGlasses
              shape={product.shape}
              frameColor={variant.frameColor}
              lensColor={variant.lensColor}
              metalness={variant.metalness}
              roughness={variant.roughness}
            />
          </group>
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={5}
            autoRotate
            autoRotateSpeed={1.2}
          />
        </Canvas>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          {product.category}
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">{product.name}</h1>
        {product.price && (
          <p className="mt-2 text-xl font-light text-white/80">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        )}
        <p className="mt-4 max-w-md text-white/70">{product.description}</p>

        <div className="mt-8">
          <p className="mb-2 text-sm font-medium text-white/60">Cor: {variant.label}</p>
          <div className="flex gap-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                aria-label={v.label}
                aria-pressed={v.id === variantId}
                className={`h-10 w-10 rounded-full border-2 transition-transform ${
                  v.id === variantId ? "scale-110 border-white" : "border-white/30"
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
