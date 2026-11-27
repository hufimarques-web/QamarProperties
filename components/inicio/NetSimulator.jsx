"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simulador "Dinheiro no bolso": quanto sobra numa venda tradicional
// (anúncio → negociação → comissão + IVA → despesas à espera → preparação)
// e como isso compara com o modelo de valor líquido da Qamar.
// Telemóvel primeiro: uma coluna, resultado logo a seguir ao preço.

const SERIF = "'Cormorant Garamond', Georgia, serif";
const MINUS = "#8A3B32";

export const SIM_DEFAULTS = {
  preco: 200000,
  desconto: 10,
  comissao: 5,
  base: "sale",
  iva: 23,
  meses: 14,
  despesas: 4000,
  preparacao: 1500,
};

const nf = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 });
export const eur = (n) => `${nf.format(Math.round(n || 0))} €`;
const digits = (s) => Number(String(s).replace(/[^\d]/g, "")) || 0;

export function calcNet(v) {
  const venda = v.preco * (1 - v.desconto / 100);
  const baseComissao = v.base === "asking" ? v.preco : venda;
  const comissao = baseComissao * (v.comissao / 100) * (1 + v.iva / 100);
  const liquido = venda - comissao - v.despesas - v.preparacao;
  return { venda, baseComissao, comissao, liquido };
}

// escalão do formulário mais próximo do valor líquido
export function bracketFor(n) {
  if (n <= 0) return "Ainda não sei";
  if (n < 150000) return "Até 150.000 €";
  if (n < 250000) return "150.000 € a 250.000 €";
  if (n <= 400000) return "250.000 € a 400.000 €";
  return "Ainda não sei";
}

const labelCls = "mb-2 block font-body text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B6157]";
const smallField =
  "h-12 w-full rounded-none border border-[#CFC8BF] bg-white px-3 font-body text-[15px] text-[#1C1719] outline-none focus:border-[#1C1719] focus:ring-1 focus:ring-[#1C1719]";

function NumField({ id, label, value, onChange, suffix, step = 1 }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className={`${smallField} pr-10`}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-body text-sm text-[#6B6157]">
          {suffix}
        </span>
      </div>
    </div>
  );
}

