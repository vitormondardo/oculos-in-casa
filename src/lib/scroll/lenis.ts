"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;
let rafId: number | null = null;

/**
 * Inicializa o Lenis (scroll suave) e o sincroniza com o GSAP ScrollTrigger.
 * Retorna uma função de limpeza. Idempotente: chamadas repetidas reaproveitam
 * a instância existente.
 */
export function initSmoothScroll(): () => void {
  if (typeof window === "undefined") return () => {};

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    // Sem Lenis: scroll nativo do navegador, ScrollTrigger ainda funciona.
    ScrollTrigger.refresh();
    return () => undefined;
  }

  if (!lenis) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis?.raf(time * 1000);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    gsap.ticker.lagSmoothing(0);
  }

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    lenis?.destroy();
    lenis = null;
    rafId = null;
  };
}

export function getLenis() {
  return lenis;
}
