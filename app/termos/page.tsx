import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições para uso do site e serviços.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-[#5E5A57]">
      <h1 className="font-serif text-3xl text-[#2E4A3B]">Termos de Uso</h1>
      <p className="mt-3 text-sm text-[#7D7875]">Última atualização: {new Date().getFullYear()}</p>

      <div className="prose prose-slate mt-6">
        <p>Este é um placeholder dos seus termos. Substitua pelo conteúdo real.</p>
      </div>
    </main>
  );
}
