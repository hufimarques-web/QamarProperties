"use client";

import React from "react";

const GOLD = "#CBA94B";
const NAVY = "#4C3D4A";

export function Header64() {
  return (
    <section className="px-[5%] pt-32 pb-12 md:pt-40 md:pb-16 text-center" style={{ background: "#FAFAF8" }}>
      <div className="container mx-auto max-w-2xl">
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            color: GOLD,
          }}
        >
          Para quem compra
        </span>
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: NAVY,
          }}
        >
          A casa{" "}
          <span className="italic" style={{ color: `${NAVY}BB` }}>
            como a quer.
          </span>
        </h1>
        <p
          className="text-base md:text-lg leading-relaxed max-w-lg mx-auto font-light"
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            color: `${NAVY}80`,
          }}
        >
          Casas na Região de Aveiro com renders à escala, orçamento de obra, cenários de crédito e relatório técnico. E, em cada casa, os motivos para não comprar, por escrito.
        </p>
      </div>
    </section>
  );
}
