import type { Transition, Variants } from "framer-motion";

/** Tokens de movimento únicos: toda animação do site compartilha o mesmo ritmo. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.7,
} as const;

export const spring: Transition = { type: "spring", stiffness: 380, damping: 30 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: duration.base, ease } },
};

export const stagger = (gap = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren } },
});

export const viewportOnce = { once: true, margin: "-12% 0px" } as const;
