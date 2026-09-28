import { company } from "@/content/company";
import type { Product } from "@/types/content";

export const siteUrl = "https://www.oculosincasa.com.br";

export function opticianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Optician",
    name: company.name,
    description:
      "Ótica com atendimento domiciliar: exame de vista, prova de armações, ajustes e entrega, tudo na sua casa.",
    url: siteUrl,
    image: `${siteUrl}/brand/logo.jpg`,
    email: company.email,
    areaServed: company.serviceAreas,
    openingHours: company.hours,
    sameAs: company.instagram ? [company.instagram] : undefined,
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: `${siteUrl}${product.poster}`,
    offers: product.price
      ? {
          "@type": "Offer",
          priceCurrency: "BRL",
          price: product.price,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}
