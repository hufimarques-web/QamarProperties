"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MonoHero } from "./mono/MonoHero";
import { FirstStep } from "./mono/Conversion";

// Imagens do loader (rodam no centro enquanto o contador sobe)
const LOADER_IMAGES = [
  "/intro/l1.jpg",
  "/intro/l2.jpg",
  "/intro/l3.jpg",
  "/intro/l4.jpg",
  "/intro/l5.jpg",
];
const HERO_IMAGE = "/intro/hero.jpg";
const HERO_IMAGE_MOBILE = "/intro/hero-mobile.jpg";

// Tempos da entrada (ms)
const T_LOGO = 1900; // contador chega a 100: a imagem sai e o logo aparece em grande
const T_FLY = 3300; // o logo sobe e encolhe até ao menu (como na Emaar)
const T_REVEAL = 3500; // o fundo creme dissolve-se e mostra o topo do site
const T_DONE = 4600; // fim (o logo do menu toma o lugar do logo da entrada)

const EASE = [0.76, 0, 0.24, 1];
const SERIF = "'Cormorant Garamond', Georgia, serif";

// ── Entrada no computador ──
// Loader da Spinta (imagens a rodar + contador) → logo em grande no centro
// → o logo voa até ao menu enquanto o fundo se dissolve (Emaar).
function Intro({ onReveal, onDone }) {
  const [phase, setPhase] = useState("loading"); // loading → logo → fly
  const [count, setCount] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [flight, setFlight] = useState(null);
  const logoRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("qamar-intro");
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (T_LOGO - 150));
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const cycle = setInterval(() => setImgIndex((i) => (i + 1) % LOADER_IMAGES.length), 300);

    const t1 = setTimeout(() => {
      clearInterval(cycle);
      setPhase("logo");
    }, T_LOGO);
    const t2 = setTimeout(() => {
      const target = document.querySelector("[data-nav-logo]");
      const src = logoRef.current;
      if (target && src) {
        const a = src.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        setFlight({ x: b.left - a.left, y: b.top - a.top, scale: b.width / a.width });
      }
      setPhase("fly");
    }, T_FLY);
    const t3 = setTimeout(onReveal, T_REVEAL);
    const t4 = setTimeout(() => document.body.classList.remove("qamar-intro"), T_DONE);
    const t5 = setTimeout(onDone, T_DONE + 400);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(cycle);
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
      document.body.classList.remove("qamar-intro");
    };
  }, [onDone, onReveal]);

  const loading = phase === "loading";
  const flying = phase === "fly";

  return (
    <>
      {/* Fundo creme + imagens do loader + contador — dissolve-se no fim */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[2000] overflow-hidden"
        style={{ background: "#EEECE7" }}
        animate={{ opacity: flying ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: flying ? 0.2 : 0 }}
        aria-hidden="true"
      >
        {/* imagem central a rodar */}
        <motion.div
          className="absolute left-1/2 top-1/2 overflow-hidden rounded-[4px]"
          style={{ width: "clamp(140px, 14vw, 240px)", height: "clamp(105px, 10.5vw, 180px)", x: "-50%", y: "-50%" }}
          animate={loading ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          {LOADER_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: i === imgIndex ? 1 : 0 }}
            />
          ))}
        </motion.div>

        {/* linha de progresso */}
        <div className="absolute right-[5vw] top-1/2 h-[28vh] w-px -translate-y-1/2 bg-black/10">
          <div className="absolute left-0 top-0 w-px bg-black/70" style={{ height: `${count}%`, opacity: loading ? 1 : 0, transition: "opacity .3s" }} />
        </div>

        {/* contador */}
        <motion.div
          className="absolute bottom-[5vh] right-[5vw] leading-none text-[#1A1A1A]"
          style={{ fontFamily: SERIF, fontSize: "clamp(48px, 6vw, 96px)", fontVariantNumeric: "lining-nums tabular-nums" }}
          animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          {String(count).padStart(3, "0")}
        </motion.div>
        <motion.p
          className="absolute bottom-[5vh] left-[5vw] font-body text-xs uppercase tracking-[0.3em] text-black/50"
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          Venda com valor líquido
        </motion.p>
      </motion.div>

      {/* Logo grande, linha e frase — camada própria para o logo voar até ao menu */}
      <div className="pointer-events-none fixed inset-0 z-[2001] flex items-center justify-center" aria-hidden="true">
        <div className="flex flex-col items-center text-center">
          <motion.div
            ref={logoRef}
            className="relative w-[44vw] max-w-[720px] will-change-transform"
            style={{ transformOrigin: "0 0" }}
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            animate={
              flying && flight
                ? { opacity: 1, x: flight.x, y: flight.y, scale: flight.scale, filter: "blur(0px)" }
                : loading
                  ? { opacity: 0, y: 14, filter: "blur(10px)" }
                  : { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
            }
            transition={flying ? { duration: 1.25, ease: [0.76, 0, 0.24, 1] } : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* escuro: o topo no computador é branco (estilo MONO), por isso o logo do menu também é escuro */}
            <img src="/logo/qamar-logo-dark.png" alt="" className="block h-auto w-full" />
          </motion.div>
          <motion.span
            className="mt-8 block h-px w-20 origin-center bg-[#1A1A1A]/60"
            initial={{ scaleX: 0 }}
            animate={phase === "logo" ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={phase === "logo" ? { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.35 } : { duration: 0.35 }}
          />
          <motion.p
            className="mt-6 font-body text-xs uppercase tracking-[0.36em] text-black/60"
            initial={{ opacity: 0, y: 8 }}
            animate={phase === "logo" ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={phase === "logo" ? { duration: 0.8, delay: 0.6 } : { duration: 0.3 }}
          >
            Diga quanto quer receber
          </motion.p>
        </div>
      </div>
    </>
  );
}

// ── Entrada no telemóvel (inspirada na Emaar) ──
// Fundo escuro com a foto ao fundo, o logo aparece no centro, desenha-se uma linha
// dourada e surge a frase. Depois o logo encolhe e voa até ao lugar do logo no menu
// (canto superior esquerdo) enquanto o fundo se dissolve no topo do site.
const M_MOVE = 2600; // o logo começa a voar para o menu
const M_REVEAL = 2850; // o fundo começa a dissolver-se
const M_DONE = 3900; // fim: o logo do menu toma o lugar do logo da entrada

function IntroMobile({ onReveal, onDone }) {
  const [phase, setPhase] = useState("logo"); // logo → move → reveal
  const [flight, setFlight] = useState(null); // { x, y, scale }
  const logoRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("qamar-intro");

    const t1 = setTimeout(() => {
      // mede o logo do menu e calcula o voo (origem no canto superior esquerdo)
      const target = document.querySelector("[data-nav-logo]");
      const src = logoRef.current;
      if (target && src) {
        const a = src.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        setFlight({ x: b.left - a.left, y: b.top - a.top, scale: b.width / a.width });
      }
      setPhase("move");
    }, M_MOVE);
    const t2 = setTimeout(() => {
      setPhase("reveal");
      onReveal();
    }, M_REVEAL);
    // o logo do menu entra (tem uma transição de 0,3 s) enquanto o da entrada
    // ainda está por cima, no mesmo sítio — assim não há nenhum instante sem logo
    const t3 = setTimeout(() => document.body.classList.remove("qamar-intro"), M_DONE);
    const t4 = setTimeout(onDone, M_DONE + 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.classList.remove("qamar-intro");
    };
  }, [onDone, onReveal]);

  const moving = phase !== "logo";
  const revealing = phase === "reveal";

  return (
    <>
      {/* Fundo escuro com a foto — dissolve-se no topo do site */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[2000] overflow-hidden bg-[#120F0E]"
        animate={{ opacity: revealing ? 0 : 1 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        aria-hidden="true"
      >
        <motion.img
          src={HERO_IMAGE_MOBILE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.32, scale: 1 }}
          transition={{ duration: 2.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
      </motion.div>

      {/* Logo, linha e frase — numa camada própria para o logo poder voar até ao menu */}
      <div
        className="pointer-events-none fixed inset-0 z-[2001] flex items-center justify-center px-8"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center text-center">
          <motion.img
            ref={logoRef}
            src="/logo/qamar-logo-light.png"
            alt=""
            className="h-auto w-[72vw] max-w-[320px] will-change-transform"
            style={{ transformOrigin: "0 0" }}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={
              moving && flight
                ? { opacity: 1, x: flight.x, y: flight.y, scale: flight.scale, filter: "blur(0px)" }
                : moving
                  ? { opacity: 0 }
                  : { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
            }
            transition={
              moving
                ? { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
                : { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
            }
          />
          <motion.span
            className="mt-6 block h-px w-16 origin-center bg-gold"
            initial={{ scaleX: 0 }}
            animate={moving ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={moving ? { duration: 0.4 } : { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 1.05 }}
          />
          <motion.p
            className="mt-5 font-body text-[11px] uppercase tracking-[0.32em] text-white/80"
            initial={{ opacity: 0, y: 6 }}
            animate={moving ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
            transition={moving ? { duration: 0.35 } : { duration: 0.8, ease: "easeOut", delay: 1.45 }}
          >
            Diga quanto quer receber
          </motion.p>
        </div>
      </div>
    </>
  );
}

export function IntroHero() {
  // null = ainda não sabemos (evita piscar no primeiro render)
  const [showIntro, setShowIntro] = useState(null);
  const [revealed, setRevealed] = useState(false); // a cena já começou a entrar
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("qamar-intro") === "1";
    } catch (e) {}
    // ?intro no endereço volta a mostrar a entrada (útil para testar)
    if (new URLSearchParams(window.location.search).has("intro")) seen = false;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    const run = !seen && !reduced;
    setShowIntro(run);
    if (!run) setRevealed(true);
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showIntro]);

  const reveal = React.useCallback(() => setRevealed(true), []);
  const finish = React.useCallback(() => {
    try {
      sessionStorage.setItem("qamar-intro", "1");
    } catch (e) {}
    setShowIntro(false);
  }, []);

  // ── Scroll: a câmara avança para a janela e os textos trocam ──
  const sectionRef = useRef(null);
  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const camScale = useTransform(p, [0, 1], [1, 2.1]);
  const camY = useTransform(p, [0, 1], ["0%", "4%"]);
  const shade = useTransform(p, [0, 0.45, 0.6, 1], [0.35, 0.25, 0.45, 0.55]);

  const t1Opacity = useTransform(p, [0, 0.22, 0.32], [1, 1, 0]);
  const t1Y = useTransform(p, [0, 0.32], ["0px", "-60px"]);
  const t1Blur = useTransform(p, [0.2, 0.32], ["blur(0px)", "blur(12px)"]);

  const t2Opacity = useTransform(p, [0.4, 0.5, 0.72, 0.82], [0, 1, 1, 0]);
  const t2Y = useTransform(p, [0.4, 0.5, 0.82], ["50px", "0px", "-50px"]);
  const t2Blur = useTransform(p, [0.4, 0.5, 0.72, 0.82], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  const cueOpacity = useTransform(p, [0, 0.12], [1, 0]);
  // telemóvel: o topo escurece enquanto a secção seguinte sobe por cima (cascata)
  const heroShade = useTransform(p, [0.5, 1], [0, 0.6]);

  const ready = showIntro === false;
  const fade = (delay) => ({
    initial: { opacity: 0, y: 18, filter: "blur(8px)" },
    animate: ready
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 18, filter: "blur(8px)" },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
  });

  return (
    <>
      {/* Cobre a página até sabermos se a entrada corre (evita ver o hero por um instante) */}
      {showIntro === null && (
        <div className="fixed inset-0 z-[2000] bg-[#120F0E] md:bg-[#EEECE7]" />
      )}
      {showIntro &&
        (isMobile ? (
          <IntroMobile onReveal={reveal} onDone={finish} />
        ) : (
          <Intro onReveal={reveal} onDone={finish} />
        ))}

      {/* Topo ao estilo MONO (computador e telemóvel) */}
      <MonoHero ready={revealed} />

      {/* Topo escuro antigo do telemóvel: desligado (o telemóvel usa agora o MonoHero) */}
      <section ref={sectionRef} id="hero" className="relative hidden h-[300vh] w-full bg-black">
        <div className="sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden" style={{ perspective: 900, perspectiveOrigin: "50% 25%" }}>
          {/* Câmara: entra devagar quando o logo se dissolve e avança com o scroll */}
          <motion.div
            className="absolute inset-0"
            style={{ scale: camScale, y: camY, transformOrigin: "52% 42%" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.45, rotateX: 18, y: "8%" }}
              animate={revealed ? { scale: 1, rotateX: 0, y: "0%" } : { scale: 1.45, rotateX: 18, y: "8%" }}
              transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "52% 100%" }}
            >
              <picture>
                <source media="(max-width: 767px)" srcSet={HERO_IMAGE_MOBILE} />
                <img
                  src={HERO_IMAGE}
                  alt="Sala com vista para os canais de Aveiro ao pôr do sol"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />

          {/* Texto 1 */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-[34svh] text-center text-white"
            style={{ opacity: t1Opacity, y: t1Y, filter: t1Blur }}
          >
            <motion.p
              className="mb-5 font-body text-[10px] uppercase tracking-[0.25em] text-white/75 md:text-[11px] md:tracking-[0.4em]"
              {...fade(0)}
            >
              Vender casa em Aveiro · Valor líquido
            </motion.p>
            <motion.h1
              className="font-light leading-[0.98] tracking-tight"
              style={{ fontFamily: SERIF, fontSize: "clamp(44px, 7.4vw, 124px)" }}
              {...fade(0.1)}
            >
              <span className="block">Diga quanto quer</span>
              <em className="block italic">receber.</em>
            </motion.h1>
            <motion.a
              href="/oportunidades"
              className="mt-8 font-body text-[11px] uppercase tracking-[0.28em] text-white/80 transition-colors hover:text-white"
              {...fade(0.4)}
            >
              Procura casa? Entre na base →
            </motion.a>
          </motion.div>

          {/* Texto 2: aparece enquanto a câmara entra na sala */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white"
            style={{ opacity: t2Opacity, y: t2Y, filter: t2Blur }}
          >
            <p className="mb-5 font-body text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-[11px] md:tracking-[0.4em]">
              O modelo
            </p>
            <h2
              className="font-light leading-[1] tracking-tight"
              style={{ fontFamily: SERIF, fontSize: "clamp(40px, 6.4vw, 108px)" }}
            >
              Vendemos em <em className="italic">60 dias.</em>
            </h2>
            <p className="mt-6 max-w-xl font-body text-base font-light text-white/85 md:text-lg">
              Se vendermos pelo seu valor, ganhamos zero. O que conseguirmos acima
              é a nossa remuneração. Sem comissão a somar.
            </p>
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-0 z-[15] bg-black md:hidden" style={{ opacity: heroShade }} />

          {/* Barra ao estilo da Emaar (computador: segmentada; telemóvel: uma só) */}
          <motion.div
            className="absolute inset-x-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-10 sm:inset-x-[4vw] sm:bottom-[6vh]"
            style={{ opacity: cueOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
            >
              {/* Primeiro passo do formulário, já no topo */}
              <div className="border border-white/15 bg-[#2a221d]/60 p-4 backdrop-blur-md">
                <FirstStep tone="dark" compact />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
