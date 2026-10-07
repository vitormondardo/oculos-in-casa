"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import { company } from "@/content/company";
import { fadeUp, stagger } from "@/lib/motion";

const trust: { icon: IconName; label: string }[] = [
  { icon: "exam", label: "Exame completo em casa" },
  { icon: "delivery", label: "Entrega na sua porta" },
  { icon: "shield", label: "Garantia e suporte" },
];

export function Hero() {
  return (
    <ScrollSection id="hero" section="hero" className="relative flex min-h-dvh items-center px-6 pb-16 pt-28">
      {/* Véu lateral: garante legibilidade do texto sobre o óculos 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.8)_0%,rgba(10,10,10,0.35)_45%,transparent_70%)]"
      />
      <motion.div
        className="relative mx-auto w-full max-w-6xl"
        variants={stagger(0.1, 0.15)}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-xl">
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Atendimento em domicílio
          </motion.p>

          <h1 className="text-display font-light">
            <motion.span variants={fadeUp} className="block">
              A ótica que vai
            </motion.span>
            <motion.span variants={fadeUp} className="block font-display italic text-accent-soft">
              até a sua casa.
            </motion.span>
          </h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-md text-base text-muted sm:text-lg">
            {company.tagline} Exame de vista, prova de armações e entrega — óculos
            sob medida sem sair do conforto do seu lar.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <WhatsAppButton>Agendar atendimento</WhatsAppButton>
            <Link href="/produtos" className={buttonClass("outline")}>
              Ver catálogo
              <Icon name="arrow" size={18} />
            </Link>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm text-muted">
                <Icon name={t.icon} size={18} className="text-teal" />
                {t.label}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-line-strong pt-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.span
          className="h-2 w-1 rounded-full bg-accent"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </ScrollSection>
  );
}
