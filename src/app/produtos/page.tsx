import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/products";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Conheça o catálogo de armações da Óculos InCasa.",
};

export default function ProdutosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <Reveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-kicker">
          Catálogo
        </p>
        <h1 className="text-headline font-light">
          Nossos <span className="font-display italic text-accent-soft">óculos</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Explore os modelos disponíveis para experimentar em casa. Cada um pode
          ser visto em 3D, com todas as opções de cor.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.slug}>
          <Link
            href={`/produtos/${product.slug}`}
            className="group block"
          >
            <div className="flex items-center gap-2">
              {product.variants.slice(0, 4).map((v) => (
                <span
                  key={v.id}
                  className="h-4 w-4 rounded-full border border-line-strong"
                  style={{ backgroundColor: v.frameColor }}
                />
              ))}
            </div>
            <h2 className="mt-4 font-semibold text-foreground">{product.name}</h2>
            <p className="mt-1 text-sm text-muted">{product.category}</p>
            {product.price && (
              <p className="mt-3 text-sm text-foreground">
                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            )}
            <span className="mt-4 inline-block text-sm font-semibold text-foreground underline decoration-accent underline-offset-4 group-hover:text-accent">
              Ver em 3D →
            </span>
          </Link>
          </Card>
        ))}
      </RevealGroup>
    </div>
  );
}
