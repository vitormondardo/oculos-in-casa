import type { Metadata } from "next";
import { services } from "@/content/services";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Conheça os serviços de atendimento domiciliar da Óculos InCasa.",
};

export default function ServicosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        Serviços
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">
        Atendimento completo, na sua casa
      </h1>

      <div className="mt-14 space-y-6">
        {services.map((service) => (
          <div
            key={service.slug}
            className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:grid-cols-[1fr_2fr] sm:items-center"
          >
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <div>
              <p className="text-white/70">{service.description}</p>
              <WhatsAppButton servico={service.title} className="mt-4">
                Agendar este serviço
              </WhatsAppButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
