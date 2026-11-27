"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CompactSim } from "./Conversion";

// Por dentro da venda: as cinco etapas, uma foto por etapa.
// Animação "cortina e pilha" (como nos Sites of the Day): cada foto sobe por cima
// da anterior como uma cortina, a anterior recua e escurece, a foto ativa
// aproxima-se devagar (Ken Burns) e o texto entra por trás de uma máscara.
// No computador, o simulador fica ao lado (igual); no telemóvel as fotos ocupam o ecrã.

const ROOMS = [
  { src: "/real/aveiro-moliceiros.jpg", n: "01", t: "Estudo de mercado", d: "Vendas reais, não anúncios. Antes de nos dizer o seu valor." },
  { src: "/real/sala-janelas.jpg", n: "02", t: "Fotografia", d: "A casa fotografada como o comprador a quer ver." },
  { src: "/casas/fachada-moradias.webp", n: "03", t: "Renders e plantas", d: "O potencial da casa, à escala. Por nossa conta." },
  { src: "/real/sala-outono.jpg", n: "04", t: "Janela de propostas", d: "Com 5 ou mais interessados, propostas com data limite." },
  { src: "/opt/vender.jpg", n: "05", t: "Escritura em 60 dias", d: "Recebe o valor que pediu. Se não vendermos, saímos." },
];
const N = ROOMS.length;

// s = posição na sequência: 0 (primeira foto) … N-1 (última foto)
function Photo({ s, i }) {
  const first = i === 0;
  const last = i === N - 1;
  // entra: cortina de baixo para cima
  const clip = useTransform(s, [i - 0.8, i - 0.1], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  // fica para trás quando a seguinte sobe: recua e escurece
  const back = useTransform(s, [i + 0.1, i + 0.8], [1, last ? 1 : 0.9]);
  const shade = useTransform(s, [i + 0.1, i + 0.8], [0, last ? 0 : 0.65]);
  // Ken Burns: aproxima-se devagar enquanto está à vista
  const zoom = useTransform(s, [i - 0.8, i + 0.8], [1.18, 1.02]);
  const y = useTransform(s, [i - 0.8, i - 0.1], ["12%", "0%"]);
  return (
    <motion.div className="absolute inset-0 origin-top overflow-hidden" style={{ clipPath: first ? undefined : clip, scale: back, zIndex: i }}>
      <motion.img
        src={ROOMS[i].src}
        alt={ROOMS[i].t}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale: zoom, y: first ? 0 : y }}
        loading={first ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
    </motion.div>
  );
}

// texto de cada etapa: sobe por trás de uma máscara e sai para cima
function Caption({ s, i }) {
  const last = i === N - 1;
  const inR = [i - 0.55, i - 0.15];
  const outR = [i + 0.15, i + 0.55];
  const y = useTransform(s, last ? inR : [...inR, ...outR], last ? ["110%", "0%"] : ["110%", "0%", "0%", "-110%"]);
  const opacity = useTransform(s, last ? inR : [...inR, ...outR], last ? [0, 1] : [0, 1, 1, 0]);
  const r = ROOMS[i];
  return (
    <div className="absolute inset-x-0 bottom-0" aria-hidden={i !== 0}>
      <div className="overflow-hidden">
        <motion.p className="font-medium leading-none tracking-[-0.04em] text-white/90 tabular-nums" style={{ y, fontSize: "clamp(56px, 7vw, 120px)" }}>
          {r.n}
        </motion.p>
      </div>
      <div className="mt-3 overflow-hidden">
        <motion.p className="text-[28px] font-medium leading-tight tracking-[-0.025em] text-white md:text-[40px]" style={{ y }}>
          {r.t}
        </motion.p>
      </div>
      <motion.p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/75 md:text-[16px]" style={{ opacity }}>
        {r.d}
      </motion.p>
    </div>
  );
}

// barra de progresso em segmentos: um por etapa
function Segment({ s, i }) {
  const fill = useTransform(s, [i - 1, i], [0, 1]);
  return (
    <div className="h-[2px] flex-1 overflow-hidden bg-white/20">
      <motion.div className="h-full origin-left bg-white" style={{ scaleX: i === 0 ? 1 : fill }} />
    </div>
  );
}

export function RoomTunnel({ className = "", ...rest }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // um pouco de margem no início e no fim, para a primeira e a última foto respirarem
  const s = useTransform(p, [0.04, 0.96], [0, N - 1]);

  return (
    <section
      ref={ref}
      data-hide-cta
      data-scene
      data-scene-duration="4.6"
      data-scene-stops="0.04,0.27,0.5,0.73,0.96"
      className={`relative h-[520vh] bg-[#0A0A0A] ${className}`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      {...rest}
    >
      <div className="sticky top-0 h-[100svh] md:grid md:grid-cols-[1.4fr_1fr]">
        {/* Fotos em cortina e pilha */}
        <div className="relative h-full overflow-hidden bg-black">
          {ROOMS.map((r, i) => (
            <Photo key={r.n} s={s} i={i} />
          ))}

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/80 to-transparent px-5 pb-16 pt-24 md:px-10 md:pt-28">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">Por dentro da venda</p>
            <h2 className="mt-3 max-w-md text-[30px] font-medium leading-[1.02] tracking-[-0.035em] text-white md:text-[34px]">
              Da primeira visita à escritura.
            </h2>
          </div>

          {/* texto da etapa */}
          <div className="pointer-events-none absolute inset-x-5 bottom-[calc(7.5rem+env(safe-area-inset-bottom))] z-10 h-[46%] md:inset-x-10 md:bottom-20">
            {ROOMS.map((r, i) => (
              <Caption key={r.n} s={s} i={i} />
            ))}
          </div>

          {/* progresso por etapas */}
          <div className="absolute inset-x-5 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-10 flex gap-2 md:inset-x-10 md:bottom-10">
            {ROOMS.map((r, i) => (
              <Segment key={r.n} s={s} i={i} />
            ))}
          </div>
        </div>

        {/* Simulador ao lado (computador) */}
        <div className="hidden items-center overflow-y-auto border-l border-white/10 bg-[#0A0A0A] px-[3vw] pb-6 pt-24 md:flex">
          <CompactSim dark className="w-full max-w-[420px]" />
        </div>
      </div>
    </section>
  );
}
