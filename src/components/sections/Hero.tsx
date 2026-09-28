import { ScrollSection } from "@/components/sections/ScrollSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { company } from "@/content/company";

export function Hero() {
  return (
    <ScrollSection id="hero" section="hero" className="flex min-h-screen items-center px-6 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            {company.tagline}
          </p>
          <h1 className="text-4xl font-light leading-tight sm:text-6xl">
            A ótica que vai
            <br />
            <span className="font-bold">até a sua casa.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
            Exame de vista, prova de armações e entrega — sem sair do conforto
            do seu lar. Role a página e conheça nossos óculos de perto.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <WhatsAppButton>Agendar atendimento</WhatsAppButton>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
