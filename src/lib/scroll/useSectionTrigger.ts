"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSceneStore, type SectionId } from "@/lib/store/scene";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Registra uma <section> como um "estágio" da narrativa de scroll: enquanto
 * ela cruza a viewport, escreve activeSection + progress (0..1) na store,
 * sem causar re-render do React (o Canvas lê a store dentro de useFrame).
 */
export function useSectionTrigger(
  ref: RefObject<HTMLElement | null>,
  section: SectionId,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        useSceneStore.getState().setScroll(section, self.progress);
      },
      onToggle: (self) => {
        if (self.isActive) {
          useSceneStore.getState().setScroll(section, self.progress);
        }
      },
    });

    return () => trigger.kill();
  }, [ref, section]);
}
