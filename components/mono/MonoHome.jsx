"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/faqs";
import { SANS } from "./MonoHero";
import { CompactSim, StickyCta } from "./Conversion";
import { RoomTunnel } from "./RoomTunnel";
import { MobileCascade, useIsMobile } from "@/components/shared/MobileCascade";

// Página inicial no computador, ao estilo do template MONO (v0):
// branco, Inter, muito espaço, imagens grandes e transições presas ao scroll.

const EASE = [0.16, 1, 0.3, 1];
const INK = "#0A0A0A";

const openSeller = () => window.dispatchEvent(new Event("open-investment-form"));
const openSim = () => window.dispatchEvent(new CustomEvent("open-investment-form", { detail: { view: "sim" } }));

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: EASE, delay },
});

function Eyebrow({ children, light }) {
  return (
    <p className={`text-[11px] font-medium uppercase tracking-[0.2em] ${light ? "text-white/60" : "text-neutral-500"}`}>
      {children}
    </p>
  );
}

// ── 1. Frases que entram uma a uma (como "Sustainable Architecture.") ──
function Phrase({ p, i, n, children }) {
  const s = i / n;
  const e = (i + 1) / n;
  const first = i === 0;
  const last = i === n - 1;
  // Nunca há ecrã vazio: a primeira frase já está à vista quando a secção chega,
  // e a troca entre frases é cruzada (a seguinte entra enquanto a anterior sai).
  const at = [];
  const op = [];
  const ys = [];
  const bl = [];
  if (!first) {
    at.push(s - 0.035, s + 0.045);
    op.push(0, 1);
    ys.push(60, 0);
    bl.push("blur(14px)", "blur(0px)");
  } else {
    at.push(0);
    op.push(1);
    ys.push(0);
    bl.push("blur(0px)");
  }
  if (!last) {
    at.push(e - 0.045, e + 0.035);
    op.push(1, 0);
    ys.push(0, -60);
    bl.push("blur(0px)", "blur(14px)");
  } else {
    at.push(1);
    op.push(1);
    ys.push(0);
    bl.push("blur(0px)");
  }
  const opacity = useTransform(p, at, op);
  const y = useTransform(p, at, ys);
  const blur = useTransform(p, at, bl);
  return (
    <motion.h2
      className="absolute inset-x-0 px-6 text-center font-medium tracking-[-0.035em] text-[#0A0A0A]"
      style={{ opacity, y, filter: blur, fontSize: "clamp(42px, 5.6vw, 96px)", lineHeight: 1 }}
    >
      {children}
    </motion.h2>
  );
}

export function MonoStatement() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lines = ["Diga quanto quer receber.", "Vendemos em 60 dias.", "Sem comissão a somar."];
  return (
    <section ref={ref} data-scene data-scene-duration="3" className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden md:h-screen">
        {lines.map((l, i) => (
          <Phrase key={l} p={p} i={i} n={lines.length}>
            {l}
          </Phrase>
        ))}
      </div>
    </section>
  );
}

// ── 2. Texto + grelha de desenhos (bento) ──
const TILES = [
  { src: "/casas/fachada.jpg", label: "Fachada", cls: "col-span-2 row-span-2" },
  { src: "/casas/pormenor.jpg", label: "Pormenor", cls: "" },
  { src: "/casas/cozinha.jpg", label: "Cozinha", cls: "row-span-2" },
  { src: "/casas/quarto.jpg", label: "Quarto", cls: "" },
  { src: "/casas/sala.jpg", label: "Sala", cls: "col-span-2" },
  { src: "/casas/casa-de-banho.jpg", label: "Casa de banho", cls: "" },
  { src: "/casas/acabamentos.jpg", label: "Acabamentos", cls: "" },
];

