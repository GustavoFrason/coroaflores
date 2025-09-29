"use client";

import { useState } from "react";
import { MessageCircle, Phone, Truck, Zap, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/coroa_1.png", "/coroa_2.png"]; // ajuste para as suas imagens em /public

export default function Hero() {
  const telHref = "tel:+5541999999999";
  const waHref =
    "https://wa.me/5541999999999?text=Ol%C3%A1!%20Quero%20fazer%20um%20pedido%20de%20coroa%20de%20flores.";
  const verModelosHref = "#catalogo";
  const [current, setCurrent] = useState(0);

  const prevSlide = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((c) => (c + 1) % images.length);

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
            <a
              href={telHref}
              className="font-semibold hover:underline"
              aria-label="Ligar para +55 41 99999-9999"
            >
              +55 (41) 99999-9999
            </a>
          </div>
        </div>
      </header>

      {/* Hero principal */}
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div>
          <p className="italic text-sm mb-2">Coroas de Flores</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
            Entrega de coroas no <span className="font-semibold">mesmo dia</span>
          </h1>
          <p className="mt-4 text-lg text-[#7D7875]">
            Elegância e respeito em cada detalhe. Atendemos <strong>Curitiba e região</strong>. Faixa personalizada (+R$ 25, até 40 caracteres).
          </p>

          {/* Chips de confiança */}
          <ul className="mt-5 flex flex-wrap gap-2 text-sm">
            <li className="inline-flex items-center gap-2 rounded-full border border-[#E9E3DB] bg-white px-3 py-1">
              <Truck className="h-4 w-4" aria-hidden /> Entrega hoje
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-[#E9E3DB] bg-white px-3 py-1">
              <Zap className="h-4 w-4" aria-hidden /> PIX imediato
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-[#E9E3DB] bg-white px-3 py-1">
              <Clock className="h-4 w-4" aria-hidden /> Atendimento 24h
            </li>
          </ul>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir WhatsApp para fazer pedido"
              className="h-12 px-5 inline-flex items-center gap-2 rounded-md bg-[#2E4A3B] hover:bg-[#315F4F] text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Pedir pelo WhatsApp
            </a>

            <a
              href={telHref}
              aria-label="Ligar agora"
              className="h-12 px-5 inline-flex items-center gap-2 rounded-md border-2"
            >
              <Phone className="h-4 w-4" />
              Ligar agora
            </a>

            <a
              href={verModelosHref}
              className="h-12 px-5 inline-flex items-center gap-2 rounded-md underline underline-offset-4 hover:no-underline"
              aria-label="Ver modelos de coroas"
            >
              Ver modelos
            </a>
          </div>
        </div>

        {/* Carrossel de Imagens */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <img
            src={images[current]}
            alt={`Coroa de flores – imagem ${current + 1} de ${images.length}`}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full ${i === current ? "bg-[#2E4A3B]" : "bg-white/60"}`}
                aria-label={`Ir para imagem ${i + 1}`}
                aria-pressed={i === current}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
