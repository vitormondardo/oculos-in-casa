"use client";

import { ScrollSection } from "@/components/sections/ScrollSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";

const steps = [
  { number: "1", title: "Agende pelo WhatsApp", desc: "Escolha o melhor dia e horário para receber nossa visita." },
  { number: "2", title: "Exame e prova em casa", desc: "Fazemos o exame de vista e você experimenta as armações." },
  { number: "3", title: "Óculos pronto na porta", desc: "Produzimos e entregamos seu óculos já ajustado." },
];

export function HowItWorksSection() {
  return (
    <ScrollSection section="how-it-works" className="flex min-h-dvh items-center px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Kicker n="Nº 04" className="mb-6">Como funciona</Kicker>
          <h2 className="text-headline max-w-3xl font-light">
            Simples, rápido e <span className="font-display italic text-accent-soft">sem sair do lugar.</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-3" gap={0.15}>
          {steps.map((step) => (
            <RevealItem key={step.number}>
              <div className="border-t border-line-strong pt-6">
                <span className="block font-display text-[7rem] italic leading-[0.8] text-accent/50 sm:text-[9rem]">
                  {step.number}
                </span>
                <h3 className="mt-6 font-display text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm text-muted">{step.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </ScrollSection>
  );
}
