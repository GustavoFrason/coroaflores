import { Clock, ShieldCheck, Lock, Flower } from "lucide-react";

export default function BenefitsStrip() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#4B5563]">
        <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Entrega no mesmo dia*</div>
        <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Atendimento 24h</div>
        <div className="flex items-center gap-2"><Lock className="h-4 w-4" /> Pagamento seguro</div>
        <div className="flex items-center gap-2"><Flower className="h-4 w-4" /> Flores selecionadas</div>
      </div>
    </section>
  );
}
