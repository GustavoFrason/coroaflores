// app/coroas-de-flores-colombo/page.tsx
import type { Metadata } from "next";
import LocalPageFull from "@/components/local/LocalPageFull";
import { JsonLd } from "@/components/JsonLd";

const BASE = "https://www.coroaflores24hrs.com.br";
const PAGE_URL = `${BASE}/coroas-de-flores-colombo`;

export const metadata: Metadata = {
  title: "Coroas de Flores 24h em Colombo | Floricultura Larissa",
  description:
    "Entrega imediata de coroas de flores em Colombo. Atendimento 24h via WhatsApp. Homenagens com sensibilidade, pontualidade e flores frescas.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Coroas de Flores 24h em Colombo | Floricultura Larissa",
    description:
      "Entrega rápida em Colombo com faixa personalizada e atendimento 24h via WhatsApp.",
    url: PAGE_URL,
    images: [{ url: `${BASE}/og-image.jpg`, width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "article",
    siteName: "Floricultura Larissa",
  },
};

// JSON-LD LocalBusiness (geo, área atendida, relação com a Organization raiz)
const localBusinessColombo = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${PAGE_URL}#lb`,
  name: "Coroas de Flores 24h em Colombo | Floricultura Larissa",
  url: PAGE_URL,
  image: `${BASE}/og-image.jpg`,
  telephone: "+55-41-99904-3865",
  areaServed: ["Colombo", "Região Metropolitana de Curitiba", "PR"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.2925,
    longitude: -49.2243,
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
const breadcrumbColombo = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: BASE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Coroas de Flores em Colombo",
      item: PAGE_URL,
    },
  ],
};

export default function Page() {
  return (
    <main>
      {/* JSON-LD específicos da página */}
      <JsonLd id="ld-colombo" data={localBusinessColombo} />
      <JsonLd id="ld-bc-colombo" data={breadcrumbColombo} />

      <LocalPageFull
        cidade="Colombo"
        slug="coroas-de-flores-colombo"
        latitude={-25.2925}
        longitude={-49.2243}
        heroBackground="/hero-colombo.webp"
        textoLocal="Entregamos coroas de flores em Colombo com agilidade e atenção aos detalhes. Trabalhamos 24 horas para atender pedidos com urgência, garantindo montagem de qualidade, faixa personalizada e entrega pontual. Atendemos todas as regiões do município e facilitamos o pagamento por Pix, cartão e link de pagamento."
        pontos={[
          "Entrega em até 3 horas",
          "Atendimento 24 horas pelo WhatsApp",
          "Flores frescas e faixa de homenagem personalizada",
        ]}
      />
    </main>
  );
}