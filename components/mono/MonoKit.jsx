"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, animate } from "framer-motion";
import { SANS } from "./MonoHero";
import { MonoFooter } from "./MonoHome";
import { InvestmentForm } from "@/components/inicio/InvestmentForm";

// Peças das páginas secundárias.
// Visual = o da página inicial (MONO): branco, Inter, preto, cinzento claro, fotos retangulares.
// Animações = inspiradas nos Sites of the Day do Awwwards (ERA Residence, Belgrade Arbor,
// Still/Form, Lenval): títulos que sobem linha a linha, fotos que se revelam como uma cortina,
// moldura que se abre até ao ecrã inteiro, galeria horizontal presa, frases que se acendem.

export const INK = "#0A0A0A";
export const EASE = [0.16, 1, 0.3, 1];

export const openSeller = () => window.dispatchEvent(new Event("open-investment-form"));
export const openSim = () => window.dispatchEvent(new CustomEvent("open-investment-form", { detail: { view: "sim" } }));
export const openBuyer = () => window.dispatchEvent(new Event("open-buyer-form"));

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: EASE, delay },
});

// entrada com desfoque, como as frases da página inicial
export const blurIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 1.1, ease: EASE, delay },
});

// Mantido por compatibilidade: o destaque é feito só pelo texto (como na página inicial)
export function Serif({ children }) {
  return <>{children}</>;
}

export function Eyebrow({ children, light, n }) {
  return (
    <p className={`text-[11px] font-medium uppercase tracking-[0.2em] ${light ? "text-white/60" : "text-neutral-500"}`}>
      {n && <span className={`mr-3 tabular-nums ${light ? "text-white/40" : "text-neutral-400"}`}>{n} /</span>}
      {children}
    </p>
  );
}

export function Title({ as: Tag = "h2", children, light, size = "md", className = "" }) {
  const fontSize = size === "xl" ? "clamp(48px, 7.2vw, 128px)" : "clamp(40px, 4.4vw, 72px)";
  return (
    <Tag className={`font-medium leading-[1] tracking-[-0.035em] ${light ? "text-white" : "text-[#0A0A0A]"} ${className}`} style={{ fontSize }}>
      {children}
    </Tag>
  );
}

export function Lead({ children, light, className = "" }) {
  return <p className={`text-[16px] leading-relaxed md:text-[17px] ${light ? "text-white/80" : "text-neutral-600"} ${className}`}>{children}</p>;
}

