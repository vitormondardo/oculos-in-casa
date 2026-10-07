"use client";

import { ScrollSection } from "@/components/sections/ScrollSection";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";

const features = [
  { title: "Lentes com proteção UV400", desc: "Proteção total contra raios ultravioleta." },
  { title: "Antirreflexo premium", desc: "Reduz o cansaço visual em telas e à noite." },
  { title: "Feitas sob medida", desc: "Grau calculado no seu exame domiciliar." },
];

export function LensesSection() {
  return (
    <ScrollSection section="lenses" className="flex min-h-dvh items-center px-6 py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 sm:grid-cols-2">
        <RevealGroup className="flex flex-col justify-center sm:order-2">
          <RevealItem>
            <Kicker n="Nº 02" className="mb-6">Lentes</Kicker>
          </RevealItem>
          <RevealItem>
            <h2 className="text-headline font-light">
              Cada detalhe pensado <span className="font-display italic text-accent-soft">para a sua visão.</span>
            </h2>
          </RevealItem>
          <ul className="mt-10 border-b border-line-strong">
            {features.map((f, i) => (
              <RevealItem as="li" key={f.title}>
                <div className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-line-strong py-5">
                  <span className="font-display text-2xl italic text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-xl tracking-tight">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
        <div className="sm:order-1" />
      </div>
    </ScrollSection>
  );
}
