// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getProduto, type Orcamento, type Produto } from "./models";
import { PRECO_FAIXA } from "./constants";

/** Une classes de forma segura (padrão shadcn). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formata moeda BRL (tolerante a undefined/NaN). */
export function formatCurrency(n?: number | null) {
  const num = typeof n === "number" && Number.isFinite(n) ? n : 0;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Info de preço atual. */
export interface PrecoInfo {
  valor: number;        // preço que vale agora (por ou base)
  de?: number;          // se em promoção, valor "de"
  desconto: number;     // % inteiro (0..100)
  emPromocao: boolean;  // flag de promoção ativa
}

/** Retorna preço atual do produto considerando promoção (de/por) e janela de validade. */
export function precoAtual(produto: Produto, agora = new Date()): PrecoInfo {
  const { precoBase, precoPromo, promoInicio, promoFim } = produto;

  const emJanela =
    (!promoInicio || new Date(promoInicio) <= agora) &&
    (!promoFim || agora <= new Date(promoFim));

  const emPromocao =
    typeof precoPromo === "number" &&
    precoPromo < precoBase &&
    emJanela;

  const valor = emPromocao ? (precoPromo as number) : precoBase;
  const de = emPromocao ? precoBase : undefined;
  const desconto = emPromocao
    ? Math.max(0, Math.min(100, Math.round(((precoBase - (precoPromo as number)) / precoBase) * 100)))
    : 0;

  return { valor, de, desconto, emPromocao };
}

/** Calcula base, extra de faixa e total a partir do Orcamento. */
export function calcularTotal(orcam: Orcamento) {
  const produto = getProduto(orcam.produtoId);
  const { valor: base } = precoAtual(produto);
  const extraFaixa = orcam.faixaPersonalizada ? PRECO_FAIXA : 0;

  const baseNum = Number(base) || 0;
  const extraNum = Number(extraFaixa) || 0;
  const total = baseNum + extraNum;

  return { base: baseNum, extraFaixa: extraNum, total };
}

/** Gera o texto (não codificado) para mensagem do WhatsApp. */
export function makeWaText(orcam: Orcamento) {
  const produto = getProduto(orcam.produtoId);
  const { base, extraFaixa, total } = calcularTotal(orcam);

  // Sanitiza texto da faixa (remove quebras e limita 40 chars)
  const faixaTxt = (orcam.textoFaixa ?? "").replace(/\s+/g, " ").trim().slice(0, 40);

  const linhas: string[] = [
    `Olá! Gostaria de pedir uma *${produto.nome}*.`,
    `• Preço base: ${formatCurrency(base)}`,
    orcam.faixaPersonalizada
      ? `• Faixa (+${formatCurrency(extraFaixa)}): "${faixaTxt}"`
      : "• Sem faixa",
    orcam.homenageado ? `• Homenageado: ${orcam.homenageado}` : "",
    (orcam.cores?.length ?? 0) > 0 ? `• Cores: ${orcam.cores!.join(", ")}` : "",
    orcam.localEntrega && orcam.localEntrega.trim()
      ? `• Local de entrega: ${orcam.localEntrega}`
      : "• Local de entrega: informarei depois",
    `• Total estimado: ${formatCurrency(total)}`,
    `Obs: Frete calculado conforme a região.`,
  ].filter(Boolean) as string[];

  return linhas.join("\n");
}

/**
 * Monta a URL do WhatsApp (wa.me) com o texto codificado.
 * Ex.: makeWaUrl("5541999999999", orcamento)
 */
export function makeWaUrl(whatsNumber: string, orcam: Orcamento) {
  const texto = makeWaText(orcam);
  return `https://wa.me/${whatsNumber}?text=${encodeURIComponent(texto)}`;
}

/* =========================
   Compat: função antiga
   ========================= */

/**
 * [DEPRECATED] Compatibilidade com a assinatura antiga.
 * Antes: makeWaLink({ modelo, tamanho })
 * Agora: use makeWaUrl(whatsNumber, orcamento).
 */
export function makeWaLink(_old?: { modelo?: string; tamanho?: string }) {
  console.warn("makeWaLink está depreciada. Use makeWaUrl(whatsNumber, orcamento).");
  return "about:blank";
}
