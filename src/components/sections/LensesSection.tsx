import { ScrollSection } from "@/components/sections/ScrollSection";

const features = [
  { title: "Lentes com proteção UV400", desc: "Proteção total contra raios ultravioleta." },
  { title: "Antirreflexo premium", desc: "Reduz o cansaço visual em telas e à noite." },
  { title: "Feitas sob medida", desc: "Grau calculado no seu exame domiciliar." },
];

export function LensesSection() {
  return (
    <ScrollSection section="lenses" className="flex min-h-screen items-center px-6">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2">
        <div className="flex flex-col justify-center sm:order-2">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Lentes
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Cada detalhe pensado para a sua visão.
          </h2>
          <ul className="mt-8 space-y-6">
            {features.map((f) => (
              <li key={f.title} className="border-l-2 border-white/20 pl-4">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-white/60">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:order-1" />
      </div>
    </ScrollSection>
  );
}
