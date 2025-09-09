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
        setMsg(`Entrega hoje — finalize em ${h}h ${m}min`);
      } else {
        setMsg("Pedidos após 15h: entrega amanhã pela manhã");
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [cutoffHour]);

  if (!msg) return null;
  return <div className="bg-[#2E4A3B] text-white text-center py-2 text-sm">{msg}</div>;
}
