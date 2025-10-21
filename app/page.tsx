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

export default function Page() {
  // 🔹 Dados estruturados para SEO local
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Floricultura Larissa – Coroas de Flores 24h Curitiba",
    url: "https://www.coroaflores24hrs.com.br",
    image: "https://www.coroaflores24hrs.com.br/og-image.jpg",
    logo: "https://www.coroaflores24hrs.com.br/favicon.ico",
    telephone: "+55-41-99904-3865",
    priceRange: "R$",
    description:
      "Floricultura em Curitiba especializada em coroas de flores com entrega imediata. Atendimento 24 horas, inclusive finais de semana e feriados.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Exemplo, 123",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      postalCode: "80000-000",
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
    areaServed: [
      { "@type": "City", name: "Curitiba" },
      { "@type": "City", name: "São José dos Pinhais" },
      { "@type": "City", name: "Colombo" },
    ],
    sameAs: [
      "https://instagram.com/SEU_PERFIL",
      "https://facebook.com/SEU_PERFIL",
    ],
  };

  return (
    <main className="pb-20 md:pb-0">
      {/* Dados estruturados */}
      <JsonLd id="ld-local" data={business} />

      {/* Urgência / SLA */}
      <CutoffBanner cutoffHour={15} />

      {/* Acima da dobra */}
      <Hero />

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

      {/* Ação rápida */}
      <WhatsFloatingButton />
    </main>
  );
}