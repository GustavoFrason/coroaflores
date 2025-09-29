// components/sections/Footer.tsx
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATS_NUMBER } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  // Links dinâmicos
  const waLink = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(
    "Olá! Preciso de ajuda para fazer um pedido de coroa de flores."
  )}`;
  const telHref = telHrefFromWhats(WHATS_NUMBER);

  return (
    <footer className="bg-[#FAF8F5] text-[#5E5A57] border-t">
      {/* Faixa de CTA */}
      <div className="bg-[#2E4A3B] text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 flex flex-col md:flex-row gap-3 md:gap-6 items-center justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-wide/loose opacity-80">
              Precisa de ajuda agora?
            </p>
            <h3 className="text-lg md:text-xl font-medium">
              Atendimento humano 24h pelo WhatsApp
            </h3>
          </div>

          <div className="flex gap-2">
            <Button asChild className="bg-white text-[#2E4A3B] hover:bg-white/90">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chamar no WhatsApp"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <a href={telHref} aria-label="Ligar agora">
                <Phone className="mr-2 h-4 w-4" />
                Ligar agora
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div id="contato" className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marca / Sobre */}
          <div>
            <div className="font-serif text-xl text-[#2E4A3B]">
              Coroas &amp; Homenagens
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#7D7875]">
              Estúdio floral especializado em <strong>coroas de flores</strong>, com
              entrega ágil e faixa personalizada. Cuidamos de cada detalhe com
              respeito e delicadeza.
            </p>

            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp: {formatWhats(WHATS_NUMBER)}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:contato@coroashomenagens.com.br"
                  className="hover:underline"
                >
                  contato@coroashomenagens.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Atendimento 24h, todos os dias
              </li>
            </ul>
          </div>

          {/* Atendimento / Entregas */}
          <div>
            <div className="font-medium text-[#2E4A3B]">Atendimento &amp; Entregas</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Truck className="h-4 w-4 mt-0.5" />
                <span>
                  <strong>Entrega no mesmo dia</strong> — confirme disponibilidade para o endereço informado.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  Enviamos diretamente ao <strong>local do velório/cerimônia</strong> conforme combinado.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-0.5" />
                <span>
                  Faixa personalizada e montagem profissional. Imagens ilustrativas — flores podem variar por disponibilidade.
                </span>
              </li>
            </ul>
          </div>

          {/* Links úteis */}
          <div>
            <div className="font-medium text-[#2E4A3B]">Links úteis</div>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm">
              <li>
                <Link href="#catalogo" className="hover:underline">
                  Modelos de coroas
                </Link>
              </li>
              <li>
                <Link href="#pedido-rapido" className="hover:underline">
                  Pedido rápido
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="hover:underline">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:underline">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:underline">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Pagamentos / Segurança */}
          <div>
            <div className="font-medium text-[#2E4A3B]">Pagamentos</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <BadgePill icon={<CreditCard className="h-3.5 w-3.5" />} label="Cartão" />
              <BadgePill icon={<Lock className="h-3.5 w-3.5" />} label="PIX instantâneo" />
              <BadgePill icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Pagamento seguro" />
            </div>

            <p className="mt-3 text-xs text-[#7D7875]">
              PIX <em>compensa na hora</em>. Dados de pagamento e prazo de entrega são confirmados pelo WhatsApp.
            </p>
          </div>
        </div>

        {/* Linha fina / Avisos */}
        <div className="mt-10 border-t pt-6 text-xs text-[#7D7875] leading-relaxed">
          <p>
            * Imagens ilustrativas. As espécies e tonalidades das flores podem variar conforme a disponibilidade do dia,
            mantendo-se a estética e o padrão de qualidade.
          </p>
          <p className="mt-1">
            * Entregas no mesmo dia dependem do horário do pedido e do local de entrega. Em casos de urgência, fale
            diretamente pelo WhatsApp.
          </p>
        </div>

        {/* Barra inferior */}
        <div className="mt-6 border-t pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#7D7875]">
          <div>
            © {year} <span className="font-medium text-[#5E5A57]">Coroas &amp; Homenagens</span>. Todos os direitos
            reservados.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/politica-privacidade" className="hover:underline">
              Política de Privacidade
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/termos" className="hover:underline">
              Termos de Uso
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/sitemap.xml" className="hover:underline">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- pequenos helpers ---------- */

/** Exibe o número no padrão +55 (41) 99999-9999 */
function formatWhats(num: string) {
  try {
    const only = num.replace(/\D/g, "");
    if (only.length < 12) return `+${only}`;
    const cc = only.slice(0, 2);
    const ddd = only.slice(2, 4);
    const parte1 = only.slice(4, 9);
    const parte2 = only.slice(9);
    return `+${cc} (${ddd}) ${parte1}-${parte2}`;
  } catch {
    return num;
  }
}

/** Converte o número do WhatsApp em um href tel: */
function telHrefFromWhats(num: string) {
  const only = (num || "").toString().replace(/\D/g, "");
  return only ? `tel:+${only}` : "tel:";
}

/** bolachas de pagamento / selo de segurança */
function BadgePill({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs">
      {icon}
      {label}
    </span>
  );
}
