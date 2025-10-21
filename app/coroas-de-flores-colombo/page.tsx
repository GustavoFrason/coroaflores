import type { Metadata } from "next";
import LocalPageFull from "@/components/local/LocalPageFull";

export const metadata: Metadata = {
  title: "Coroas de Flores 24h em Colombo | Floricultura Larissa",
  description:
    "Entrega imediata de coroas de flores em Colombo. Atendimento 24h via WhatsApp. Homenagens com sensibilidade, pontualidade e flores frescas.",
  alternates: {
    canonical: "https://www.coroaflores24hrs.com.br/coroas-de-flores-colombo",
  },
};

export default function Page() {
  return (
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
  );
}