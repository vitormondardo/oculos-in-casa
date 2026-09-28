import { ScrollSection } from "@/components/sections/ScrollSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function CtaSection() {
  return (
    <ScrollSection section="cta" className="flex min-h-[80vh] items-center px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-light sm:text-5xl">
          Pronto para enxergar melhor,
          <br />
          <span className="font-bold">sem sair de casa?</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <WhatsAppButton>Agendar meu atendimento</WhatsAppButton>
        </div>
      </div>
    </ScrollSection>
  );
}
