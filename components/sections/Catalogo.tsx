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

import { PRODUTOS } from "@/lib/models";
import { formatCurrency, precoAtual } from "@/lib/utils";

export default function Catalogo() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const produtos = useMemo(() => (Array.isArray(PRODUTOS) ? PRODUTOS : []), []);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[Catalogo] PRODUTOS:", produtos);
    // @ts-expect-error
    typeof window !== "undefined" && (window.__catalog = produtos);
  }

  const jsonLd = useMemo(() => {
    const graph = produtos.map((p) => {
      const { valor } = precoAtual(p);
      return {
        "@type": "Product",
        name: p.nome,
        image: siteUrl ? `${siteUrl}${p.img}` : p.img,
        brand: "Floricultura Larissa",
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          price: valor,
          availability: "https://schema.org/InStock",
          ...(p.promoFim ? { priceValidUntil: p.promoFim } : {}),
        },
      };
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }, [siteUrl, produtos]);

  return (
    <section id="catalogo" className="relative overflow-hidden bg-[#FAF8F5] text-[#5E5A57]">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-serif">Coroas de Flores</h2>
          <p className="hidden sm:block text-sm text-[#7D7875]">
            {produtos.length > 0 ? `Temos ${produtos.length} opção(ões)` : "Catálogo em atualização"}
          </p>
        </div>

        {produtos.length === 0 ? (
          <div className="rounded-2xl border border-[#E9E3DB] bg-white p-6">
            <p className="text-sm text-[#7D7875]">
              Nenhum produto carregado. Confira o import e o alias do path.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 xl:gap-7">
            {produtos.map((p, idx) => (
              <CatalogCard key={p.id} produtoIndex={idx} {...p} />
            ))}
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

/* ---------------- Card isolado ---------------- */

type CardProps = (typeof PRODUTOS)[number] & { produtoIndex: number };

function CatalogCard({
  id,
  nome,
  img,
  precoBase,
  precoPromo,
  promoInicio,
  promoFim,
  coresSugeridas = [],
  badge,
  produtoIndex,
}: CardProps) {
  const [cor, setCor] = useState<string>(coresSugeridas[0] ?? "");
  const alt = `${nome}${cor ? ` — cor ${cor}` : ""}`;

  const { valor, de, desconto, emPromocao } = precoAtual({
    id,
    nome,
    img,
    precoBase,
    precoPromo,
    promoInicio,
    promoFim,
    coresSugeridas,
    badge,
  });

  // Link para o pedido rápido (pré-seleciona produto/cor) — sempre na raiz
  const hrefQuick = `/#pedido-rapido?pid=${encodeURIComponent(id)}${
    cor ? `&cor=${encodeURIComponent(cor)}` : ""
  }&utm=cat_card_${id}`;

  return (
    <Card className="overflow-hidden group rounded-2xl border hover:shadow-lg transition-shadow min-w-0">
      <Dialog>
        {/* Imagem: agora em retrato e sem corte */}
        <div className="relative w-full aspect-[3/4]">
          {badge && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[#2E4A3B] px-3 py-1 text-xs text-white shadow">
              {badge}
            </span>
          )}
          {emPromocao && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-[#2E4A3B] px-3 py-1 text-xs text-white shadow">
              -{desconto}%
            </span>
          )}

          <DialogTrigger asChild>
            <button className="absolute inset-0 text-left" aria-label={`Ver detalhes de ${nome}`}>
              <Image
                src={img}
                alt={alt}
                fill
                className="object-contain bg-white p-2 transition-transform duration-300 group-hover:scale-[1.01]"
                // 2 col no mobile → 50vw está ok
                sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 50vw"
                priority={produtoIndex === 0}
              />
              <span className="sr-only">Ver detalhes de {nome}</span>
            </button>
          </DialogTrigger>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{nome}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Preço de/por */}
          <div className="flex items-baseline gap-2">
            {de !== undefined && (
              <span className="text-sm line-through text-[#7D7875]">{formatCurrency(de)}</span>
            )}
            <span className="text-xl font-serif text-[#2E4A3B]">{formatCurrency(valor)}</span>
            {emPromocao && (
              <span className="ml-1 text-xs rounded-full px-2 py-0.5 bg-[#2E4A3B] text-white">
                -{desconto}%
              </span>
            )}
          </div>

          {/* Cores sugeridas */}
          {!!coresSugeridas.length && (
            <div className="flex flex-wrap gap-2">
              {coresSugeridas.map((c) => (
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

          {/* Ações */}
          <div className="flex flex-col gap-2">
            <a
              href={hrefQuick}
              className="w-full inline-flex h-12 items-center justify-center rounded-md bg-[#2E4A3B] px-4 text-white text-sm font-medium"
              aria-label="Personalizar e pedir no WhatsApp"
            >
              Personalizar &amp; pedir
            </a>

            {/* Botão “Ver detalhes” usa o MESMO Dialog */}
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 text-sm font-medium"
                aria-label={`Ver detalhes de ${nome}`}
              >
                Ver detalhes
              </Button>
            </DialogTrigger>
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

        {/* Conteúdo do Dialog */}
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{nome}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden bg-white">
              <Image src={img} alt={alt} fill className="object-contain p-2" />
            </div>
            <div className="mt-3 text-sm text-[#4B5563] leading-relaxed">
              <p>Arranjo com flores selecionadas do dia, montagem cuidadosa e entrega ágil.</p>
              <p className="mt-2">Faixa personalizada opcional no pedido.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
