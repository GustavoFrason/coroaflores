import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Política de Privacidade | Coroas & Homenagens",
  description:
    "Saiba como tratamos seus dados pessoais e garantimos a segurança das suas informações ao utilizar nossos serviços de coroas de flores.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="bg-[#FAF8F5] text-[#5E5A57] min-h-screen py-12 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Ações */}
        <div className="mb-4 flex items-center justify-end gap-2">
          <Button asChild variant="outline" className="rounded-xl border-[#E9E3DB] text-[#5E5A57] hover:bg-white">
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
          <Button
            asChild
            className="rounded-xl bg-[#2E4A3B] text-white hover:bg-[#315F4F]"
          >
            <a href="/" target="_blank" rel="noopener noreferrer">
              Abrir o site em nova guia
            </a>
          </Button>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl mb-6 text-[#2E4A3B]">
          Política de Privacidade
        </h1>
        <p className="text-[#7D7875] mb-6">
          A Coroas &amp; Homenagens valoriza a transparência e o respeito à privacidade de
          seus clientes. Este documento explica como coletamos, utilizamos e protegemos
          as informações pessoais fornecidas em nosso site e canais de atendimento.
        </p>

        <section className="space-y-4">
          <h2 className="font-medium text-[#2E4A3B]">1. Coleta de Informações</h2>
          <p>
            Coletamos apenas os dados necessários para processar pedidos, enviar comunicações
            e oferecer suporte personalizado. Isso inclui nome, telefone, e-mail e informações
            de entrega.
          </p>

          <h2 className="font-medium text-[#2E4A3B]">2. Uso das Informações</h2>
          <p>
            Os dados são utilizados exclusivamente para fins operacionais, como confirmação
            de pedidos, comunicação via WhatsApp e emissão de notas fiscais. Não compartilhamos
            dados com terceiros sem autorização expressa.
          </p>

          <h2 className="font-medium text-[#2E4A3B]">3. Segurança dos Dados</h2>
          <p>
            Implementamos medidas técnicas e administrativas para proteger suas informações
            contra acessos não autorizados, perdas ou alterações indevidas.
          </p>

          <h2 className="font-medium text-[#2E4A3B]">4. Direitos do Usuário</h2>
          <p>
            Você pode solicitar a atualização, exclusão ou correção de seus dados pessoais
            a qualquer momento pelo e-mail{" "}
            <a
              href="mailto:floriculturalarissa@hotmail.com"
              className="text-[#2E4A3B] hover:underline"
            >
              floriculturalarissa@hotmail.com
            </a>
            .
          </p>

          <h2 className="font-medium text-[#2E4A3B]">5. Alterações nesta Política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. As versões revisadas estarão
            sempre disponíveis neste endereço.
          </p>
        </section>

        <p className="mt-10 text-sm text-[#7D7875]">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>
    </main>
  );
}
