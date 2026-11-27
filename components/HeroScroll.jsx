"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


export function HeroScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Building visible at bottom on load, rises to cover text as user scrolls
  const buildingY = useTransform(scrollYProgress, [0, 0.42], ["0%", "-45%"]);
  const buildingScale = useTransform(scrollYProgress, [0, 0.42], [1, 1.1]);

  // Text: drifts up slightly, fades out as building covers it
  const textY       = useTransform(scrollYProgress, [0, 0.22], ["0%", "-8%"]);
  const textScale   = useTransform(scrollYProgress, [0, 0.22], [1, 0.9996]);
  const textOpacity = useTransform(scrollYProgress, [0.08, 0.22], [1, 0]);

  // Building fades out as QAMAR wordmark takes over
  const buildingOpacity = useTransform(scrollYProgress, [0.28, 0.42], [1, 0]);

  // Wordmark Reveal (End of scroll)
  const wordmarkOpacity = useTransform(scrollYProgress, [0.42, 0.55], [0, 1]);

  // Hero fades out as Manifesto fully covers it
  const heroOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0]);

  const buildingImg = "/images/fea9976f-38ce-446a-b21c-a6742cbe7f22.png";
  const canalImg = "/images/cria_logo_fundo_imagem_1_202605251301.jpeg";
  const headline = ["Diga", "quanto", "quer", "receber."];

  return (
    <section ref={containerRef} className="relative h-[400vh]" id="hero">
      {/* fixed: hero never moves — Manifesto (z-index:20) slides over it */}
      <motion.div
        style={{ opacity: heroOpacity, zIndex: 10 }}
        className="fixed inset-0 w-full h-screen flex flex-col items-center overflow-hidden pointer-events-none"
      >
        
        {/* LAYER 0: Sky Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#f6f0e8]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#b6cfe5] via-[#c9d8e8] to-[#f8e2cc] opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_30%,rgba(255,255,255,0.4)_0%,transparent_60%)]" />
        </div>

        {/* LAYER 1: Headline & CTA (BEHIND THE BUILDING) */}
        <motion.div
          style={{ y: textY, scale: textScale, opacity: textOpacity, zIndex: 10 }}
          className="relative pt-[16vh] text-center w-[92%] max-w-5xl px-6"
        >
          <div className="overflow-hidden mb-6">
            <h1 className="font-sans font-[800] text-[clamp(36px,8vw,120px)] leading-[0.92] tracking-tight text-[#1a1a1a]">
              {headline.map((word, i) => (
                <span key={i} className="relative inline-block overflow-hidden mx-[-0.01em] px-[0.01em] align-top">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ 
                      duration: 1.1, 
                      delay: 0.4 + i * 0.12, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

        </motion.div>

        {/* LAYER 2: The Building (FOREGROUND - COVERS THE TEXT) */}
        <motion.div
          style={{
            y: buildingY,
            scale: buildingScale,
            opacity: buildingOpacity,
            x: "-50%",
            left: "50%",
            zIndex: 20
          }}
          className="absolute w-[min(1900px,115vw)] bottom-[-15%] pointer-events-none"
        >
          <img 
            src={buildingImg}
            alt="Casa na Região de Aveiro" 
            className="w-full h-auto block drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)"
            }}
          />
        </motion.div>

{/* Wordmark Reveal (QAMAR climax) */}
        <motion.div
          style={{ opacity: wordmarkOpacity, zIndex: 40, background: "linear-gradient(to bottom, #b6cfe5 0%, #c9d8e8 45%, #f8e2cc 100%)" }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <h2
            style={{
              backgroundImage: `url(${canalImg})`,
              backgroundPosition: "center 55%",
              backgroundSize: "cover"
            }}
            className="font-sans font-[900] text-[clamp(72px,19vw,340px)] leading-[0.85] tracking-tight bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] w-full text-center"
          >
            QAMAR
          </h2>
          <div className="mt-6 text-[clamp(14px,1.5vw,24px)] font-bold text-[#1a1a1a]/40 tracking-[0.6em] uppercase font-sans">
            Vendemos em 60 dias.
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
