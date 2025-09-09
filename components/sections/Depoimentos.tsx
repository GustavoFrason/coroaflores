// components/sections/Depoimentos.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, UserRound } from "lucide-react";

type Testimonial = {
  nome: string;
  cidade?: string;
  texto: string;
  avatar?: string; // opcional
};

const ITEMS: Testimonial[] = [
  {
    nome: "Karin Peterson",
    cidade: "Curitiba",
    texto:
      "As coroas de flores são elegantes, delicadas e chegam sempre no horário. O atendimento também é ótimo.",
    avatar: "/coroa_1.png",
  },
  {
    nome: "Marcos Andrade",
    cidade: "São José dos Pinhais",
    texto:
      "Precisávamos de urgência e foram impecáveis. A faixa personalizada ficou perfeita. Recomendo.",
    // avatar ausente -> usa ícone padrão
  },
  {
    nome: "Ana Luiza",
    cidade: "Colombo",
    texto:
      "Atendimento humano em um momento difícil. Entrega rápida e coroa muito bonita, exatamente como combinado.",
    avatar: "/avatar-3.jpg",
  },
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
        <h2 className="font-serif text-3xl md:text-4xl font-light">O que dizem sobre nós</h2>
        <div className="mx-auto mt-3 mb-6 h-px w-12 bg-[#E9E3DB]" />
        <p className="text-sm text-[#7D7875] mb-8">
          Ficamos felizes em poder ajudar tantas pessoas.
        </p>

        <AvatarCircle src={t.avatar} alt={t.nome} />

        <div className="font-medium">{t.nome}</div>

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

/** Avatar com fallback para ícone moderno quando não houver/falhar a imagem. */
function AvatarCircle({ src, alt }: { src?: string; alt: string }) {
  const [useImg, setUseImg] = useState(Boolean(src));

  return (
    <div className="mx-auto mb-6 inline-block relative">
      {/* bolha bege */}
      <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-[#E9E3DB]" />
      {/* anel */}
      <span className="absolute inset-0 rounded-full border-2 border-[#E9E3DB] translate-x-1 translate-y-1" />
      <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-white shadow-sm grid place-items-center bg-white">
        {useImg && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setUseImg(false)} // fallback se 404 ou inválida
            priority
          />
        ) : (
          <UserRound className="h-10 w-10 text-[#8B867F]" aria-hidden />
        )}
      </div>
    </div>
  );
}
