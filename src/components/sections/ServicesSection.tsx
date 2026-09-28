import Link from "next/link";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <ScrollSection section="services" className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Serviços
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
          Tudo que uma ótica oferece, sem você precisar sair de casa.
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-white/30"
            >
              <h3 className="font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm text-white/60">{service.shortDescription}</p>
            </div>
          ))}
        </div>

        <Link
          href="/servicos"
          className="mt-10 inline-block text-sm font-semibold text-white underline underline-offset-4 hover:text-accent"
        >
          Ver todos os serviços →
        </Link>
      </div>
    </ScrollSection>
  );
}
