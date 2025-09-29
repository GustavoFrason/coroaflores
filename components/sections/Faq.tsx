"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { withUtm } from "@/lib/utm";
import { WHATS_NUMBER } from "@/lib/constants";
import Script from "next/script";
import FrasesFaixa from "@/components/common/FrasesFaixa";
import { FRASES_FAIXA } from "@/lib/frases";

const QA = [
  {
    q: "Vocês entregam no mesmo dia?",
    a: "Sim. Entrega será realiza em até 3 horas após a confirmação do pedido.",
  },
  {
    q: "Como funciona a faixa personalizada?",
    a: "Você pode escrever a mensagem que preferir (recomendamos até 60 caracteres). Abaixo listamos algumas sugestões que você pode copiar com um clique.",
    // flag para renderizar as frases no conteúdo
    showPhrases: true,
  },
  {
    q: "Quais informações preciso para entregar no velório?",
    a: "Nome completo do(a) homenageado(a), local (capela/cemitério/hospital), sala e horário. Se não tiver tudo agora, podemos confirmar com você no WhatsApp.",
  },
  {
    q: "Quais são os tamanhos das coroas?",
    a: "Trabalhamos com P (45–55cm), M (60–70cm) e G (80–90cm) de diâmetro aproximado. O volume de flores varia conforme o modelo.",
  },
  {
    q: "Posso escolher as cores das flores?",
    a: "Claro. Temos opções clássicas (branco/verde) e combinações com toques de rosa, amarelo e lilás. Podemos adaptar conforme a disponibilidade do dia.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "PIX (compensa na hora), cartão de crédito/débito e link de pagamento. Assim que confirmado, já encaminhamos para produção e logística.",
  },
  {
    q: "Vocês enviam foto da coroa pronta?",
    a: "Sim. Sempre que possível enviamos uma foto antes da saída para entrega ou após a entrega, conforme o tempo do pedido.",
  },
  {
    q: "Atendem quais regiões?",
    a: "Atendemos toda a região metropolitana (capelas, cemitérios e hospitais). Consulte nossa disponibilidade para o endereço específico no WhatsApp.",
  },
];

export default function Faq() {
  const wa = withUtm(
    `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(
      "Olá! Tenho uma dúvida sobre as coroas de flores."
    )}`,
    "faq_cta"
  );

  // JSON-LD de FAQ (texto puro; para a pergunta de faixa, adicionamos exemplos no texto)
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QA.map(({ q, a, showPhrases }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: showPhrases ? `${a} Exemplos: ${FRASES_FAIXA.slice(0, 3).join(" · ")}.` : a,
      },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-12 scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-2">Dúvidas frequentes</h2>
      <p className="text-sm text-[#4B5563] mb-6">
        Se preferir, fale direto com nossa equipe — respondemos em poucos minutos.
      </p>

      <Accordion type="single" collapsible className="w-full">
        {QA.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
            <AccordionContent className="text-[#4B5563]">
              <p>{item.a}</p>
              {item.showPhrases && (
                <>
                  <FrasesFaixa className="mt-3" />
                  <p className="mt-2 text-xs text-[#7D7875]">
                    Toque em uma sugestão para copiar o texto e colar no pedido.
                  </p>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6">
        <Button className="bg-[#2E4A3B] hover:bg-[#315F4F]" asChild>
          <a href={wa} target="_blank" rel="noopener noreferrer">
            Falar com o atendimento via WhatsApp
          </a>
        </Button>
      </div>

      {/* JSON-LD para rich results (SEO) */}
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </section>
  );
}
