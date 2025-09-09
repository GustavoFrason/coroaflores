// components/sections/About.tsx
"use client";

import Image from "next/image";
import { BadgeCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATS_NUMBER } from "@/lib/constants";
import { withUtm } from "@/lib/utm";

export default function About() {
  const waHref = withUtm(
    `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(
      "Olá! Gostaria de fazer um pedido de coroa de flores. Pode me ajudar?"
    )}`,
    "about_cta"
  );

  return (
    <section id="about" className="bg-[#FAF8F5] text-[#5E5A57]">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Imagem com moldura */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute inset-0 rounded-[28px] md:rounded-[36px] border-[6px] border-[#E9E3DB] pointer-events-none" />
            <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm">
              <Image
                src="/coroa_1.png"
                alt="Profissional preparando uma coroa de flores"
                width={1120}
                height={1400}
                className="w-full h-auto object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* Texto */}
          <div>
            <p className="italic text-sm mb-2">Sobre nós</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#5E5A57]">
              Nossa missão é tornar a sua homenagem{" "}
              <span className="not-italic font-normal">respeitosa e bonita</span>
            </h2>

            <p className="mt-5 text-[#7D7875]">
              Somos um estúdio floral especializado em <strong>coroas de flores</strong>.
              Unimos sensibilidade e técnica para oferecer arranjos que confortam famílias e honram
              memórias, com <strong>entrega no mesmo dia</strong> e <strong>faixa personalizada</strong>.
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 mt-0.5" />
                Entrega coordenada diretamente no local do velório/cerimônia.
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 mt-0.5" />
                Mensagens de faixa sugeridas ou personalizadas (até 60 caracteres).
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 mt-0.5" />
                Atendimento humano 24 horas, todos os dias.
              </li>
            </ul>

            {/* Mini-box de destaque + CTA */}
            <div className="mt-8 rounded-xl border bg-white p-5">
              <div className="font-semibold text-[#5E5A57]">
                Coroas a partir de R$ 249,90
              </div>
              <p className="text-sm text-[#7D7875] mt-1">
                Fale pelo WhatsApp para confirmação rápida de <em>modelo</em>, <em>faixa</em> e{" "}
                <em>entrega</em>.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  className="bg-[#2E4A3B] hover:bg-[#315F4F]"
                  asChild
                >
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Falar com atendente no WhatsApp"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Falar no WhatsApp agora
                  </a>
                </Button>

                <Button variant="outline" asChild>
                  <a href="#catalogo" aria-label="Ver modelos de coroas">
                    Ver modelos
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
