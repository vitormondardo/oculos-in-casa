"use client";

import { ScrollSection } from "@/components/sections/ScrollSection";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { InstagramButton } from "@/components/ui/InstagramButton";
import { Icon } from "@/components/ui/Icon";
import { Kicker } from "@/components/ui/Kicker";

export function CtaSection() {
  return (
    <ScrollSection section="cta" className="relative flex min-h-[80dvh] items-center px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_100%,rgba(43,181,166,0.18),rgba(201,162,75,0.10)_55%,transparent)]"
      />
      <RevealGroup className="relative mx-auto w-full max-w-6xl">
        <RevealItem>
          <Kicker n="Nº 05" className="mb-8">Agende</Kicker>
        </RevealItem>
        <RevealItem>
          <h2 className="text-display font-light">
            Pronto para enxergar melhor,
            <br />
            <span className="font-display italic text-accent-soft">sem sair de casa?</span>
          </h2>
        </RevealItem>
        <RevealItem className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton>Agendar meu atendimento</WhatsAppButton>
            <InstagramButton />
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <Icon name="check" size={18} className="text-teal" />
            Sem compromisso — agende pelo WhatsApp em poucos minutos.
          </p>
        </RevealItem>
      </RevealGroup>
    </ScrollSection>
  );
}
