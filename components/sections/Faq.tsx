export default function Faq() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12">
      <div className="rounded-2xl bg-white border p-6 grid md:grid-cols-3 gap-6 text-sm text-[#4B5563]">
        <div>
          <div className="font-semibold text-[#1F2937] mb-1">Entrega no mesmo dia</div>
          Pedidos confirmados até 15h. Consulte disponibilidade por região.
        </div>
        <div>
          <div className="font-semibold text-[#1F2937] mb-1">Mensagem da faixa</div>
          Sugestões: “Eterna saudade”, “Homenagem da família”, “Com carinho, amigos”.
        </div>
        <div>
          <div className="font-semibold text-[#1F2937] mb-1">Atendimento</div>
          24h via WhatsApp e telefone.
        </div>
      </div>
    </section>
  );
}
