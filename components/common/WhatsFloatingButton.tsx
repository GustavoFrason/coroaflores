"use client";

import { MessageCircle, Phone } from "lucide-react";
import { WHATS_NUMBER } from "@/lib/constants";
import { withUtm } from "@/lib/utm";

const waBase = `https://wa.me/${WHATS_NUMBER}?text=Olá!%20Gostaria%20de%20pedir%20uma%20coroa%20de%20flores.`;

export default function WhatsFloatingButton() {
  const waMobile = withUtm(waBase, "sticky_mobile");
  const waDesktop = withUtm(waBase, "sticky_desktop");

  return (
    <>
      {/* Mobile: barra fixa no rodapé */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E9E3DB] bg-white/95 backdrop-blur md:hidden">
        <div className="mx-auto max-w-7xl px-3 py-2 grid grid-cols-2 gap-3">
          <a
            href={waMobile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2E4A3B] px-3 py-2 text-sm font-medium text-white"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href="tel:+5541999043865"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#E9E3DB] bg-white px-3 py-2 text-sm font-medium text-[#5E5A57]"
          >
            <Phone className="h-4 w-4" /> Ligar
          </a>
        </div>
      </div>

      {/* Desktop: bolha flutuante */}
      <a
        href={waDesktop}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-[#2E4A3B] shadow-lg hover:scale-105 transition"
        title="Pedir pelo WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>
    </>
  );
}
