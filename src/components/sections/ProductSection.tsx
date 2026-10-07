"use client";

import Link from "next/link";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Kicker } from "@/components/ui/Kicker";
import { buttonClass } from "@/components/ui/Button";
import { products } from "@/content/products";

const heroProduct = products.find((p) => p.featured) ?? products[0];

export function ProductSection() {
  return (
    <ScrollSection section="product" className="flex min-h-dvh items-center px-6 py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 sm:grid-cols-2">
        <div />
        <RevealGroup className="flex flex-col justify-center">
          <RevealItem>
            <Kicker n="Nº 01" className="mb-6">
              Em destaque · {heroProduct.category}
            </Kicker>
          </RevealItem>
          <RevealItem>
            <h2 className="text-headline font-display italic tracking-[-0.04em]">{heroProduct.name}</h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 max-w-md text-muted">{heroProduct.description}</p>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 border-t border-line pt-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted">
              Cores disponíveis
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
              {heroProduct.variants.map((variant) => (
                <li key={variant.id} className="flex items-center gap-2 text-sm text-foreground">
                  <span
                    aria-hidden
                    className="h-5 w-5 rounded-full border border-line-strong"
                    style={{ backgroundColor: variant.frameColor }}
                  />
                  {variant.label}
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem>
            <Link href={`/produtos/${heroProduct.slug}`} className={buttonClass("outline", "mt-8 w-fit")}>
              Ver detalhes do modelo
              <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>
    </ScrollSection>
  );
}
