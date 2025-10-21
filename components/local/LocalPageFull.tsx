// components/local/LocalPageFull.tsx
"use client";
import { JsonLd } from "@/components/JsonLd";
import Hero from "@/components/sections/Hero";
import Catalogo from "@/components/sections/Catalogo";
import Depoimentos from "@/components/sections/Depoimentos";
import Faq from "@/components/sections/Faq";
import CtaFinal from "@/components/sections/CtaFinal";
import Footer from "@/components/sections/Footer";
import WhatsFloatingButton from "@/components/common/WhatsFloatingButton";
import ComoFunciona from "@/components/sections/ComoFunciona";
import About from "@/components/sections/About";

type Props = {
  cidade: string;
  slug: string;                // ex.: "coroas-de-flores-curitiba"
  latitude?: number;
  longitude?: number;
  whatsapp?: string;           // "5541999043865"
  textoLocal?: string;         // parágrafo de 150–200 palavras
  pontos?: string[];           // bullets locais
  heroBackground?: string;     // opcional: imagem específica por cidade
};

export default function LocalPageFull({
  cidade,
  slug,
  latitude,
  longitude,
  whatsapp = "5541999043865",
  textoLocal,
  pontos = [],
  heroBackground,
}: Props) {
  const url = `https://www.coroaflores24hrs.com.br/${slug}`;
  const msg = `Olá! Gostaria de encomendar uma coroa de flores para ${cidade}.`;
  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}&utm_source=organic&utm_medium=site&utm_campaign=${slug}`;

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
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return (
    <main className="pb-20 md:pb-0">
      <JsonLd id={`ld-${slug}`} data={ld} />

      {/* Mesmo Hero da home, só mudando títulos */}
      <Hero
        title={`Coroas de Flores 24h em ${cidade}`}
        subtitle={`Entrega imediata em todas as capelas e cemitérios de ${cidade}. Atendimento 24h via WhatsApp.`}
        background={heroBackground}
      />

      <ComoFunciona />
      <About />
      <Catalogo />

      {/* Bloco local (conteúdo único + CTA) */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-[#5E5A57] leading-relaxed">
        {textoLocal && <p className="mb-4">{textoLocal}</p>}
        {pontos.length > 0 && (
          <ul className="list-disc ml-6 mb-6">
            {pontos.map((p) => <li key={p}>{p}</li>)}
          </ul>
        )}
        <a
          href={wa}
          className="inline-block bg-[#3F3B3A] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#5A534F] transition-all"
        >
          Peça pelo WhatsApp
        </a>
      </section>

      <Depoimentos />
      <Faq />
      <CtaFinal />
      <Footer />
      <WhatsFloatingButton />
    </main>
  );
}