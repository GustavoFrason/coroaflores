// app/coroas-de-flores-curitiba/page.tsx
import type { Metadata } from "next";
import LocalPageFull from "@/components/local/LocalPageFull";

export const metadata: Metadata = {
  title: "Coroas de Flores 24h em Curitiba | Floricultura Larissa",
  description:
    "Entrega imediata de coroas de flores em Curitiba e região metropolitana. Atendimento 24h pelo WhatsApp. Capelas: Vaticano, Santa Felicidade, Parque Iguaçu e mais.",
  alternates: { canonical: "https://www.coroaflores24hrs.com.br/coroas-de-flores-curitiba" },
};

export default function Page() {
  return (
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
  );
}