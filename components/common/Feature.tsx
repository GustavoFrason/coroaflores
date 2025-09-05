export default function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="h-10 w-10 rounded-xl bg-gray-100 grid place-items-center mb-3">{icon}</div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-[#4B5563]">{desc}</div>
    </div>
  );
}
