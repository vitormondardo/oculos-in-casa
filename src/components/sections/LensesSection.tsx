"use client";

import { ScrollSection } from "@/components/sections/ScrollSection";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

const features: { icon: IconName; title: string; desc: string }[] = [
  { icon: "sun", title: "Lentes com proteção UV400", desc: "Proteção total contra raios ultravioleta." },
  { icon: "sparkle", title: "Antirreflexo premium", desc: "Reduz o cansaço visual em telas e à noite." },
  { icon: "exam", title: "Feitas sob medida", desc: "Grau calculado no seu exame domiciliar." },
];

export function LensesSection() {
  return (
    <ScrollSection section="lenses" className="flex min-h-dvh items-center px-6 py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 sm:grid-cols-2">
        <RevealGroup className="flex flex-col justify-center sm:order-2">
          <RevealItem>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-kicker">Lentes</p>
          </RevealItem>
          <RevealItem>
            <h2 className="text-headline font-light">
              Cada detalhe pensado <span className="font-display italic text-accent-soft">para a sua visão.</span>
            </h2>
          </RevealItem>
          <ul className="mt-8 space-y-4">
            {features.map((f) => (
              <RevealItem as="li" key={f.title}>
                <div className="flex gap-4 rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-sm transition-colors duration-200 hover:border-teal/50">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                    <Icon name={f.icon} />
                  </span>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-muted">{f.desc}</p>
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
