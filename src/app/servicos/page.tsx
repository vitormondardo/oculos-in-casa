import type { Metadata } from "next";
import { services } from "@/content/services";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Conheça os serviços de atendimento domiciliar da Óculos InCasa.",
};

export default function ServicosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-36">
      <Reveal>
        <Kicker n="Índice" className="mb-6">Serviços</Kicker>
        <h1 className="text-display font-light">
          Atendimento completo, <span className="font-display italic text-accent-soft">na sua casa</span>
        </h1>
      </Reveal>

      <RevealGroup as="ul" className="mt-16 border-b border-line-strong">
        {services.map((service, i) => (
          <RevealItem as="li" key={service.slug}>
            <article className="grid gap-x-8 gap-y-5 border-t border-line-strong py-10 sm:grid-cols-[6rem_1fr_1.1fr]">
              <span className="font-display text-4xl italic leading-none text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-3xl leading-tight tracking-tight">{service.title}</h2>
              <div>
                <p className="text-muted">{service.description}</p>
                <WhatsAppButton servico={service.title} className="mt-6">
                  Agendar este serviço
                </WhatsAppButton>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
