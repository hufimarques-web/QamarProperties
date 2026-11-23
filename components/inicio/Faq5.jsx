"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "O que é o FLIX e como funciona?",
    a: "O FLIX é um algoritmo avançado que monitoriza o mercado imobiliário de Aveiro em tempo real. Rastreia portais de referência (Idealista, Imovirtual, Casa Sapo, ERA, Remax, Century 21, BPI Casa) e a nossa rede privada off-market. O sistema analisa cada oportunidade em segundos, estima custos de obra e projeta o ARV (After Repair Value), enviando-lhe sinais de lucro automáticos quando encontra negócios lucrativos.",
  },
  {
    q: "O que são os 'sinais de lucro'?",
    a: "São notificações enviadas diretamente para a sua caixa de entrada sempre que o algoritmo identifica um imóvel com alta rentabilidade. As oportunidades são classificadas pela sua margem estimada: um potencial de 10% gera um sinal fraco, 25% indica um bom negócio e retornos acima de 30% representam oportunidades raras e prioritárias.",
  },
  {
    q: "Como são calculados os custos de renovação estimados?",
    a: "O FLIX calcula os custos de obra com base em dados reais de empreiteiros parceiros em Aveiro. O cálculo ajusta-se dinamicamente ao padrão de acabamento configurado na sua estratégia: Standard Moderno, Premium (com materiais nobres) ou Luxo Exclusivo, permitindo-lhe saber se o deal faz sentido antes mesmo de fazer uma visita.",
  },
  {
    q: "Qual é o valor mínimo de investimento por operação?",
    a: "O algoritmo permite filtrar e parametrizar as oportunidades de acordo com o seu capital disponível. Trabalhamos com intervalos de investimento flexíveis a partir de €100.000 (abrangendo desde apartamentos no centro histórico a moradias e prédios inteiros para reabilitação).",
  },
  {
    q: "Como o algoritmo calcula o ARV (After Repair Value)?",
    a: "O ARV é calculado cruzando o valor de mercado pós-obra estimado para a zona específica de Aveiro com comparáveis imobiliários recentes e dados históricos. Isto garante que só vê oportunidades onde a margem de lucro líquido (considerando aquisição, impostos e custos de renovação) cumpre a sua meta de retorno.",
  },
  {
    q: "Posso personalizar a minha estratégia no FLIX?",
    a: "Sim, totalmente. Através do nosso configurador de estratégia, pode definir o tipo de imóvel (apartamentos, moradias, terrenos ou prédios), o ROI mínimo desejado, a localização prioritária (Beira-Mar/Centro, Forca/Univ, Arredores), o nível de acabamentos e o seu orçamento disponível para receber sinais 100% personalizados.",
  },
];

const NAVY = "#4C3D4A";
const GOLD = "#CBA94B";

function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left group"
        style={{ outline: "none" }}
      >
        <div
          className="flex items-start justify-between gap-6 py-7 transition-all duration-500"
          style={{
            borderBottom: `1px solid ${isOpen ? GOLD : `${NAVY}15`}`,
          }}
        >
          <div className="flex items-start gap-5">
            <span
              className="text-xs font-bold tracking-widest mt-1.5 shrink-0 transition-colors duration-500"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: isOpen ? GOLD : `${NAVY}35`,
              }}
            >
              0{index + 1}
            </span>
            <span
              className="text-lg md:text-xl font-medium leading-snug transition-colors duration-300"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: isOpen ? NAVY : `${NAVY}CC`,
              }}
            >
              {faq.q}
            </span>
          </div>

          {/* Animated plus/minus icon */}
          <div
            className="relative w-8 h-8 shrink-0 mt-0.5 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: isOpen ? GOLD : `${NAVY}08`,
              border: `1px solid ${isOpen ? GOLD : `${NAVY}15`}`,
            }}
          >
            <span
              className="absolute w-3 h-[1.5px] transition-all duration-500 rounded-full"
              style={{ background: isOpen ? "#fff" : NAVY }}
            />
            <span
              className="absolute w-3 h-[1.5px] transition-all duration-500 rounded-full"
              style={{
                background: isOpen ? "#fff" : NAVY,
                transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
              }}
            />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5 pb-8 pl-10 pr-4">
              <p
                className="text-base leading-[1.8] max-w-2xl"
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  color: `${NAVY}90`,
                  fontWeight: 300,
                }}
              >
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq5() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      className="relative px-[5%] py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ background: "#FAFAF8" }}
    >
      {/* Subtle gold accent glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)`,
          transform: "translate(30%, -40%)",
        }}
      />

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">
          {/* Left column — header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-[0.35em] mb-6"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: GOLD,
              }}
            >
              Perguntas Frequentes
            </span>

            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-light leading-[1.1] tracking-tight mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: NAVY,
              }}
            >
              Respostas
              <br />
              <span className="italic" style={{ color: `${NAVY}BB` }}>
                transparentes.
              </span>
            </h2>

            <div
              className="w-10 h-[2px] mb-8"
              style={{ background: GOLD }}
            />

            <p
              className="text-base leading-relaxed mb-10 max-w-sm"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                color: `${NAVY}70`,
                fontWeight: 300,
              }}
            >
              Investir com confiança começa com informação clara. Se a sua dúvida não está aqui, fale connosco diretamente.
            </p>

            <a
              href="https://wa.me/351910000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-500 group"
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
              Fale Connosco
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </motion.div>

          {/* Right column — FAQ items */}
          <div>
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
