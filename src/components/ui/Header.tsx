"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { duration, ease } from "@/lib/motion";

const navLinks = [
  { href: "/produtos", label: "Produtos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Páginas inteiras em tema claro: o header (texto branco) precisa de fundo escuro
  const onLightPage = pathname === "/sobre";

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: duration.base, ease }}
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open || onLightPage
          ? "border-white/10 bg-black/85"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="font-display text-xl leading-none tracking-tight text-white">
            Óculos <span className="italic text-accent-soft">InCasa</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="relative px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white aria-[current=page]:text-white"
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-4 -bottom-0.5 h-px bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton className="hidden sm:inline-flex">Agendar</WhatsAppButton>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center text-white transition-colors hover:bg-white/10 md:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 pb-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center border-t border-white/10 px-1 font-display text-3xl italic text-white/90 hover:text-accent-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <WhatsAppButton className="w-full">Agendar atendimento</WhatsAppButton>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
