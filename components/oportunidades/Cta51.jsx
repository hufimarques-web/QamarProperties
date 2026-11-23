"use client";

import React from "react";

const GOLD = "#CBA94B";
const NAVY = "#4C3D4A";

export function Cta51() {
  return (
    <section className="px-[5%] py-12 md:py-20 lg:py-24" style={{ background: "#FAFAF8" }}>
      <div className="container mx-auto max-w-4xl">
        <div
          className="flex flex-col items-center p-8 md:p-16 lg:p-20 rounded-3xl border text-center shadow-lg transition-all duration-500 hover:shadow-xl"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            borderColor: `${NAVY}10`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="max-w-xl">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: GOLD,
              }}
            >
              Começar Agora
            </span>
            <h2
              className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: NAVY,
              }}
            >
              Defina a sua estratégia e ative o{" "}
              <span className="italic" style={{ color: `${NAVY}BB` }}>
                algoritmo.
              </span>
            </h2>
            <p
              className="text-base leading-relaxed font-light mb-8"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: `${NAVY}80`,
              }}
            >
              Configure o seu orçamento, padrão de acabamento e ROI desejado. O FLIX começará a monitorizar o mercado 24/7 e a enviar sinais de lucro 100% personalizados para si.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#formulario"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                background: NAVY,
                color: "#F5F2ED",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = GOLD;
                e.currentTarget.style.color = NAVY;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = NAVY;
                e.currentTarget.style.color = "#F5F2ED";
              }}
            >
              Configurar Sinais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
