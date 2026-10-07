"use client";

import { motion } from "framer-motion";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ease, viewportOnce } from "@/lib/motion";

const steps: { number: string; icon: IconName; title: string; desc: string }[] = [
  { number: "01", icon: "calendar", title: "Agende pelo WhatsApp", desc: "Escolha o melhor dia e horário para receber nossa visita." },
  { number: "02", icon: "exam", title: "Exame e prova em casa", desc: "Fazemos o exame de vista e você experimenta as armações." },
  { number: "03", icon: "delivery", title: "Óculos pronto na porta", desc: "Produzimos e entregamos seu óculos já ajustado." },
];

export function HowItWorksSection() {
  return (
    <ScrollSection section="how-it-works" className="flex min-h-dvh items-center px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-kicker">Como funciona</p>
          <h2 className="text-headline max-w-xl font-light">
            Simples, rápido e <span className="font-display italic text-accent-soft">sem sair do lugar.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* Linha que se desenha ligando os passos (desktop) */}
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-accent via-teal to-transparent sm:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease }}
          />
          <RevealGroup className="grid gap-10 sm:grid-cols-3" gap={0.15}>
            {steps.map((step) => (
              <RevealItem key={step.number}>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-background text-accent">
                  <Icon name={step.icon} />
                </div>
                <span className="mt-6 block font-display text-5xl italic text-accent/40">{step.number}</span>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </ScrollSection>
  );
}
