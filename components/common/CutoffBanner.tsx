"use client";
import { useEffect, useState } from "react";

export default function CutoffBanner({ cutoffHour = 15 }: { cutoffHour?: number }) {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(cutoffHour, 0, 0, 0);

      if (now < cutoff) {
        const ms = cutoff.getTime() - now.getTime();
        const h = Math.floor(ms / 36e5);
        const m = Math.floor((ms % 36e5) / 6e4);
        setMsg(`Realize seu pedido e recebe em no máximo 3 horas após a confirmação.`);
      } else {
        setMsg("Entrega em até 3 horas após a confirmação do pedido.");
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [cutoffHour]);

  if (!msg) return null;
  return <div className="bg-[#2E4A3B] text-white text-center py-2 text-sm">{msg}</div>;
}
