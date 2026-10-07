const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97]";

const variants = {
  primary: "bg-invert text-on-invert hover:opacity-90",
  outline: "border border-line-strong text-foreground hover:border-foreground hover:bg-foreground/10",
  teal: "bg-teal text-black hover:bg-teal/85",
  ghost: "text-muted hover:text-foreground",
};

export type ButtonVariant = keyof typeof variants;

/** Classes de botão para usar em <Link>, <a> ou <button>. */
export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}
