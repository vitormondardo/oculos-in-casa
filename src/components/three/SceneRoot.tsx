"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { Lighting } from "@/components/three/Lighting";
import { ScrollRig } from "@/components/three/ScrollRig";
import { useSceneStore } from "@/lib/store/scene";

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Canvas 3D único e persistente, montado uma vez no layout raiz e fixo atrás
 * do conteúdo HTML. Fica visível apenas na home, que é onde a narrativa de
 * scroll acontece; nas demais páginas o conteúdo DOM cobre normalmente.
 */
export function SceneRoot() {
  const pathname = usePathname();
  const quality = useSceneStore((s) => s.quality);
  const setQuality = useSceneStore((s) => s.setQuality);
  const setReducedMotion = useSceneStore((s) => s.setReducedMotion);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    // Detecção de capacidade do navegador: precisa rodar no cliente (sem
    // window durante SSR), então setState aqui é o próprio propósito do
    // efeito, não um cálculo derivável do render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebglOk(supportsWebGL());

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [setReducedMotion]);

  const isHome = pathname === "/";

  if (!webglOk) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 transition-opacity duration-500"
      style={{ opacity: isHome ? 1 : 0.35 }}
    >
      <Canvas
        dpr={quality === "low" ? 1 : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.2], fov: 35 }}
        frameloop={isHome ? "always" : "demand"}
      >
        <PerformanceMonitor
          onIncline={() => setQuality("high")}
          onDecline={() => setQuality("low")}
        >
          <Suspense fallback={null}>
            <Lighting />
            <ScrollRig />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
