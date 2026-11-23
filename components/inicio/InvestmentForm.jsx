"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GodRays } from "@paper-design/shaders-react";

const CheckIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const LoaderIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}>
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

const CloseIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const steps = [
  {
    id: "assetType",
    question: "Em que tipo de imóvel foca o seu capital?",
    options: ["Apartamentos (Centro Histórico)", "Moradias para Reabilitação", "Terrenos com Projeto", "Prédios Inteiros"],
  },
  {
    id: "roi",
    question: "Qual é o seu sinal de lucro (ROI) alvo?",
    options: ["15% (Conservador)", "20-25% (Moderado)", "+30% (Oportunidade Rara)"],
  },
  {
    id: "finish",
    question: "Qual o nível de acabamento para o cálculo de custos?",
    options: ["Standard Moderno", "Premium (Materiais Nobres)", "Luxo Exclusivo"],
  },
  {
    id: "zone",
    question: "Localização prioritária em Aveiro?",
    options: ["Beira-Mar / Centro", "Forca / Univ", "Arredores (Esgueira/Ílhavo)", "Todas as Zonas"],
  },
  {
    id: "budget",
    question: "Intervalo de investimento por operação?",
    options: ["€100k - €250k", "€250k - €500k", "+€500k"],
  },
  {
    id: "contact",
    question: "Como devemos enviar os sinais de lucro?",
    subtext: "Podemos marcar uma reunião para falar melhor consigo?",
    isFinal: true,
  },
];

const NAVY = "#4C3D4A";

