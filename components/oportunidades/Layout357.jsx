"use client";

import React, { Fragment } from "react";

const GOLD = "#CBA94B";
const NAVY = "#4C3D4A";

const steps = [
  {
    number: "01",
    label: "Monitorização Contínua",
    tagline: "Vigilância",
    title: "Vigilância Automática 24/7 em Aveiro",
    description: "O algoritmo FLIX varre os portais imobiliários líderes (Idealista, Imovirtual, Casa Sapo, ERA, Remax, Century 21, BPI Casa) e a nossa rede privada off-market a cada 15 minutos. Nenhuma nova oportunidade escapa ao radar.",
    image: "/images/hero-facade.jpg",
  },
  {
    number: "02",
    label: "Estimativa Realista",
    tagline: "Cálculo",
    title: "Custo de Obra e Margem Calculados em Segundos",
    description: "Cruzamos o padrão de acabamentos que escolheu (Standard, Premium ou Luxo) com estimativas atualizadas por metro quadrado de empreiteiros locais em Aveiro. O cálculo do ARV (After Repair Value) é feito antes mesmo de visitar o imóvel.",
    image: "/algoritmo/algo-4.png",
  },
  {
    number: "03",
    label: "Filtro Inteligente",
    tagline: "Foco",
    title: "Zero Distrações. Apenas o que Importa.",
    description: "Eliminamos o ruído das listas públicas. O algoritmo filtra centenas de anúncios diariamente e só sinaliza imóveis que correspondem exatamente à sua meta de ROI, tipo de ativo, orçamento e localização.",
    image: "/algoritmo/Interior_of_a_finish-382651.png",
  },
  {
    number: "04",
    label: "Sinais de Lucro",
    tagline: "Velocidade",
    title: "Alertas Diretos com Viabilidade Completa",
    description: "Assim que um negócio preenche os seus critérios e excede o seu sinal de lucro alvo, recebe uma ficha detalhada no seu e-mail. Decida com agilidade com base em dados de mercado consolidados e transparentes.",
    image: "/algoritmo/algo-3.png",
  },
];

export function Layout357() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#FAFAF8" }}>
      <div className="container mx-auto max-w-6xl px-[5%] py-12 md:py-24">
        
        {/* Header indicator */}
        <div className="mb-16 text-center lg:text-left">
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-[0.35em] mb-4"
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              color: GOLD,
            }}
          >
            A Pipeline do Algoritmo
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: NAVY,
            }}
          >
            Como criamos o seu{" "}
            <span className="italic" style={{ color: `${NAVY}BB` }}>
              deal flow.
            </span>
          </h2>
        </div>

        {/* Steps Stack */}
        <div className="space-y-24 md:space-y-36">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-t pt-12 md:pt-16"
              style={{ borderColor: `${NAVY}15` }}
            >
              {/* Text Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span
                    className="text-2xl font-bold tracking-wider"
                    style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      color: GOLD,
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="text-xs uppercase tracking-[0.2em] font-semibold"
                    style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      color: `${NAVY}40`,
                    }}
                  >
                    {step.label}
                  </span>
                </div>

                <h3
                  className="text-3xl md:text-4xl font-light leading-tight tracking-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: NAVY,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-base leading-relaxed font-light"
                  style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    color: `${NAVY}85`,
                  }}
                >
                  {step.description}
                </p>

                <div className="pt-4">
                  <a
                    href="/#formulario"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300"
                    style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      color: GOLD,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = NAVY;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = GOLD;
                    }}
                  >
                    Configurar agora →
                  </a>
                </div>
              </div>

              {/* Image Column */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg border" style={{ borderColor: `${NAVY}08` }}>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full aspect-[16/10] object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "/images/hero-bg.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
