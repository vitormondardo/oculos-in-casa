"use client";

import Link from "next/link";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Kicker } from "@/components/ui/Kicker";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <ScrollSection section="services" theme="light" className="min-h-dvh px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker n="Nº 03" className="mb-6">Serviços</Kicker>
          <h2 className="text-headline max-w-3xl font-light">
            Tudo que uma ótica oferece,{" "}
            <span className="font-display italic">sem você precisar sair de casa.</span>
          </h2>
        </Reveal>

        <RevealGroup as="ul" className="mt-16 border-b border-line-strong" gap={0.07}>
          {services.map((service, i) => (
            <RevealItem as="li" key={service.slug}>
              <div className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-2 border-t border-line-strong py-7 transition-colors duration-300 hover:bg-surface-alt sm:grid-cols-[6rem_1.2fr_1fr] sm:px-2">
                <span className="font-display text-3xl italic text-teal-deep sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                  {service.title}
                </h3>
                <p className="col-start-2 text-sm text-muted sm:col-start-3">{service.shortDescription}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <Link
            href="/servicos"
            className="group inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-teal-deep"
          >
            Ver todos os serviços
            <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </ScrollSection>
  );
}
