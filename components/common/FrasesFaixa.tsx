"use client";

import { useState } from "react";
import { FRASES_FAIXA } from "@/lib/frases";

type Props = {
  phrases?: string[];
  onPick?: (t: string) => void; // opcional: se quiser integrar com QuickOrder
  className?: string;
};

export default function FrasesFaixa({ phrases = FRASES_FAIXA, onPick, className }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (t: string) => {
    try {
      await navigator.clipboard.writeText(t);
      onPick?.(t);
      setCopied(t);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // silencioso
    }
  };

  return (
    <div className={className ?? "mt-3 flex flex-wrap gap-2 text-sm"}>
      {phrases.map((f) => (
        <button
          key={f}
          onClick={() => copy(f)}
          type="button"
          title="Clique para copiar"
          className="rounded-full border border-[#E9E3DB] bg-white px-3 py-1 hover:border-[#C9C2B7]"
        >
          {copied === f ? "Copiada!" : f}
        </button>
      ))}
    </div>
  );
}
