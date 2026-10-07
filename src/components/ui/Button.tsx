const base =
  "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px";

const variants = {
  primary: "border-invert bg-invert text-on-invert hover:bg-transparent hover:text-invert",
  outline: "border-line-strong text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  teal: "border-teal bg-teal text-black hover:bg-transparent hover:text-teal",
  ghost: "border-transparent text-muted hover:text-foreground",
};

export type ButtonVariant = keyof typeof variants;

/** Classes de botão para usar em <Link>, <a> ou <button>. */
export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}
