import type { Metadata } from "next";
import "./globals.css";

// Opcional: Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

// JSON-LD básico (Organization + Website)
function JsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coroaflores.vercel.app";
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Coroas & Homenagens",
    url: base,
    logo: `${base}/favicon.ico`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+55-41-99999-9999",
        contactType: "customer service",
        areaServed: "BR",
      },
    ],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: base,
    name: "Coroas & Homenagens",
  };

  return (
    <>
      <script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coroaflores.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Coroas de Flores com Entrega no Mesmo Dia | Coroas & Homenagens",
  description:
    "Coroas de flores com faixa personalizada e entrega no mesmo dia. Atendimento 24h pelo WhatsApp.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Coroas de Flores com Entrega no Mesmo Dia | Coroas & Homenagens",
    description:
      "Coroas de flores com faixa personalizada e entrega no mesmo dia. Atendimento 24h pelo WhatsApp.",
    url: SITE_URL,
    siteName: "Coroas & Homenagens",
    images: [
      {
        url: "/og-image.jpg", // coloque esse arquivo em /public (1200x630)
        width: 1200,
        height: 630,
        alt: "Coroa de flores – entrega no mesmo dia",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coroas de Flores com Entrega no Mesmo Dia | Coroas & Homenagens",
    description:
      "Coroas de flores com faixa personalizada e entrega no mesmo dia. Atendimento 24h pelo WhatsApp.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Opcional: mude a cor do tema do navegador no mobile
  themeColor: "#FAF8F5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#FAF8F5] text-[#5E5A57] antialiased">
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
