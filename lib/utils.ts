// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Une classes de forma segura (padrão shadcn). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formata moeda BRL. */
export function formatCurrency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Gera o texto codificado para mensagem do WhatsApp. */
export function makeWaLink({ modelo, tamanho }: { modelo?: string; tamanho?: string }) {
  const t = tamanho ? `• Tamanho: ${tamanho}%0A` : "";
  const texto =
    `Olá! Gostaria de pedir uma *Coroa de Flores*.%0A` +
    (modelo ? `• Modelo: ${modelo}%0A` : "") +
    t +
    `• Mensagem da faixa: (digite aqui)%0A` +
    `• Local/Data/Hora da entrega: (digite aqui)`;
  return texto;
}
