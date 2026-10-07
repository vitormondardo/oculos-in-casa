"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { useSectionTrigger } from "@/lib/scroll/useSectionTrigger";
import type { SectionId } from "@/lib/store/scene";

type ScrollSectionProps = {
  id?: string;
  section: SectionId;
  /** "light" pinta a seção de marfim (opaca, cobre o canvas 3D atrás) */
  theme?: "dark" | "light";
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper de <section> que registra o trecho como um estágio da narrativa
 * de scroll (ver useSectionTrigger) e serve de âncora de navegação.
 */
export function ScrollSection({
  id,
  section,
  theme = "dark",
  className = "",
  children,
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  useSectionTrigger(ref, section);

  const themed = theme === "light" ? "bg-background text-foreground" : "";

  return (
    <section
      id={id}
      ref={ref as RefObject<HTMLElement>}
      data-theme={theme === "light" ? "light" : undefined}
      className={`${themed} ${className}`}
    >
      {children}
    </section>
  );
}
