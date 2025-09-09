"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, ShieldCheck, Clock } from "lucide-react";
import { WHATS_NUMBER } from "@/lib/constants";
import { withUtm } from "@/lib/utm";

export default function Hero() {
  const waHero = withUtm(
    `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(
      "Olá! Quero fazer um pedido de coroa de flores."
    )}`,
    "hero_cta"
  );

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] text-[#5E5A57]">
      {/* Header */}
      <header className="w-full border-b bg-[#FAF8F5]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="font-serif text-lg">Coroas & Homenagens</div>

          {/* Menu simples */}
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-black">Sobre</a>
            <a href="#catalogo" className="hover:text-black">Coroas</a>
            <a href="#depoimentos" className="hover:text-black">Depoimentos</a>
            <a href="#faq" className="hover:text-black">Dúvidas</a>
            <a href="#contato" className="hover:text-black">Contato</a>
          </nav>

          {/* Telefone */}
          <div className="text-sm">
            Ligue:{" "}
            <a href="tel:+5541999999999" className="font-semibold hover:underline" aria-label="Ligar para +55 41 99999-9999">
              +55 (41) 99999-9999
            </a>
          </div>
        </div>
      </header>

      {/* Hero principal */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div>
          <p className="italic text-sm mb-2">Coroas de Flores</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light leading-tight">
            Homenagens florais para qualquer ocasião
          </h1>
          <p className="mt-4 text-lg text-[#7D7875]">
            Elegância e respeito em cada detalhe. <strong>Entrega no mesmo dia</strong>.
          </p>

          {/* Chips de confiança */}
          <ul className="mt-5 flex flex-wrap gap-2 text-sm">
            <li className="inline-flex items-center gap-2 rounded-full border border-[#E9E3DB] bg-white px-3 py-1">
              <ShieldCheck className="h-4 w-4" /> Faixa personalizada
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-[#E9E3DB] bg-white px-3 py-1">
              <Clock className="h-4 w-4" /> Atendimento 24h
            </li>
          </ul>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="bg-[#2E4A3B] hover:bg-[#315F4F]" asChild>
              <a href={waHero} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp para fazer pedido">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Pedir pelo WhatsApp
                </span>
              </a>
            </Button>

            <Button variant="outline" className="rounded-none border-2 px-6 py-6 text-base" asChild>
              <a href="tel:+5541999999999" aria-label="Ligar agora">
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Ligar agora
                </span>
              </a>
            </Button>
          </div>
        </div>

        {/* Imagem */}
        <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow">
          <Image
            src="/coroa_1.png"
            alt="Coroa de flores para homenagem"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
