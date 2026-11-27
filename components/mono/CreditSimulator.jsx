"use client";

import React, { useMemo, useState } from "react";
import { SANS } from "./MonoHero";

// Simulador de crédito à habitação (Portugal, continente), o mais perto possível
// do que o banco vai calcular. Regras e valores à data de novembro de 2026:
//  • Taxa de esforço máxima 50 %, testada com subida do indexante (+0,5 p.p. até 5 anos,
//    +1 p.p. até 10 anos, +1,5 p.p. acima de 10 anos) na taxa variável;
//    financiamento até 100 % do menor valor entre preço e avaliação (80 % se não for
//    habitação própria e permanente) — valores definidos pela Qamar; prazo até 40 anos até aos 35 anos de idade e
//    35 anos acima disso; se o crédito acabar depois dos 70 anos, o rendimento é cortado.
//  • IMT 2026 (continente) e IMT Jovem (isenção até 330 539 €, parcial até 660 982 €).
//  • Imposto do Selo: 0,8 % na compra, 0,6 % sobre o montante do crédito, 4 % sobre os juros.
// Comissões, registos e seguros são médias de mercado; cada banco tem os seus valores.

export const CREDIT_DEFAULTS = {
  euribor: 3.06, // Euribor 6 meses, 27/11/2026
  euriborDate: "27/11/2026",
  spread: 0.85,
  fixa: 3.4,
};

const DSTI_MAX = 0.5;

// IMT 2026, continente
const IMT_HPP = [
  [106346, 0, 0],
  [145470, 0.02, 2126.92],
  [198347, 0.05, 6491.02],
  [330539, 0.07, 10457.96],
  [660982, 0.08, 13763.35],
];
const IMT_SEC = [
  [106346, 0.01, 0],
  [145470, 0.02, 1063.46],
  [198347, 0.05, 5427.56],
  [330539, 0.07, 9394.5],
  [633931, 0.08, 12699.89],
];
const JOVEM_TOTAL = 330539;
const JOVEM_PARCIAL = 660982;

function imtNormal(v, hpp) {
  const table = hpp ? IMT_HPP : IMT_SEC;
  for (const [lim, rate, abater] of table) if (v <= lim) return Math.max(0, v * rate - abater);
  if (v <= 1150853) return v * 0.06;
  return v * 0.075;
}

export function impostosCompra(v, { hpp, jovem }) {
  if (hpp && jovem) {
    if (v <= JOVEM_TOTAL) return { imt: 0, selo: 0, isento: "total" };
    if (v <= JOVEM_PARCIAL) return { imt: (v - JOVEM_TOTAL) * 0.08, selo: (v - JOVEM_TOTAL) * 0.008, isento: "parcial" };
  }
  return { imt: imtNormal(v, hpp), selo: v * 0.008, isento: null };
}

const pmt = (L, r, n) => (r === 0 ? L / n : (L * r) / (1 - Math.pow(1 + r, -n)));
const pv = (P, r, n) => (r === 0 ? P * n : (P * (1 - Math.pow(1 + r, -n))) / r);

// prémio anual do seguro de vida por cada 1 € em dívida (média de mercado, por idade)
function vidaRate(idade) {
  if (idade <= 30) return 0.0011;
  if (idade <= 40) return 0.0017;
  if (idade <= 50) return 0.0032;
  if (idade <= 60) return 0.0062;
  return 0.0105;
}

// TAEG: taxa anual efetiva que iguala o dinheiro recebido a tudo o que se paga
function taeg(recebido, pagamentos) {
  let i = 0.003;
  for (let k = 0; k < 60; k++) {
    let f = -recebido;
    let df = 0;
    for (let t = 0; t < pagamentos.length; t++) {
      const d = Math.pow(1 + i, -(t + 1));
      f += pagamentos[t] * d;
      df -= (t + 1) * pagamentos[t] * d / (1 + i);
    }
    const step = f / df;
    i -= step;
    if (Math.abs(step) < 1e-10) break;
  }
  return Math.pow(1 + i, 12) - 1;
}

