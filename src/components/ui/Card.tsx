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
 * RevealGroup para entrar em stagger; o hover sobe 4 px e destaca a borda.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-accent/60 ${className}`}
    >
      {children}
    </motion.div>
  );
}
