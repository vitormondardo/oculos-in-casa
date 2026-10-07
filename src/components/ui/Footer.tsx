import Link from "next/link";
import { company } from "@/content/company";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const linkClass = "transition-colors hover:text-accent-soft";
const headingClass = "mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-foreground";

export function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-20">
        <p className="font-display text-[clamp(3.5rem,14vw,11rem)] leading-[0.85] tracking-[-0.045em] text-foreground">
          Óculos
          <br />
          <span className="italic text-accent-soft">InCasa</span>
        </p>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-sm text-muted">
            <h3 className={headingClass}>Editorial</h3>
            <p className="max-w-[16rem]">{company.tagline}</p>
          </div>

          <div className="text-sm text-muted">
            <h3 className={headingClass}>Atendimento</h3>
            <p>{company.hours}</p>
            <p>{company.serviceAreas.join(" · ")}</p>
          </div>

          <div className="text-sm text-muted">
            <h3 className={headingClass}>Índice</h3>
            <ul className="space-y-2">
              <li><Link href="/produtos" className={linkClass}>Produtos</Link></li>
              <li><Link href="/servicos" className={linkClass}>Serviços</Link></li>
              <li><Link href="/sobre" className={linkClass}>Sobre</Link></li>
            </ul>
          </div>

          <div className="text-sm text-muted">
            <h3 className={headingClass}>Contato</h3>
            <ul className="space-y-2">
              <li>
                <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
              {company.instagram && (
                <li>
                  <a href={company.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Instagram
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${company.email}`} className={linkClass}>
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