export function Btn({ children, href, onClick, variant = "solid-dark", className = "" }) {
  const cls = `btn-lux btn-lux--${variant} btn-lux--block-mobile ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

// fundos da página inicial: branco, cinzento claro e preto
export const TONES = {
  white: "bg-white",
  paper: "bg-white",
  grey: "bg-[#F7F7F5]",
  beige: "bg-[#F7F7F5]",
  dark: "bg-[#0A0A0A] text-white",
  plum: "bg-[#0A0A0A] text-white",
};

export function Section({ children, id, className = "", dark, tone }) {
  const bg = TONES[tone || (dark ? "dark" : "white")];
  return (
    <section id={id} className={`${bg} px-5 py-20 md:px-[5vw] md:py-32 ${className}`} style={{ fontFamily: SANS }}>
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, light, children, n }) {
  return (
    <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-10">
      <motion.div className="md:col-span-7" {...fadeUp()}>
        {eyebrow && <Eyebrow light={light} n={n}>{eyebrow}</Eyebrow>}
        <Title light={light} className="mt-5">{title}</Title>
      </motion.div>
      {(text || children) && (
        <motion.div className="md:col-span-4 md:col-start-9" {...fadeUp(0.1)}>
          {text && <Lead light={light}>{text}</Lead>}
          {children}
        </motion.div>
      )}
    </div>
  );
}

// ── Animações de entrada ──

// Título que sobe linha a linha por trás de uma máscara (Sites of the Day)
export function StaggerTitle({ lines, as: Tag = "h1", className = "", size = "xl", light, delay = 0.1 }) {
  const fontSize = size === "xl" ? "clamp(48px, 7.2vw, 128px)" : size === "lg" ? "clamp(44px, 6vw, 108px)" : "clamp(40px, 4.4vw, 72px)";
  return (
    <Tag className={`font-medium leading-[1.02] tracking-[-0.035em] ${light ? "text-white" : "text-[#0A0A0A]"} ${className}`} style={{ fontSize }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]" style={{ paddingLeft: l.indent || 0 }}>
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.1 }}
          >
            {l.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Foto que se revela de baixo para cima como uma cortina, com ligeiro parallax
export function RevealImage({ src, alt = "", className = "", parallax = true, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(p, [0, 1], ["-7%", "7%"]);
  // o observador fica na caixa de fora (sem recorte), senão nunca "entra" no ecrã
  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[3px] bg-neutral-100"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="absolute left-0 w-full object-cover"
          style={parallax ? { y, top: "-7%", height: "114%" } : { top: 0, height: "100%" }}
          initial={{ scale: 1.15 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: EASE, delay }}
        />
      </motion.div>
    </div>
  );
}
// nome antigo
export const ArchImage = RevealImage;

// Número que conta até ao valor quando aparece (como os números da página inicial)
function CountUp({ value, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const m = String(value).match(/^(\D*)(\d+)(.*)$/);
  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    const [, pre, num, post] = m;
    const to = parseInt(num, 10);
    if (!inView) {
      el.textContent = `${pre}0${post}`;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }
    const c = animate(0, to, { duration: 1.6, delay, ease: EASE, onUpdate: (v) => (el.textContent = `${pre}${Math.round(v)}${post}`) });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <span ref={ref} aria-label={String(value)} className="tabular-nums">
      {value}
    </span>
  );
}

// ── Blocos ──

// Topo: título que sobe linha a linha + foto que se revela como uma cortina
export function EditorialHero({ label, title, lines, text, image, imageAlt = "", children }) {
  return (
    <header className="bg-white" style={{ fontFamily: SANS }}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 pb-20 pt-32 md:grid-cols-12 md:px-[5vw] md:pb-28 md:pt-44">
        <div className="md:col-span-8 md:self-end">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
            <Eyebrow>{label}</Eyebrow>
          </motion.div>
          {lines ? (
            <StaggerTitle className="mt-6 md:whitespace-nowrap" size="lg" lines={lines.map((t) => ({ text: t }))} />
          ) : (
            <Title as="h1" size="xl" className="mt-6">{title}</Title>
          )}
          <motion.div className="mt-10 max-w-md" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.45 }}>
            {text && <Lead>{text}</Lead>}
            {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
          </motion.div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <RevealImage src={image} alt={imageAlt} className="aspect-[4/5] w-full" delay={0.2} />
        </div>
      </div>
    </header>
  );
}

// Topo simples (foto grande por baixo que se abre)
export function PageHero({ eyebrow, title, text, image, imageAlt = "", children, tags }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(p, [0, 1], [1.12, 1]);
  const clip = useTransform(p, [0.05, 0.45], ["inset(8% 6% 0% 6%)", "inset(0% 0% 0% 0%)"]);
  return (
    <header className="bg-white" style={{ fontFamily: SANS }}>
      <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-32 md:px-[5vw] md:pb-20 md:pt-44">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title as="h1" size="xl" className="mt-6">{title}</Title>
            {tags && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li key={t} className="border border-neutral-200 px-3 py-1.5 text-[12px] font-medium text-neutral-600">{t}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="md:col-span-4">
            {text && <Lead>{text}</Lead>}
            {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
          </div>
        </div>
      </div>
      {image && (
        <div ref={ref} className="relative h-[56svh] overflow-hidden md:h-[82vh]">
          <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip }}>
            <motion.img src={image} alt={imageAlt} className="h-full w-full object-cover" style={{ scale }} />
          </motion.div>
        </div>
      )}
    </header>
  );
}

// Moldura branca que se abre até ao ecrã inteiro, com uma frase grande por cima (ERA Residence)
export function ExpandImage({ src, alt = "", caption, title }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(p, [0, 0.6], ["inset(12% 10% 12% 10% round 3px)", "inset(0% 0% 0% 0% round 0px)"]);
  const scale = useTransform(p, [0, 0.6], [1.2, 1]);
  const titleOpacity = useTransform(p, [0.25, 0.5], [1, 0]);
  const titleBlur = useTransform(p, [0.25, 0.5], ["blur(0px)", "blur(14px)"]);
  const capOpacity = useTransform(p, [0.6, 0.8], [0, 1]);
  const capY = useTransform(p, [0.6, 0.8], [30, 0]);
  return (
    <section ref={ref} className="relative h-[240vh] bg-white" style={{ fontFamily: SANS }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.img src={src} alt={alt} className="h-full w-full object-cover" style={{ scale }} />
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
        {title && (
          <motion.div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-white" style={{ opacity: titleOpacity, filter: titleBlur }}>
            <p className="font-medium tracking-[-0.035em]" style={{ fontSize: "clamp(44px, 6.4vw, 112px)", lineHeight: 1 }}>{title}</p>
          </motion.div>
        )}
        {caption && (
          <motion.div className="absolute inset-x-5 bottom-[calc(5rem+env(safe-area-inset-bottom))] text-white md:inset-x-[5vw] md:bottom-14" style={{ opacity: capOpacity, y: capY }}>
            {caption}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Frase que se acende palavra a palavra com o scroll
function RevealWord({ p, range, children }) {
  const opacity = useTransform(p, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export function WordReveal({ text, light, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`font-medium leading-[1.1] tracking-[-0.03em] ${light ? "text-white" : "text-[#0A0A0A]"} ${className}`} style={{ fontSize: "clamp(30px, 3.8vw, 64px)" }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <RevealWord key={i} p={p} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </RevealWord>
        ))}
      </span>
    </p>
  );
}

// Frase centrada que entra com desfoque (como as frases da página inicial)
export function Statement({ label, text, note, light }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
      {label && (
        <motion.p className={`text-[11px] font-medium uppercase tracking-[0.2em] ${light ? "text-white/60" : "text-neutral-500"}`} {...fadeUp()}>
          {label}
        </motion.p>
      )}
      <motion.p className={`mt-8 font-medium tracking-[-0.035em] ${light ? "text-white" : "text-[#0A0A0A]"}`} style={{ fontSize: "clamp(32px, 4.2vw, 72px)", lineHeight: 1.05 }} {...blurIn(0.05)}>
        {text}
      </motion.p>
      {note && (
        <motion.p className={`mt-8 max-w-md text-[16px] leading-relaxed ${light ? "text-white/70" : "text-neutral-600"}`} {...fadeUp(0.2)}>
          {note}
        </motion.p>
      )}
    </div>
  );
}

// Galeria horizontal presa: o scroll vertical move os cartões para o lado
export function HorizontalScroll({ head, children }) {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const id = setTimeout(measure, 800);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(id);
    };
  }, []);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0, 1], [0, -dist]);
  return (
    <section ref={ref} className="relative bg-[#F7F7F5]" style={{ height: `calc(100vh + ${dist}px)`, fontFamily: SANS }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-24">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-[5vw]">{head}</div>
        <motion.div ref={trackRef} className="mt-10 flex w-max gap-4 px-5 md:mt-14 md:gap-6 md:px-[5vw]" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// Três pontos de valor: número, título e texto sobre uma linha fina
export function ValueCards({ items }) {
  return (
    <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
      {items.map((it, i) => (
        <motion.div key={it.title} className="border-t border-neutral-300 pt-6" {...fadeUp(i * 0.1)}>
          <p className="text-[12px] font-medium tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-10 text-[24px] font-medium leading-[1.1] tracking-[-0.025em] text-[#0A0A0A] md:mt-16 md:text-[30px]">{it.title}</h3>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-neutral-600">{it.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Números grandes que contam até ao valor, com a linha que se desenha (como a página inicial)
export function StatsRow({ items, light }) {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once: true, amount: 0.5 });
  return (
    <div ref={rowRef} className={`mt-12 grid grid-cols-2 gap-x-6 gap-y-12 border-t pt-10 md:mt-16 md:grid-cols-4 ${light ? "border-white/20" : "border-neutral-200"}`}>
      {items.map((s, i) => (
        <motion.div key={s.k} {...fadeUp(i * 0.1)}>
          <p className={`font-normal leading-none tracking-[-0.03em] ${light ? "text-white" : "text-[#0A0A0A]"}`} style={{ fontSize: "clamp(40px, 4.6vw, 76px)" }}>
            <CountUp value={s.v} delay={0.15 + i * 0.15} />
          </p>
          <motion.span
            aria-hidden="true"
            className={`mt-5 block h-px w-12 origin-left ${light ? "bg-white" : "bg-[#0A0A0A]"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.15 }}
          />
          <p className={`mt-4 text-[14px] leading-snug ${light ? "text-white/65" : "text-neutral-500"}`}>{s.k}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Passos com a foto presa ao lado, que muda com o passo (revela-se como uma cortina)
