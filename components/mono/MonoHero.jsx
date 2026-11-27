"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { FirstStep } from "./Conversion";
import { useIsMobile } from "@/components/shared/MobileCascade";

// Topo ao estilo MONO (v0), no computador e no telemóvel:
// a palavra QAMAR gigante atrás da casa recortada; com o scroll a casa
// aproxima-se, fecha-se numa coluna e entram mais imagens dos lados.
// No telemóvel a coluna é mais larga e só entram as duas imagens vizinhas.

export const SANS = "Inter, system-ui, -apple-system, sans-serif";
const EASE = [0.16, 1, 0.3, 1];

const SIDES = [
  { src: "/opt/c-valor.jpg", alt: "Fachada Arte Nova com azulejos junto ao canal de Aveiro", x: -2, from: 0.3 },
  { src: "/opt/m-valorizar.jpg", alt: "Sala renovada com vista para a ria", x: -1, from: 0.24 },
  { src: "/opt/p-sala.jpg", alt: "Sala de um apartamento clássico recuperado, com janelas altas", x: 1, from: 0.24 },
  { src: "/mono/hero-dusk.jpg", alt: "Casa junto ao canal ao anoitecer", x: 2, from: 0.3 },
];

// largura da coluna e espaço entre colunas (vw): computador / telemóvel
const LAYOUT = {
  desktop: { col: 19, gap: 1.25, top: 12, bottom: 6 },
  mobile: { col: 62, gap: 3, top: 16, bottom: 14 },
};

function SideColumn({ p, img, layout }) {
  const y = useTransform(p, [img.from, img.from + 0.26], ["110%", "0%"]);
  const opacity = useTransform(p, [img.from, img.from + 0.12], [0, 1]);
  const left = `calc(50% + ${img.x * (layout.col + layout.gap)}vw - ${layout.col / 2}vw)`;
  return (
    <motion.div
      className="absolute overflow-hidden bg-neutral-100"
      style={{ left, width: `${layout.col}vw`, top: `${layout.top}%`, bottom: `${layout.bottom}%`, y, opacity }}
    >
      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
    </motion.div>
  );
}

// Onde está o "QAMAR" dentro de /logo/qamar-logo-*.png (836×144):
// tinta da esquerda do Q à direita do R, topo das maiúsculas e linha de base.
const LOGO_INK = { left: 6 / 836, right: 511 / 836, cap: 16 / 144, base: 103 / 144 };
const SERIF = "'Cormorant Garamond', Georgia, serif";
const SPACING = 0.012; // em (igual ao logótipo)
const FLY_END = 0.2; // parte do scroll do topo em que a palavra viaja até à barra
const REST = 0.002; // em repouso a palavra está dentro da cena, atrás da casa

// medidas da letra (canvas): lados do Q e do R, altura das maiúsculas, ascendente/descendente
function fontMetrics(size) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = `300 ${size}px ${SERIF}`;
  const q = ctx.measureText("Q");
  const r = ctx.measureText("R");
  const m = ctx.measureText("M");
  return {
    qLeft: q.actualBoundingBoxLeft,
    rGap: r.width - r.actualBoundingBoxRight,
    cap: m.actualBoundingBoxAscent,
    asc: m.fontBoundingBoxAscent,
    desc: m.fontBoundingBoxDescent,
  };
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

