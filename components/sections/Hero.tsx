"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Phone,
  Truck,
  Zap,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const images: string[] = ["/coroa_1.png", "/coroa_2.png"];

export default function Hero() {
  const telHref = "tel:+5541999999999";
  const waHref =
    "https://wa.me/5541999999999?text=Ol%C3%A1!%20Quero%20fazer%20um%20pedido%20de%20coroa%20de%20flores.";
  const verModelosHref = "#catalogo";

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((c) => (c + 1) % images.length);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  // Teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 30) {
      if (dx > 0) prevSlide();
      else nextSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] text-[#5E5A57]">
      {/* Header */}
      <header className="w-full border-b bg-[#FAF8F5]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="font-serif text-lg">Coroas &amp; Homenagens</div>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-black">Sobre</a>
            <a href="#catalogo" className="hover:text-black">Coroas</a>
            <a href="#depoimentos" className="hover:text-black">Depoimentos</a>
            <a href="#faq" className="hover:text-black">Dúvidas</a>
            <a href="#contato" className="hover:text-black">Contato</a>
          </nav>

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
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
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
        <div
          className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={images[current]}
            alt={`Coroa de flores – imagem ${current + 1} de ${images.length}`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />

          {/* Controles */}
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
