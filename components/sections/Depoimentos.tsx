// components/sections/Depoimentos.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, UserRound } from "lucide-react";

type Testimonial = {
  nome: string;
  cidade?: string;
  texto: string;
  avatar?: string; // manter opcional, mas não usar para forçar avatar padrão
};

const ITEMS: Testimonial[] = [
  { nome: "Karin Peterson", cidade: "Curitiba (Centro)", texto: "Atendimento ágil e respeitoso. A coroa chegou no horário e a faixa ficou exatamente como pedi." },
  { nome: "Marcos Andrade", cidade: "São José dos Pinhais", texto: "Precisávamos com urgência e deu tudo certo. Processo simples no WhatsApp e entrega rápida." },
  { nome: "Ana Luiza", cidade: "Colombo", texto: "Em um momento difícil, foram muito atenciosos. A coroa estava linda e a mensagem veio certinha." },

  // Curitiba — novos depoimentos
  { nome: "Paula R.", cidade: "Curitiba (Batel)", texto: "Muito cuidadosos. A coroa ficou elegante e chegou antes da cerimônia." },
  { nome: "Felipe S.", cidade: "Curitiba (Água Verde)", texto: "Preço justo e comunicação clara. Recomendo sem medo." },
  { nome: "Camila M.", cidade: "Curitiba (Bacacheri)", texto: "A faixa personalizada ficou impecável. Entrega no horário, sem imprevistos." },
  { nome: "Leonardo T.", cidade: "Curitiba (Boa Vista)", texto: "Foram sensíveis e rápidos. Deu tudo certo no envio para a capela." },
  { nome: "Simone A.", cidade: "Curitiba (Jardim das Américas)", texto: "Atendimento humano, tiraram minhas dúvidas e cuidaram de tudo com carinho." },
  { nome: "Ricardo P.", cidade: "Curitiba (Santa Cândida)", texto: "Chegou no prazo combinado e a qualidade surpreendeu." },
  { nome: "Natália G.", cidade: "Curitiba (Portão)", texto: "Processo simples, pagamento fácil e mensagem ficou do jeito que pedi." },
  { nome: "Juliana K.", cidade: "Curitiba (Centro Cívico)", texto: "Organização e respeito. A coroa estava linda." },
  { nome: "Bruno H.", cidade: "Curitiba (Rebouças)", texto: "Atendimento rápido pelo WhatsApp e entrega pontual." },
  { nome: "Roberta F.", cidade: "Curitiba (Cabral)", texto: "Capricho nos detalhes e ótimo custo-benefício." },
  { nome: "Daniel V.", cidade: "Curitiba (Hauer)", texto: "Chegou dentro do período prometido e a montagem estava perfeita." },
  { nome: "Mariana L.", cidade: "Curitiba (Boqueirão)", texto: "Foram muito solícitos e ajustaram a frase como queríamos." },
  { nome: "Thiago C.", cidade: "Curitiba (Cristo Rei)", texto: "Tudo conforme combinado; recomendo pela agilidade e respeito." },
  { nome: "Fernanda B.", cidade: "Curitiba (Seminário)", texto: "Atendimento atencioso e flores de ótima qualidade." },
  { nome: "Gustavo M.", cidade: "Curitiba (Santa Felicidade)", texto: "Entrega rápida direto na igreja; serviço impecável." },
  { nome: "Patrícia D.", cidade: "Curitiba (Mercês)", texto: "Ajudaram com a frase e ficou muito bonita. Obrigada pelo cuidado." },
  { nome: "Eduardo J.", cidade: "Curitiba (Ahú)", texto: "Facilidade no pedido e comprometimento com o horário." },

  // Região metropolitana (extras curtos)
  { nome: "Rafaela N.", cidade: "Pinhais", texto: "Pontuais e cuidadosos, recomendo." },
  { nome: "Sueli F.", cidade: "Araucária", texto: "Equipe atenciosa e resultado muito bonito." },
  { nome: "Rogério P.", cidade: "Campo Largo", texto: "Entrega no local certinho e coroa caprichada." }
];


export default function Depoimentos() {
  const [idx, setIdx] = useState(0);
  const t = ITEMS[idx];

  const prev = () => setIdx((i) => (i === 0 ? ITEMS.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === ITEMS.length - 1 ? 0 : i + 1));
  const go = (i: number) => setIdx(i);

  return (
    <section className="bg-[#FAF8F5] text-[#5E5A57]">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center relative">
        {/* Título */}
        <p className="italic text-sm mb-2">Depoimentos</p>
        <h2 className="font-serif text-3xl md:text-4xl font-light">
          O que dizem sobre nós
        </h2>
        <div className="mx-auto mt-3 mb-6 h-px w-12 bg-[#E9E3DB]" />
        <p className="text-sm text-[#7D7875] mb-8">
          Ficamos felizes em poder ajudar tantas pessoas.
        </p>

        <AvatarCircle alt={t.nome} />

        <div className="font-medium">
          {t.nome}
          {t.cidade ? (
            <span className="text-[#7D7875]"> • {t.cidade}</span>
          ) : null}
        </div>

        <blockquote className="mx-auto mt-4 max-w-2xl px-2 text-[18px] md:text-[20px] italic leading-relaxed text-[#6E6966]">
          “{t.texto}”
        </blockquote>

        {/* Navegação (bolinhas) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Ir para depoimento ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === idx ? "bg-[#5E5A57]" : "bg-[#D9D3CA]"
              }`}
            />
          ))}
        </div>

        {/* Setas */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-[#8B867F] hover:text-[#5E5A57]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          aria-label="Próximo"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#8B867F] hover:text-[#5E5A57]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}

/** Avatar fixo com fallback para ícone padrão (não passa src para garantir o ícone). */
function AvatarCircle({ src, alt }: { src?: string; alt: string }) {
  const useImg = Boolean(src); // ficará falso por padrão

  return (
    <div className="mx-auto mb-6 inline-block relative">
      {/* bolha bege */}
      <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-[#E9E3DB]" />
      {/* anel */}
      <span className="absolute inset-0 rounded-full border-2 border-[#E9E3DB] translate-x-1 translate-y-1" />
      <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-white shadow-sm grid place-items-center bg-white">
        {useImg && src ? (
          <Image src={src} alt={alt} fill className="object-cover" priority />
        ) : (
          <UserRound className="h-10 w-10 text-[#8B867F]" aria-hidden />
        )}
      </div>
    </div>
  );
}