function SelField({ id, label, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${smallField} appearance-none pr-9`}
        >
          {options.map(([v, t]) => (
            <option key={v} value={v}>
              {t}
            </option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6157]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

function Row({ label, sub, value, minus, strong }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E4DED6] py-4">
      <div>
        <p className={`font-body text-[15px] ${strong ? "text-[#1C1719]" : "text-[#2E2724]"}`}>{label}</p>
        {sub && <p className="mt-1 font-body text-[13px] text-[#8A8078]">{sub}</p>}
      </div>
      <p
        className="shrink-0 font-body text-[16px] tabular-nums"
        style={{ color: minus ? MINUS : "#1C1719", fontWeight: strong ? 500 : 400 }}
      >
        {minus ? "−" : ""}
        {eur(Math.abs(value))}
      </p>
    </div>
  );
}

export function NetSimulator({ initial, onContinue, onSkip, idPrefix = "sim" }) {
  const [v, setV] = useState({ ...SIM_DEFAULTS, ...(initial || {}) });
  const [adjust, setAdjust] = useState(false);
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));
  const r = useMemo(() => calcNet(v), [v]);
  const ivaTxt = v.iva > 0 ? ` + ${v.iva}% IVA` : "";

  return (
    <div>
      <p className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-[#6B6157]">Simulação opcional</p>
      <h2
        id={`${idPrefix}-title`}
        className="mt-3 font-light leading-[1.02] text-[#1C1719]"
        style={{ fontFamily: SERIF, fontSize: "clamp(2.4rem, 5vw, 3.4rem)" }}
      >
        Dinheiro <em className="italic">no bolso.</em>
      </h2>
      <p className="mt-4 max-w-2xl font-body text-[15px] leading-relaxed text-[#4A423C]">
        O preço do anúncio não é o que sobra no fim. Faça as contas de uma venda tradicional com os seus valores.
      </p>
      <p className="mt-3 max-w-2xl font-body text-[13px] leading-relaxed text-[#8A8078]">
        Começamos com um exemplo: 10% de negociação, 5% de comissão + IVA, 4.000 € de despesas em 14 meses e 1.500 € de
        preparação. Não são médias de mercado nem uma previsão.
      </p>

      <div className="mt-8 h-px bg-[#E4DED6]" />

      <div className="grid grid-cols-1 gap-10 pt-8 md:grid-cols-[1fr_1.1fr] md:gap-0">
        {/* ── Valores ── */}
        <div className="md:border-r md:border-[#E4DED6] md:pr-10">
          <label htmlFor={`${idPrefix}-preco`} className={labelCls}>
            Quanto pensa pedir pela casa?
          </label>
          <div className="relative">
            <input
              id={`${idPrefix}-preco`}
              type="text"
              inputMode="numeric"
              value={nf.format(v.preco)}
              onChange={(e) => set("preco")(Math.min(digits(e.target.value), 5000000))}
              className="h-16 w-full rounded-none border border-[#CFC8BF] bg-white px-5 pr-12 font-light tabular-nums text-[#1C1719] outline-none focus:border-[#1C1719] focus:ring-1 focus:ring-[#1C1719]"
              style={{ fontFamily: SERIF, fontSize: "2rem", fontVariantNumeric: "lining-nums tabular-nums" }}
            />
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-body text-lg text-[#6B6157]">€</span>
          </div>
          <input
            type="range"
            aria-label="Ajustar preço pedido"
            min={0}
            max={1000000}
            step={5000}
            value={Math.min(v.preco, 1000000)}
            onChange={(e) => set("preco")(Number(e.target.value))}
            className="mt-6 w-full accent-[#1C1719]"
          />
          <div className="mt-1 flex justify-between font-body text-[12px] text-[#8A8078]">
            <span>0 €</span>
            <span>1 000 000 €</span>
          </div>

          <button
            type="button"
            onClick={() => setAdjust((a) => !a)}
            aria-expanded={adjust}
            className="mt-7 flex w-full items-center justify-between border-y border-[#E4DED6] py-4 text-left font-body text-[15px] text-[#1C1719]"
          >
            Ajustar custos e prazo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`transition-transform ${adjust ? "rotate-180" : ""}`}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {adjust && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pt-5 font-body text-[13px] text-[#8A8078]">Use apenas custos que se apliquem à sua venda. Pode pôr 0.</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <NumField id={`${idPrefix}-desc`} label="Negociação" suffix="%" step={0.5} value={v.desconto} onChange={set("desconto")} />
                  <NumField id={`${idPrefix}-com`} label="Comissão" suffix="%" step={0.5} value={v.comissao} onChange={set("comissao")} />
                  <div className="col-span-2 sm:col-span-1">
                    <SelField
                      id={`${idPrefix}-base`}
                      label="Comissão sobre"
                      value={v.base}
                      onChange={set("base")}
                      options={[
                        ["sale", "Preço depois da negociação"],
                        ["asking", "Preço pedido no anúncio"],
                      ]}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <SelField
                      id={`${idPrefix}-iva`}
                      label="IVA da comissão"
                      value={String(v.iva)}
                      onChange={(x) => set("iva")(Number(x))}
                      options={[
                        ["23", "23% · Continente"],
                        ["22", "22% · Madeira"],
                        ["16", "16% · Açores"],
                        ["0", "Já incluído / sem IVA"],
                      ]}
                    />
                  </div>
                  <NumField id={`${idPrefix}-meses`} label="Meses à venda" suffix="m" value={v.meses} onChange={set("meses")} />
                  <NumField id={`${idPrefix}-desp`} label="Despesas na espera" suffix="€" step={100} value={v.despesas} onChange={set("despesas")} />
                  <div className="col-span-2">
                    <NumField id={`${idPrefix}-prep`} label="Obras, limpeza e certificados" suffix="€" step={100} value={v.preparacao} onChange={set("preparacao")} />
                  </div>
                </div>
                <p className="pt-3 font-body text-[12px] leading-relaxed text-[#8A8078]">
                  Despesas na espera: IMI, condomínio, prestação, luz e água no período escolhido. Se mudar o prazo, reveja este total.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setV({ ...SIM_DEFAULTS, preco: v.preco })}
            className="mt-5 inline-flex items-center gap-2 font-body text-[14px] text-[#4A423C] underline-offset-4 hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Repor exemplo
          </button>
        </div>

        {/* ── Resultado ── */}
        <div className="md:pl-10">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B6157]">Venda tradicional</p>
          <Row label="Preço pedido no anúncio" value={v.preco} strong />
          <Row label="Desconto na negociação" sub={`${nf.format(v.desconto)}% neste exemplo`} value={v.preco - r.venda} minus />
          <Row label="Preço de venda neste exemplo" value={r.venda} strong />
          <Row label="Comissão + IVA" sub={`${nf.format(v.comissao)}%${ivaTxt} sobre ${eur(r.baseComissao)}`} value={r.comissao} minus />
          <Row label="Despesas durante a espera" sub={`Total em ${v.meses} ${v.meses === 1 ? "mês" : "meses"}`} value={v.despesas} minus />
          <Row label="Obras, limpeza e certificados" value={v.preparacao} minus />

          <div className="pt-6">
            <p className="font-body text-[15px] text-[#1C1719]">O que sobra após estes custos</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={Math.round(r.liquido)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="mt-1 font-light tabular-nums leading-none text-[#1C1719]"
                style={{ fontFamily: SERIF, fontSize: "clamp(3rem, 7vw, 4.2rem)", fontVariantNumeric: "lining-nums tabular-nums", color: r.liquido < 0 ? MINUS : undefined }}
              >
                {r.liquido < 0 ? "−" : ""}
                {eur(Math.abs(r.liquido))}
              </motion.p>
            </AnimatePresence>
            <p className="mt-2 font-body text-[14px] text-[#4A423C]">
              Num cenário de venda em {v.meses} {v.meses === 1 ? "mês" : "meses"}.
            </p>
          </div>

          {/* Qamar */}
          <div className="mt-7 bg-[#1C1719] p-6 text-[#F5F2ED]">
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.26em] text-white/55">Com a Qamar · Valor líquido</p>
            <p className="mt-3 font-light leading-snug" style={{ fontFamily: SERIF, fontSize: "1.55rem" }}>
              Diz-nos quanto quer receber. É esse o valor que recebe na escritura.
            </p>
            <ul className="mt-4 space-y-2 font-body text-[14px] leading-relaxed text-white/75">
              <li>— Sem comissão a descontar: só ganhamos o que vendermos acima do seu valor.</li>
              <li>— Venda em 60 dias. Se não vendermos, saímos e fica com as fotos e os renders.</li>
              <li>— Antes de decidir o valor, recebe o estudo de mercado da sua casa.</li>
            </ul>
          </div>

          <p className="mt-5 font-body text-[12px] leading-relaxed text-[#8A8078]">
            Estimativa, não um valor garantido. Não inclui possíveis impostos sobre mais-valias, crédito por pagar ou outros
            custos. O prazo também é uma hipótese. Esta simulação não é uma proposta nem um estudo de mercado.
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-6 mt-8 border-t border-[#E4DED6] bg-[#FAF8F4]/95 px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:p-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onSkip} className="order-2 font-body text-[14px] text-[#4A423C] underline-offset-4 hover:underline sm:order-1">
            Preencher sem simular
          </button>
          <button
            type="button"
            onClick={() => onContinue({ ...v, ...r })}
            className="btn-lux btn-lux--solid-dark order-1 w-full sm:order-2 sm:w-auto"
          >
            Continuar para o pedido
          </button>
        </div>
      </div>
    </div>
  );
}
