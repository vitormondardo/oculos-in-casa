import type { ReactNode } from "react";
import { company } from "@/content/company";
import { buttonClass } from "@/components/ui/Button";

type InstagramButtonProps = {
  className?: string;
  children?: ReactNode;
};

/** Link para o perfil do Instagram da empresa (@oculosincasa). */
export function InstagramButton({ className = "", children }: InstagramButtonProps) {
  if (!company.instagram) return null;

  return (
    <a
      href={company.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass("outline", className)}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      {children ?? "@oculosincasa"}
    </a>
  );
}
