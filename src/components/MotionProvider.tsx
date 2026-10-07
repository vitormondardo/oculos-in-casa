"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Respeita prefers-reduced-motion em todas as animações do Framer Motion:
 * com a preferência ativa, transformações (x/y/scale) são desligadas e
 * só opacidade é animada.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
