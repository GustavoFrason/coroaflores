"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FrasesFaixa from "@/components/common/FrasesFaixa";
import { PRODUTOS, getProduto, type ProdutoId } from "@/lib/models";
import { WHATS_NUMBER, PRECO_FAIXA } from "@/lib/constants";
import { withUtm } from "@/lib/utm";
import { calcularTotal, precoAtual, formatCurrency, makeWaUrl } from "@/lib/utils";

type TipoLocal = "Capela" | "Cemitério" | "Hospital" | "Igreja" | "Residência" | "Outro";

/** Pequeno helper para um colapso suave sem libs */
function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
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
  /** ========================
   * Estado principal
   * ======================== */
  const hasCatalog = Array.isArray(PRODUTOS) && PRODUTOS.length > 0;

  // inicia com o primeiro id, se existir
  const firstId = hasCatalog ? (PRODUTOS[0].id as ProdutoId) : null;
  const [produtoId, setProdutoId] = useState<ProdutoId | null>(firstId);

  // Atributos do pedido
  const [cor, setCor] = useState<string>("");
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

  // Ref para focar no primeiro campo ao vir do catálogo
  const produtoSelectRef = useRef<HTMLSelectElement>(null);

  // Lê #pedido-rapido?pid=...&cor=... e pré-seleciona produto/cor
  useEffect(() => {
    const applyFromHash = () => {
      if (typeof window === "undefined") return;
      if (!hasCatalog) return;

      const hash = window.location.hash || "";
      const [path, query = ""] = hash.split("?");
      if (!path || !path.startsWith("#pedido-rapido")) return;

      const params = new URLSearchParams(query);
      const pid = params.get("pid");
      const corParam = params.get("cor");

      // Se pid for válido, define produto
      if (pid && PRODUTOS.some((p) => p.id === pid)) {
        setProdutoId(pid as ProdutoId);

        const prod = getProduto(pid as ProdutoId);
        if (corParam && prod.coresSugeridas?.includes(corParam)) {
          setCor(corParam);
        }
        // foca no primeiro campo do formulário
        setTimeout(() => produtoSelectRef.current?.focus(), 0);
        return;
      }

      // Sem pid: tenta aplicar cor no produto atual (se compatível)
      if (produtoId && corParam) {
        const prod = getProduto(produtoId);
        if (prod.coresSugeridas?.includes(corParam)) {
          setCor(corParam);
          setTimeout(() => produtoSelectRef.current?.focus(), 0);
        }
      }
    };

    applyFromHash(); // aplica na montagem
    window.addEventListener("hashchange", applyFromHash); // e em mudanças
    return () => window.removeEventListener("hashchange", applyFromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtoId, hasCatalog]);

  /** Se por algum motivo produtoId não vier, seleciona o primeiro disponível */
  useEffect(() => {
    if (!produtoId && hasCatalog) {
      setProdutoId(PRODUTOS[0].id as ProdutoId);
    }
  }, [produtoId, hasCatalog]);

  /** Quando trocar o produto, seta a primeira cor sugerida (se existir) */
  useEffect(() => {
    if (!produtoId) return;
    const p = getProduto(produtoId);
    const first = p.coresSugeridas?.[0];
    setCor(first ?? "");
  }, [produtoId]);

  /** Guards */
  if (!hasCatalog) {
    return (
      <section
        id="pedido-rapido"
        className="bg-white border border-[#E9E3DB] rounded-xl p-4 md:p-6 scroll-mt-24"
        aria-labelledby="quickorder-title"
      >
        <h3 id="quickorder-title" className="text-lg font-semibold">
          Monte sua coroa
        </h3>
        <p className="mt-2 text-sm text-[#7D7875]">Catálogo vazio.</p>
      </section>
    );
  }

  if (!produtoId) {
    return (
      <section
        id="pedido-rapido"
        className="bg-white border border-[#E9E3DB] rounded-xl p-4 md:p-6 scroll-mt-24"
        aria-labelledby="quickorder-title"
      >
        <h3 id="quickorder-title" className="text-lg font-semibold">
          Monte sua coroa
        </h3>
        <p className="mt-2 text-sm text-[#7D7875]">Carregando produtos…</p>
      </section>
    );
  }

  /** ========================
   * Derivações e helpers
   * ======================== */
  const produto = getProduto(produtoId);
  const coresDoProduto = produto.coresSugeridas ?? [];

  // Monta um resumo de local
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

  // Preço “de/por”
  const { valor: precoAtualProduto, de: precoDe, desconto, emPromocao } = precoAtual(produto);

  // Resumo financeiro (base + faixa)
  const resumo = useMemo(
    () =>
      calcularTotal({
        produtoId,
        faixaPersonalizada: faixa.trim().length > 0,
        textoFaixa: faixa.trim() || undefined,
        homenageado: destinatario || undefined,
        cores: cor ? [cor] : [],
        localEntrega: localResumo,
      }),
    [produtoId, faixa, destinatario, cor, localResumo]
  );

  // Link do WhatsApp com UTM
  const waHref = useMemo(() => {
    const url = makeWaUrl(WHATS_NUMBER, {
      produtoId,
      faixaPersonalizada: faixa.trim().length > 0,
      textoFaixa: faixa.trim() || undefined,
      homenageado: destinatario || undefined,
      cores: cor ? [cor] : [],
      localEntrega: localResumo,
    });
    const utmContent = informarLocalAgora ? "quickorder_cta_local_on" : "quickorder_cta_local_off";
    return withUtm(url, utmContent);
  }, [produtoId, faixa, destinatario, cor, localResumo, informarLocalAgora]);

  /** ========================
   * Render
   * ======================== */
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
        {/* Produto */}
        <div>
          <label className="block text-sm mb-1">Produto</label>
          <select
            ref={produtoSelectRef}
            className="w-full rounded-md border border-[#E9E3DB] p-2 bg-white"
            value={produtoId ?? ""}
            onChange={(e) => setProdutoId(e.target.value as ProdutoId)}
          >
            {PRODUTOS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          {/* Preço “de/por” */}
          <div className="mt-2 flex items-baseline gap-2">
            {precoDe !== undefined && (
              <span className="text-sm line-through text-[#7D7875]">
                {formatCurrency(precoDe)}
              </span>
            )}
            <span className="text-xl font-serif text-[#2E4A3B]">
              {formatCurrency(precoAtualProduto)}
            </span>
            {emPromocao && (
              <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-[#2E4A3B] text-white">
                -{desconto}%
              </span>
            )}
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
            {coresDoProduto.length > 0 ? (
              coresDoProduto.map((c) => <option key={c}>{c}</option>)
            ) : (
              <option value="">Sem preferência</option>
            )}
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
                  {["Capela", "Cemitério", "Hospital", "Igreja", "Residência", "Outro"].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
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

        {/* Nota de frete (contextual ao local informado) */}
        <p className="text-[11px] text-[#7D7875] md:col-span-2 -mt-2" role="note">
          <strong>Frete:</strong> calculado conforme a região/cidade informada. Confirmamos o valor no WhatsApp.
        </p>

        {/* Faixa personalizada */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">
            Faixa personalizada{" "}
            <span className="text-[#7D7875]">
              (até 40 caracteres) — custo adicional de {formatCurrency(PRECO_FAIXA)}
            </span>
          </label>
          <input
            className="w-full rounded-md border border-[#E9E3DB] p-2"
            maxLength={40}
            placeholder='Ex.: Com carinho, família Silva'
            value={faixa}
            onChange={(e) => setFaixa(e.target.value)}
            aria-describedby="faixa-help faixa-count"
          />
          <p id="faixa-help" className="mt-1 text-xs text-[#7D7875]">
            Dica: toque em uma sugestão abaixo para copiar automaticamente.
          </p>
          <p id="faixa-count" className="text-[11px] text-[#7D7875]" aria-live="polite">
            {faixa.length}/40
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

      {/* Resumo de preço */}
      <div className="mt-4 rounded-lg bg-[#FAF8F5] border border-[#EFEAE6] p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-[#5E5A57]">
            <div className="flex items-baseline gap-2">
              {precoDe !== undefined && (
                <span className="text-sm line-through text-[#7D7875]">
                  {formatCurrency(precoDe)}
                </span>
              )}
              <span className="text-xl font-serif text-[#2E4A3B]">
                {formatCurrency(precoAtualProduto)}
              </span>
              {emPromocao && (
                <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-[#2E4A3B] text-white">
                  -{desconto}%
                </span>
              )}
            </div>
            {faixa.trim().length > 0 && (
              <div className="text-sm">
                Faixa: <strong>{formatCurrency(PRECO_FAIXA)}</strong>
              </div>
            )}
            <div className="text-xs text-[#7D7875] mt-1">Frete calculado conforme a região.</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#7D7875]">Total estimado</div>
            <div className="text-2xl font-serif text-[#2E4A3B]">{formatCurrency(resumo.total)}</div>
          </div>
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
        Confirmamos detalhes e valores via WhatsApp. PIX compensa na hora.
      </p>
    </section>
  );
}
