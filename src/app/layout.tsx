import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SceneRoot } from "@/components/three/SceneRoot";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { company } from "@/content/company";
import { opticianJsonLd, siteUrl } from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="pt-BR" className={`${poppins.variable} h-full antialiased`}>
      <body className="relative isolate flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(opticianJsonLd()) }}
        />
        <SmoothScrollProvider>
          <SceneRoot />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
