"use client";

import React from "react";
import { motion } from "framer-motion";

const lockedDeals = [
  {
    id: 1,
    title: "Apartamento T2 — Beira-Mar",
    zone: "Beira-Mar / Centro, Aveiro",
    type: "Reabilitação Médio Porte",
    image: "/algoritmo/algo-1.png",
  },
  {
    id: 2,
    title: "Moradia T3 — Glória e Vera Cruz",
    zone: "Forca / Univ, Aveiro",
    type: "Reabilitação Total",
    image: "/algoritmo/algo-2.png",
  },
  {
    id: 3,
    title: "Prédio Inteiro — Centro Histórico",
    zone: "Beira-Mar / Centro, Aveiro",
    type: "Reabilitação & Ampliação",
    image: "/algoritmo/algo-3.png",
  },
];

const GOLD = "#CBA94B";
const NAVY = "#4C3D4A";

export function Product12() {
  return (
    <section className="relative px-[5%] py-12 md:py-16 overflow-hidden" style={{ background: "#FAFAF8" }}>
      <div className="container mx-auto max-w-6xl">
        
        {/* Intro Row */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-3"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: GOLD,
              }}
            >
              Feed de Oportunidades
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: NAVY,
              }}
            >
              Sinais de Lucro <span className="italic">Ocultos</span>
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: `${NAVY}80`,
                fontWeight: 300,
              }}
            >
              O FLIX não possui uma lista de imóveis estática ou pública. Cada oportunidade é calculada em tempo real com base nos seus critérios de acabamento, orçamento e ROI alvo.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="/#formulario"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300"
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
              Configurar Estratégia
            </a>
          </div>
        </div>

        {/* Locked Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lockedDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden shadow-lg border transition-all duration-500 hover:shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.45)",
                borderColor: `${NAVY}10`,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Image & Blur Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover filter blur-[6px] scale-105 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-white">
                    {/* Pulsing Lock Icon */}
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                        style={{ color: GOLD }}
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/90">
                      A aguardar estratégia
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-semibold tracking-wider opacity-40" style={{ color: NAVY }}>
                    {deal.zone}
                  </div>
                  <h3
                    className="text-xl font-medium tracking-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: NAVY,
                    }}
                  >
                    {deal.title}
                  </h3>
                </div>

                {/* Details Table */}
                <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: `${NAVY}10` }}>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="opacity-50" style={{ color: NAVY }}>Tipo de Ativo</span>
                    <span className="font-medium" style={{ color: NAVY }}>{deal.type}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="opacity-50" style={{ color: NAVY }}>ROI Estimado</span>
                    <span className="font-bold flex items-center gap-1" style={{ color: GOLD }}>
                      🔒 Locked
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="opacity-50" style={{ color: NAVY }}>Custos de Obra</span>
                    <span className="font-semibold" style={{ color: `${NAVY}60` }}>A calcular...</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="opacity-50" style={{ color: NAVY }}>After Repair Value</span>
                    <span className="font-semibold" style={{ color: `${NAVY}60` }}>A calcular...</span>
                  </div>
                </div>

                <a
                  href="/#formulario"
                  className="block w-full py-3 rounded-2xl text-center text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300"
                  style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    background: `${NAVY}08`,
                    border: `1px solid ${NAVY}15`,
                    color: NAVY,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = NAVY;
                    e.currentTarget.style.color = "#F5F2ED";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${NAVY}08`;
                    e.currentTarget.style.color = NAVY;
                  }}
                >
                  Ativar Sinais de Lucro
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explain Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 p-8 rounded-3xl border flex flex-col md:flex-row items-center gap-8 shadow-md"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            borderColor: `${NAVY}10`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${GOLD}15` }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
              style={{ color: GOLD }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 21l8.982-11.795h-5.282L14.07 3 5 14.795h5.282V15.904Z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h4
              className="text-lg font-medium"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: NAVY,
              }}
            >
              Porquê os valores estão bloqueados?
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: `${NAVY}75`,
                fontWeight: 300,
              }}
            >
              O FLIX não opera como uma imobiliária comum. O nosso algoritmo cruza os materiais e o padrão de acabamento que prefere com as flutuações de mercado e estimativas reais de empreiteiros em Aveiro. Sem parametrizar a sua estratégia, qualquer taxa de retorno mostrada seria irrealista.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
