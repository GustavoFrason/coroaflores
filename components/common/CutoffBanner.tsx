"use client";
import { useEffect, useState } from "react";

export default function CutoffBanner({ cutoffHour = 15 }: { cutoffHour?: number }) {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(cutoffHour, 0, 0, 0);

      if (now < cutoff) {
        const ms = cutoff.getTime() - now.getTime();
        const h = Math.floor(ms / 36e5);
        const m = Math.floor((ms % 36e5) / 6e4);

        const parts: string[] = [];
        if (h > 0) parts.push(`${h}h`);
        if (m > 0) parts.push(`${m}min`);
        const left = parts.length ? parts.join(" ") : "menos de 1min";

        const cutoffStr = cutoff.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        setMsg(
          `Peça agora — faltam ${left} para o limite de hoje (${cutoffStr}). ` +
            `Entrega em até 3h após a confirmação.`
        );
      } else {
        setMsg(
          "Pedidos são entregues em até 3h após a confirmação."
        );
      }
    };

    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [cutoffHour]);

  if (!msg) return null;

  return (
    <div
      className="bg-[#2E4A3B] text-white text-center py-2 text-sm"
      role="status"
      aria-live="polite"
    >
      {msg}
    </div>
  );
}
