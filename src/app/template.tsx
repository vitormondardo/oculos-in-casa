"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/** Remonta a cada rota: entrada curta (fade + 12 px) para dar continuidade. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease }}
    >
      {children}
    </motion.div>
  );
}