export function simularCredito(x) {
  const preco = Math.max(0, x.preco || 0);
  const titulares = x.titulares === 2 ? 2 : 1;
  const idade = Math.max(18, Math.min(75, x.idade || 30));
  const jovem = x.hpp && x.primeira && idade <= 35;

  // quanto o banco empresta
  const avaliacao = preco * (x.avaliacao || 1);
  const baseBanco = Math.min(preco, avaliacao);
  const ltvMax = x.hpp ? 1 : 0.8;
  const maxLtv = baseBanco * ltvMax;
  const pedido = Math.max(0, preco - (x.entrada || 0));
  const montante = Math.min(pedido, maxLtv);
  const falta = Math.max(0, pedido - maxLtv); // capital próprio que falta para a entrada
  const entradaMin = Math.max(0, preco - maxLtv);

  // prazo máximo pela idade (titular mais velho)
  const prazoMax = idade <= 35 ? 40 : 35;
  const prazo = Math.max(5, Math.min(prazoMax, x.prazo || prazoMax));
  const n = prazo * 12;

  // taxa
  const variavel = x.tipo !== "fixa";
  const tan = variavel ? (x.euribor || 0) + (x.spread || 0) : x.fixa || 0;
  const r = tan / 100 / 12;
  const prestacao = pmt(montante, r, n);
  const seloJuros = montante * r * 0.04; // 1.º mês

  // seguros obrigatórios (estimativa)
  const vidaMes = (montante * vidaRate(idade) * (titulares === 2 ? 1.8 : 1)) / 12;
  const multiMes = (preco * 0.0011) / 12;
  const processamento = 2.5;
  const mensalTotal = prestacao + seloJuros + vidaMes + multiMes + processamento;

  // custos até à escritura
  const imp = impostosCompra(preco, { hpp: x.hpp, jovem });
  const seloMutuo = montante * 0.006;
  const avaliacaoBanco = montante > 0 ? 230 : 0;
  const comissoes = montante > 0 ? 650 : 0;
  const registos = 700 + (montante > 0 ? 450 : 0); // Casa Pronta (compra) + registo da hipoteca
  const custos = imp.imt + imp.selo + seloMutuo + avaliacaoBanco + comissoes + registos;
  const entradaReal = preco - montante;
  const dinheiro = entradaReal + custos;

  // taxa de esforço (máximo 50 %, com teste de subida de juros)
  const choque = variavel ? (prazo > 10 ? 1.5 : prazo > 5 ? 1 : 0.5) : 0;
  const rS = (tan + choque) / 100 / 12;
  const prestacaoStress = pmt(montante, rS, n);
  const acima70 = Math.max(0, idade + prazo - 70);
  // crédito a acabar depois dos 70 anos: o banco corta pelo menos 20 % ao rendimento
  const corte = x.reformado || !acima70 ? 0 : 0.2;
  const rendimento = Math.max(0, x.rendimento || 0);
  const rendAjust = rendimento * (1 - corte);
  const outros = Math.max(0, x.outros || 0);
  const dsti = rendAjust > 0 ? (prestacaoStress + outros) / rendAjust : Infinity;
  const dstiReal = rendimento > 0 ? (prestacao + seloJuros + vidaMes + multiMes + outros) / rendimento : Infinity;

  // quanto pode pedir e a que preço pode comprar
  const maxPrest = Math.max(0, DSTI_MAX * rendAjust - outros);
  const maxCredRend = pv(maxPrest, rS, n);
  const fator = ltvMax * Math.min(1, x.avaliacao || 1);
  const ent = x.entrada || 0;
  const precoPelaEntrada = fator < 1 ? ent / (1 - fator) : Infinity;
  const precoMax = Math.min(ent + maxCredRend, precoPelaEntrada);

  // plano de pagamentos (taxa constante)
  const anos = [];
  let divida = montante;
  let totalJuros = 0;
  let totalSeloJuros = 0;
  let totalSeguros = 0;
  const fluxos = [];
  for (let a = 1; a <= prazo; a++) {
    let cap = 0;
    let jur = 0;
    for (let m = 0; m < 12; m++) {
      const j = divida * r;
      const c = prestacao - j;
      const vida = (divida * vidaRate(idade + a - 1) * (titulares === 2 ? 1.8 : 1)) / 12;
      jur += j;
      cap += c;
      totalSeloJuros += j * 0.04;
      totalSeguros += vida + multiMes;
      fluxos.push(prestacao + j * 0.04 + vida + multiMes + processamento);
      divida = Math.max(0, divida - c);
    }
    totalJuros += jur;
    anos.push({ ano: a, capital: cap, juros: jur, divida });
  }
  const custosCredito = seloMutuo + avaliacaoBanco + comissoes + (montante > 0 ? 450 : 0);
  const taxaAnual = montante > 0 ? taeg(montante - custosCredito, fluxos) : 0;
  const mtic = montante + totalJuros + totalSeloJuros + totalSeguros + custosCredito + processamento * n;

  // cenários de Euribor
  const cenarios = variavel
    ? [-0.5, 0, 1, 2].map((d) => ({ d, tan: tan + d, prest: pmt(montante, Math.max(0, tan + d) / 100 / 12, n) }))
    : [];

  return {
    preco, avaliacao, baseBanco, ltvMax, montante, falta, entradaMin, entradaReal, prazo, prazoMax, n,
    variavel, tan, prestacao, seloJuros, vidaMes, multiMes, processamento, mensalTotal,
    imp, seloMutuo, avaliacaoBanco, comissoes, registos, custos, dinheiro,
    choque, prestacaoStress, corte, acima70, rendAjust, dsti, dstiReal, maxCredRend, precoMax,
    anos, totalJuros, totalSeloJuros, totalSeguros, taxaAnual, mtic, cenarios, jovem,
    ltv: preco > 0 ? montante / baseBanco : 0,
  };
}

