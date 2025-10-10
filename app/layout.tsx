import type { Metadata, Viewport } from "next";
import "./globals.css";

// Opcional: Vercel Analytics
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script"; // 👈 GA4

// JSON-LD básico (Organization + Website)
function JsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coroaflores24hrs.com.br";
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Floricultura Larissa",
    url: base,
    logo: `${base}/favicon.ico`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+55-41-99904-3865",
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coroaflores24hrs.com.br";

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
};

// ✅ Next 15: themeColor vai no viewport
export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  // opcional:
  // colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics 4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WZPC41JTHE"
        />
        <Script id="ga4-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZPC41JTHE');
          `}
        </Script>
      </head>
      <body className="bg-[#FAF8F5] text-[#5E5A57] antialiased">
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}