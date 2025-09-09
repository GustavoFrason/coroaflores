"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import FrasesFaixa from "@/components/common/FrasesFaixa";
import { MODELOS } from "@/lib/models";
import { makeWaLink } from "@/lib/utils";
import { WHATS_NUMBER } from "@/lib/constants";
import { withUtm } from "@/lib/utm";

const TAMANHOS: Record<"P" | "M" | "G", string> = {
  P: "45–55cm",
  M: "60–70cm",
  G: "80–90cm",
};

type TipoLocal = "Capela" | "Cemitério" | "Hospital" | "Igreja" | "Residência" | "Outro";

/** Pequeno helper para um colapso suave sem libs */
function Collapsible({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export default function QuickOrder() {
  // Arranjo
  const [modelo, setModelo] = useState(MODELOS[0]?.nome ?? "");
  const [tamanho, setTamanho] = useState<"P" | "M" | "G">("M");
  const [cor, setCor] = useState(MODELOS[0]?.cores?.[0] ?? "");
  const [faixa, setFaixa] = useState("");
  const [destinatario, setDestinatario] = useState("");

  // Local: toggle + campos
  const [informarLocalAgora, setInformarLocalAgora] = useState(true);
  const [localTipo, setLocalTipo] = useState<TipoLocal>("Capela");
  const [localNome, setLocalNome] = useState("");
  const [localSala, setLocalSala] = useState("");
  const [localCidade, setLocalCidade] = useState("");
  const [localEndereco, setLocalEndereco] = useState("");
  const [localReferencia, setLocalReferencia] = useState("");
  const [localDataHora, setLocalDataHora] = useState("");
  const [localMaps, setLocalMaps] = useState("");

  const coresDoModelo = MODELOS.find((m) => m.nome === modelo)?.cores ?? [];

  // Monta um resumo de local compatível com seu makeWaLink
  const localResumo = useMemo(() => {
    if (!informarLocalAgora) return "Confirmarei por WhatsApp";
    const partes = [
      [localTipo, localNome].filter(Boolean).join(" • "),
      localSala && `Sala/Ala: ${localSala}`,
      localEndereco && `End: ${localEndereco}`,
      localCidade && `Cidade: ${localCidade}`,
      localReferencia && `Ref: ${localReferencia}`,
      localDataHora && `Horário: ${localDataHora}`,
      localMaps && `Maps: ${localMaps}`,
    ]
      .filter(Boolean)
      .join(" | ");
    return partes || "Confirmarei por WhatsApp";
  }, [
    informarLocalAgora,
    localTipo,
    localNome,
    localSala,
    localEndereco,
    localCidade,
    localReferencia,
    localDataHora,
    localMaps,
  ]);

  const waHref = useMemo(() => {
    const texto = makeWaLink({
      modelo,
      tamanho,
      cor,
      faixa: faixa.trim(),
      local: localResumo,
      destinatario: destinatario.trim(),
    });

    // UTM diferente se a pessoa decidiu não informar agora (útil p/ medir)
    const content = informarLocalAgora
      ? "quickorder_cta_local_on"
      : "quickorder_cta_local_off";

    return withUtm(`https://wa.me/${WHATS_NUMBER}?text=${texto}`, content);
  }, [modelo, tamanho, cor, faixa, localResumo, destinatario, informarLocalAgora]);

  return (
    <section
      id="pedido-rapido"
      className="bg-white border border-[#E9E3DB] rounded-xl p-4 md:p-6 scroll-mt-24"
      aria-labelledby="quickorder-title"
    >
      <h3 id="quickorder-title" className="text-lg font-semibold">
        Monte sua coroa
      </h3>
      <p className="mt-1 text-sm text-[#7D7875]">
        Personalize rapidamente e finalize pelo WhatsApp. Atendimento 24h.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Modelo */}
        <div>
          <label className="block text-sm mb-1">Modelo</label>
          <select
            className="w-full rounded-md border border-[#E9E3DB] p-2 bg-white"
            value={modelo}
            onChange={(e) => {
              const novo = e.target.value;
              setModelo(novo);
              const cores = MODELOS.find((m) => m.nome === novo)?.cores ?? [];
              if (cores.length) setCor(cores[0]);
            }}
          >
            {MODELOS.map((m) => (
              <option key={m.id} value={m.nome}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Tamanho */}
        <div>
          <label className="block text-sm mb-1">
            Tamanho <span className="text-[#7D7875]">(diâmetro)</span>
          </label>
          <div className="flex gap-2">
            {(["P", "M", "G"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTamanho(t)}
                aria-label={`Selecionar tamanho ${t} (${TAMANHOS[t]})`}
                className={`h-9 px-3 rounded-md border text-sm ${
                  t === tamanho
                    ? "bg-[#2E4A3B] text-white border-[#2E4A3B]"
                    : "border-[#E9E3DB]"
                }`}
                title={`${TAMANHOS[t]}`}
              >
                {t}
                <span className="text-xs opacity-70 ml-1">{TAMANHOS[t]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cores */}
        <div>
          <label className="block text-sm mb-1">Cores do arranjo</label>
          <select
            className="w-full rounded-md border border-[#E9E3DB] p-2 bg-white"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
          >
            {coresDoModelo.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Local do velório */}
        <fieldset className="md:col-span-2 border border-[#E9E3DB] rounded-md p-3">
          <legend className="px-2 text-sm text-[#5E5A57]">Local do velório</legend>

          {/* Toggle de visibilidade */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-2">
              <input
                id="informar-agora"
                type="radio"
                name="modo-local"
                checked={informarLocalAgora}
                onChange={() => setInformarLocalAgora(true)}
              />
              <label htmlFor="informar-agora" className="text-sm">
                Informar local agora
              </label>
            </div>

            <div className="inline-flex items-center gap-2">
              <input
                id="confirmar-depois"
                type="radio"
                name="modo-local"
                checked={!informarLocalAgora}
                onChange={() => setInformarLocalAgora(false)}
              />
              <label htmlFor="confirmar-depois" className="text-sm">
                Confirmar depois no WhatsApp
              </label>
            </div>
          </div>

          {/* Área colapsável */}
          <Collapsible open={informarLocalAgora}>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Tipo</label>
                <select
                  className="w-full rounded-md border border-[#E9E3DB] p-2 bg-white"
                  value={localTipo}
                  onChange={(e) => setLocalTipo(e.target.value as TipoLocal)}
                  disabled={!informarLocalAgora}
                >
                  {["Capela", "Cemitério", "Hospital", "Igreja", "Residência", "Outro"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Nome do local</label>
                <input
                  className="w-full rounded-md border border-[#E9E3DB] p-2"
                  placeholder="Ex.: Capela Vaticano / Cemitério Municipal"
                  value={localNome}
                  onChange={(e) => setLocalNome(e.target.value)}
                  disabled={!informarLocalAgora}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Sala/Ala (opcional)</label>
                <input
                  className="w-full rounded-md border border-[#E9E3DB] p-2"
                  placeholder="Ex.: Sala 2"
                  value={localSala}
                  onChange={(e) => setLocalSala(e.target.value)}
                  disabled={!informarLocalAgora}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Cidade/UF (opcional)</label>
                <input
                  className="w-full rounded-md border border-[#E9E3DB] p-2"
                  placeholder="Ex.: Curitiba/PR"
                  value={localCidade}
                  onChange={(e) => setLocalCidade(e.target.value)}
                  disabled={!informarLocalAgora}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Endereço (opcional)</label>
                <input
                  className="w-full rounded-md border border-[#E9E3DB] p-2"
                  placeholder="Rua, número, bairro"
                  value={localEndereco}
                  onChange={(e) => setLocalEndereco(e.target.value)}
                  disabled={!informarLocalAgora}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Ponto de referência (opcional)</label>
                <input
                  className="w-full rounded-md border border-[#E9E3DB] p-2"
                  placeholder="Ex.: Próximo à portaria principal"
                  value={localReferencia}
                  onChange={(e) => setLocalReferencia(e.target.value)}
                  disabled={!informarLocalAgora}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Data/Hora (opcional)</label>
                <input
                  className="w-full rounded-md border border-[#E9E3DB] p-2"
                  placeholder="Ex.: Hoje 15h / 14/03 às 9h"
                  value={localDataHora}
                  onChange={(e) => setLocalDataHora(e.target.value)}
                  disabled={!informarLocalAgora}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Link do Google Maps (opcional)</label>
                <input
                  className="w-full rounded-md border border-[#E9E3DB] p-2"
                  placeholder="Cole aqui o link do Maps"
                  value={localMaps}
                  onChange={(e) => setLocalMaps(e.target.value)}
                  disabled={!informarLocalAgora}
                />
              </div>
            </div>
          </Collapsible>

          {!informarLocalAgora && (
            <p className="mt-2 text-[11px] text-[#7D7875]">
              Tudo bem! Vamos confirmar o local rapidamente pelo WhatsApp.
            </p>
          )}
        </fieldset>

        {/* Faixa personalizada */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">
            Faixa personalizada <span className="text-[#7D7875]">(até 60 caracteres)</span>
          </label>
          <input
            className="w-full rounded-md border border-[#E9E3DB] p-2"
            maxLength={60}
            placeholder="Ex.: Com carinho, família Silva"
            value={faixa}
            onChange={(e) => setFaixa(e.target.value)}
            aria-describedby="faixa-help faixa-count"
          />
          <p id="faixa-help" className="mt-1 text-xs text-[#7D7875]">
            Dica: toque em uma sugestão abaixo para copiar automaticamente.
          </p>
          <p id="faixa-count" className="text-[11px] text-[#7D7875]" aria-live="polite">
            {faixa.length}/60
          </p>
          <FrasesFaixa onPick={setFaixa} className="mt-2 flex flex-wrap gap-2 text-sm" />
        </div>

        {/* Destinatário */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">
            Nome do(a) homenageado(a) <span className="text-[#7D7875]">(opcional)</span>
          </label>
          <input
            className="w-full rounded-md border border-[#E9E3DB] p-2"
            placeholder="Ex.: Antônio Pereira"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
          />
        </div>
      </div>

      {/* CTA */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#2E4A3B] px-4 py-3 text-white"
        aria-label="Finalizar pedido no WhatsApp"
      >
        Finalizar no WhatsApp
      </a>

      <p className="mt-2 text-xs text-[#7D7875]">
        Confirmamos modelo, local e faixa via WhatsApp. PIX compensa na hora.
      </p>
    </section>
  );
}
