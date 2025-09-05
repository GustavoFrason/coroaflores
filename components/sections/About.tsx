// components/sections/About.tsx
import Image from "next/image";
import { BadgeCheck, Clock, Flower, Palette, Boxes } from "lucide-react";
import IconBadge from "@/components/common/IconBadge";
import type { LucideIcon } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-[#FAF8F5] text-[#5E5A57]">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Benefícios com ícones no topo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
          <Benefit
            icon={Clock}
            title="Entrega 24/7"
            desc="Peça quando precisar. Atendimento imediato."
          />
          <Benefit
            icon={Flower}
            title="Flores Frescas"
            desc="Seleção diária, composição elegante."
          />
          <Benefit
            icon={Palette}
            title="Feitas por Artistas"
            desc="Arranjos com técnica e respeito."
          />
          <Benefit
            icon={Boxes}
            title="Ampla Linha de Serviços"
            desc="Decoração floral e coroas para cerimônias."
          />
        </div>

        {/* Conteúdo principal */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Imagem com moldura “arco” */}
          <div className="relative mx-auto w-full max-w-[560px]">
            {/* Moldura */}
            <div className="absolute inset-0 rounded-[28px] md:rounded-[36px] border-[6px] border-[#E9E3DB] pointer-events-none" />
            <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm">
              <Image
                src="/coroa_2.png"
                alt="Profissional preparando uma coroa de flores"
                width={1120}
                height={1400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Texto */}
          <div>
            <p className="italic text-sm mb-2">Sobre nós</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#5E5A57]">
              Nossa missão é tornar a sua homenagem{" "}
              <span className="not-italic font-normal">respeitosa e bonita</span>
            </h2>

            <p className="mt-5 text-[#7D7875]">
              Somos um estúdio floral especializado em <strong>coroas de flores</strong>. Unimos
              sensibilidade e técnica para oferecer arranjos que confortam famílias e honram
              memórias, com <strong>entrega no mesmo dia</strong> e faixa personalizada.
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 mt-0.5" />
                Entrega coordenada diretamente no local do velório/cerimônia.
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 mt-0.5" />
                Mensagens de faixa sugeridas ou personalizadas (até 60 caracteres).
              </li>
              <li className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 mt-0.5" />
                Atendimento humano 24 horas, todos os dias.
              </li>
            </ul>

            <div className="mt-8 rounded-xl border bg-white p-5">
              <div className="font-semibold text-[#5E5A57]">Coroas a partir de R$ 249,90</div>
              <p className="text-sm text-[#7D7875] mt-1">
                Fale pelo WhatsApp para confirmação rápida de <em>modelo</em>, <em>faixa</em> e{" "}
                <em>entrega</em>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="space-y-2">
      <IconBadge>
        <Icon className="h-6 w-6" />
      </IconBadge>
      <div className="font-medium">{title}</div>
      {/* Linha sutil abaixo do título */}
      <div className="mx-auto h-px w-8 bg-[#CFC8BD]" />
      <div className="text-xs text-[#7D7875] max-w-[28ch] mx-auto">{desc}</div>
    </div>
  );
}