// ── formato ──
// milhares sempre separados por espaço (o pt-PT não separa números de 4 algarismos)
const grp = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const eur0 = (v) => (isFinite(v) ? `${v < 0 ? "−" : ""}${grp(Math.round(Math.abs(v)))} €` : "—");
const eur2 = (v) => {
  if (!isFinite(v)) return "—";
  const [i, d] = Math.abs(v).toFixed(2).split(".");
  return `${v < 0 ? "−" : ""}${grp(i)},${d} €`;
};
const pct = (v, d = 1) => (isFinite(v) ? `${(v * 100).toLocaleString("pt-PT", { minimumFractionDigits: d, maximumFractionDigits: d })} %` : "—");
const num = (v, d = 2) => v.toLocaleString("pt-PT", { minimumFractionDigits: d, maximumFractionDigits: d });

// ── campos ──
const fieldCls =
  "h-12 w-full border border-neutral-300 bg-white px-4 text-[16px] text-[#0A0A0A] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#0A0A0A]";
const labelCls = "mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500";

function Money({ id, label, value, onChange, hint, suffix = "€" }) {
  const shown = value ? grp(Math.round(value)) : "";
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className={`${fieldCls} pr-10 tabular-nums`}
          value={shown}
          onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, "").slice(0, 9)) || 0)}
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">{suffix}</span>
      </div>
      {hint ? <p className="mt-1.5 text-[12px] leading-snug text-neutral-500">{hint}</p> : null}
    </div>
  );
}

function Rate({ id, label, value, onChange, step = 0.01, hint }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}</label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={0}
          className={`${fieldCls} pr-10 tabular-nums`}
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">%</span>
      </div>
      {hint ? <p className="mt-1.5 text-[12px] leading-snug text-neutral-500">{hint}</p> : null}
    </div>
  );
}

