"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MODELOS } from "@/lib/models";
import { formatCurrency } from "@/lib/utils";

type Tamanho = "P" | "M" | "G";

export default function Catalogo() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  // SEO – JSON-LD
  const jsonLd = useMemo(() => {
    const graph = MODELOS.map((m) => ({
      "@type": "Product",
      name: m.nome,
      image: siteUrl ? `${siteUrl}${m.img}` : m.img,
      brand: "Coroas & Homenagens",
      offers: {
        "@type": "Offer",
        priceCurrency: "BRL",
        price: m.precoBase,
        availability: "https://schema.org/InStock",
      },
    }));
    return { "@context": "https://schema.org", "@graph": graph };
  }, [siteUrl]);

  return (
    <section id="catalogo" className="relative overflow-hidden bg-[#FAF8F5] text-[#5E5A57]">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Modelos de Coroas</h2>
          <p className="hidden sm:block text-sm text-[#4B5563]">
            Escolha um modelo e peça pelo WhatsApp
          </p>
        </div>

        {/* 1 → 2 → 3 → 4 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 xl:gap-7">
          {MODELOS.map((m, idx) => (
            <CatalogCard key={m.id} modeloIndex={idx} {...m} />
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

/* ---------------- Card isolado ---------------- */

function CatalogCard({
  id,
  nome,
  img,
  precoBase,
  cores,
  badge,
  modeloIndex,
}: {
  id: string;
  nome: string;
  img: string;
  precoBase: number;
  cores: string[];
  badge?: string;
  modeloIndex: number;
}) {
  const [tamanho, setTamanho] = useState<Tamanho>("M");
  const [cor, setCor] = useState<string>(cores?.[0] ?? "");

  const hrefQuick = `#pedido-rapido?m=${encodeURIComponent(nome)}&cor=${encodeURIComponent(
    cor || ""
  )}&t=${tamanho}&utm=cat_card_${id}`;

  const alt = `${nome} – arranjo de coroa${cor ? ` na cor ${cor}` : ""}`.trim();

  return (
    <Card className="overflow-hidden group rounded-2xl border hover:shadow-lg transition-shadow">
      {/* Imagem (abre modal) */}
      <Dialog>
        <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] xl:aspect-square">
          {badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[#2E4A3B] px-3 py-1 text-xs text-white shadow">
              {badge}
            </span>
          )}

          <DialogTrigger asChild>
            <button className="absolute inset-0 text-left">
              <Image
                src={img}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                // xl: 4 col (25vw) • lg: 3 col (33vw) • sm: 2 col (50vw) • mobile: 100vw
                sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                priority={modeloIndex === 0}
              />
              <span className="sr-only">Ver detalhes de {nome}</span>
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{nome}</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                <Image src={img} alt={alt} fill className="object-cover" />
              </div>
              <div className="mt-3 text-sm text-[#4B5563] leading-relaxed">
                <p>Medidas aproximadas por tamanho:</p>
                <ul className="list-disc ml-5">
                  <li>P: 45–55cm</li>
                  <li>M: 60–70cm</li>
                  <li>G: 80–90cm</li>
                </ul>
                <p className="mt-2">
                  Faixa personalizada incluída. Entrega no mesmo dia em regiões atendidas.
                </p>
              </div>
            </div>
          </DialogContent>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{nome}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Preço base */}
          <div className="text-sm text-[#4B5563]">
            A partir de{" "}
            <span className="font-semibold text-[#1F2937]">{formatCurrency(precoBase)}</span>
          </div>

          {/* Tamanhos */}
          <div className="flex items-center gap-2">
            {(["P", "M", "G"] as const).map((t) => (
              <Button
                key={t}
                variant={t === tamanho ? "default" : "outline"}
                size="sm"
                aria-pressed={t === tamanho}
                onClick={() => setTamanho(t)}
                className={t === tamanho ? "bg-[#2E4A3B] hover:bg-[#315F4F]" : ""}
              >
                {t}
              </Button>
            ))}
          </div>

          {/* Cores */}
          {!!cores?.length && (
            <div className="flex flex-wrap gap-2">
              {cores.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCor(c)}
                  aria-pressed={cor === c}
                  className={`rounded-full px-3 py-1.5 border text-xs transition ${
                    cor === c ? "border-[#2E4A3B] text-[#2E4A3B] bg-white" : "border-gray-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Ações: empilhadas (mobile-first) */}
          <div className="flex flex-col gap-2">
            <a
              href={hrefQuick}
              className="w-full inline-flex h-12 items-center justify-center rounded-md bg-[#2E4A3B] px-4 text-white text-sm font-medium"
              aria-label="Personalizar e pedir no WhatsApp"
            >
              Personalizar &amp; pedir
            </a>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 text-sm font-medium"
                  aria-label={`Ver detalhes de ${nome}`}
                >
                  Ver detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{nome}</DialogTitle>
                </DialogHeader>
                <div className="mt-2">
                  <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                    <Image src={img} alt={alt} fill className="object-cover" />
                  </div>
                  <div className="mt-3 text-sm text-[#4B5563] leading-relaxed">
                    <p>Medidas aproximadas por tamanho:</p>
                    <ul className="list-disc ml-5">
                      <li>P: 45–55cm</li>
                      <li>M: 60–70cm</li>
                      <li>G: 80–90cm</li>
                    </ul>
                    <p className="mt-2">
                      Faixa personalizada incluída. Entrega no mesmo dia em regiões atendidas.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Divisor + micro-copy */}
          <div className="pt-3 border-t border-slate-200">
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#68707a]">
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                Entrega no mesmo dia
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                Pagamento seguro
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400"></span>
                Atendimento 24h
              </span>
            </p>
          </div>
        </CardContent>
      </Dialog>
    </Card>
  );
}
