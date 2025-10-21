// app/page.tsx
import CutoffBanner from "@/components/common/CutoffBanner";
import Hero from "@/components/sections/Hero";
import QuickOrder from "@/components/sections/QuickOrder";
import About from "@/components/sections/About";
import Catalogo from "@/components/sections/Catalogo";
import ComoFunciona from "@/components/sections/ComoFunciona";
import Depoimentos from "@/components/sections/Depoimentos";
import Faq from "@/components/sections/Faq";
import CtaFinal from "@/components/sections/CtaFinal";
import Footer from "@/components/sections/Footer";
import WhatsFloatingButton from "@/components/common/WhatsFloatingButton";
import { JsonLd } from "@/components/JsonLd";

const BASE = "https://www.coroaflores24hrs.com.br";

export default function Page() {
  // JSON-LD principal (SEO local) — com NAP real e vínculo com a Organization (#org)
  const business = {
    "@context": "https://schema.org",
    "@type": "Florist",
    "@id": `${BASE}#lb-home`,
    name: "Floricultura Larissa – Coroas de Flores 24h Curitiba",
    url: BASE,
    image: `${BASE}/og-image.jpg`,
    logo: `${BASE}/favicon.ico`,
    telephone: "+55-41-99904-3865",
    priceRange: "R$",
    description:
      "Floricultura em Curitiba especializada em coroas de flores com entrega imediata. Atendimento 24 horas, inclusive finais de semana e feriados.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Rua Waldemar Loureiro Campos, 2940 (Em frente ao Cemitério, Boqueirão)",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      postalCode: "81670-360",
      addressCountry: "BR",
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
    areaServed: ["Curitiba", "São José dos Pinhais", "Colombo", "Boqueirão", "PR"],
    sameAs: [
      // adicione somente se forem reais (senão remova este array):
      // "https://instagram.com/SEU_PERFIL",
      // "https://facebook.com/SEU_PERFIL",
    ],
    parentOrganization: { "@id": `${BASE}#org` },
    // Opcional (quando tiver o link exato do Maps):
    // hasMap: "https://maps.google.com/?q=Rua+Waldemar+Loureiro+Campos,+2940,+Curitiba,+PR",
    // Opcional (se tiver as coordenadas exatas do nº 2940):
    // geo: { "@type": "GeoCoordinates", latitude: -25.5, longitude: -49.2 },
  };

  // (Opcional) Habilite este bloco somente se o conteúdo do <Faq /> corresponder a estas Q&A:
  // const faq = {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   mainEntity: [
  //     {
  //       "@type": "Question",
  //       name: "Qual o prazo de entrega?",
  //       acceptedAnswer: {
  //         "@type": "Answer",
  //         text: "Em Curitiba e região, a entrega ocorre em até 3 horas após confirmação do pedido.",
  //       },
  //     },
  //     {
  //       "@type": "Question",
  //       name: "A faixa é personalizada?",
  //       acceptedAnswer: {
  //         "@type": "Answer",
  //         text: "Sim. Personalizamos a faixa com até 40 caracteres.",
  //       },
  //     },
  //     {
  //       "@type": "Question",
  //       name: "Quais formas de pagamento?",
  //       acceptedAnswer: {
  //         "@type": "Answer",
  //         text: "Pix, cartão e link de pagamento. Atendemos 24 horas.",
  //       },
  //     },
  //   ],
  // };

  return (
    <main className="pb-20 md:pb-0">
      {/* Dados estruturados (SEO local) */}
      <JsonLd id="ld-local-home" data={business} />
      {/* Habilite somente se o conteúdo do componente <Faq /> refletir exatamente estas Q&A */}
      {/* <JsonLd id="ld-faq-home" data={faq} /> */}

      {/* Urgência / SLA */}
      <CutoffBanner cutoffHour={15} />

      {/* Acima da dobra */}
      <Hero />

      {/* Como funciona */}
      <ComoFunciona />

      {/* Conteúdo */}
      <About />
      <Catalogo />

      {/* Pedido rápido */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <QuickOrder />
      </div>

      <Depoimentos />
      <Faq />

      {/* Fechamento */}
      <CtaFinal />
      <Footer />

      {/* Ação rápida (flutuante) */}
      <WhatsFloatingButton />
    </main>
  );
}