"use client";

import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  produto?: string;
  servico?: string;
  className?: string;
  children?: ReactNode;
};

export function WhatsAppButton({ produto, servico, className = "", children }: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl({ produto, servico })}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#25D366]/20 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] " +
        className
      }
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.34-.5.05-1.02.24-3.42-.71-2.89-1.15-4.74-4.07-4.88-4.26-.14-.19-1.16-1.55-1.16-2.96 0-1.4.74-2.09 1-2.38.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.9.87 2.04.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.21.73-.85.92-1.14.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
      </svg>
      {children ?? "Falar no WhatsApp"}
    </a>
  );
}
