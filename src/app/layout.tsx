import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SceneRoot } from "@/components/three/SceneRoot";
import { MotionProvider } from "@/components/MotionProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { company } from "@/content/company";
import { opticianJsonLd, siteUrl } from "@/lib/seo";

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

// Fraunces: serifa de contraste com eixos "opsz/SOFT/WONK" — dá o tom editorial.
const display = Fraunces({
  variable: "--font-display-src",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — Ótica com atendimento domiciliar`,
    template: `%s | ${company.name}`,
  },
  description:
    "Exame de vista, prova de armações, ajustes e entrega — tudo no conforto da sua casa. Conheça o catálogo em 3D da Óculos InCasa.",
  openGraph: {
    title: `${company.name} — Ótica com atendimento domiciliar`,
    description: company.tagline,
    url: siteUrl,
    siteName: company.name,
    images: ["/brand/logo.jpg"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="relative isolate flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(opticianJsonLd()) }}
        />
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-invert px-4 py-2 text-sm font-semibold text-on-invert focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <SmoothScrollProvider>
            <GradientBackground />
            <SceneRoot />
            <Header />
            <main id="conteudo" className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
