"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


function TitleWord({ children, progress, inRange, outRange }) {
  const points = outRange ? [inRange[0], inRange[1], outRange[0], outRange[1]] : [inRange[0], inRange[1]];
  const opacities = outRange ? [0, 1, 1, 0] : [0, 1];
  
  const opacity = useTransform(progress, points, opacities);
  
  const blurIn = useTransform(progress, inRange, [40, 0]);
  const blurOut = useTransform(progress, outRange || [1, 1.1], [0, 40]);
  
  const filter = useTransform(progress, (v) => {
    if (!outRange || v < outRange[0]) {
      return `blur(${blurIn.get()}px)`;
    }
    return `blur(${blurOut.get()}px)`;
  });

  return (
    <motion.span className="inline-block mr-[0.3em]" style={{ opacity, filter }}>
      {children}
    </motion.span>
  );
}

export function Layout394() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animação de Entrada: Começa em Full Screen e revela os 3 painéis (após o texto inicial entrar)
  const sideWidth = useTransform(scrollYProgress, [0.15, 0.3], ["0%", "25%"]);
  const leftX = useTransform(scrollYProgress, [0.15, 0.3], ["-100%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.15, 0.3], ["100%", "0%"]);
  const sideOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const centerWidth = useTransform(scrollYProgress, [0.15, 0.3], ["100%", "50%"]);
  const gapPadding = useTransform(scrollYProgress, [0.15, 0.3], ["0px", "16px"]);

  // Opacidade das Imagens Centrais (Transição direta da imagem inicial para a final)
  const img1Opacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  const img4Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  // Overlay preto que tapa tudo no final antes de mudar de secção
  const fadeOutOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  return (
    <div className="w-full bg-black">
      <section ref={containerRef} className="relative bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full w-full items-center justify-center">
          <motion.div 
            className="relative flex h-full w-full items-stretch justify-center" 
            style={{ gap: gapPadding, padding: gapPadding }}
          >
            
            {/* Left Panel */}
            <motion.div 
              className="relative overflow-hidden will-change-transform" 
              style={{ width: sideWidth, x: leftX, opacity: sideOpacity }}
            >
              <img 
                alt="Pormenor de acabamento" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="/opt/closeup.jpg" 
              />
            </motion.div>

            {/* Center Panel */}
            <motion.div 
              className="relative overflow-hidden will-change-transform flex-none" 
              style={{ width: centerWidth }}
            >
              <motion.img 
                alt="Casa antes da valorização" 
                className="absolute inset-0 w-full h-full object-cover" 
                style={{ opacity: img1Opacity }} 
                src="/opt/obra-janela.jpg" 
              />
              <motion.img 
                alt="Render da casa valorizada" 
                className="absolute inset-0 w-full h-full object-cover" 
                style={{ opacity: img4Opacity }} 
                src="/opt/sala-render.jpg" 
              />

              <div className="absolute inset-0 bg-black/40"></div>
            </motion.div>

            {/* Right Panel */}
            <motion.div 
              className="relative overflow-hidden will-change-transform" 
              style={{ width: sideWidth, x: rightX, opacity: sideOpacity }}
            >
              <img 
                alt="Interior renovado" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="/opt/sala-ria.jpg" 
              />
            </motion.div>

          </motion.div>

          {/* Text Overlay - Movido para fora dos painéis para não sofrer redimensionamento */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20 pointer-events-none">
            <h2 className="absolute w-full font-medium leading-[1.1] tracking-tight text-white text-[2.6rem] md:text-7xl lg:text-[6.5rem] font-sans">
              <span className="block">
                <TitleWord progress={scrollYProgress} inRange={[0.0, 0.05]} outRange={[0.45, 0.5]}>Valor</TitleWord>
                <TitleWord progress={scrollYProgress} inRange={[0.05, 0.10]} outRange={[0.45, 0.5]}>&amp;</TitleWord>
              </span>
              <span className="block">
                <TitleWord progress={scrollYProgress} inRange={[0.10, 0.15]} outRange={[0.45, 0.5]}>Prazo.</TitleWord>
              </span>
            </h2>
            <h2 className="absolute w-full font-medium leading-[1.1] tracking-tight text-white text-[2.6rem] md:text-7xl lg:text-[6.5rem] font-sans">
              <span className="block">
                <TitleWord progress={scrollYProgress} inRange={[0.5, 0.55]} outRange={[0.75, 0.8]}>Fotos</TitleWord>
                <TitleWord progress={scrollYProgress} inRange={[0.55, 0.6]} outRange={[0.75, 0.8]}>&amp;</TitleWord>
              </span>
              <span className="block">
                <TitleWord progress={scrollYProgress} inRange={[0.6, 0.65]} outRange={[0.75, 0.8]}>Renders.</TitleWord>
              </span>
            </h2>
            <h2 className="absolute w-full font-medium leading-[1.1] tracking-tight text-white text-[2.6rem] md:text-7xl lg:text-[6.5rem] font-sans">
              <span className="block">
                <TitleWord progress={scrollYProgress} inRange={[0.8, 0.85]} outRange={[0.95, 1]}>Propostas</TitleWord>
                <TitleWord progress={scrollYProgress} inRange={[0.85, 0.9]} outRange={[0.95, 1]}>&amp;</TitleWord>
              </span>
              <span className="block">
                <TitleWord progress={scrollYProgress} inRange={[0.9, 0.95]} outRange={[0.95, 1]}>Escritura.</TitleWord>
              </span>
            </h2>
          </div>

          {/* Fade to Black Overlay no fim da secção */}
          <motion.div 
            className="absolute inset-0 bg-black z-30 pointer-events-none" 
            style={{ opacity: fadeOutOpacity }} 
          />
        </div>
      </div>
      
      {/* Spacer para garantir o scroll da secção cinemática */}
      <div className="h-[220vh] md:h-[400vh]"></div>
    </section>
    </div>
  );
}

