"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { CompactSim } from "./Conversion";

// Secção 3D: com o scroll, a câmara entra na casa e atravessa as divisões,
// uma etapa da venda em cada uma. No computador, o simulador fica ao lado
// (converte ali mesmo); no telemóvel o túnel ocupa o ecrã e o simulador vem a seguir.

const ROOMS = [
  { src: "/opt/estudar.jpg", n: "01", t: "Estudo de mercado", d: "Vendas reais, não anúncios. Antes de nos dizer o seu valor." },
  { src: "/opt/p-noite2.jpg", n: "02", t: "Fotografia", d: "A casa fotografada como o comprador a quer ver." },
  { src: "/mono/sk-sala.jpg", n: "03", t: "Renders e plantas", d: "O potencial da casa, à escala. Por nossa conta." },
  { src: "/opt/sala-render.jpg", n: "04", t: "Janela de propostas", d: "Com 5 ou mais interessados, propostas com data limite." },
  { src: "/opt/vender.jpg", n: "05", t: "Escritura em 60 dias", d: "Recebe o valor que pediu. Se não vendermos, saímos." },
];

const D = 1300; // distância entre divisões (px em profundidade)
// a câmara para à frente da última divisão (não a atravessa), para o fim ficar nítido
const TOTAL = (ROOMS.length - 1) * D;

function Room({ z, room, i, last }) {
  const at = i * D;
  // aproxima-se do fundo → nítida → passa pela câmara e desaparece (a última fica)
  const opacity = useTransform(
    z,
    last ? [at - 2.6 * D, at - 1.2 * D] : [at - 2.6 * D, at - 1.2 * D, at + 250, at + 700],
    last ? [0, 1] : [0, 1, 1, 0]
  );
  const side = i % 2 === 0 ? -1 : 1;
  return (
    <motion.div
      className="absolute top-[54%] w-[86%] md:w-[58%]"
      style={{ left: `calc(50% + ${side * 4}%)`, x: "-50%", y: "-50%", z: -at, rotateY: side * 6, opacity }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 md:aspect-[4/3]">
        <img src={room.src} alt={room.t} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
        <div className="absolute bottom-0 left-0 p-5 text-white md:p-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">
            {room.n} / 0{ROOMS.length}
          </p>
          <p className="mt-2 text-[26px] font-medium leading-tight tracking-[-0.02em] md:text-[34px]">{room.t}</p>
          <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/80 md:text-[15px]">{room.d}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function RoomTunnel({ className = "", ...rest }) {
  const ref = useRef(null);
  const barRef = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const z = useTransform(p, [0, 1], [0, TOTAL]);
  // a "porta" abre-se no início: a primeira divisão vem de longe
  const doorScale = useTransform(p, [0, 0.08], [0.7, 1]);
  const doorOpacity = useTransform(p, [0, 0.05], [0, 1]);
  useMotionValueEvent(p, "change", (v) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${v})`;
  });

  return (
    <section
      ref={ref}
      data-hide-cta
      className={`relative h-[520vh] bg-[#0A0A0A] ${className}`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      {...rest}
    >
      <div className="sticky top-0 h-[100svh] md:grid md:grid-cols-[1.4fr_1fr]">
        {/* Túnel 3D */}
        <div className="relative h-full overflow-hidden" style={{ perspective: 900, perspectiveOrigin: "50% 50%" }}>
          <motion.div className="absolute inset-0" style={{ scale: doorScale, opacity: doorOpacity, transformStyle: "preserve-3d" }}>
            <motion.div className="absolute inset-0" style={{ z, transformStyle: "preserve-3d" }}>
              {ROOMS.map((r, i) => (
                <Room key={r.n} z={z} room={r} i={i} last={i === ROOMS.length - 1} />
              ))}
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 to-transparent px-5 pb-16 pt-24 md:px-10 md:pt-28">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">Por dentro da venda</p>
            <h2 className="mt-3 max-w-md text-[30px] font-medium leading-[1.02] tracking-[-0.035em] text-white md:text-[34px]">
              Da primeira visita à escritura.
            </h2>
          </div>

          {/* progresso */}
          <div className="absolute inset-x-5 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] h-px bg-white/15 md:inset-x-10 md:bottom-10">
            <div ref={barRef} className="h-px origin-left bg-white" style={{ transform: "scaleX(0)" }} />
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
