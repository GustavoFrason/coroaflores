"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Phone,
  Truck,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * Coloque as imagens editadas em /public
 * Ex.: /public/coroa_1.webp, /public/coroa_2.webp
 */
const defaultImages: string[] = [
  "/coroa_1.png",
  "/coroa_2.png",
  "/coroa_3.png",
  "/coroa_4.png",
];

type HeroProps = {
  title?: string;
  subtitle?: string;
  /** Se passado, entra como primeiro slide do carrossel */
  background?: string;
  /** Se passado, substitui todos os slides */
  images?: string[];
  /** Overrides de CTA */
  whatsappHrefOverride?: string;
  telHrefOverride?: string;
  verModelosHrefOverride?: string;
};

export default function Hero({
  title,
  subtitle,
  background,
  images,
  whatsappHrefOverride,
  telHrefOverride,
  verModelosHrefOverride,
}: HeroProps) {
  const telHref = telHrefOverride ?? "tel:+5541999043865";
  const waHref =
    whatsappHrefOverride ??
    "https://wa.me/5541999043865?text=Ol%C3%A1!%20Quero%20fazer%20um%20pedido%20de%20coroa%20de%20flores.";
  const verModelosHref = verModelosHrefOverride ?? "#catalogo";

  // Slides finais
  const slides = images?.length
    ? images
    : background
    ? [background, ...defaultImages]
    : defaultImages;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  /** respeita prefers-reduced-motion */
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const prevSlide = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [slides.length]
  );
  const nextSlide = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length]
  );

  /** autoplay com pausas em hover/visibilidade/reduced-motion */
  useEffect(() => {
    if (paused || prefersReduced) return;
    const tick = () => {
      timerRef.current = window.setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        tick();
      }, 4000);
    };
    tick();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [paused, prefersReduced, slides.length]);

  /** teclado + visibilidade */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    const onVisibility = () => setPaused(document.hidden);

    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [nextSlide, prevSlide]);

  /** swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    setPaused(false);
    touchStartX.current = null;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 30) {
      if (dx > 0) prevSlide();
      else nextSlide();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] text-[#5E5A57]">
      {/* Header */}
      <header className="w-full border-b bg-[#FAF8F5]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="font-serif text-lg">Coroas &amp; Homenagens</div>

          <nav
            className="hidden md:flex gap-6 text-sm"
            aria-label="Navegação principal"
          >
            <a href="#about" className="hover:text-black">
              Sobre
            </a>
            <a href="#catalogo" className="hover:text-black">
              Coroas
            </a>
            <a href="#depoimentos" className="hover:text-black">
              Depoimentos
            </a>
            <a href="#faq" className="hover:text-black">
              Dúvidas
            </a>
            <a href="#contato" className="hover:text-black">
              Contato
            </a>
          </nav>

          <div className="text-sm">
            Ligue:{" "}
            <a
              href={telHref}
              className="font-semibold hover:underline"
              aria-label="Ligar para +55 41 99904-3865"
            >
              +55 (41) 99904-3865
            </a>
          </div>
        </div>
      </header>

      {/* Hero principal */}
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div>
          <p className="italic text-sm mb-3 text-[#7D7875]">Coroas de Flores</p>

          <h1 className="font-serif text-[40px] md:text-[56px] lg:text-[64px] font-light leading-[1.08] tracking-[-0.01em] max-w-[14ch]">
            {title ?? (
              <>
                Entrega de coroas no <span className="font-semibold">mesmo dia</span>
              </>
            )}
          </h1>

          <p className="mt-5 text-base md:text-lg text-[#6C6764] max-w-[56ch]">
            {subtitle ?? (
              <>
                Homenagens com respeito e pontualidade. Atendemos{" "}
                <strong>Curitiba e região</strong>.
                <span className="ml-1 font-medium text-[#2E4A3B]">
                  Entrega em até 3h após confirmação.
                </span>{" "}
                Faixa personalizada (+R$ 25, até 40 caracteres).
              </>
            )}
          </p>

          {/* Chips de confiança */}
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            <li className="inline-flex items-center gap-2 rounded-full border border-[#E9E3DB] bg-white px-3 py-1">
              <Truck className="h-4 w-4" aria-hidden /> Entrega em até 3h
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
              className="h-12 px-5 inline-flex items-center justify-center gap-2 rounded-md bg-[#2E4A3B] hover:bg-[#315F4F] text-white shadow-sm w-full sm:w-auto"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <MessageCircle className="h-4 w-4" />
              Pedir no WhatsApp{" "}
              <span className="opacity-80">(resposta imediata)</span>
            </a>

            <a
              href={telHref}
              aria-label="Ligar agora"
              className="h-12 px-5 inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#D9D4CC] hover:border-[#C9C3BA] w-full sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              Ligar agora
            </a>

            <a
              href={verModelosHref}
              className="h-12 px-5 inline-flex items-center justify-center gap-2 rounded-md underline underline-offset-4 hover:no-underline w-full sm:w-auto"
              aria-label="Ver modelos de coroas"
            >
              Ver modelos
            </a>
          </div>
        </div>

        {/* Carrossel de Imagens */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Galeria de coroas"
          className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.10)] bg-white"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="absolute inset-0">
            {slides.map((src, i) => (
              <Image
                key={`${src}-${i}`}
                src={src}
                alt={`Coroa de flores real – foto ${i + 1}`}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className={`object-cover transition-opacity duration-700 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
          </div>

          {/* Controles */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow ring-1 ring-black/5"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow ring-1 ring-black/5"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 w-2.5 rounded-full outline-offset-2 ${
                  i === current
                    ? "bg-[#2E4A3B]"
                    : "bg-white/80 ring-1 ring-black/10"
                }`}
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