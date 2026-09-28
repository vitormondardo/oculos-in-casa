import { create } from "zustand";

export type SectionId =
  | "hero"
  | "product"
  | "lenses"
  | "services"
  | "how-it-works"
  | "cta";

type SceneState = {
  /** Seção atualmente "ativa" (mais próxima do centro da viewport) */
  activeSection: SectionId;
  /** Progresso 0..1 dentro da transição da seção ativa para a próxima */
  progress: number;
  /** Qualidade renderizada, ajustada dinamicamente por PerformanceMonitor */
  quality: "high" | "medium" | "low";
  /** true quando o usuário pediu movimento reduzido (prefers-reduced-motion) */
  reducedMotion: boolean;
  setScroll: (section: SectionId, progress: number) => void;
  setQuality: (quality: SceneState["quality"]) => void;
  setReducedMotion: (value: boolean) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  activeSection: "hero",
  progress: 0,
  quality: "high",
  reducedMotion: false,
  setScroll: (section, progress) => set({ activeSection: section, progress }),
  setQuality: (quality) => set({ quality }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}));
