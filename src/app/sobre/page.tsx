import type { Metadata } from "next";
import Image from "next/image";
import { company } from "@/content/company";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a Óculos InCasa, a ótica com atendimento domiciliar.",
};

export default function SobrePage() {
  return (
    <div data-theme="light" className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl items-end gap-x-16 gap-y-14 px-6 pb-28 pt-36 md:grid-cols-[1.15fr_1fr]">
        <div>
          <Reveal>
            <Kicker n="Nº 06" className="mb-6">Sobre nós</Kicker>
            <h1 className="text-display font-light">
              <span className="font-display italic">{company.name}</span>
            </h1>
            <p className="mt-10 max-w-lg font-display text-2xl italic leading-snug text-teal-deep sm:text-3xl">
              “Levar o cuidado com a sua visão até onde você está.”
            </p>
          </Reveal>

          <Reveal className="mt-10 max-w-lg border-t border-line-strong pt-8">
            <p className="dropcap text-lg text-muted">
              Nascemos com uma missão simples: levar o cuidado com a sua visão até
              onde você está. Sem filas, sem deslocamento — apenas atendimento
              profissional, técnico e humano, no conforto da sua casa.
            </p>
            <p className="mt-4 text-muted">
              Atendemos {company.serviceAreas.join(" e ")}, com uma equipe de
              optometristas e consultores treinados para trazer até você toda a
              experiência de uma ótica completa: exame de vista, prova de
              armações, ajustes e entrega — tudo agendado pelo WhatsApp.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid max-w-lg gap-px border border-line-strong bg-line-strong sm:grid-cols-2">
            <RevealItem className="bg-background p-5">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-kicker">Horário</h2>
              <p className="mt-2 text-sm">{company.hours}</p>
            </RevealItem>
            <RevealItem className="bg-background p-5">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-kicker">Áreas atendidas</h2>
              <p className="mt-2 text-sm">{company.serviceAreas.join(", ")}</p>
            </RevealItem>
          </RevealGroup>

          <div className="mt-10">
            <WhatsAppButton>Fale com a gente</WhatsAppButton>
          </div>
        </div>

        {/* Retrato recortado sobre uma chapa de cor: a cabeça ultrapassa o topo da chapa */}
        <figure className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="absolute inset-x-6 bottom-0 top-24 border border-line-strong bg-surface-alt" />
          <div aria-hidden className="absolute -bottom-3 left-0 right-12 top-32 border border-accent" />
          <Image
            src="/brand/angela.png"
            alt="Angela, da Óculos InCasa, sorrindo e usando óculos de armação preta"
            width={770}
            height={962}
            priority
            sizes="(min-width: 768px) 40vw, 90vw"
            className="relative h-auto w-full"
          />
          <figcaption className="relative mt-4 flex items-baseline justify-between text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted">
            <span>Angela</span>
            <span className="font-display text-sm normal-case italic tracking-normal">{company.name}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
