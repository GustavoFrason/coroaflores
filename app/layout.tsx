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
    name: "Floricultura Larissa",
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
    name: "Floricultura Larissa",
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
  title: {
    default: "Floricultura Larissa",
    template: "%s | Floricultura Larissa",
  },
  description:
    "Coroas de flores com faixa personalizada e entrega no mesmo dia. Atendimento 24h pelo WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Coroas de Flores com Entrega no Mesmo Dia | Floricultura Larissa",
    description:
      "Coroas de flores com faixa personalizada e entrega no mesmo dia. Atendimento 24h pelo WhatsApp.",
    url: "/",
    siteName: "Floricultura Larissa",
    images: [
      {
        url: "/og-image.jpg", // /public/og-image.jpg (1200x630)
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
    title: "Coroas de Flores com Entrega no Mesmo Dia | Floricultura Larissa",
    description:
      "Coroas de flores com faixa personalizada e entrega no mesmo dia. Atendimento 24h pelo WhatsApp.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }], // /public/apple-touch-icon.png (180x180)
    shortcut: ["/favicon.ico"],
  },
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
