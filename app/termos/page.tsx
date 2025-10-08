import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Termos de Uso | Coroas & Homenagens",
  description:
    "Leia os termos e condições de uso dos serviços oferecidos pela Coroas & Homenagens, incluindo compras online e atendimento 24h.",
};

export default function TermosPage() {
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

        <h1 className="font-serif text-3xl md:text-4xl mb-6 text-[#2E4A3B]">Termos de Uso</h1>

        <p className="text-[#7D7875] mb-6">
          Ao acessar o site e os serviços da Coroas &amp; Homenagens, você concorda com os
          termos e condições descritos a seguir. Recomendamos a leitura atenta deste documento
          antes de realizar qualquer pedido.
        </p>

        <section className="space-y-4">
          <h2 className="font-medium text-[#2E4A3B]">1. Uso do Site</h2>
          <p>
            O conteúdo disponibilizado é de propriedade da Coroas &amp; Homenagens e não pode
            ser copiado ou reproduzido sem autorização prévia. As imagens dos produtos são
            ilustrativas e podem variar conforme disponibilidade.
          </p>

          <h2 className="font-medium text-[#2E4A3B]">2. Pedidos e Pagamentos</h2>
          <p>
            Os pedidos são confirmados após validação do pagamento via WhatsApp. Aceitamos
            PIX, cartões e outras formas indicadas no site. Todos os preços estão em reais (R$).
          </p>

          <h2 className="font-medium text-[#2E4A3B]">3. Entregas</h2>
          <p>
            As entregas são realizadas dentro dos prazos acordados no atendimento. Em casos
            de imprevistos, entraremos em contato imediatamente para confirmar alternativas.
          </p>

          <h2 className="font-medium text-[#2E4A3B]">4. Responsabilidades</h2>
          <p>
            A Coroas &amp; Homenagens não se responsabiliza por atrasos decorrentes de causas
            externas, como trânsito, condições climáticas ou greves de transporte.
          </p>

          <h2 className="font-medium text-[#2E4A3B]">5. Alterações dos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes termos a qualquer momento. As atualizações
            entram em vigor assim que publicadas neste endereço.
          </p>
        </section>

        <p className="mt-10 text-sm text-[#7D7875]">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>
    </main>
  );
}
