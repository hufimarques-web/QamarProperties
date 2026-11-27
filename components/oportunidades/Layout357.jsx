"use client";

import React, { Fragment } from "react";

const GOLD = "#CBA94B";
const NAVY = "#4C3D4A";

const steps = [
  {
    number: "01",
    label: "Crédito primeiro",
    tagline: "Simulação",
    title: "Sabe quanto pode comprar antes de visitar",
    description: "Simulamos o seu crédito com as regras do Banco de Portugal: taxa de esforço máxima de 45%, testada com subida de juros, e financiamento até 90%. Vê o dinheiro de que precisa até à escritura, a prestação e a reserva que lhe sobra. Os casos mais apertados são confirmados pelo nosso intermediário de crédito parceiro.",
    image: "/opt/fachada.jpg",
  },
  {
    number: "02",
    label: "Base de compradores",
    tagline: "Antes dos portais",
    title: "Recebe as casas compatíveis primeiro",
    description: "Quando entra uma casa que encaixa no que procura e no que pode pagar, recebe-a antes de ir para os portais. Fotos reais primeiro, renders sempre ao lado e identificados como simulação.",
    image: "/opt/valorizar.jpg",
  },
  {
    number: "03",
    label: "Dossier da casa",
    tagline: "Tudo por escrito",
    title: "A casa como a quer, com números reais",
    description: "Depois da visita, e com interesse claro, preparamos o dossier: renders com 2 ou 3 usos do espaço e os seus móveis, orçamento de obra com âmbito e prazo, cenários de crédito, relatório técnico e documentos do condomínio. Cada informação vem marcada como comprovada, declarada, estimada ou desconhecida.",
    image: "/opt/sala-ria.jpg",
  },
  {
    number: "04",
    label: "Proposta e CPCV",
    tagline: "Sem pressão",
    title: "Propostas com data, sem concorrência inventada",
    description: "Com 5 ou mais interessados, abrimos uma janela de propostas com data limite. Cada proposta fica registada com data e validade. O CPCV leva sinal de 5 a 10% e condição de crédito aprovado: se o crédito falhar, o sinal é devolvido. Depois da escritura, acompanhamos 3 meses.",
    image: "/opt/sala-render.jpg",
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
            O circuito do comprador
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: NAVY,
            }}
          >
            Como compra{" "}
            <span className="italic" style={{ color: `${NAVY}BB` }}>
              connosco.
            </span>
          </h2>
        </div>

        {/* Steps Stack */}
        <div className="space-y-14 md:space-y-36">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center border-t pt-10 md:pt-16"
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
                    href="#formulario-comprador"
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
                    Simular crédito →
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
