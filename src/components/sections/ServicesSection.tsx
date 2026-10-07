"use client";

import Link from "next/link";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <ScrollSection section="services" theme="light" className="min-h-dvh px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-kicker">Serviços</p>
          <h2 className="text-headline max-w-2xl font-light">
            Tudo que uma ótica oferece,{" "}
            <span className="font-display italic">sem você precisar sair de casa.</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {services.map((service) => (
            <Card key={service.slug} className="shadow-sm shadow-black/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/12 text-teal-deep">
                <Icon name={service.icon} />
              </span>
              <h3 className="mt-5 font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
            </Card>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <Link
            href="/servicos"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-teal-deep"
          >
            Ver todos os serviços
            <Icon name="arrow" size={18} />
          </Link>
        </Reveal>
      </div>
    </ScrollSection>
  );
}
