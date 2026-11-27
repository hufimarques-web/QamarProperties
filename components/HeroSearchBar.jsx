"use client";

import React, { useState } from "react";

// Barra do topo ao estilo da Emaar: vidro escuro translúcido, células com
// legenda pequena em maiúsculas e um valor com seta. Abre o formulário de
// venda já preenchido com as escolhas.
// Telemóvel: uma só barra ("Quanto recebo pela casa? | PEDIR").

const FIELDS = [
  {
    id: "zona",
    label: "Zona",
    options: [
      "Aveiro (centro)",
      "Esgueira / Aradas / Glória e Vera Cruz",
      "Ílhavo / Gafanhas",
      "Outro concelho da Região de Aveiro",
    ],
    wide: true,
  },
  { id: "tipo", label: "Tipo de imóvel", options: ["Apartamento", "Moradia", "Outro"] },
  {
    id: "valor",
    label: "Quer receber",
    options: ["Até 150.000 €", "150.000 € a 250.000 €", "250.000 € a 400.000 €", "Ainda não sei"],
  },
];

const short = (v) =>
  ({
    "Esgueira / Aradas / Glória e Vera Cruz": "Esgueira / Aradas",
    "Outro concelho da Região de Aveiro": "Outro concelho",
    "150.000 € a 250.000 €": "150 – 250 mil €",
    "250.000 € a 400.000 €": "250 – 400 mil €",
    "Até 150.000 €": "Até 150 mil €",
  })[v] || v;

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function openForm(detail) {
  window.dispatchEvent(new CustomEvent("open-investment-form", { detail }));
}

const GLASS = "border border-white/15 bg-[#3a2f27]/55 backdrop-blur-md";

export function HeroSearchBar() {
  const [values, setValues] = useState({});

  const submit = () => {
    const detail = Object.fromEntries(Object.entries(values).filter(([, v]) => v));
    openForm(detail);
  };

  return (
    <>
      {/* Computador / tablet */}
      <form
        className={`hidden w-full grid-cols-[1.6fr_1fr_1fr_auto_auto] text-white sm:grid ${GLASS}`}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {FIELDS.map((f) => (
          <label
            key={f.id}
            className="relative flex cursor-pointer flex-col justify-center border-r border-white/15 px-6 py-5 transition-colors hover:bg-white/[0.04] lg:px-8"
          >
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.32em] text-white/60">
              {f.label}
            </span>
            <span className="mt-2 flex items-center gap-2 font-body text-[17px] text-white">
              <span className="truncate">{values[f.id] ? short(values[f.id]) : "Qualquer"}</span>
              <Chevron />
            </span>
            <select
              aria-label={f.label}
              className="absolute inset-0 cursor-pointer opacity-0"
              value={values[f.id] || ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
            >
              <option value="">Qualquer</option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        ))}

        {/* Mais opções: abre o formulário sem pré-seleção */}
        <button
          type="button"
          aria-label="Simular quanto lhe sobra"
          title="Simular quanto lhe sobra"
          onClick={() => openForm({ view: "sim" })}
          className="flex items-center justify-center border-r border-white/15 px-6 text-white/90 transition-colors hover:bg-white/[0.06]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M4 8h10M18 8h2M4 16h2M10 16h10" />
            <circle cx="16" cy="8" r="2" />
            <circle cx="8" cy="16" r="2" />
          </svg>
        </button>

        <button
          type="submit"
          className="bg-white/[0.12] px-8 font-body text-[12px] font-medium uppercase tracking-[0.3em] text-white transition-colors hover:bg-white/25 lg:px-12"
        >
          Pedir estudo
        </button>
      </form>

      {/* Telemóvel */}
      <button
        type="button"
        onClick={() => openForm({ view: "sim" })}
        className={`flex w-full items-center justify-between px-5 py-[18px] text-left text-white sm:hidden ${GLASS}`}
      >
        <span>
          <span className="block font-body text-[10px] font-medium uppercase tracking-[0.3em] text-white/60">
            Vender a sua casa
          </span>
          <span className="mt-1 block font-body text-[16px]">Quanto recebo na carteira?</span>
        </span>
        <span className="border-l border-white/15 pl-5 font-body text-[11px] font-medium uppercase tracking-[0.28em]">
          Simular
        </span>
      </button>
    </>
  );
}
