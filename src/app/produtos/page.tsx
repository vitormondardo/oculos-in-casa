import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/products";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Conheça o catálogo de armações da Óculos InCasa.",
};

export default function ProdutosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-36">
      <Reveal>
        <Kicker n="Catálogo" className="mb-6">Armações</Kicker>
        <h1 className="text-display font-light">
          Nossos <span className="font-display italic text-accent-soft">óculos</span>
        </h1>
        <p className="mt-8 max-w-xl text-muted">
          Explore os modelos disponíveis para experimentar em casa. Cada um pode
          ser visto em 3D, com todas as opções de cor.
        </p>
      </Reveal>

      <RevealGroup className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <RevealItem key={product.slug} className="border-b border-r border-line bg-background transition-colors duration-200 hover:bg-surface">
            <Link href={`/produtos/${product.slug}`} className="group flex h-full min-h-72 flex-col justify-between p-7">
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl italic leading-none text-accent/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5 pt-1">
                  {product.variants.slice(0, 4).map((v) => (
                    <span
                      key={v.id}
                      className="h-3.5 w-3.5 rounded-full border border-line-strong"
                      style={{ backgroundColor: v.frameColor }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-12">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted">{product.category}</p>
                <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {product.name}
                </h2>
                <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4 text-sm">
                  {product.price ? (
                    <span className="text-foreground">
                      {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent">Ver em 3D →</span>
                </div>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
