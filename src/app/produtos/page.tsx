import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Conheça o catálogo de armações da Óculos InCasa.",
};

export default function ProdutosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        Catálogo
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">Nossos óculos</h1>
      <p className="mt-4 max-w-xl text-white/70">
        Explore os modelos disponíveis para experimentar em casa. Cada um pode
        ser visto em 3D, com todas as opções de cor.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/produtos/${product.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30"
          >
            <div className="flex items-center gap-2">
              {product.variants.slice(0, 4).map((v) => (
                <span
                  key={v.id}
                  className="h-4 w-4 rounded-full border border-white/20"
                  style={{ backgroundColor: v.frameColor }}
                />
              ))}
            </div>
            <h2 className="mt-4 font-semibold text-white">{product.name}</h2>
            <p className="mt-1 text-sm text-white/60">{product.category}</p>
            {product.price && (
              <p className="mt-3 text-sm text-white/80">
                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            )}
            <span className="mt-4 inline-block text-sm font-semibold text-white underline underline-offset-4 group-hover:text-accent">
              Ver em 3D →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