function Choice({ label, value, options, onChange }) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }} role="radiogroup" aria-label={label}>
        {options.map(([v, t]) => {
          const on = value === v;
          return (
            <button
              key={String(v)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(v)}
              className={`min-h-[48px] border px-2 text-[14px] transition-colors ${
                on ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-neutral-300 text-[#0A0A0A] hover:border-[#0A0A0A]"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Row({ k, v, sub, strong, neg }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <div>
        <p className={`text-[14px] ${strong ? "font-medium text-[#0A0A0A]" : "text-neutral-700"}`}>{k}</p>
        {sub ? <p className="mt-0.5 text-[12px] text-neutral-500">{sub}</p> : null}
      </div>
      <p className={`shrink-0 tabular-nums text-[14px] ${strong ? "font-medium text-[#0A0A0A]" : neg ? "text-neutral-700" : "text-neutral-700"}`}>{v}</p>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="border-t border-neutral-200 pt-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">{title}</p>
      <div className="mt-2 divide-y divide-neutral-100">{children}</div>
    </div>
  );
}

export function CreditSimulator({ onContinue }) {
  const [v, setV] = useState({
    preco: 220000,
    entrada: 22000,
    entradaAuto: true,
    avaliacao: 1,
    prazo: 40,
    idade: 30,
    titulares: 2,
    rendimento: 2800,
    outros: 0,
    tipo: "variavel",
    euribor: CREDIT_DEFAULTS.euribor,
    spread: CREDIT_DEFAULTS.spread,
    fixa: CREDIT_DEFAULTS.fixa,
    hpp: true,
    primeira: true,
    reformado: false,
  });
  const [plano, setPlano] = useState(false);
  const set = (k) => (val) =>
    setV((s) => {
      const next = { ...s, [k]: val };
      if (k === "entrada") next.entradaAuto = false;
      if (k === "preco" && s.entradaAuto) next.entrada = Math.round(val * 0.1);
      return next;
    });

  const r = useMemo(() => simularCredito(v), [v]);
  const ok = r.dsti <= DSTI_MAX && r.falta === 0;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16" style={{ fontFamily: SANS }}>
      {/* ── dados ── */}
      <div className="space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Money id="cs-preco" label="Preço da casa" value={v.preco} onChange={set("preco")} />
          </div>
          <Money
            id="cs-entrada"
            label="Entrada (capital próprio)"
            value={v.entrada}
            onChange={set("entrada")}
            hint={`Mínimo para este preço: ${eur0(r.entradaMin)} (${pct(r.preco ? r.entradaMin / r.preco : 0, 0)})`}
          />
          <Choice
            label="Avaliação do banco"
            value={v.avaliacao}
            onChange={set("avaliacao")}
            options={[[1, "100 %"], [0.95, "95 %"], [0.9, "90 %"]]}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Money id="cs-rend" label="Rendimento líquido mensal" value={v.rendimento} onChange={set("rendimento")} hint="De todos os titulares, depois de impostos (média de 12 meses)." />
          <Money id="cs-outros" label="Outros créditos por mês" value={v.outros} onChange={set("outros")} hint="Carro, pessoal, cartões." />
          <div>
            <label htmlFor="cs-idade" className={labelCls}>Idade do titular mais velho</label>
            <input
              id="cs-idade"
              type="number"
              inputMode="numeric"
              min={18}
              max={75}
              className={`${fieldCls} tabular-nums`}
              value={v.idade}
              onChange={(e) => set("idade")(parseInt(e.target.value || "0", 10))}
            />
          </div>
          <Choice label="Titulares" value={v.titulares} onChange={set("titulares")} options={[[1, "1"], [2, "2"]]} />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="cs-prazo" className={labelCls}>Prazo</label>
            <span className="text-[14px] font-medium tabular-nums text-[#0A0A0A]">{r.prazo} anos</span>
          </div>
          <input
            id="cs-prazo"
            type="range"
            min={5}
            max={r.prazoMax}
            step={1}
            value={Math.min(v.prazo, r.prazoMax)}
            onChange={(e) => set("prazo")(parseInt(e.target.value, 10))}
            className="w-full accent-[#0A0A0A]"
          />
          <p className="mt-1 text-[12px] text-neutral-500">
            Máximo {r.prazoMax} anos para {v.idade <= 35 ? "quem tem até 35 anos" : "quem tem mais de 35 anos"}.
          </p>
        </div>

        <div className="space-y-5">
          <Choice label="Tipo de taxa" value={v.tipo} onChange={set("tipo")} options={[["variavel", "Variável"], ["fixa", "Fixa"]]} />
          {v.tipo === "variavel" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Rate id="cs-eur" label="Euribor 6 meses" value={v.euribor} onChange={set("euribor")} hint={`Valor de ${CREDIT_DEFAULTS.euriborDate}.`} />
              <Rate id="cs-spread" label="Spread" value={v.spread} onChange={set("spread")} hint="Com ordenado e seguros no banco: 0,6 a 1 %." />
            </div>
          ) : (
            <Rate id="cs-fixa" label="TAN fixa" value={v.fixa} onChange={set("fixa")} hint="Para todo o prazo. Peça a proposta ao banco." />
          )}
        </div>

        <div className="space-y-5">
          <Choice label="Para que é a casa?" value={v.hpp} onChange={set("hpp")} options={[[true, "Habitação própria"], [false, "Segunda casa"]]} />
          {v.hpp ? (
            <Choice label="É a primeira casa que compra?" value={v.primeira} onChange={set("primeira")} options={[[true, "Sim"], [false, "Não"]]} />
          ) : null}
          {r.acima70 > 0 ? (
            <label className="flex cursor-pointer items-start gap-3 border border-neutral-300 bg-white p-4">
              <input type="checkbox" checked={v.reformado} onChange={(e) => set("reformado")(e.target.checked)} className="mt-1 size-4 accent-[#0A0A0A]" />
              <span>
                <span className="block text-[14px] font-medium text-[#0A0A0A]">Já estou reformado</span>
                <span className="mt-1 block text-[12px] leading-snug text-neutral-500">
                  O crédito acaba depois dos 70 anos: o banco corta o rendimento na conta da taxa de esforço, a não ser que já esteja reformado.
                </span>
              </span>
            </label>
          ) : null}
        </div>
      </div>

      {/* ── resultado ── */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-neutral-200 bg-white p-6 md:p-8">
          <div className={`mb-6 flex items-start gap-3 px-4 py-3 text-[14px] leading-snug ${ok ? "bg-[#F1F5EF] text-[#24402A]" : "bg-[#FBF1EE] text-[#7A2E1F]"}`}>
            <span aria-hidden="true" className="mt-0.5">{ok ? "✓" : "!"}</span>
            <span>
              {r.falta > 0
                ? `Falta entrada: o banco empresta no máximo ${eur0(r.baseBanco * r.ltvMax)}. Precisa de mais ${eur0(r.falta)} de capital próprio.`
                : r.dsti <= DSTI_MAX
                  ? `Passa: taxa de esforço de ${pct(r.dsti)} com o teste de subida de juros (máximo 50 %).`
                  : `Não passa: com o teste de subida de juros, a taxa de esforço fica em ${pct(r.dsti)} (máximo 50 %). Baixe o preço, aumente a entrada ou o prazo.`}
            </span>
          </div>

          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">Prestação mensal</p>
          <p className="mt-2 font-medium tabular-nums tracking-[-0.03em] text-[#0A0A0A]" style={{ fontSize: "clamp(44px, 5vw, 64px)", lineHeight: 1 }}>
            {eur0(r.mensalTotal)}
          </p>
          <p className="mt-2 text-[13px] text-neutral-500">
            Com seguros e impostos. Só capital e juros: {eur2(r.prestacao)}.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 border-y border-neutral-200 py-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">TAN</p>
              <p className="mt-1 text-[18px] font-medium tabular-nums">{num(r.tan)} %</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">TAEG</p>
              <p className="mt-1 text-[18px] font-medium tabular-nums">{num(r.taxaAnual * 100)} %</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Financiamento</p>
              <p className="mt-1 text-[18px] font-medium tabular-nums">{pct(r.ltv, 0)}</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <Block title="Todos os meses">
              <Row k="Capital e juros" v={eur2(r.prestacao)} sub={`${eur0(r.montante)} a ${r.prazo} anos, TAN ${num(r.tan)} %`} />
              <Row k="Imposto do Selo sobre os juros" v={eur2(r.seloJuros)} sub="4 % dos juros do mês" />
              <Row k="Seguro de vida" v={eur2(r.vidaMes)} sub={`Estimativa para ${v.titulares === 2 ? "2 titulares" : "1 titular"}, ${v.idade} anos`} />
              <Row k="Seguro multirriscos" v={eur2(r.multiMes)} sub="Estimativa" />
              <Row k="Comissão de processamento" v={eur2(r.processamento)} />
              <Row k="Total por mês" v={eur2(r.mensalTotal)} strong />
            </Block>

            <Block title="Dinheiro até à escritura">
              <Row k="Entrada" v={eur0(r.entradaReal)} sub={`${pct(r.preco ? r.entradaReal / r.preco : 0, 0)} do preço`} />
              <Row
                k="IMT"
                v={eur0(r.imp.imt)}
                sub={r.imp.isento === "total" ? "Isento (IMT Jovem)" : r.imp.isento === "parcial" ? "Isenção parcial (IMT Jovem)" : v.hpp ? "Tabela 2026, habitação própria" : "Tabela 2026, segunda casa"}
              />
              <Row k="Imposto do Selo na compra" v={eur0(r.imp.selo)} sub={r.imp.isento === "total" ? "Isento (IMT Jovem)" : "0,8 % do preço"} />
              <Row k="Imposto do Selo sobre o crédito" v={eur0(r.seloMutuo)} sub="0,6 % do montante" />
              <Row k="Avaliação e comissões do banco" v={eur0(r.avaliacaoBanco + r.comissoes)} sub="Média de mercado" />
              <Row k="Escritura e registos" v={eur0(r.registos)} sub="Compra e hipoteca" />
              <Row k="Total até à escritura" v={eur0(r.dinheiro)} strong />
            </Block>

            <Block title="Taxa de esforço">
              <Row k="Hoje" v={pct(r.dstiReal)} sub="Prestação, seguros e outros créditos sobre o rendimento" />
              <Row
                k="Com teste de subida de juros"
                v={pct(r.dsti)}
                sub={r.variavel ? `Prestação a ${num(r.tan + r.choque)} % (+${num(r.choque, 1)} p.p.): ${eur0(r.prestacaoStress)}` : "Taxa fixa: sem teste de subida"}
                strong
              />
              {r.corte > 0 ? <Row k="Rendimento considerado" v={eur0(r.rendAjust)} sub="Menos 20 %: o crédito acaba depois dos 70 anos" /> : null}
              <Row k="Crédito máximo pelo seu rendimento" v={eur0(r.maxCredRend)} />
              <Row k="Preço máximo com esta entrada" v={eur0(r.precoMax)} strong />
            </Block>

            {r.variavel ? (
              <Block title="Se a Euribor mudar">
                <div className="grid grid-cols-4 gap-2 py-3 text-center">
                  {r.cenarios.map((c) => (
                    <div key={c.d} className={`border px-2 py-3 ${c.d === 0 ? "border-[#0A0A0A]" : "border-neutral-200"}`}>
                      <p className="text-[11px] text-neutral-500">{c.d === 0 ? "Hoje" : `${c.d > 0 ? "+" : "−"}${num(Math.abs(c.d), 1)} p.p.`}</p>
                      <p className="mt-1 text-[15px] font-medium tabular-nums">{eur0(c.prest)}</p>
                    </div>
                  ))}
                </div>
              </Block>
            ) : null}

            <Block title="No fim do crédito">
              <Row k="Juros" v={eur0(r.totalJuros)} />
              <Row k="Impostos, seguros e comissões" v={eur0(r.mtic - r.montante - r.totalJuros)} />
              <Row k="Total que paga ao banco (MTIC)" v={eur0(r.mtic)} strong />
            </Block>

            <div className="border-t border-neutral-200 pt-5">
              <button type="button" onClick={() => setPlano((p) => !p)} className="flex w-full items-center justify-between text-[14px] font-medium text-[#0A0A0A]">
                Plano de pagamentos, ano a ano
                <span aria-hidden="true">{plano ? "−" : "+"}</span>
              </button>
              {plano ? (
                <div className="mt-3 max-h-[320px] overflow-y-auto">
                  <table className="w-full text-right text-[13px] tabular-nums">
                    <thead className="sticky top-0 bg-white text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                      <tr>
                        <th className="py-2 text-left font-medium">Ano</th>
                        <th className="py-2 font-medium">Capital</th>
                        <th className="py-2 font-medium">Juros</th>
                        <th className="py-2 font-medium">Em dívida</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {r.anos.map((a) => (
                        <tr key={a.ano}>
                          <td className="py-1.5 text-left">{a.ano}</td>
                          <td className="py-1.5">{eur0(a.capital)}</td>
                          <td className="py-1.5">{eur0(a.juros)}</td>
                          <td className="py-1.5">{eur0(a.divida)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </div>

          {onContinue ? (
            <button type="button" onClick={() => onContinue(v, r)} className="btn-lux btn-lux--solid-dark mt-8 w-full">
              Entrar na base com esta simulação
            </button>
          ) : null}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-neutral-500">
          Simulação indicativa, não é uma proposta de crédito. Usa taxa de esforço máxima de 50 % com teste de subida de juros, financiamento até 100 %, as
          tabelas de IMT de 2026 (continente) e médias de mercado para comissões, registos e seguros. A taxa variável é revista a cada 6
          meses; o plano assume a taxa de hoje até ao fim. A aprovação e as condições finais são sempre do banco.
        </p>
      </div>
    </div>
  );
}
