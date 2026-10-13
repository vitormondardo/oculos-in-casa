import type { Product } from "@/types/content";

export const products: Product[] = [
  {
    slug: "essence-cat-eye",
    name: "Essence Cat-Eye",
    category: "Óculos de Grau",
    description:
      "Armação cat-eye de acetato, leve e confortável, com acabamento fosco e hastes flexíveis. Inspirada na nossa própria marca.",
    shape: "cat-eye",
    poster: "/brand/logo.jpg",
    price: 349,
    featured: true,
    variants: [
      { id: "preto", label: "Preto Fosco", frameColor: "#111111", lensColor: "#0a0a0a", metalness: 0.1, roughness: 0.6 },
      { id: "tartaruga", label: "Tartaruga", frameColor: "#6b4a2b", lensColor: "#1a1208", metalness: 0.05, roughness: 0.3, pattern: "tortoise" },
      { id: "marfim", label: "Marfim", frameColor: "#efe6d8", lensColor: "#161616", metalness: 0.05, roughness: 0.5 },
    ],
  },
  {
    slug: "classic-round",
    name: "Classic Round",
    category: "Óculos de Grau",
    description:
      "Lentes redondas em armação metálica fina, para quem busca um visual atemporal e minimalista.",
    shape: "redondo",
    poster: "/brand/logo.jpg",
    price: 299,
    variants: [
      { id: "dourado", label: "Dourado", frameColor: "#c9a24b", lensColor: "#111111", metalness: 0.8, roughness: 0.25 },
      { id: "prata", label: "Prata", frameColor: "#c7c9cc", lensColor: "#111111", metalness: 0.85, roughness: 0.2 },
    ],
  },
  {
    slug: "urban-square",
    name: "Urban Square",
    category: "Óculos de Grau",
    description:
      "Armação quadrada robusta, ideal para rostos ovais e redondos. Estrutura reforçada para uso diário.",
    shape: "quadrado",
    poster: "/brand/logo.jpg",
    price: 379,
    variants: [
      { id: "preto", label: "Preto Brilhante", frameColor: "#0d0d0d", lensColor: "#111111", metalness: 0.2, roughness: 0.3 },
      { id: "azul", label: "Azul Marinho", frameColor: "#1c2b4a", lensColor: "#111111", metalness: 0.2, roughness: 0.35 },
    ],
  },
  {
    slug: "sunset-aviator",
    name: "Sunset Aviator",
    category: "Óculos de Sol",
    description:
      "Aviador clássico com lentes espelhadas, proteção UV400 e armação em metal leve.",
    shape: "aviador",
    poster: "/brand/logo.jpg",
    price: 429,
    variants: [
      { id: "dourado-espelhado", label: "Dourado Espelhado", frameColor: "#c9a24b", lensColor: "#e08a3c", metalness: 0.9, roughness: 0.15, lensFinish: "mirror" },
      { id: "grafite", label: "Grafite", frameColor: "#3a3a3a", lensColor: "#1a1a1a", metalness: 0.6, roughness: 0.3 },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
