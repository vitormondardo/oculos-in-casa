import Link from "next/link";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { products } from "@/content/products";

const heroProduct = products.find((p) => p.featured) ?? products[0];

export function ProductSection() {
  return (
    <ScrollSection section="product" className="flex min-h-screen items-center px-6">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2">
        <div />
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            {heroProduct.category}
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">{heroProduct.name}</h2>
          <p className="mt-4 max-w-md text-white/70">{heroProduct.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {heroProduct.variants.map((variant) => (
              <span
                key={variant.id}
                title={variant.label}
                className="h-8 w-8 rounded-full border border-white/30"
                style={{ backgroundColor: variant.frameColor }}
              />
            ))}
          </div>
          <Link
            href={`/produtos/${heroProduct.slug}`}
            className="mt-8 w-fit text-sm font-semibold text-white underline underline-offset-4 hover:text-accent"
          >
            Ver detalhes do modelo →
          </Link>
        </div>
      </div>
    </ScrollSection>
  );
}
