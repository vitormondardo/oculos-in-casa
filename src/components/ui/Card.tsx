"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Cartão base (usa tokens do tema atual). Deve ser filho direto de um
 * RevealGroup para entrar em stagger; filete fino, sem cantos arredondados; o hover escurece a borda.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      variants={fadeUp}
            className={`border border-line bg-surface p-6 transition-colors duration-200 hover:border-foreground/50 ${className}`}
    >
      {children}
    </motion.div>
  );
}
