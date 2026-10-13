"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { InstagramButton } from "@/components/ui/InstagramButton";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import { company } from "@/content/company";
import { fadeUp, lineUp, stagger } from "@/lib/motion";

const trust = [
  { n: "01", label: "Exame completo em casa" },
  { n: "02", label: "Entrega na sua porta" },
  { n: "03", label: "Garantia e suporte" },
];

/** Linha de título dentro de uma máscara: o texto sobe de baixo da própria linha. */
function Line({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.14em]">
      <motion.span variants={lineUp} className={`block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <ScrollSection id="hero" section="hero" className="relative flex min-h-dvh px-6 pb-8 pt-28">
      {/* Véu lateral: garante legibilidade do texto sobre o óculos 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.82)_0%,rgba(10,10,10,0.4)_50%,transparent_78%)]"
      />
      <motion.div
        className="relative mx-auto flex w-full max-w-6xl flex-col justify-between"
        variants={stagger(0.12, 0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between gap-6 border-b border-line pb-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted"
        >
          <span>Atendimento em domicílio</span>
          <span className="hidden sm:block">{company.serviceAreas.join(" · ")}</span>
        </motion.div>

        <div className="py-10">
          <h1 className="text-display font-light">
            <Line>A ótica que</Line>
            <Line>vai até</Line>
            <Line className="font-display italic text-accent-soft">a sua casa.</Line>
          </h1>

          <div className="mt-10 grid gap-8 sm:grid-cols-[minmax(0,26rem)_1fr] sm:items-end">
            <motion.p variants={fadeUp} className="text-base text-muted sm:text-lg">
              {company.tagline} Exame de vista, prova de armações e entrega — óculos
              sob medida sem sair do conforto do seu lar.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:justify-end">
              <WhatsAppButton>Agendar atendimento</WhatsAppButton>
              <Link href="/produtos" className={buttonClass("outline")}>
                Ver catálogo
                <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <InstagramButton />
            </motion.div>
          </div>
        </div>

        <motion.ul variants={fadeUp} className="grid gap-x-8 gap-y-3 border-t border-line pt-4 sm:grid-cols-3">
          {trust.map((t) => (
            <li key={t.n} className="flex items-baseline gap-3 text-sm text-muted">
              <span className="font-display text-lg italic text-accent">{t.n}</span>
              {t.label}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </ScrollSection>
  );
}
