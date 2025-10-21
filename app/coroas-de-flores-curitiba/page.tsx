// app/coroas-de-flores-curitiba/page.tsx
import type { Metadata } from "next";
import LocalPageFull from "@/components/local/LocalPageFull";
import { JsonLd } from "@/components/JsonLd"; // 👈 usa seu componente

const BASE = "https://www.coroaflores24hrs.com.br";

export const metadata: Metadata = {
  title: "Coroas de Flores 24h em Curitiba | Floricultura Larissa",
  description:
    "Entrega imediata de coroas de flores em Curitiba e região metropolitana. Atendimento 24h pelo WhatsApp. Capelas: Vaticano, Santa Felicidade, Parque Iguaçu e mais.",
  alternates: { canonical: `${BASE}/coroas-de-flores-curitiba` },
  openGraph: {
    title: "Coroas de Flores 24h em Curitiba | Floricultura Larissa",
    description:
      "Entrega imediata em capelas e cemitérios de Curitiba. Atendimento 24h via WhatsApp.",
    url: `${BASE}/coroas-de-flores-curitiba`,
    images: [{ url: `${BASE}/og-image.jpg`, width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "article",
  },
};

// JSON-LD LocalBusiness (com geo, área atendida e parentOrganization)
const localBusinessCuritiba = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE}/coroas-de-flores-curitiba#lb`,
  name: "Coroas de Flores 24h em Curitiba | Floricultura Larissa",
  url: `${BASE}/coroas-de-flores-curitiba`,
  image: `${BASE}/og-image.jpg`,
  telephone: "+55-41-99904-3865",
  areaServed: ["Curitiba", "Região Metropolitana de Curitiba", "PR"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.4284,
    longitude: -49.2733,
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
  // se quiser, liste capelas/cemitérios em makesOffer (opcional)
  parentOrganization: { "@id": `${BASE}#org` },
};

// JSON-LD Breadcrumb
const breadcrumbCuritiba = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: BASE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Coroas de Flores em Curitiba",
      item: `${BASE}/coroas-de-flores-curitiba`,
    },
  ],
};

export default function Page() {
  return (
    <main>
      {/* JSON-LD específicos da página */}
      <JsonLd id="ld-curitiba" data={localBusinessCuritiba} />
      <JsonLd id="ld-bc-curitiba" data={breadcrumbCuritiba} />

      <LocalPageFull
        cidade="Curitiba"
        slug="coroas-de-flores-curitiba"
        latitude={-25.4284}
        longitude={-49.2733}
        heroBackground="/hero-curitiba.webp"
        textoLocal="Entregamos coroas de flores em todas as capelas e cemitérios de Curitiba, com preparo cuidadoso, faixa personalizada e respeito ao momento. Nossa equipe atua 24 horas para atender solicitações com urgência, garantindo montagem rápida e entrega pontual. Realizamos entregas em locais como Capela Vaticano, Santa Felicidade e Parque Iguaçu, além de bairros da região metropolitana. Oferecemos pagamento via Pix, cartão ou link de pagamento para facilitar sua experiência."
        pontos={[
          "Entrega em até 3 horas",
          "Atendimento 24 horas, inclusive feriados",
          "Pagamento via Pix, cartão ou link seguro",
        ]}
      />
    </main>
  );
}