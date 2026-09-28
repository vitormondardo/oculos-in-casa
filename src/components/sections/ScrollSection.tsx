"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { useSectionTrigger } from "@/lib/scroll/useSectionTrigger";
import type { SectionId } from "@/lib/store/scene";

type ScrollSectionProps = {
  id?: string;
  section: SectionId;
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper de <section> que registra o trecho como um estágio da narrativa
 * de scroll (ver useSectionTrigger) e serve de âncora de navegação.
 */
export function ScrollSection({ id, section, className, children }: ScrollSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  useSectionTrigger(ref, section);

  return (
    <section id={id} ref={ref as RefObject<HTMLElement>} className={className}>
      {children}
    </section>
  );
}