function FlyingWord({ p, ready }) {
  const layerRef = useRef(null);
  const flyRef = useRef(null);
  const spanRef = useRef(null);
  const metrics = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const update = () => {
    const layer = layerRef.current;
    const fly = flyRef.current;
    const span = spanRef.current;
    const logo = document.querySelector("[data-nav-logo]");
    if (!layer || !fly || !span) return;
    const v = p.get();
    const t = easeInOut(Math.min(1, Math.max(0, v / FLY_END)));
    // com o menu do telemóvel aberto, o logótipo volta e a palavra esconde-se
    const menuOpen = document.querySelector("[data-nav-header]")?.dataset.menuOpen === "true";
    layer.style.visibility = menuOpen ? "hidden" : "";
    if (menuOpen) {
      if (logo) logo.style.opacity = "1";
      return;
    }

    // a palavra só existe no topo; no fim entrega o lugar ao logótipo
    // em repouso mostra-se a cópia de dentro da cena (atrás da casa); ao fazer scroll, esta voa
    fly.style.opacity = v <= REST ? "0" : String(t < 0.9 ? 1 : Math.max(0, 1 - (t - 0.9) / 0.1));
    if (logo) {
      logo.style.transition = "none";
      logo.style.opacity = String(t < 0.85 ? 0 : (t - 0.85) / 0.15);
    }
    if (!logo || t === 0) {
      fly.style.transform = "none";
      return;
    }

    // medidas da letra só quando mudam (redimensionar), não a cada frame do scroll
    if (!metrics.current) {
      const size = parseFloat(getComputedStyle(span).fontSize);
      metrics.current = { size, ...fontMetrics(size) };
    }
    const size = metrics.current.size;
    const m = metrics.current;
    const lr = layer.getBoundingClientRect();
    const nat = { left: lr.left + fly.offsetLeft, top: lr.top + fly.offsetTop, width: fly.offsetWidth };
    // tinta da palavra grande, sem transformação
    const pad = SPACING * size;
    const ink = {
      left: nat.left + pad - m.qLeft,
      right: nat.left + nat.width - pad - m.rGap,
      base: nat.top + (0.8 * size - (m.asc + m.desc)) / 2 + m.asc,
    };
    ink.cap = ink.base - m.cap;
    // tinta do QAMAR no logótipo da barra
    const L = logo.getBoundingClientRect();
    const dst = {
      left: L.left + L.width * LOGO_INK.left,
      right: L.left + L.width * LOGO_INK.right,
      cap: L.top + L.height * LOGO_INK.cap,
      base: L.top + L.height * LOGO_INK.base,
    };
    // escala pela altura das maiúsculas; alinha pelo centro e pela linha de base
    const sEnd = (dst.base - dst.cap) / (ink.base - ink.cap);
    const s = lerp(1, sEnd, t);
    const cx = lerp((ink.left + ink.right) / 2, (dst.left + dst.right) / 2, t);
    const by = lerp(ink.base, dst.base, t);
    const ax = (ink.left + ink.right) / 2 - nat.left;
    const ay = ink.base - nat.top;
    fly.style.transform = `translate(${cx - nat.left - s * ax}px, ${by - nat.top - s * ay}px) scale(${s})`;
  };

  useMotionValueEvent(p, "change", update);
  useEffect(() => {
    if (!mounted) return;
    update();
    document.fonts?.ready.then(() => {
      metrics.current = null; // a letra chegou: medir de novo
      update();
    });
    const onResize = () => {
      metrics.current = null;
      update();
    };
    window.addEventListener("resize", onResize);
    const header = document.querySelector("[data-nav-header]");
    const mo = new MutationObserver(update);
    if (header) mo.observe(header, { attributes: true, attributeFilter: ["data-menu-open"] });
    // a barra entra e muda de altura com transições: acompanha-as só nesses momentos
    const timers = [300, 800, 1600, 2600].map((ms) => setTimeout(update, ms));
    header?.addEventListener("transitionend", update);
    return () => {
      window.removeEventListener("resize", onResize);
      mo.disconnect();
      timers.forEach(clearTimeout);
      header?.removeEventListener("transitionend", update);
      const logo = document.querySelector("[data-nav-logo]");
      if (logo) {
        logo.style.opacity = "";
        logo.style.transition = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[24svh] z-[1001] flex justify-center md:top-[11vh]"
    >
      <div ref={flyRef} style={{ transformOrigin: "0 0", willChange: "transform" }}>
        {/* mesma letra do logótipo; 'calt' mantém o Q de cauda longa mesmo com espaçamento */}
        <motion.span
          ref={spanRef}
          className="block select-none whitespace-nowrap font-light leading-[0.8] text-[#111]"
          style={{
            fontFamily: SERIF,
            fontSize: "25.3vw",
            letterSpacing: `${SPACING}em`,
            paddingLeft: `${SPACING}em`,
            fontFeatureSettings: "'calt' 1, 'liga' 1",
          }}
          initial={{ y: "18%", opacity: 0 }}
          animate={ready ? { y: "0%", opacity: 1 } : { y: "18%", opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
        >
          QAMAR
        </motion.span>
      </div>
    </div>,
    document.body
  );
}

export function MonoHero({ ready = true }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // a casa aproxima-se e fecha-se na coluna do meio
  const mobile = useIsMobile();
  const layout = mobile ? LAYOUT.mobile : LAYOUT.desktop;
  const sides = mobile ? SIDES.filter((s) => Math.abs(s.x) === 1) : SIDES;
  const zoom = useTransform(p, [0, 0.5], [1, mobile ? 1.35 : 1.9]);
  const inset = ((100 - layout.col) / 2).toFixed(2);
  const clip = useTransform(p, [0.04, 0.46], [
    "inset(0% 0% 0% 0%)",
    `inset(${layout.top}% ${inset}% ${layout.bottom}% ${inset}%)`,
  ]);
  const tagOpacity = useTransform(p, [0, 0.1], [1, 0]);
  const stripY = useTransform(p, [0.6, 1], ["0%", "-6%"]);
  // telemóvel: escurece enquanto a secção seguinte sobe por cima (cascata)
  const cascadeShade = useTransform(p, [0.55, 1], [0, 0.6]);
  // QAMAR em repouso, atrás da casa (passa a palavra que voa assim que começa o scroll)
  const restOpacity = useTransform(p, (v) => (v <= REST ? 1 : 0));

  return (
    <section ref={ref} id="hero-desktop" data-hide-cta data-scene data-scene-duration="2.2" className="mono-root relative h-[320svh] bg-white md:h-[260vh]" style={{ fontFamily: SANS }}>
      {/* QAMAR gigante: com o scroll encolhe e voa até ao logótipo da barra */}
      <FlyingWord p={p} ready={ready} />
      <div className="sticky top-0 h-[100svh] overflow-hidden md:h-screen">
        <motion.div className="absolute inset-0" style={{ y: stripY }}>
          {/* Coluna do meio: a cena inteira, recortada pelo scroll */}
          <motion.div className="absolute inset-0 bg-white" style={{ clipPath: clip }}>
            <div className="absolute inset-0" style={{ perspective: 1100, perspectiveOrigin: "50% 30%" }}>
            {/* Transição 3D depois da entrada: a câmara vem rasante sobre o canal até à casa */}
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "50% 100%" }}
              initial={{ rotateX: 24, scale: 1.55, y: "14%" }}
              animate={ready ? { rotateX: 0, scale: 1, y: "0%" } : { rotateX: 24, scale: 1.55, y: "14%" }}
              transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
            >
            <motion.div className="absolute inset-0" style={{ scale: zoom, transformOrigin: "50% 44%" }}>
              {/* QAMAR em repouso, atrás da casa: no mesmo sítio da palavra que voa */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[24svh] flex justify-center md:top-[11vh]"
                style={{ opacity: restOpacity }}
              >
                <motion.span
                  className="block select-none whitespace-nowrap font-light leading-[0.8] text-[#111]"
                  style={{
                    fontFamily: SERIF,
                    fontSize: "25.3vw",
                    letterSpacing: `${SPACING}em`,
                    paddingLeft: `${SPACING}em`,
                    fontFeatureSettings: "'calt' 1, 'liga' 1",
                  }}
                  initial={{ y: "18%", opacity: 0 }}
                  animate={ready ? { y: "0%", opacity: 1 } : { y: "18%", opacity: 0 }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
                >
                  QAMAR
                </motion.span>
              </motion.div>
              {/* Casa recortada (céu transparente).
                  No telemóvel fica mais alta e centrada (corta os lados). */}
              <div className="absolute bottom-0 left-1/2 aspect-video h-[66svh] -translate-x-1/2 md:left-0 md:h-auto md:w-full md:translate-x-0">
                <motion.img
                  src="/mono/hero-cut.webp"
                  alt="Casa tradicional com azulejos junto a um canal de Aveiro"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={ready ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0 }}
                  transition={{ duration: 1.8, ease: EASE, delay: 0.1 }}
                />
              </div>
            </motion.div>
            </motion.div>
            </div>

            {/* Frase sobre a água */}
            <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44svh] bg-gradient-to-t from-black/55 to-transparent md:h-[34vh] md:from-black/45" style={{ opacity: tagOpacity }} />
            <motion.div
              className="absolute bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-5 right-5 z-10 flex flex-col items-start text-left text-white md:bottom-[6vh] md:left-[5vw] md:right-auto md:max-w-[46vw]"
              style={{ opacity: tagOpacity }}
            >
              <motion.h1
                className="font-normal leading-[1.2] tracking-[-0.01em] [text-shadow:0_1px_24px_rgba(0,0,0,0.25)]"
                style={{ fontSize: "clamp(22px, 2.3vw, 38px)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 1, ease: EASE, delay: 1.4 }}
              >
                Diga quanto quer receber.
                <br />
                Vendemos a sua casa em 60 dias.
              </motion.h1>
              <motion.button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-investment-form", { detail: { view: "sim" } }))
                }
                className="mt-5 text-[13px] text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1.7 }}
              >
                Quanto lhe sobra numa venda tradicional? Fazer as contas →
              </motion.button>
            </motion.div>

            {/* Primeiro passo do formulário, já no topo */}
            <motion.div className="absolute bottom-[6vh] right-[5vw] z-10 hidden w-[min(380px,32vw)] md:block" style={{ opacity: tagOpacity }}>
              <motion.div
                className="border border-white/40 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-md"
                initial={{ opacity: 0, y: 40 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 1, ease: EASE, delay: 1.9 }}
              >
                <FirstStep />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Quatro colunas que entram dos lados */}
          {sides.map((img) => (
            <SideColumn key={img.src} p={p} img={img} layout={layout} />
          ))}
        </motion.div>
        <motion.div className="pointer-events-none absolute inset-0 z-20 bg-black md:hidden" style={{ opacity: cascadeShade }} />
      </div>
    </section>
  );
}
