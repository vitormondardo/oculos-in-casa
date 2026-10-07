import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/brand/logo.jpg"
            alt="Óculos InCasa"
            width={56}
            height={56}
            className="mb-4 rounded-full"
          />
          <p className="text-sm text-muted">{company.tagline}</p>
        </div>

        <div className="text-sm text-muted">
          <h3 className="mb-3 font-semibold text-foreground">Atendimento</h3>
          <p>{company.hours}</p>
          <p>{company.serviceAreas.join(" · ")}</p>
        </div>

        <div className="text-sm text-muted">
          <h3 className="mb-3 font-semibold text-foreground">Navegação</h3>
          <ul className="space-y-2">
            <li><Link href="/produtos" className="transition-colors hover:text-accent-soft">Produtos</Link></li>
            <li><Link href="/servicos" className="transition-colors hover:text-accent-soft">Serviços</Link></li>
            <li><Link href="/sobre" className="transition-colors hover:text-accent-soft">Sobre</Link></li>
          </ul>
        </div>

        <div className="text-sm text-muted">
          <h3 className="mb-3 font-semibold text-foreground">Contato</h3>
          <ul className="space-y-2">
            <li>
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-soft">
                WhatsApp
              </a>
            </li>
            {company.instagram && (
              <li>
                <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-soft">
                  Instagram
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-accent-soft">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