function StepItem({ it, i, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <div ref={ref} className="border-t border-neutral-200 py-10 md:flex md:min-h-[62vh] md:flex-col md:justify-center md:py-16">
      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-neutral-500">
        {String(i + 1).padStart(2, "0")} · {it.label}
      </p>
      <h3 className="mt-5 text-[28px] font-medium leading-[1.08] tracking-[-0.03em] text-[#0A0A0A] md:text-[40px]">{it.title}</h3>
      <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-neutral-600">{it.text}</p>
      {it.image && (
        <div className="mt-8 aspect-[16/10] overflow-hidden rounded-[3px] bg-neutral-100 md:hidden">
          <img src={it.image} alt={it.alt || ""} loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}

export function StepsWithImage({ items, cta }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-12 grid grid-cols-1 md:mt-16 md:grid-cols-12 md:gap-10">
      <div className="hidden md:col-span-6 md:block">
        <div className="sticky top-24 aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-[3px] bg-neutral-100">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={active}
              src={items[active].image}
              alt={items[active].alt || ""}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: EASE }}
            />
          </AnimatePresence>
          <p className="absolute bottom-4 left-4 bg-white/85 px-2.5 py-1 text-[11px] font-medium tabular-nums text-neutral-700 backdrop-blur">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="md:col-span-5 md:col-start-8">
        {items.map((it, i) => (
          <StepItem key={it.title} it={it} i={i} onActive={setActive} />
        ))}
        {cta && <div className="border-t border-neutral-200 pt-10">{cta}</div>}
      </div>
    </div>
  );
}

