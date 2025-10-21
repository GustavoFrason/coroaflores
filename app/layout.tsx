import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script"; // GA4

// JSON-LD básico (Organization + Website)
function JsonLd() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coroaflores24hrs.com.br";

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
    sameAs: [
      // "https://www.instagram.com/SEU_PERFIL",
      // "https://www.facebook.com/SEU_PERFIL",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: base,
    name: "Floricultura Larissa",
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coroaflores24hrs.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Coroas de Flores 24h em Curitiba | Floricultura Larissa",
    template: "%s | Coroas de Flores 24h Curitiba",
  },
  description:
    "Coroas de flores com faixa personalizada e entrega imediata em Curitiba e região metropolitana. Atendimento 24h pelo WhatsApp.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Coroas de Flores 24h em Curitiba | Floricultura Larissa",
    description:
      "Entrega imediata de coroas de flores em Curitiba. Atendimento 24h via WhatsApp.",
    url: SITE_URL,
    siteName: "Floricultura Larissa",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Coroa de flores – entrega no mesmo dia em Curitiba",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coroas de Flores 24h em Curitiba",
    description: "Entrega imediata e atendimento 24h. Peça pelo WhatsApp.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  // colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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