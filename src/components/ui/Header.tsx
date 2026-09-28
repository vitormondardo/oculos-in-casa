import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const navLinks = [
  { href: "/produtos", label: "Produtos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo.jpg"
            alt="Óculos InCasa"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="hidden text-sm font-semibold tracking-wide text-white sm:block">
            Óculos InCasa
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <WhatsAppButton className="hidden sm:inline-flex" />
      </div>
    </header>
  );
}
