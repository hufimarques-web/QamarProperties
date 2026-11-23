"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";

const stats = [
  { value: "+50", label: "Operações concluídas" },
  { value: "22%", label: "Retorno médio" },
  { value: "€10K", label: "Entrada mínima" },
  { value: "100%", label: "Supervisão legal" },
];

export function Header84() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Layer parallax speeds — mirrors FIND's back/house/cloud separation
  const backY   = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);   // bg drifts slowest
  const houseY  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);   // house medium
  const cloudY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);  // clouds float up
  const cloudY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);   // second cloud, different rate
  const contentY       = useTransform(scrollYProgress, [0, 0.5], ["0%", "-16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const houseOpacity   = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const statsOpacity   = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const clipTextOpacity = useTransform(scrollYProgress, [0.32, 0.68], [0, 1]);
  const clipTextScale   = useTransform(scrollYProgress, [0.32, 0.68], [0.88, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden bg-navy-deep"
      style={{ height: "200vh" }}
    >
      {/* Sticky viewport — all layers live inside here and stay pinned */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Layer 1: back (background photo) — slowest parallax ── */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: backY }}
          aria-hidden="true"
        >
          <img
            src="/images/hero-bg.jpg"
            alt=""
            fetchPriority="high"
            className="h-[115%] w-full scale-105 object-cover object-center"
          />
          {/* Sky-to-mid scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-navy-deep/20 to-transparent" />
        </motion.div>

        {/* ── Layer 2: clouds — float upward on scroll (opposite direction) ── */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[8%] will-change-transform"
          style={{ y: cloudY1 }}
          aria-hidden="true"
        >
          <div
            className="absolute left-[5%] h-28 w-64 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 40% 50%, rgba(245,242,237,0.9) 0%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[15%] will-change-transform"
          style={{ y: cloudY2 }}
          aria-hidden="true"
        >
          <div
            className="absolute right-[8%] h-24 w-80 opacity-15"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(245,242,237,0.9) 0%, transparent 70%)",
              filter: "blur(22px)",
            }}
          />
        </motion.div>

        {/* ── Layer 3: house/building — medium parallax, fades on scroll ── */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-12 flex justify-center will-change-transform"
          style={{ y: houseY, opacity: houseOpacity }}
          aria-hidden="true"
        >
          <img
            src="/images/hero-facade.jpg"
            alt=""
            className="w-[min(1100px,92vw)] object-cover object-top"
            style={{
              maskImage:
                "linear-gradient(to top, transparent 0%, black 20%, black 65%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, black 20%, black 65%, transparent 100%)",
              opacity: 0.6,
            }}
          />
          {/* Bottom smoke / haze */}
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{
              background:
                "radial-gradient(ellipse 140% 80% at 50% 120%, rgba(15,30,54,0.98) 20%, transparent 75%)",
            }}
          />
        </motion.div>

        {/* ── Layer 4: centered hero text ── */}
        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-44 pt-28 text-center will-change-transform"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl xl:max-w-5xl"
          >
            <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Investimento Imobiliário em Portugal
            </p>
            <h1 className="mb-7 font-display font-light leading-[1.06] text-cream text-5xl md:text-7xl lg:text-8xl xl:text-[5.5rem]">
              O seu capital trabalha.{" "}
              <em className="font-semibold text-gold-light not-italic">
                Você descansa.
              </em>
            </h1>
            <p className="mx-auto mb-10 max-w-xl font-body text-base leading-relaxed text-cream/60 md:text-lg">
              Acesso a operações de fix and flip com retorno de 15 a 30%
              e prazos de 6 a 12 meses. Contratos blindados e supervisão
              regulatória completa.
            </p>
            <Link
              href="/#registar"
              className="inline-block rounded-full bg-gold px-10 py-4 font-body text-sm font-semibold uppercase tracking-[0.15em] text-navy-deep transition-all duration-200 hover:bg-gold-light hover:shadow-2xl"
            >
              Ver Oportunidades
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Layer 5: clip-text brand reveal (fades in on scroll) ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center will-change-transform"
          style={{ opacity: clipTextOpacity, scale: clipTextScale }}
        >
          <div
            className="select-none text-center leading-[0.9]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(5rem, 19vw, 19rem)",
              backgroundImage: "url('/images/hero-facade.jpg')",
              backgroundSize: "110% auto",
              backgroundPosition: "center 30%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "0.02em",
            }}
          >
            CAPITAL<br />ATLÂNTICO
          </div>
          <p className="mt-6 font-body text-sm font-semibold uppercase tracking-[0.35em] text-cream/70">
            Investimento Imobiliário
          </p>
        </motion.div>

        {/* ── Layer 6: stats strip ── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-navy/80 backdrop-blur-md will-change-transform"
          style={{ opacity: statsOpacity }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center divide-x divide-white/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="min-w-[120px] flex-1 px-4 py-4 text-center">
                <p className="font-display text-2xl font-semibold text-gold md:text-3xl">{value}</p>
                <p className="mt-0.5 font-body text-[10px] font-medium uppercase tracking-[0.18em] text-cream/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
