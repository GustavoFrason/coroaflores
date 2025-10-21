// components/local/LocalPage.tsx
"use client";
import { JsonLd } from "@/components/JsonLd";

type Props = {
  cidade: string;
  slug: string;              // ex: "coroas-de-flores-curitiba"
  tituloHero?: string;
  latitude?: number;
  longitude?: number;
  whatsapp?: string;         // "5541999043865" (somente dígitos)
  pontos?: string[];         // bullets locais
  mapaQuery?: string;        // ex: "Curitiba,+PR"
  hero?: React.ReactNode;    // opcional: seu <Hero ... />
  children?: React.ReactNode;// opcional: catálogo, etc.
};

export default function LocalPage({
  cidade,
  slug,
  tituloHero = `Coroas de Flores 24h em ${cidade}`,
  latitude,
  longitude,
  whatsapp = "5541999043865",
  pontos = [],
  mapaQuery,
  hero,
  children,
}: Props) {
  const url = `https://www.coroaflores24hrs.com.br/${slug}`;
  const msg = `Olá! Gostaria de encomendar uma coroa de flores para ${cidade}.`;
  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}&utm_source=organic&utm_medium=site&utm_campaign=${slug}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapaQuery || cidade
  )}&output=embed`;

  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Floricultura Larissa – Coroas de Flores 24h ${cidade}`,
    url,
    telephone: "+55-41-99904-3865",
    address: {
      "@type": "PostalAddress",
      addressLocality: cidade,
      addressRegion: "PR",
      addressCountry: "BR",
    },
    ...(latitude && longitude
      ? { geo: { "@type": "GeoCoordinates", latitude, longitude } }
      : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return (
    <main className="pb-20 md:pb-0">
      <JsonLd id={`ld-${slug}`} data={ld} />

      {hero ?? (
        <section className="bg-[#F4F1EE] py-10">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl font-semibold text-[#3F3B3A]">{tituloHero}</h1>
            <p className="mt-2 text-lg text-[#5E5A57]">
              Entrega imediata em todas as capelas e cemitérios de {cidade}. Atendimento 24h via WhatsApp.
            </p>
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 py-8 text-[#5E5A57] leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4">Entrega rápida em {cidade}</h2>
        <ul className="list-disc ml-6 mb-6">
          {pontos.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <a
          href={wa}
          className="inline-block bg-[#3F3B3A] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#5A534F] transition-all"
        >
          Peça pelo WhatsApp
        </a>

        <div className="my-8">
          <iframe
            src={mapSrc}
            width="100%"
            height="350"
            loading="lazy"
            className="rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* Blocos adicionais (catálogo, FAQ, CTA, etc.) */}
      {children}
    </main>
  );
}