import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WHATS_NUMBER } from "@/lib/constants";

export default function CtaFinal() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="rounded-2xl bg-white border p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Pronto para fazer seu pedido?</h3>
          <p className="text-[#4B5563] text-sm">Clique e fale conosco agora pelo WhatsApp.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <a href={`https://wa.me/${WHATS_NUMBER}`} target="_blank" rel="noreferrer" className="gap-2 inline-flex items-center">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
          <Button className="bg-[#2E4A3B] hover:bg-[#315F4F]" asChild>
            <a
              href={`https://wa.me/${WHATS_NUMBER}?text=Olá!%20Quero%20pedir%20uma%20*Coroa%20de%20Flores*.`}
              target="_blank"
              rel="noreferrer"
            >
              Fazer Pedido
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
