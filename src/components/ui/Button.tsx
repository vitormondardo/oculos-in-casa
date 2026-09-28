import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const variants = {
  primary: "bg-white text-black hover:bg-white/85",
  outline: "border border-white/30 text-white hover:border-white hover:bg-white/10",
  ghost: "text-white/80 hover:text-white",
};

type Variant = keyof typeof variants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant };

export function LinkButton({ variant = "primary", className = "", ...props }: LinkButtonProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
