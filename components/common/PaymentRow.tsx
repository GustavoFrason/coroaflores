export default function PaymentRow() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-[#7D7875]">
      <span>Pagamentos:</span>
      <span className="rounded-md border border-[#E9E3DB] px-2 py-1 bg-white">PIX</span>
      <span className="rounded-md border border-[#E9E3DB] px-2 py-1 bg-white">Visa</span>
      <span className="rounded-md border border-[#E9E3DB] px-2 py-1 bg-white">Mastercard</span>
      <span className="rounded-md border border-[#E9E3DB] px-2 py-1 bg-white">Elo</span>
    </div>
  );
}
