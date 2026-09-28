import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <Image
            src="/brand/logo.jpg"
            alt="Óculos InCasa"
            width={56}
            height={56}
            className="mb-4 rounded-full"
          />
          <p className="text-sm text-white/60">{company.tagline}</p>
        </div>

        <div className="text-sm text-white/60">
          <h3 className="mb-3 font-semibold text-white">Atendimento</h3>
          <p>{company.hours}</p>
          <p>{company.serviceAreas.join(" · ")}</p>
          <p className="mt-2">{company.email}</p>
        </div>

        <div className="text-sm text-white/60">
          <h3 className="mb-3 font-semibold text-white">Navegação</h3>
          <ul className="space-y-2">
            <li><Link href="/produtos" className="hover:text-white">Produtos</Link></li>
            <li><Link href="/servicos" className="hover:text-white">Serviços</Link></li>
            <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
