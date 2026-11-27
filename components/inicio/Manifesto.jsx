"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const textRevealContent =
  "Diga-nos quanto quer receber na carteira. Antes disso, mostramos-lhe o estudo de mercado: o valor a que casas como a sua se vendem de facto, o valor a que se anunciam e quanto lhe ficaria com uma imobiliária comum. Depois vendemos em 60 dias. Se vendermos pelo seu valor, ganhamos zero. O que conseguirmos acima é a nossa remuneração. Se não vendermos, saímos e fica com as fotos e os renders.";

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
      className="relative overflow-hidden px-6 pt-20 pb-24 md:px-12 md:pt-32 md:pb-56 lg:px-20 lg:pt-40 lg:pb-72 min-h-[80vh] md:min-h-screen flex items-center"
      style={{
        position: "relative",
        zIndex: 20,
      }}
    >

      <div className="relative mx-auto max-w-4xl" style={{ zIndex: 2 }}>
        <p className="text-[1.6rem] font-semibold leading-snug text-[#1a1a2e] md:text-4xl lg:text-5xl">
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
