import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
// Se preferir usar o componente separado que você criou, pode importar:
// import { JsonLd } from "@/components/JsonLd";

const SITE_URL = "https://www.coroaflores24hrs.com.br";

/** JSON-LD com @graph (Organization + WebSite) e @id estáveis */
function BaseJsonLd() {
  const org = {
    "@type": "Organization",
    "@id": `${SITE_URL}#org`,
    name: "Floricultura Larissa",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
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
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: "Floricultura Larissa",
    publisher: { "@id": `${SITE_URL}#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const graph = { "@context": "https://schema.org", "@graph": [org, website] };

  return (
    <script
      id="ld-base"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

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
    // Se quiser ser explícito com Googlebot:
    // googleBot: {
    //   index: true,
    //   follow: true,
    //   "max-snippet": -1,
    //   "max-image-preview": "large",
    //   "max-video-preview": -1,
    // },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics 4 */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-WZPC41JTHE" />
        <Script id="ga4-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZPC41JTHE');
          `}
        </Script>

        {/* JSON-LD base */}
        <BaseJsonLd />
      </head>
      <body className="bg-[#FAF8F5] text-[#5E5A57] antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}