// components/sections/Catalogo.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MODELOS } from "@/lib/models";
import { formatCurrency, makeWaLink } from "@/lib/utils";
import { WHATS_NUMBER } from "@/lib/constants";

export default function Catalogo() {
  return (
    <section id="catalogo" className="bg-[#FAF8F5] text-[#5E5A57]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-semibold">Modelos de Coroas</h2>
          <p className="text-xs md:text-sm text-[#7D7875]">
            Escolha um modelo e peça pelo WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODELOS.map((m) => (
            <Card
              key={m.id}
              className="overflow-hidden border border-[#E9E3DB] shadow-[0_1px_0_rgba(0,0,0,.04),0_2px_20px_rgba(0,0,0,.03)]"
            >
              {/* IMAGEM: mais baixa para o card ficar compacto */}
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={m.img}
                  alt={`Modelo ${m.nome} - coroa de flores`}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 320px, (min-width:640px) 50vw, 100vw"
                  priority={m.id === "classica"}
                />
              </div>

              <CardHeader className="py-3">
                <CardTitle className="text-base md:text-lg">{m.nome}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 pb-4">
                <div className="text-[13px] text-[#4B5563]">
                  A partir de{" "}
                  <span className="font-semibold text-[#1F2937]">
                    {formatCurrency(m.precoBase)}
                  </span>
                </div>

                {/* Tamanhos com link direto (menores) */}
                <div className="flex items-center gap-2">
                  {m.tamanhos.map((t) => (
                    <Button key={t} variant="outline" size="sm" className="h-8 px-3" asChild>
                      <a
                        href={`https://wa.me/${WHATS_NUMBER}?text=${makeWaLink({
                          modelo: m.nome,
                          tamanho: t,
                        })}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t}
                      </a>
                    </Button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 text-[11px]">
                  {m.cores.map((c) => (
                    <span key={c} className="rounded-full bg-gray-100 px-2.5 py-1">
                      {c}
                    </span>
                  ))}
                </div>

                <Button
                  className="w-full h-9 text-sm bg-[#2E4A3B] hover:bg-[#315F4F]"
                  asChild
                >
                  <a
                    href={`https://wa.me/${WHATS_NUMBER}?text=${makeWaLink({ modelo: m.nome })}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pedir pelo WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
