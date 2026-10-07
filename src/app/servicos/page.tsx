import type { Metadata } from "next";
import { services } from "@/content/services";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Conheça os serviços de atendimento domiciliar da Óculos InCasa.",
};

export default function ServicosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <Reveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-kicker">
          Serviços
        </p>
        <h1 className="text-headline font-light">
          Atendimento completo, <span className="font-display italic text-accent-soft">na sua casa</span>
        </h1>
      </Reveal>

      <RevealGroup className="mt-14 space-y-6">
        {services.map((service) => (
          <Card key={service.slug} className="grid gap-4 p-8 sm:grid-cols-[1fr_2fr] sm:items-center">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                <Icon name={service.icon} />
              </span>
              <h2 className="text-xl font-semibold">{service.title}</h2>
            </div>
            <div>
              <p className="text-muted">{service.description}</p>
              <WhatsAppButton servico={service.title} className="mt-4">
                Agendar este serviço
              </WhatsAppButton>
            </div>
          </Card>
        ))}
      </RevealGroup>
    </div>
  );
}