export function NumberedRows({ items, cta }) {
  return (
    <div className="mt-14 md:mt-20">
      {items.map((it, i) => (
        <motion.div key={it.title} className="grid grid-cols-1 gap-8 border-t border-neutral-200 py-12 md:grid-cols-12 md:gap-10 md:py-16" {...fadeUp()}>
          <div className="md:col-span-5">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              {String(i + 1).padStart(2, "0")} · {it.label}
            </p>
            <h3 className="mt-5 text-[28px] font-medium leading-[1.08] tracking-[-0.03em] text-[#0A0A0A] md:text-[40px]">{it.title}</h3>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-neutral-600">{it.text}</p>
            {cta && (
              <button type="button" onClick={cta.onClick} className="btn-lux btn-lux--link mt-7 text-[#0A0A0A]">
                {cta.label}
              </button>
            )}
          </div>
          {it.image && (
            <div className="md:col-span-6 md:col-start-7">
              <RevealImage src={it.image} alt={it.alt || ""} className="aspect-[16/10] w-full" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function Columns({ items, cols = 3, light }) {
  const grid = cols === 4 ? "md:grid-cols-4" : cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={`mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-20 ${grid}`}>
      {items.map((it, i) => (
        <motion.div key={it.title} className={`border-t pt-6 ${light ? "border-white/20" : "border-neutral-200"}`} {...fadeUp(i * 0.08)}>
          {it.meta && <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${light ? "text-white/55" : "text-neutral-500"}`}>{it.meta}</p>}
          <h3
            className={`${it.meta ? "mt-4" : ""} font-medium tracking-[-0.02em] ${light ? "text-white" : "text-[#0A0A0A]"} ${
              it.big ? "text-[34px] leading-[1.05] md:text-[44px]" : "text-[20px] leading-snug md:text-[22px]"
            }`}
          >
            {it.title}
          </h3>
          {it.text && <p className={`mt-3 text-[15px] leading-relaxed ${light ? "text-white/70" : "text-neutral-600"}`}>{it.text}</p>}
          {it.children}
        </motion.div>
      ))}
    </div>
  );
}

export function CompareTable({ head, rows, note }) {
  return (
    <motion.div className="mt-12 md:mt-16" {...fadeUp()}>
      <div className="overflow-x-auto [scrollbar-width:none]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral-300">
              <th className="w-[28%] py-4 pr-6" />
              {head.map((h, i) => (
                <th key={h} className={`py-4 pr-6 text-[15px] font-medium tracking-[-0.01em] md:text-[17px] ${i === head.length - 1 ? "text-[#0A0A0A]" : "text-neutral-500"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <motion.tr
                key={r[0]}
                className="border-b border-neutral-200 align-top"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: EASE, delay: ri * 0.06 }}
              >
                <th scope="row" className="py-5 pr-6 text-[14px] font-medium text-[#0A0A0A] md:text-[15px]">{r[0]}</th>
                {r.slice(1).map((c, i) => (
                  <td key={i} className={`py-5 pr-6 text-[14px] leading-relaxed md:text-[15px] ${i === r.length - 2 ? "font-medium text-[#0A0A0A]" : "text-neutral-500"}`}>
                    {c}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-4 text-[12px] text-neutral-400">{note}</p>}
    </motion.div>
  );
}

export function ExploreLinks({ items }) {
  return (
    <div className="mt-12 grid grid-cols-1 border-t border-neutral-200 md:mt-16 md:grid-cols-4">
      {items.map((it, i) => {
        const inner = (
          <>
            <p className="text-[12px] font-medium tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-8 text-[22px] font-medium tracking-[-0.02em] text-[#0A0A0A] md:mt-14 md:text-[26px]">{it.title}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">{it.text}</p>
            <span className="mt-6 inline-block text-[#0A0A0A] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </>
        );
        const cls = "group flex flex-col items-start justify-start border-b border-neutral-200 py-8 text-left transition-colors hover:bg-[#F7F7F5] md:border-b-0 md:border-r md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0";
        return it.href ? (
          <a key={it.title} href={it.href} className={cls}>{inner}</a>
        ) : (
          <button key={it.title} type="button" onClick={it.onClick} className={`${cls} w-full`}>{inner}</button>
        );
      })}
    </div>
  );
}

// Faixa escura com foto por trás e chamada à ação (como a frase final da página inicial)
export function DarkCta({ id, eyebrow, title, text, image, children }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(p, [0, 1], [1.15, 1]);
  return (
    <section ref={ref} id={id} className="relative flex min-h-[86svh] items-center justify-center overflow-hidden bg-black px-6 py-24 md:min-h-[92vh]" style={{ fontFamily: SANS }}>
      {image && <motion.img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ scale }} loading="lazy" />}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center text-white">
        {eyebrow && <motion.div {...fadeUp()}><Eyebrow light>{eyebrow}</Eyebrow></motion.div>}
        <motion.h2 className="mt-6 font-medium leading-[1.02] tracking-[-0.035em]" style={{ fontSize: "clamp(38px, 5.2vw, 88px)" }} {...blurIn(0.05)}>
          {title}
        </motion.h2>
        {text && <motion.p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-[18px]" {...fadeUp(0.2)}>{text}</motion.p>}
        {children && (
          <motion.div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row md:gap-4" {...fadeUp(0.3)}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function FaqList({ items, eyebrow = "Perguntas", title, aside }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
      <motion.div className="md:col-span-4" {...fadeUp()}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title className="mt-5">{title}</Title>
        {aside}
      </motion.div>
      <div className="border-t border-neutral-200 md:col-span-7 md:col-start-6">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-neutral-200">
              <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6">
                <span className="text-[16px] font-medium tracking-[-0.01em] text-[#0A0A0A] md:text-[18px]">{f.q}</span>
                <span className={`text-2xl font-light text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-[16px] leading-relaxed text-neutral-600">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Página: conteúdo + rodapé da home + os formulários (só o modal)
export function MonoPage({ children, buyer = false }) {
  return (
    <div className="mono-root bg-white" style={{ fontFamily: SANS }}>
      {children}
      <MonoFooter />
      <InvestmentForm sectionClassName="hidden" sectionId="formulario-modal" />
      {buyer && <InvestmentForm variant="comprador" sectionClassName="hidden" sectionId="formulario-comprador-modal" />}
    </div>
  );
}
