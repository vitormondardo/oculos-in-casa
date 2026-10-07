import type { ReactNode } from "react";

type KickerProps = {
  /** Número da seção/matéria, no estilo de índice de revista (ex.: "01"). */
  n?: string;
  children: ReactNode;
  className?: string;
};

/** Sobretítulo editorial: número em itálico + filete + rótulo em caixa-alta. */
export function Kicker({ n, children, className = "" }: KickerProps) {
  return (
    <p
      className={`flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-kicker ${className}`}
    >
      {n && <span className="font-display text-lg font-normal normal-case italic tracking-normal">{n}</span>}
      <span aria-hidden className="h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  );
}
