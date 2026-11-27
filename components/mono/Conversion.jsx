"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SIM_DEFAULTS, calcNet, eur } from "@/components/inicio/NetSimulator";

// Peças de conversão partilhadas (telemóvel primeiro):
//  FirstStep     → "O que quer vender?" + Continuar (abre o formulário já preenchido)
//  AskBand       → faixa entre secções com o primeiro passo
//  CompactSim    → simulador curto dentro da página
//  StickyCta     → barra fixa no computador (no telemóvel já existe a barra de baixo)

const EASE = [0.16, 1, 0.3, 1];
const TIPOS = ["Apartamento", "Moradia", "Outro"];

export const openSeller = (detail = {}) =>
  window.dispatchEvent(new CustomEvent("open-investment-form", { detail }));

// ── Primeiro passo do formulário ──
export function FirstStep({ tone = "light", className = "", title = "O que quer vender?", compact = false }) {
  const [tipo, setTipo] = useState("");
  const dark = tone === "dark";
  return (
    <div className={className}>
      {!compact && (
        <p className={`mb-2 text-[11px] font-medium uppercase tracking-[0.2em] ${dark ? "text-white/60" : "text-neutral-500"}`}>
          Passo 1 de 2 · Sem compromisso
        </p>
      )}
      <p className={`${compact ? "text-[17px]" : "text-[20px]"} font-medium tracking-[-0.01em] ${dark ? "text-white" : "text-[#0A0A0A]"}`}>{title}</p>
      <div className={`${compact ? "mt-3" : "mt-4"} grid grid-cols-3 gap-2`} role="radiogroup" aria-label={title}>
        {TIPOS.map((t) => {
          const on = tipo === t;
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setTipo(t)}
              className={`min-h-[48px] border px-2 text-[14px] transition-colors ${
                dark
                  ? on
                    ? "border-white bg-white text-[#0A0A0A]"
                    : "border-white/30 text-white hover:border-white/70"
                  : on
                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                    : "border-neutral-300 text-[#0A0A0A] hover:border-[#0A0A0A]"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => openSeller(tipo ? { tipo } : {})}
        className={`btn-lux mt-3 w-full ${dark ? "btn-lux--solid-light" : "btn-lux--solid-dark"}`}
      >
        Continuar
      </button>
    </div>
  );
}

// ── Faixa entre secções ──
export function AskBand({ eyebrow, title, text, className = "" }) {
  return (
    <section className={`bg-[#F4F3F0] px-5 py-16 md:px-[5vw] md:py-24 ${className}`} style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-12">
        <motion.div
          className="md:col-span-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</p>
          <h2 className="mt-4 text-[34px] font-medium leading-[1.02] tracking-[-0.035em] text-[#0A0A0A] md:text-[clamp(40px,4vw,64px)]">{title}</h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-neutral-600">{text}</p>
        </motion.div>
        <motion.div
          className="border border-neutral-200 bg-white p-5 md:col-span-5 md:col-start-8 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <FirstStep />
        </motion.div>
      </div>
    </section>
  );
}

// ── Simulador curto dentro da página ──
const nf = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 });

export function CompactSim({ className = "", dark = false }) {
  const uid = useId();
  const inputId = `csim-${uid.replace(/:/g, "")}`;
  const [preco, setPreco] = useState(SIM_DEFAULTS.preco);
  const v = useMemo(() => ({ ...SIM_DEFAULTS, preco }), [preco]);
  const r = useMemo(() => calcNet(v), [v]);
  const sim = { ...v, ...r };
  const ink = dark ? "text-white" : "text-[#0A0A0A]";
  const sub = dark ? "text-white/60" : "text-neutral-500";
  const line = dark ? "border-white/15" : "border-neutral-200";
  const rows = [
    ["Negociação (10%)", v.preco - r.venda],
    ["Comissão 5% + IVA", r.comissao],
    ["Despesas em 14 meses", v.despesas],
    ["Obras, limpeza e certificados", v.preparacao],
  ];
  return (
    <div className={className} style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <p className={`text-[11px] font-medium uppercase tracking-[0.2em] ${sub}`}>Faça as contas</p>
      <p className={`mt-2 text-[22px] font-medium leading-tight tracking-[-0.02em] ${ink}`}>Numa imobiliária comum, quanto lhe sobrava?</p>

      <label htmlFor={inputId} className={`mt-5 block text-[12px] ${sub}`}>
        Preço que pensa pedir
      </label>
      <div className={`mt-2 flex items-center border ${dark ? "border-white/25 bg-white/5" : "border-neutral-300 bg-white"}`}>
        <input
          id={inputId} data-csim
          type="text"
          inputMode="numeric"
          value={nf.format(preco)}
          onChange={(e) => setPreco(Math.min(Number(e.target.value.replace(/[^\d]/g, "")) || 0, 5000000))}
          className={`h-12 w-full bg-transparent px-4 text-[20px] tabular-nums outline-none ${ink}`}
        />
        <span className={`pr-4 ${sub}`}>€</span>
      </div>
      <input
        type="range"
        aria-label="Ajustar preço"
        min={50000}
        max={600000}
        step={5000}
        value={Math.min(Math.max(preco, 50000), 600000)}
        onChange={(e) => setPreco(Number(e.target.value))}
        className={`mt-4 w-full ${dark ? "accent-white" : "accent-[#0A0A0A]"}`}
      />

      <div className="mt-3">
        {rows.map(([k, val]) => (
          <div key={k} className={`flex justify-between border-b py-2.5 text-[14px] ${line}`}>
            <span className={sub}>{k}</span>
            <span className="tabular-nums text-[#B0483B]">−{eur(val)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <span className={`text-[14px] ${sub}`}>Sobrava-lhe no fim</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={Math.round(r.liquido)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={`text-[34px] font-medium leading-none tracking-[-0.03em] tabular-nums ${ink}`}
          >
            {eur(r.liquido)}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-2 text-right text-[13px] tabular-nums text-[#B0483B]">
        Perdia {eur(Math.max(0, v.preco - r.liquido))} do preço que pediu.
      </p>
      <p className={`mt-4 border-t pt-4 text-[14px] leading-relaxed ${line} ${dark ? "text-white/80" : "text-neutral-700"}`}>
        <span className={`font-medium ${ink}`}>Com a Qamar</span> recebe o valor que nos disser, sem comissão a descontar,
        em 60 dias.
      </p>
      <button
        type="button"
        onClick={() => openSeller({ simulacao: sim })}
        className={`btn-lux mt-5 w-full ${dark ? "btn-lux--solid-light" : "btn-lux--solid-dark"}`}
      >
        Continuar para o pedido
      </button>
      <button
        type="button"
        onClick={() => openSeller({ view: "sim", simulacao: sim })}
        className={`mt-3 w-full text-center text-[13px] underline-offset-4 hover:underline ${sub}`}
      >
        Ajustar custos e prazo
      </button>
      <p className={`mt-3 text-[11px] leading-relaxed ${dark ? "text-white/40" : "text-neutral-400"}`}>
        Exemplo com 10% de negociação, 5% + IVA, 4.000 € de despesas e 1.500 € de preparação. Estimativa, não uma proposta.
      </p>
    </div>
  );
}

// ── Barra fixa (computador) ──
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hidden = new Set();
    const els = document.querySelectorAll("[data-hide-cta]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? hidden.add(e.target) : hidden.delete(e.target)));
        update();
      },
      { threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    const update = () => setShow(window.scrollY > 300 && hidden.size === 0);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-6 z-[900] hidden justify-center md:flex"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          <div className="flex items-center gap-6 border border-black/[0.06] bg-white/90 py-2 pl-6 pr-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md">
            <p className="text-[14px] text-[#0A0A0A]">Quanto recebe pela sua casa?</p>
            <button type="button" onClick={() => openSeller({ view: "sim" })} className="text-[13px] text-neutral-500 underline-offset-4 hover:text-black hover:underline">
              Fazer as contas
            </button>
            <button type="button" onClick={() => openSeller()} className="btn-lux btn-lux--solid-dark btn-lux--no-arrow min-h-[44px] px-6 text-[10px]">
              Pedir estudo de mercado
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
