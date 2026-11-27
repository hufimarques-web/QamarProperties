"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Versão telemóvel de "Como vendemos em 60 dias" + "Valor & Prazo…",
// com as transições da Emaar: introdução escura, painéis de ecrã inteiro
// que ficam presos e deslizam uns sobre os outros, e carrossel horizontal.

const SERIF = "'Cormorant Garamond', Georgia, serif";

const PANELS = [
  {
    n: "01",
    label: "Estudar",
    title: "Primeiro, os números reais.",
    text: "Antes de nos dizer o seu valor, mostramos-lhe o estudo de mercado: vendas reais na sua zona, preços anunciados e quanto lhe ficaria com uma imobiliária comum.",
    points: ["Vendas reais, não anúncios", "Não é uma avaliação: é informação para decidir"],
    image: "/opt/m-estudar.jpg",
  },
  {
    n: "02",
    label: "Valorizar",
    title: "A casa como o comprador a quer.",
    text: "Fotografia profissional, renders à escala, orçamento de obra e relatório técnico. É assim que se vende rápido.",
    points: ["Renders sempre identificados como simulação", "Fotos e renders por nossa conta"],
    image: "/opt/m-valorizar.jpg",
  },
  {
    n: "03",
    label: "Vender",
    title: "Em 60 dias, ou saímos.",
    text: "A casa vai primeiro para a nossa base de compradores com crédito simulado. Com 5 ou mais interessados, abrimos uma janela de propostas com data limite.",
    points: ["Nunca abaixo do seu valor líquido", "Se não vendermos, fica com fotos e renders"],
    image: "/opt/m-vender.jpg",
  },
];

const CARDS = [
  { title: "Valor & Prazo", text: "Recebe o valor que pediu, em 60 dias.", image: "/opt/c-valor.jpg" },
  { title: "Fotos & Renders", text: "A casa apresentada como o comprador a imagina.", image: "/opt/c-fotos.jpg" },
  { title: "Propostas & Escritura", text: "Só ganhamos com o que vendermos acima do seu valor.", image: "/opt/c-escritura.jpg" },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export function MobileStoryPanel({ index }) {
  const panel = PANELS[index];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // a imagem entra ligeiramente ampliada e assenta quando o painel chega ao topo
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-black md:hidden">
      <motion.img
        src={panel.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/80" />

      <div className="relative flex h-full flex-col justify-end px-6 pb-[calc(6.5rem+env(safe-area-inset-bottom))] text-white">
        <motion.p
          className="mb-4 font-body text-[11px] uppercase tracking-[0.3em] text-gold"
          {...fadeUp}
        >
          {panel.n} — {panel.label}
        </motion.p>
        <motion.h3
          className="font-light leading-[1.02]"
          style={{ fontFamily: SERIF, fontSize: "2.6rem" }}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
        >
          {panel.title}
        </motion.h3>
        <motion.p
          className="mt-4 font-body text-[15px] font-light leading-relaxed text-white/85"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.16 }}
        >
          {panel.text}
        </motion.p>
        <motion.ul
          className="mt-5 space-y-2 border-t border-white/20 pt-4"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.24 }}
        >
          {panel.points.map((p) => (
            <li key={p} className="flex items-start gap-3 font-body text-[13px] text-white/75">
              <span className="mt-[7px] block size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {p}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export function MobileStoryIntro() {
  return (
    <section className="relative bg-[#141011] px-6 pb-20 pt-24 text-center text-white md:hidden">
      <motion.p className="font-body text-[11px] uppercase tracking-[0.32em] text-white/60" {...fadeUp}>
        O modelo
      </motion.p>
      <motion.h2
        className="mx-auto mt-5 max-w-[18ch] font-light leading-[1.05]"
        style={{ fontFamily: SERIF, fontSize: "2.5rem" }}
        {...fadeUp}
      >
        Como vendemos a sua casa em <em className="italic text-gold">60 dias</em>
      </motion.h2>
      <motion.p
        className="mx-auto mt-6 max-w-[34ch] font-body text-[15px] font-light leading-relaxed text-white/75"
        {...fadeUp}
      >
        Três passos. Se vendermos pelo seu valor, ganhamos zero. O que conseguirmos acima é a nossa
        remuneração.
      </motion.p>
      <motion.div className="mt-12 flex flex-col items-center gap-3" {...fadeUp}>
        <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/45">
          Deslize para explorar
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

export function MobileStoryCarousel() {
  const openForm = () => window.dispatchEvent(new Event("open-investment-form"));
  return (
    <section className="relative bg-[#141011] pb-16 pt-16 text-white md:hidden">
      <div className="px-6">
        <motion.p className="font-body text-[11px] uppercase tracking-[0.32em] text-white/60" {...fadeUp}>
          Na escritura
        </motion.p>
        <motion.h2
          className="mt-4 font-light leading-[1.05]"
          style={{ fontFamily: SERIF, fontSize: "2.3rem" }}
          {...fadeUp}
        >
          O que fica para si
        </motion.h2>
      </div>

      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none]">
        {CARDS.map((card, i) => (
          <motion.article
            key={card.title}
            className="w-[78%] shrink-0 snap-start"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={card.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 font-body text-[11px] uppercase tracking-[0.28em] text-white/50">0{i + 1}</p>
            <h3 className="mt-1 font-light" style={{ fontFamily: SERIF, fontSize: "1.6rem" }}>
              {card.title}
            </h3>
            <p className="mt-1 font-body text-sm font-light text-white/70">{card.text}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 px-6">
        <button type="button" onClick={openForm} className="btn-lux btn-lux--solid-light w-full">
          Quanto recebo na carteira?
        </button>
      </div>
    </section>
  );
}
