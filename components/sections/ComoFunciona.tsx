import { Flower, MessageCircle, Clock } from "lucide-react";
import Feature from "@/components/common/Feature";

export default function ComoFunciona() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4">
      <div className="rounded-2xl bg-white border p-6 grid md:grid-cols-3 gap-6">
        <Feature title="Escolha o modelo" desc="Opções clássicas, elegantes e premium." icon={<Flower className="h-5 w-5" />} />
        <Feature title="Fale no WhatsApp" desc="Mensagem pré-preenchida para agilizar." icon={<MessageCircle className="h-5 w-5" />} />
        <Feature title="Entrega ágil" desc="Informe local e horário; nós cuidamos do restante." icon={<Clock className="h-5 w-5" />} />
      </div>
    </section>
  );
}
