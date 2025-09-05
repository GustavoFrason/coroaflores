"use client";

import { MessageCircle } from "lucide-react";
import { WHATS_NUMBER } from "@/lib/constants";

export default function WhatsFloatingButton() {
  return (
    <a
      href={`https://wa.me/${WHATS_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </a>
  );
}
