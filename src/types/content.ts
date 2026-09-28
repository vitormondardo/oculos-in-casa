export type FrameVariant = {
  /** Identificador único da variante dentro do produto (ex.: "preto", "tartaruga") */
  id: string;
  /** Nome exibido para o usuário */
  label: string;
  /** Cor da armação usada no material 3D (hex) */
  frameColor: string;
  /** Cor da lente usada no material 3D (hex) */
  lensColor: string;
  /** Metalness do material da armação (0-1) */
  metalness?: number;
  /** Roughness do material da armação (0-1) */
  roughness?: number;
};

export type Product = {
  slug: string;
  name: string;
  /** Categoria exibida (ex.: "Óculos de Grau", "Óculos de Sol") */
  category: string;
  description: string;
  /** Formato usado para escolher a geometria procedural enquanto não há GLB */
  shape: "cat-eye" | "redondo" | "quadrado" | "aviador";
  /** Caminho do modelo GLB otimizado, quando disponível */
  modelUrl?: string;
  /** Imagem estática usada como poster/fallback e thumbnail */
  poster: string;
  price?: number;
  variants: FrameVariant[];
  featured?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: "home" | "exam" | "delivery" | "adjust" | "support";
};

export type CompanyInfo = {
  name: string;
  tagline: string;
  whatsappNumber: string; // formato internacional sem símbolos, ex: "5511999999999"
  email: string;
  instagram?: string;
  serviceAreas: string[];
  hours: string;
};
