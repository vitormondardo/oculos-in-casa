"use client";

import { useEffect, type ReactNode } from "react";
import { initSmoothScroll } from "@/lib/scroll/lenis";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return <>{children}</>;
}
