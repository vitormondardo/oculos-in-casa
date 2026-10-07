"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Entra com fade + subida curta quando atinge a viewport (uma única vez). */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "ol";
};

/** Container que escalona (stagger) os RevealItem filhos. */
export function RevealGroup({ children, className, gap = 0.08, as = "div" }: RevealGroupProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
