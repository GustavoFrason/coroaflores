// app/coroas-de-flores-sao-jose-dos-pinhais/page.tsx
import type { Metadata } from "next";
import LocalPageFull from "@/components/local/LocalPageFull";
import { JsonLd } from "@/components/JsonLd";

const BASE = "https://www.coroaflores24hrs.com.br";
const PAGE_URL = `${BASE}/coroas-de-flores-sao-jose-dos-pinhais`;

export const metadata: Metadata = {
  title: "Coroas de Flores 24h em São José dos Pinhais | Floricultura Larissa",
  description:
    "Entrega imediata de coroas de flores em São José dos Pinhais. Atendimento 24h via WhatsApp. Montagem com flores frescas e faixa personalizada.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Coroas de Flores 24h em São José dos Pinhais | Floricultura Larissa",
    description:
      "Entrega rápida de coroas em capelas e cemitérios de São José dos Pinhais. Atendimento 24h via WhatsApp.",
    url: PAGE_URL,
    images: [{ url: `${BASE}/og-image.jpg`, width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "article",
    siteName: "Floricultura Larissa",
  },
};

// JSON-LD LocalBusiness (geo, área atendida e relação com a Organization raiz)
const localBusinessSJP = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${PAGE_URL}#lb`,
  name: "Coroas de Flores 24h em São José dos Pinhais | Floricultura Larissa",
  url: PAGE_URL,
  image: `${BASE}/og-image.jpg`,
  telephone: "+55-41-99904-3865",
  areaServed: ["São José dos Pinhais", "Região Metropolitana de Curitiba", "PR"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "São José dos Pinhais",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.5312,
    longitude: -49.2031,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  parentOrganization: { "@id": `${BASE}#org` },
};

// JSON-LD Breadcrumb (trilha de navegação)
const breadcrumbSJP = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: BASE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Coroas de Flores em São José dos Pinhais",
      item: PAGE_URL,
    },
  ],
};

export default function Page() {
  return (
    <main>
      {/* JSON-LD específicos da página */}
      <JsonLd id="ld-sjp" data={localBusinessSJP} />
      <JsonLd id="ld-bc-sjp" data={breadcrumbSJP} />

      <LocalPageFull
        cidade="São José dos Pinhais"
        slug="coroas-de-flores-sao-jose-dos-pinhais"
        latitude={-25.5312}
        longitude={-49.2031}
        heroBackground="/hero-sjp.webp"
        textoLocal="Realizamos entrega rápida de coroas de flores em São José dos Pinhais com atendimento 24 horas. Nossa equipe prepara a homenagem com flores frescas e faixa personalizada, priorizando pontualidade e respeito. Atendemos capelas e cemitérios da região, com opções de pagamento por Pix, cartão e link de pagamento, para agilizar o processo em momentos de urgência."
        pontos={[
          "Entrega em até 3 horas",
          "Atendimento 24 horas, inclusive feriados",
          "Faixa personalizada e montagem expressa",
        ]}
      />
    </main>
  );
}