export function InvestmentForm() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [direction, setDirection] = useState(1);
  const buttonRef = useRef(null);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); }, 3000);
  };

  React.useEffect(() => {
    const handler = () => setShowForm(true);
    window.addEventListener("open-investment-form", handler);
    return () => window.removeEventListener("open-investment-form", handler);
  }, []);

  return (
    <section id="formulario" className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-20">

      <AnimatePresence>
        {!showForm ? (
          <motion.div
            key="cta-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            className="relative z-10 flex flex-col items-center gap-8 text-center px-6 max-w-4xl"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-display font-light leading-[0.9] tracking-tight text-black mix-blend-exclusion">
              Configure a sua <br/> Estratégia de <span className="text-gold italic">Aveiro</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl leading-[1.6] text-black/60 max-w-2xl font-sans font-light">
              Deixe que o nosso algoritmo filtre o ruído e entregue apenas as oportunidades que batem o seu ROI alvo.
            </p>

            <div className="relative">
              <motion.button
                ref={buttonRef}
                layoutId="form-bg"
                onClick={() => setShowForm(true)}
                className="h-16 px-10 rounded-full flex items-center gap-3 font-sans font-medium text-xl shadow-xl hover:shadow-2xl transition-shadow"
                style={{ background: "#CBA94B", color: NAVY }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                Configurar Sinais
                <ArrowRightIcon size={20} />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 backdrop-blur-sm"
              style={{ background: "rgba(76,61,74,0.4)" }}
            />

            {/* Morphing Container — gold + GodRays */}
            <motion.div
              layoutId="form-bg"
              className="relative w-full h-full max-w-[1400px] max-h-[900px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
              style={{ background: "#CBA94B" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
            >
              {/* GodRays layer */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                <GodRays
                  colorBack="#CBA94B00"
                  colors={["#FFFFFF90", "#F5E19660", "#E8D08040", "#FFFBF020"]}
                  colorBloom="#FFFFFF"
                  offsetX={0.75}
                  offsetY={-0.8}
                  intensity={0.9}
                  spotty={0.4}
                  midSize={9}
                  midIntensity={0}
                  density={0.1}
                  bloom={0.25}
                  speed={0.9}
                  scale={1.5}
                  style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
                />
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="absolute top-8 right-8 transition-colors z-[110] p-2 rounded-full backdrop-blur-md"
                style={{ color: `${NAVY}80`, background: `${NAVY}15` }}
                onMouseEnter={e => e.currentTarget.style.color = NAVY}
                onMouseLeave={e => e.currentTarget.style.color = `${NAVY}80`}
              >
                <CloseIcon size={24} />
              </button>

              {/* Content Grid */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full relative z-10">

                {/* Left: Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-12 md:p-20 flex flex-col justify-between space-y-12"
                >
                  <div className="space-y-12">
                    <h2 className="text-4xl md:text-6xl font-display leading-[1.1] tracking-tight" style={{ color: NAVY }}>
                      Talk to <br/> <span className="italic" style={{ color: `${NAVY}CC` }}>Investment</span>
                    </h2>

                    <div className="space-y-8 max-w-sm">
                      <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-xl" style={{ background: `${NAVY}15`, border: `1px solid ${NAVY}25` }}>
                          <CheckIcon size={24} style={{ color: NAVY }} />
                        </div>
                        <p className="text-lg leading-relaxed font-sans" style={{ color: `${NAVY}CC` }}>
                          Acesso instantâneo a oportunidades off-market em Aveiro.
                        </p>
                      </div>
                      <div className="flex gap-5 items-start">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-xl" style={{ background: `${NAVY}15`, border: `1px solid ${NAVY}25` }}>
                          <CheckIcon size={24} style={{ color: NAVY }} />
                        </div>
                        <p className="text-lg leading-relaxed font-sans" style={{ color: `${NAVY}CC` }}>
                          Cálculos de ROI e Yield automatizados para cada imóvel.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <p className="text-xl md:text-2xl font-display italic leading-relaxed pl-6" style={{ color: `${NAVY}E0`, borderLeft: `2px solid ${NAVY}50` }}>
                      "Em 3 meses recebi duas oportunidades que nenhuma imobiliária me tinha apresentado. Fechei um negócio com 27% de retorno em Aveiro."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden shadow-2xl" style={{ border: `2px solid ${NAVY}25` }}>
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150" alt="Ricardo" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold tracking-wide" style={{ color: NAVY }}>Ricardo Ferreira</p>
                        <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: `${NAVY}60` }}>Investidor Imobiliário</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Form Area */}
                <div className="relative flex items-center justify-center p-6 md:p-12" style={{ background: `${NAVY}08` }}>
                  <div className="w-full max-w-lg">
                    <AnimatePresence mode="wait">
                      {!isSuccess ? (
                        <motion.div key="form" className="space-y-12">
                          <div className="space-y-2">
                            <div className="flex justify-between items-end">
                              <span className="text-[10px] uppercase tracking-[0.4em] font-black" style={{ color: NAVY }}>Step 0{currentStep + 1} / 06</span>
                              <span className="text-xs font-sans tracking-widest" style={{ color: `${NAVY}50` }}>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full h-[1px] rounded-full overflow-hidden" style={{ background: `${NAVY}20` }}>
                              <motion.div className="h-full" style={{ background: NAVY }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                            </div>
                          </div>

                          <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                              key={currentStep}
                              custom={direction}
                              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                              className="space-y-10"
                            >
                              <div className="space-y-3">
                                <h3 className="text-3xl md:text-4xl font-display leading-[1.2]" style={{ color: NAVY }}>{step.question}</h3>
                                {step.subtext && <p className="font-sans text-lg font-light italic" style={{ color: `${NAVY}70` }}>{step.subtext}</p>}
                              </div>

                              {!step.isFinal ? (
                                <div className="grid grid-cols-1 gap-3">
                                  {step.options.map((option) => {
                                    const isSelected = formData[step.id] === option;
                                    return (
                                      <button
                                        key={option}
                                        onClick={() => { setFormData({ ...formData, [step.id]: option }); }}
                                        className="p-6 text-left rounded-3xl transition-all duration-500"
                                        style={isSelected
                                          ? { border: `1px solid ${NAVY}`, background: `${NAVY}18`, color: NAVY, boxShadow: `0 0 30px ${NAVY}15` }
                                          : { border: `1px solid ${NAVY}20`, background: `${NAVY}08`, color: `${NAVY}80` }
                                        }
                                        onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.border = `1px solid #FFFFFF`; e.currentTarget.style.background = `#FFFFFF`; e.currentTarget.style.color = `#000000`; } }}
                                        onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.border = `1px solid ${NAVY}20`; e.currentTarget.style.background = `${NAVY}08`; e.currentTarget.style.color = `${NAVY}80`; } }}
                                      >
                                        <span className="font-sans text-lg font-light tracking-wide">{option}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                  <div className="space-y-4">
                                    <div className="space-y-1">
                                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold ml-2" style={{ color: `${NAVY}50` }}>Nome Completo</label>
                                      <input required type="text" className="w-full p-6 focus:outline-none transition-all rounded-3xl font-sans" style={{ background: `${NAVY}08`, border: `1px solid ${NAVY}20`, color: NAVY }} placeholder="Ex: João Silva" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] uppercase tracking-[0.3em] font-bold ml-2" style={{ color: `${NAVY}50` }}>Email</label>
                                      <input required type="email" className="w-full p-6 focus:outline-none transition-all rounded-3xl font-sans" style={{ background: `${NAVY}08`, border: `1px solid ${NAVY}20`, color: NAVY }} placeholder="joao@empresa.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                  </div>
                                  <button disabled={isSubmitting} className="w-full py-6 font-sans font-black text-sm uppercase tracking-[0.3em] transition-all rounded-full shadow-2xl flex items-center justify-center" style={{ background: NAVY, color: "#F5F2ED" }}>
                                    {isSubmitting ? <LoaderIcon size={24} style={{ color: "#F5F2ED" }} /> : "Submeter Estratégia"}
                                  </button>
                                </form>
                              )}

                              {!step.isFinal && formData[step.id] && (
                                <div className="flex justify-end pt-4">
                                  <button onClick={() => { setDirection(1); setCurrentStep(currentStep + 1); }} className="px-10 py-4 font-sans font-bold text-xs uppercase tracking-[0.3em] rounded-full flex items-center gap-3 transition-all group" style={{ background: `${NAVY}10`, border: `1px solid ${NAVY}25`, color: NAVY }}>
                                    Próximo <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                                  </button>
                                </div>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-10">
                          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl" style={{ background: `${NAVY}12`, border: `2px solid ${NAVY}` }}>
                            <CheckIcon size={48} style={{ color: NAVY }} />
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-5xl font-display tracking-tight leading-none" style={{ color: NAVY }}>Estratégia <br/> Recebida.</h3>
                            <p className="font-sans text-xl font-light" style={{ color: `${NAVY}80` }}>Aveiro está a ser analisada. Receberá o primeiro sinal em breve.</p>
                          </div>
                          <button onClick={() => setShowForm(false)} className="px-12 py-4 text-[10px] uppercase tracking-[0.4em] rounded-full font-bold transition-all" style={{ border: `1px solid ${NAVY}40`, color: NAVY }}>Voltar ao Site</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
