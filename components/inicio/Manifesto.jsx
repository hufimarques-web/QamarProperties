"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const textRevealContent =
  "Dominamos os custos de obra em Aveiro para que nunca invista às cegas. O nosso software cruza os seus materiais favoritos e o seu padrão de acabamento com oportunidades reais de mercado. Através de cálculos de ARV e custos de renovação estimados, enviamos sinais de lucro precisos. Se o potencial for 10%, o sinal é fraco. Aos 25%, o negócio é bom. Acima de 30%, é uma oportunidade rara que o nosso algoritmo entrega direto na sua caixa de entrada, garantindo que o seu Fix & Flip seja tão transparente quanto lucrativo.";

const words = textRevealContent.split(" ");

function WordReveal({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const blurValue = useTransform(progress, range, [40, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  return (
    <motion.span style={{ opacity, filter, marginRight: "0.3em" }} className="inline-block">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const textRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "center center"],
  });

  return (
    <section
      ref={textRef}
      className="relative overflow-hidden px-6 pt-24 pb-40 md:px-12 md:pt-32 md:pb-56 lg:px-20 lg:pt-40 lg:pb-72 min-h-screen flex items-center"
      style={{
        position: "relative",
        zIndex: 20,
      }}
    >

      <div className="relative mx-auto max-w-4xl" style={{ zIndex: 2 }}>
        <p className="text-3xl font-semibold leading-snug text-[#1a1a2e] md:text-4xl lg:text-5xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <WordReveal key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </WordReveal>
            );
          })}
        </p>
      </div>
    </section>
  );
}
