import type { Metadata } from "next";
import { company } from "@/content/company";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a Óculos InCasa, a ótica com atendimento domiciliar.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        Sobre nós
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">{company.name}</h1>
      <p className="mt-6 text-lg text-white/70">
        Nascemos com uma missão simples: levar o cuidado com a sua visão até
        onde você está. Sem filas, sem deslocamento — apenas atendimento
        profissional, técnico e humano, no conforto da sua casa.
      </p>
      <p className="mt-4 text-white/70">
        Atendemos {company.serviceAreas.join(" e ")}, com uma equipe de
        optometristas e consultores treinados para trazer até você toda a
        experiência de uma ótica completa: exame de vista, prova de armações,
        ajustes e entrega — tudo agendado pelo WhatsApp.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-semibold">Horário de atendimento</h2>
          <p className="mt-2 text-sm text-white/60">{company.hours}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-semibold">Áreas atendidas</h2>
          <p className="mt-2 text-sm text-white/60">{company.serviceAreas.join(", ")}</p>
        </div>
      </div>

      <div className="mt-10">
        <WhatsAppButton>Fale com a gente</WhatsAppButton>
      </div>
    </div>
  );
}
