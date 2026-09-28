import { ScrollSection } from "@/components/sections/ScrollSection";

const steps = [
  { number: "01", title: "Agende pelo WhatsApp", desc: "Escolha o melhor dia e horário para receber nossa visita." },
  { number: "02", title: "Exame e prova em casa", desc: "Fazemos o exame de vista e você experimenta as armações." },
  { number: "03", title: "Óculos pronto na porta", desc: "Produzimos e entregamos seu óculos já ajustado." },
];

export function HowItWorksSection() {
  return (
    <ScrollSection section="how-it-works" className="flex min-h-screen items-center px-6">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Como funciona
        </p>
        <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">
          Simples, rápido e sem sair do lugar.
        </h2>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-4xl font-light text-white/20">{step.number}</span>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