export function MonoGallery() {
  return (
    <section className="bg-white px-5 py-20 md:px-[5vw] md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-10">
          <motion.div className="md:col-span-6" {...fadeUp()}>
            <Eyebrow>Valorizar</Eyebrow>
            <h2 className="mt-5 font-medium leading-[1] tracking-[-0.035em]" style={{ fontSize: "clamp(40px, 4.4vw, 72px)", color: INK }}>
              Mostramos a casa
              <br />
              como pode ficar.
            </h2>
          </motion.div>
          <motion.div className="md:col-span-5 md:col-start-8" {...fadeUp(0.1)}>
            <p className="text-[16px] leading-relaxed text-neutral-600 md:text-[17px]">
              Fotografia profissional, renders à escala, plantas e orçamento de obra. O comprador vê o potencial da casa antes da
              visita. Tudo por nossa conta. Se não vendermos, as fotos e os renders ficam consigo.
            </p>
          </motion.div>
        </div>

        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 md:mt-16 md:auto-rows-[clamp(200px,19vw,290px)] md:grid-cols-4 md:gap-4">
          {TILES.map((t, i) => (
            <motion.figure
              key={t.src}
              className={`group relative overflow-hidden rounded-[3px] border border-neutral-200 bg-[#F7F7F5] ${t.cls}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 4) * 0.08 }}
            >
              <img
                src={t.src}
                alt={t.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <figcaption className="absolute bottom-3 left-3 bg-white/85 px-2.5 py-1 text-[11px] font-medium text-neutral-700 backdrop-blur">
                {t.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-neutral-400">Fotografia profissional de casas reais.</p>
      </div>
    </section>
  );
}

// ── 3. Secção escura: três etapas sobre a mesma imagem ──
const STAGES = [
  { t: "Estudo de mercado.", d: "Vendas reais, não anúncios. Recebe-o antes de nos dizer o seu valor." },
  { t: "Valorização.", d: "Fotografia, renders e janela de propostas. Por nossa conta." },
  { t: "Escritura em 60 dias.", d: "Nunca abaixo do seu valor líquido. Se não vendermos, saímos." },
];

function Stage({ p, i, s }) {
  const a = 0.04 + i * 0.19;
  const b = a + 0.19;
  const last = i === STAGES.length - 1;
  const range = last ? [a, a + 0.06, 0.6, 0.66] : [a, a + 0.06, b - 0.04, b];
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const blur = useTransform(p, range, ["blur(16px)", "blur(0px)", "blur(0px)", "blur(16px)"]);
  const y = useTransform(p, range, [40, 0, 0, -40]);
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white" style={{ opacity, filter: blur, y }}>
      <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.24em] text-white/60">
        0{i + 1} / 03
      </p>
      <h2 className="font-medium tracking-[-0.035em]" style={{ fontSize: "clamp(44px, 6.4vw, 112px)", lineHeight: 1 }}>
        {s.t}
      </h2>
      <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[18px]">{s.d}</p>
    </motion.div>
  );
}

export function MonoStages() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const mobile = useIsMobile();
  const scale = useTransform(p, [0, 0.62], [1.18, 1]);
  // telemóvel: a imagem fecha-se num cartão; as colunas laterais só aparecem no computador
  const clip = useTransform(p, [0.64, 0.95], ["inset(0% 0% 0% 0%)", mobile ? "inset(12% 6% 14% 6%)" : "inset(9% 23% 9% 23%)"]);
  const shade = useTransform(p, [0, 0.62, 0.8], [0.45, 0.4, 0.1]);
  const leftX = useTransform(p, [0.68, 0.98], ["-110%", "0%"]);
  const rightX = useTransform(p, [0.68, 0.98], ["110%", "0%"]);
  return (
    <section ref={ref} data-scene data-scene-duration="5" data-scene-stops="0.145,0.335,0.54,0.98" className="relative h-[460vh] bg-[#0A0A0A]" style={{ fontFamily: SANS }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden md:h-screen">
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.img
            src="/real/aveiro-canal-tarde.jpg"
            alt="Canal de Aveiro ao fim da tarde"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale }}
          />
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
          {STAGES.map((s, i) => (
            <Stage key={s.t} p={p} i={i} s={s} />
          ))}
        </motion.div>
        <motion.div className="absolute bottom-[9%] left-[2vw] top-[9%] hidden w-[19vw] overflow-hidden md:block" style={{ x: leftX }}>
          <img src="/opt/p-sala2.jpg" alt="Sala com tetos trabalhados e janelas altas" className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div className="absolute bottom-[9%] right-[2vw] top-[9%] hidden w-[19vw] overflow-hidden md:block" style={{ x: rightX }}>
          <img src="/opt/p-cozinha.jpg" alt="Cozinha com ilha em mármore e madeira escura" className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}

// ── 4. Imagem que cresce no preto ──
export function MonoGrow() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const mobile = useIsMobile();
  const w = useTransform(p, [0, 0.6], [mobile ? "72vw" : "44vw", "100vw"]);
  const h = useTransform(p, [0, 0.6], [mobile ? "48svh" : "52vh", mobile ? "100svh" : "100vh"]);
  const radius = useTransform(p, [0, 0.6], [6, 0]);
  const imgScale = useTransform(p, [0, 1], [1.25, 1]);
  const textOpacity = useTransform(p, [0.62, 0.78], [0, 1]);
  const textY = useTransform(p, [0.62, 0.78], [40, 0]);
  return (
    <section ref={ref} data-scene data-scene-duration="2.2" className="relative h-[320vh] bg-black" style={{ fontFamily: SANS }}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden md:h-screen">
        <motion.div className="relative overflow-hidden" style={{ width: w, height: h, borderRadius: radius }}>
          <motion.img
            src="/real/costa-nova.jpg"
            alt="Casas às riscas da Costa Nova, Aveiro"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: imgScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <motion.div className="absolute inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] px-5 text-white md:bottom-[12vh] md:px-[6vw]" style={{ opacity: textOpacity, y: textY }}>
            <Eyebrow light>Para quem compra</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-medium tracking-[-0.035em]" style={{ fontSize: "clamp(40px, 4.6vw, 80px)", lineHeight: 1.02 }}>
              Cada casa com os motivos para não comprar.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[17px]">
              Renders à escala, orçamento de obra, cenários de crédito e relatório técnico. Por escrito, antes da visita.
            </p>
            <Link href="/oportunidades" className="btn-lux btn-lux--solid-light mt-8">
              Entrar na base de compradores
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 5. Três cartões (como "Compact / Standard / Premium") ──
const CARDS = [
  { title: "Vender", text: "Diga quanto quer receber. Valor líquido, sem comissão.", meta: "0 € comissão", img: "/real/aveiro-azulejos.jpg", action: openSeller },
  { title: "Comprar", text: "Casas antes dos portais, com o crédito já simulado.", meta: "Base de compradores", img: "/real/sala-arvores.jpg", href: "/oportunidades" },
  { title: "Fazer as contas", text: "Quanto lhe sobra numa venda tradicional?", meta: "Simulador", img: "/mono/sk-planta.jpg", action: openSim },
];

export function MonoCards() {
  return (
    <section className="bg-white px-5 py-20 md:px-[5vw] md:py-32" style={{ fontFamily: SANS }}>
      <div className="mx-auto max-w-[1400px]">
        <motion.div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10" {...fadeUp()}>
          <div>
            <Eyebrow>Por onde começar</Eyebrow>
            <h2 className="mt-5 font-medium leading-[1] tracking-[-0.035em]" style={{ fontSize: "clamp(40px, 4.4vw, 72px)", color: INK }}>
              Três portas de entrada.
            </h2>
          </div>
          <p className="max-w-sm text-[16px] leading-relaxed text-neutral-600">
            Quem vende, quem compra e quem ainda está a fazer contas. Escolha a sua.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-6">
          {CARDS.map((c, i) => {
            const inner = (
              <>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-neutral-100">
                  <img
                    src={c.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6 text-left">
                  <div>
                    <h3 className="text-[19px] font-medium tracking-[-0.01em] text-[#0A0A0A]">{c.title}</h3>
                    <p className="mt-1.5 max-w-[30ch] text-[14px] leading-relaxed text-neutral-500">{c.text}</p>
                  </div>
                  <p className="shrink-0 text-[15px] font-medium text-[#0A0A0A]">{c.meta}</p>
                </div>
              </>
            );
            return (
              <motion.div key={c.title} {...fadeUp(i * 0.1)}>
                {c.href ? (
                  <Link href={c.href} className="group block">
                    {inner}
                  </Link>
                ) : (
                  <button type="button" onClick={c.action} className="group block w-full">
                    {inner}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 6. Imagem + números (como "Surface area / Energy use…") ──
// Cada número conta até ao valor quando entra no ecrã (um a seguir ao outro).
// "parts": os números a animar (de "from" até "to"); "fmt" monta o texto.
// A comissão faz o contrário: desce dos 11 070 € de uma imobiliária comum até 0 €.
const nfStat = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 });
const STATS = [
  { k: "Prazo para vender", parts: [{ from: 0, to: 60 }], fmt: ([a]) => `${a} dias` },
  { k: "Comissão a somar", parts: [{ from: 11070, to: 0 }], fmt: ([a]) => `${nfStat.format(a)} €`, note: "Numa imobiliária comum: 11 070 €" },
  { k: "Sinal no CPCV", parts: [{ from: 0, to: 5 }, { from: 0, to: 10 }], fmt: ([a, b]) => `${a}–${b} %` },
  { k: "Acompanhamento", parts: [{ from: 0, to: 3 }], fmt: ([a]) => `${a} ${a === 1 ? "mês" : "meses"}` },
];

function StatValue({ stat, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const final = stat.fmt(stat.parts.map((p) => p.to));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView) {
      el.textContent = stat.fmt(stat.parts.map((p) => p.from));
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = final;
      return;
    }
    const controls = animate(0, 1, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (t) => {
        el.textContent = stat.fmt(stat.parts.map((p) => Math.round(p.from + (p.to - p.from) * t)));
      },
    });
    return () => controls.stop();
  }, [inView, delay, stat, final]);
  // o texto final fica no HTML (SEO e leitores de ecrã); a animação só o substitui no ecrã
  return (
    <span ref={ref} aria-label={final} className="tabular-nums">
      {final}
    </span>
  );
}

export function MonoStats() {
  const ref = useRef(null);
  const rowRef = useRef(null);
  const rowInView = useInView(rowRef, { once: true, amount: 0.6 });
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(p, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="bg-white" style={{ fontFamily: SANS }}>
      <div className="relative h-[62svh] overflow-hidden md:h-[78vh]">
        <motion.img
          src="/real/sala-outono.jpg"
          alt="Sala com grandes janelas e luz de fim de tarde"
          className="absolute inset-0 h-[124%] w-full object-cover"
          style={{ y, top: "-12%" }}
          loading="lazy"
        />
      </div>
      <div ref={rowRef} className="grid grid-cols-2 border-b border-neutral-200 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.k}
            className={`relative px-4 py-10 text-center md:px-[3vw] md:py-12 ${i % 2 ? "border-l border-neutral-200" : ""} ${i > 1 ? "border-t border-neutral-200 md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            {...fadeUp(i * 0.12)}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">{s.k}</p>
            <p className="mt-4 font-normal tracking-[-0.03em] text-[#0A0A0A]" style={{ fontSize: "clamp(36px, 3.6vw, 60px)", lineHeight: 1 }}>
              <StatValue stat={s} delay={0.15 + i * 0.18} />
            </p>
            {/* linha que se desenha por baixo do número */}
            <motion.span
              aria-hidden="true"
              className="mx-auto mt-5 block h-px w-12 origin-left bg-[#0A0A0A]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: rowInView ? 1 : 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.18 }}
            />
            {s.note && (
              <motion.p
                className="mt-3 text-[12px] text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: rowInView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 1.6 + i * 0.18 }}
              >
                {s.note}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── 7. Frase grande sobre imagem ──
// Escreve o texto letra a letra quando entra no ecrã, com um cursor a piscar.
// O resto do texto fica invisível no lugar, para a página não saltar enquanto escreve.
function Typewriter({ text, speed = 24, onDone, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  const done = n >= text.length;
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    let raf;
    const start = performance.now() + 250;
    const tick = (now) => {
      const k = Math.max(0, Math.min(text.length, Math.floor((now - start) / speed)));
      setN(k);
      if (k < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, speed]);
  useEffect(() => {
    if (done && onDone) onDone();
  }, [done, onDone]);
  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span
        aria-hidden="true"
        className={`mx-[0.04em] inline-block w-[0.06em] translate-y-[0.12em] bg-current align-baseline ${done ? "animate-[caretBlink_1s_steps(1)_infinite]" : ""}`}
        style={{ height: "1em" }}
      />
      <span aria-hidden="true" className="invisible">
        {text.slice(n)}
      </span>
    </p>
  );
}

const QUOTE =
  "Se vendermos pelo seu valor, ganhamos zero. O que conseguirmos acima é a nossa remuneração. Se não vendermos em 60 dias, saímos — e fica com as fotos e os renders.";

export function MonoQuote() {
  const ref = useRef(null);
  const [typed, setTyped] = useState(false);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(p, [0, 1], [1.15, 1]);
  return (
    <section ref={ref} data-hide-cta className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-black pb-[calc(4rem+env(safe-area-inset-bottom))] md:h-[100vh] md:pb-0" style={{ fontFamily: SANS }}>
      <motion.img
        src="/real/aveiro-canal-dourado.jpg"
        alt="Canal de Aveiro com luz dourada"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 max-w-5xl px-6 text-center text-white md:px-[6vw]">
        <Typewriter
          text={QUOTE}
          onDone={() => setTyped(true)}
          className="font-normal tracking-[-0.02em]"
          style={{ fontSize: "clamp(24px, 2.9vw, 50px)", lineHeight: 1.25 }}
        />
        <motion.div
          className={`mt-10 flex flex-col items-center justify-center gap-3 md:mt-12 md:flex-row md:gap-4 ${typed ? "" : "pointer-events-none"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={typed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <button type="button" onClick={openSeller} className="btn-lux btn-lux--solid-light">
            Pedir estudo de mercado
          </button>
          <button type="button" onClick={openSim} className="btn-lux btn-lux--ghost-light">
            Fazer as contas
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ── 8. Perguntas ──
export function MonoFaq() {
  const [open, setOpen] = useState(0);
  const list = faqs.slice(0, 6);
  return (
    <section className="bg-white px-5 py-20 md:px-[5vw] md:py-32" style={{ fontFamily: SANS }}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-12">
        <motion.div className="md:col-span-4" {...fadeUp()}>
          <Eyebrow>Perguntas</Eyebrow>
          <h2 className="mt-5 font-medium leading-[1] tracking-[-0.035em]" style={{ fontSize: "clamp(40px, 4.4vw, 72px)", color: INK }}>
            Respostas
            <br />
            sem letra pequena.
          </h2>
          <Link href="/perguntas-frequentes" className="btn-lux btn-lux--link mt-8 text-[#0A0A0A]">
            Todas as perguntas
          </Link>
        </motion.div>
        <div className="border-t border-neutral-200 md:col-span-7 md:col-start-6">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
                >
                  <span className="text-[16px] font-medium md:text-[18px] tracking-[-0.01em] text-[#0A0A0A]">{f.q}</span>
                  <span className={`text-2xl font-light text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[16px] leading-relaxed text-neutral-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 9. Rodapé branco ──
const FOOT = [
  {
    t: "Explorar",
    l: [
      { label: "Vender a minha casa", onClick: openSeller },
      { label: "Fazer as contas", onClick: openSim },
      { label: "Comprar casa", href: "/oportunidades" },
      { label: "Perguntas frequentes", href: "/perguntas-frequentes" },
    ],
  },
  {
    t: "Empresa",
    l: [
      { label: "Equipa", href: "/equipe" },
      { label: "Transparência", href: "/depoimentos" },
      { label: "Livro de Reclamações", href: "https://www.livroreclamacoes.pt", external: true },
    ],
  },
  {
    t: "Contacto",
    l: [
      { label: "+351 967 708 397", href: "tel:+351967708397" },
      { label: "WhatsApp", href: "https://wa.me/351967708397", external: true },
      { label: "Região de Aveiro, Portugal" },
    ],
  },
];

export function MonoFooter() {
  return (
    <footer data-hide-cta className="bg-white px-5 pb-10 pt-16 md:px-[5vw] md:pt-20" style={{ fontFamily: SANS }}>
      <div className="mx-auto max-w-[1400px] border-t border-neutral-200 pt-12 md:pt-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <img src="/logo/qamar-logo-dark.png" alt="Qamar Properties" className="h-9 w-auto" />
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-neutral-500">
              Venda com valor líquido na Região de Aveiro. Diga quanto quer receber; vendemos em 60 dias, sem comissão a somar.
            </p>
          </div>
          {FOOT.map((c) => (
            <div key={c.t} className={c.t === "Contacto" ? "col-span-2 md:col-span-2" : "col-span-1 md:col-span-2"}>
              <p className="text-[13px] font-medium text-[#0A0A0A]">{c.t}</p>
              <ul className="mt-5 space-y-3">
                {c.l.map((l) => (
                  <li key={l.label} className="text-[14px] text-neutral-500">
                    {l.onClick ? (
                      <button type="button" onClick={l.onClick} className="text-left transition-colors hover:text-[#0A0A0A]">
                        {l.label}
                      </button>
                    ) : l.href ? (
                      <a
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="transition-colors hover:text-[#0A0A0A]"
                      >
                        {l.label}
                      </a>
                    ) : (
                      l.label
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-[12px] text-neutral-400 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Qamar Properties · Mediação imobiliária · AMI n.º [a preencher]</p>
          <a href="#top" className="transition-colors hover:text-[#0A0A0A]">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Página completa no telemóvel: o mesmo design, em cascata ──
// Cada secção fica presa ao ecrã e a seguinte sobe por cima (MobileCascade).
// As secções com scroll próprio (frases, etapas, imagem que cresce, túnel)
// correm por inteiro antes de a seguinte subir.
export function MonoMobileHome() {
  return (
    <div className="mono-root md:hidden" style={{ fontFamily: SANS }}>
      <MobileCascade overlapFirst>
        <MonoStatement data-cascade-bg="bg-white" />
        <MonoGallery data-cascade-bg="bg-white" />
        <RoomTunnel data-cascade-bg="bg-[#0A0A0A]" />
        {/* o processo (túnel) e, logo a seguir, quanto sobrava numa imobiliária comum */}
        <section className="bg-white px-5 pb-20 pt-16" data-cascade-bg="bg-white">
          <CompactSim />
        </section>
        <MonoStages data-cascade-bg="bg-[#0A0A0A]" />
        <MonoGrow data-cascade-bg="bg-black" />
        <MonoCards data-cascade-bg="bg-white" />
        <MonoStats data-cascade-bg="bg-white" />
        <MonoQuote data-cascade-bg="bg-black" />
        <MonoFaq data-cascade-bg="bg-white" />
        <MonoFooter data-cascade-bg="bg-white" />
      </MobileCascade>
    </div>
  );
}

// ── Página completa (só computador) ──
export function MonoHome() {
  return (
    <div className="mono-root hidden md:block" style={{ fontFamily: SANS }}>
      <MonoStatement />
      <MonoGallery />
      <RoomTunnel />
      <MonoStages />
      <MonoGrow />
      <MonoCards />
      <MonoStats />
      <MonoQuote />
      <MonoFaq />
      <MonoFooter />
      <StickyCta />
    </div>
  );
}
