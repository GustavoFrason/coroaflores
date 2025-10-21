import type { Metadata } from "next";
import LocalPageFull from "@/components/local/LocalPageFull";

export const metadata: Metadata = {
  title: "Coroas de Flores 24h em São José dos Pinhais | Floricultura Larissa",
  description:
    "Entrega imediata de coroas de flores em São José dos Pinhais. Atendimento 24h via WhatsApp. Montagem com flores frescas e faixa personalizada.",
  alternates: {
    canonical:
      "https://www.coroaflores24hrs.com.br/coroas-de-flores-sao-jose-dos-pinhais",
  },
};

export default function Page() {
  return (
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
  );
}