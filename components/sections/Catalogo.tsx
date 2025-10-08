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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { PRODUTOS } from "@/lib/models";
import { formatCurrency, precoAtual } from "@/lib/utils";

declare global {
  interface Window {
    __catalog?: typeof PRODUTOS;
  }
}

type SortKey = "relevancia" | "preco_asc" | "preco_desc";

export default function Catalogo() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const produtos = useMemo(() => (Array.isArray(PRODUTOS) ? PRODUTOS : []), []);
  const cores = useMemo(
    () =>
      Array.from(
        new Set(
          produtos.flatMap((p) => (Array.isArray(p.coresSugeridas) ? p.coresSugeridas : []))
        )
      ),
    [produtos]
  );

  // log dev
  if (process.env.NODE_ENV !== "production") {
    console.log("[Catalogo] PRODUTOS:", produtos);
    if (typeof window !== "undefined") window.__catalog = produtos;
  }

  const jsonLd = useMemo(() => {
    const graph = produtos.map((p) => {
      const { valor } = precoAtual(p);
      return {
        "@type": "Product",
        name: p.nome,
        image: siteUrl ? `${siteUrl}${p.img}` : p.img,
        brand: "Coroas & Homenagens",
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

  // ---------------- Filtros ----------------
  const [q, setQ] = useState("");
  const [cor, setCor] = useState<string>("todas");
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [precoMin, setPrecoMin] = useState<string>("");
  const [precoMax, setPrecoMax] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("relevancia");

  const filtrados = useMemo(() => {
    const norm = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    const qn = norm(q);

    const arr = [...produtos].filter((p) => {
      // busca
      if (q && !norm(p.nome).includes(qn)) return false;
      // cor
      if (cor !== "todas") {
        const coresProd = p.coresSugeridas ?? [];
        if (!coresProd.includes(cor)) return false;
      }
      // promo
      if (onlyPromo) {
        const { emPromocao } = precoAtual(p);
        if (!emPromocao) return false;
      }
      // faixa de preço
      const { valor } = precoAtual(p);
      const min = precoMin ? Number(precoMin) : undefined;
      const max = precoMax ? Number(precoMax) : undefined;
      if (min !== undefined && valor < min) return false;
      if (max !== undefined && valor > max) return false;

      return true;
    });

    // ordenação
    arr.sort((a, b) => {
      if (sort === "preco_asc") return precoAtual(a).valor - precoAtual(b).valor;
      if (sort === "preco_desc") return precoAtual(b).valor - precoAtual(a).valor;
      return 0; // relevância: mantém ordem original (curadoria)
    });

    return arr;
  }, [q, cor, onlyPromo, precoMin, precoMax, sort, produtos]);

  const total = filtrados.length;

  const limparFiltros = () => {
    setQ("");
    setCor("todas");
    setOnlyPromo(false);
    setPrecoMin("");
    setPrecoMax("");
    setSort("relevancia");
  };

  return (
    <section id="catalogo" className="relative overflow-hidden bg-[#FAF8F5] text-[#5E5A57]">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-12">
        <div className="flex flex-col gap-4 sm:gap-3">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-serif">Coroas de Flores</h2>
            <p className="hidden sm:block text-sm text-[#7D7875]">
              {produtos.length > 0 ? `Temos ${produtos.length} opção(ões)` : "Catálogo em atualização"}
            </p>
          </div>

          {/* Barra de filtros */}
          <div className="rounded-2xl border border-[#E9E3DB] bg-white p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {/* Busca */}
              <div className="lg:col-span-2">
                <Label htmlFor="q" className="text-xs text-[#7D7875]">
                  Buscar
                </Label>
                <Input
                  id="q"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Ex.: Luxo, Clássica, Rosas…"
                  className="mt-1 bg-white"
                />
              </div>

              {/* Cor sugerida */}
              <div>
                <Label className="text-xs text-[#7D7875]">Cor</Label>
                <Select value={cor} onValueChange={setCor}>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {cores.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preço mín/máx */}
              <div>
                <Label htmlFor="precoMin" className="text-xs text-[#7D7875]">
                  Preço mín (R$)
                </Label>
                <Input
                  id="precoMin"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value.replace(/\D/g, ""))}
                  className="mt-1 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="precoMax" className="text-xs text-[#7D7875]">
                  Preço máx (R$)
                </Label>
                <Input
                  id="precoMax"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value.replace(/\D/g, ""))}
                  className="mt-1 bg-white"
                />
              </div>

              {/* Ordenação */}
              <div>
                <Label className="text-xs text-[#7D7875]">Ordenar por</Label>
                <Select value={sort} onValueChange={(v: SortKey) => setSort(v)}>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue placeholder="Relevância" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevância</SelectItem>
                    <SelectItem value="preco_asc">Preço: menor → maior</SelectItem>
                    <SelectItem value="preco_desc">Preço: maior → menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Linha de controle secundário */}
            <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-[#5E5A57]">
               {/* <Checkbox checked={onlyPromo} onCheckedChange={(v) => setOnlyPromo(Boolean(v))} /> */}
                {/* Mostrar apenas promoções */}
              </label>

              <div className="flex items-center gap-3">
                <span className="text-sm text-[#7D7875]">
                  {total} resultado{total === 1 ? "" : "s"}
                </span>
                <Button
                  variant="outline"
                  onClick={limparFiltros}
                  className="h-9 rounded-xl border-[#E9E3DB] text-[#5E5A57] hover:bg-[#FAF8F5]"
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Grade */}
        {filtrados.length === 0 ? (
          <div className="rounded-2xl border border-[#E9E3DB] bg-white p-6 mt-6">
            <p className="text-sm text-[#7D7875]">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 xl:gap-7">
            {filtrados.map((p, idx) => (
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

  const handlePersonalizar = () => {
    try {
      if (typeof window === "undefined") return;

      const hash = `#pedido-rapido?pid=${encodeURIComponent(id)}${
        cor ? `&cor=${encodeURIComponent(cor)}` : ""
      }&utm=cat_card_${id}`;

      const { pathname, search } = window.location;
      window.history.pushState(null, "", `${pathname}${search}${hash}`);

      const target = document.getElementById("pedido-rapido");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });

      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } catch {
      window.location.href = `/#pedido-rapido?pid=${encodeURIComponent(id)}${
        cor ? `&cor=${encodeURIComponent(cor)}` : ""
      }&utm=cat_card_${id}`;
    }
  };

  return (
    <Card className="overflow-hidden group rounded-2xl border hover:shadow-lg transition-shadow min-w-0">
      <Dialog>
        {/* Imagem: retrato e sem corte */}
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
            <button
              type="button"
              onClick={handlePersonalizar}
              className="w-full inline-flex h-12 items-center justify-center rounded-md bg-[#2E4A3B] px-4 text-white text-sm font-medium hover:bg-[#315F4F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2E4A3B]"
              aria-label="Personalizar e pedir"
            >
              Personalizar &amp; pedir
            </button>

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
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Entrega no mesmo dia
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Pagamento seguro
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
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
