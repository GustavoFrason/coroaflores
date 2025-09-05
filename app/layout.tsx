import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coroas de Flores com Entrega no Mesmo Dia | Coroas & Homenagens",
  description:
    "Coroas de flores com faixa personalizada e entrega no mesmo dia. Atendimento 24h pelo WhatsApp.",
  alternates: { canonical: "https://www.seusite.com.br" },
  openGraph: {
    title: "Coroas de Flores com Entrega no Mesmo Dia | Coroas & Homenagens",
    description:
      "Coroas de flores com faixa personalizada e entrega no mesmo dia. Atendimento 24h pelo WhatsApp.",
    url: "https://www.seusite.com.br",
    siteName: "Coroas & Homenagens",
    images: [
      {
        url: "/placeholder-coroa-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Coroa de flores branca com verdes",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#F8F9FA] text-[#1F2937]">{children}</body>
    </html>
  );
}
