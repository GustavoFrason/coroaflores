import { PenLine, BadgeCheck, Clock, Truck } from "lucide-react";

const steps = [
  { icon: PenLine, title: "Escolha e personalize", desc: "Selecione o modelo e escreva a faixa." },
  { icon: BadgeCheck, title: "Confirmação rápida", desc: "Validamos tudo pelo WhatsApp." },
  { icon: Clock, title: "Atendimento 24h", desc: "Pedidos confirmados até 15h: entrega hoje." },
  { icon: Truck, title: "Entrega coordenada", desc: "Falamos com a capela e entregamos no local." },
];

export default function ComoFunciona() {
  return (
    <section className="bg-[#FAF8F5] border-y border-[#E9E3DB]">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-[#5E5A57]">
        {steps.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center">
            <span className="relative inline-grid h-12 w-12 place-items-center text-[#5E5A57]">
              <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#E9E3DB]" />
              <Icon className="h-6 w-6 relative" />
            </span>
            <div className="mt-2 font-medium">{title}</div>
            <div className="mt-2 text-sm text-[#7D7875]">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
