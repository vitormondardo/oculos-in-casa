import type { Metadata } from "next";
import Image from "next/image";
import { company } from "@/content/company";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a Óculos InCasa, a ótica com atendimento domiciliar.",
};

export default function SobrePage() {
  return (
    // Fundo opaco claro (mesmos tokens da seção Serviços da home): cobre o
    // canvas 3D fixo, então os óculos 3D não aparecem nesta página.
    <div data-theme="light" className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-32 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-kicker">
              Sobre nós
            </p>
            <h1 className="text-headline font-display italic">{company.name}</h1>
            <p className="mt-6 text-lg text-muted">
              Nascemos com uma missão simples: levar o cuidado com a sua visão
              até onde você está. Sem filas, sem deslocamento — apenas
              atendimento profissional, técnico e humano, no conforto da sua
              casa.
            </p>
            <p className="mt-4 text-muted">
              Atendemos {company.serviceAreas.join(" e ")}, com uma equipe de
              optometristas e consultores treinados para trazer até você toda a
              experiência de uma ótica completa: exame de vista, prova de
              armações, ajustes e entrega — tudo agendado pelo WhatsApp.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            <Card className="shadow-sm shadow-black/5">
              <h2 className="font-semibold">Horário de atendimento</h2>
              <p className="mt-2 text-sm text-muted">{company.hours}</p>
            </Card>
            <Card className="shadow-sm shadow-black/5">
              <h2 className="font-semibold">Áreas atendidas</h2>
              <p className="mt-2 text-sm text-muted">{company.serviceAreas.join(", ")}</p>
            </Card>
          </RevealGroup>

          <div className="mt-10">
            <WhatsAppButton>Fale com a gente</WhatsAppButton>
          </div>
        </div>

        <Image
          src="/brand/angela.png"
          alt="Angela, da Óculos InCasa, sorrindo e usando óculos de armação preta"
          width={770}
          height={962}
          priority
          sizes="(min-width: 768px) 40vw, 90vw"
          className="mx-auto h-auto w-full max-w-md drop-shadow-xl"
        />
      </div>
    </div>
  );
}
