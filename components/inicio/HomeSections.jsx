"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, useInView } from "framer-motion";

// Secções da página inicial organizadas como o site da Spinta (CK Estates):
// apresentação → Vender / Comprar → pesquisa → números → … → equipa → transparência → remate escuro.
// Tudo pensado primeiro para telemóvel.

const SERIF = "'Cormorant Garamond', Georgia, serif";
const NAVY = "#4C3D4A";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
});

const openSellerForm = () => window.dispatchEvent(new Event("open-investment-form"));
const openSimulator = () => window.dispatchEvent(new CustomEvent("open-investment-form", { detail: { view: "sim" } }));

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`font-body text-[11px] font-semibold uppercase tracking-[0.3em] ${
        light ? "text-white/60" : "text-gold"
      }`}
    >
      {children}
    </p>
  );
}

// ── 1. Apresentação (colagem + texto) ────────────────────────────────
export function AboutIntro() {
  return (
    <section className="relative bg-[#F5F2ED] px-6 py-20 md:px-[6vw] md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <motion.div className="relative order-2 h-[340px] md:order-1 md:h-[520px]" {...fadeUp()}>
          <img
            src="/opt/valorizar.jpg"
            alt="Materiais e planta de uma casa valorizada"
            loading="lazy"
            className="absolute left-0 top-0 h-[78%] w-[62%] object-cover"
          />
          <img
            src="/opt/sala-render.jpg"
            alt="Sala com vista para a ria de Aveiro"
            loading="lazy"
            className="absolute bottom-0 right-0 h-[62%] w-[58%] border-[6px] border-[#F5F2ED] object-cover"
          />
        </motion.div>

        <div className="order-1 md:order-2">
          <motion.div {...fadeUp()}>
            <Eyebrow>Venda com valor líquido</Eyebrow>
          </motion.div>
          <motion.h2
            className="mt-5 font-light leading-[1.08]"
            style={{ fontFamily: SERIF, color: NAVY, fontSize: "clamp(2.1rem, 4vw, 3.4rem)" }}
            {...fadeUp(0.05)}
          >
            Vendemos casas na Região de Aveiro sem comissão a somar.
          </motion.h2>
          <motion.p className="mt-6 font-body text-[15px] leading-relaxed text-black/65 md:text-base" {...fadeUp(0.1)}>
            Diz-nos quanto quer receber, depois de ver o estudo de mercado. Vendemos em 60 dias. Se vendermos pelo
            seu valor, ganhamos zero; o que conseguirmos acima é a nossa remuneração.
          </motion.p>

          <motion.div className="mt-8 grid grid-cols-2 gap-6 border-t border-black/10 pt-6" {...fadeUp(0.15)}>
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-black/45">Para quem vende</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-black/70">
                Recebe o valor que pediu, na escritura.
              </p>
            </div>
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-black/45">Para quem compra</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-black/70">
                Casas antes dos portais, com tudo por escrito.
              </p>
            </div>
          </motion.div>

          <motion.div className="mt-8" {...fadeUp(0.2)}>
            <button type="button" onClick={openSellerForm} className="btn-lux btn-lux--solid-dark btn-lux--block-mobile">
              Pedir estudo de mercado
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 2. Vender / Comprar ─────────────────────────────────────────────
export function SellBuySplit() {
  const tiles = [
    {
      word: "Vender",
      text: "Diga quanto quer receber.",
      image: "/opt/obra-janela.jpg",
      onClick: openSellerForm,
    },
    {
      word: "Comprar",
      text: "Entre na base de compradores.",
      image: "/opt/sala-ria.jpg",
      href: "/oportunidades",
    },
  ];

  return (
    <section className="bg-[#F5F2ED] px-4 pb-16 md:px-[6vw] md:pb-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {tiles.map((t, i) => {
          const inner = (
            <>
              <img
                src={t.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white md:p-8">
                <div className="text-left">
                  <h3 className="font-light leading-none" style={{ fontFamily: SERIF, fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                    {t.word}
                  </h3>
                  <p className="mt-2 font-body text-sm text-white/80">{t.text}</p>
                </div>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/50 text-lg">
                  →
                </span>
              </div>
            </>
          );
          const cls = "group relative block h-[58svh] min-h-[340px] overflow-hidden md:h-[560px]";
          return (
            <motion.div key={t.word} {...fadeUp(i * 0.08)}>
              {t.href ? (
                <Link href={t.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <button type="button" onClick={t.onClick} className={`${cls} w-full`}>
                  {inner}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ── 3. Pesquisa de casa (leva ao formulário de comprador) ───────────
export function BuyerSearch() {
  const [tipo, setTipo] = useState("");
  const [zona, setZona] = useState("");
  const [orcamento, setOrcamento] = useState("");

  const href = `/oportunidades?${new URLSearchParams(
    Object.fromEntries(Object.entries({ tipo, zona, orcamento }).filter(([, v]) => v))
  ).toString()}#formulario-comprador`;

  const selectCls =
    "w-full appearance-none bg-transparent py-3 font-body text-base text-black/80 outline-none md:text-[15px]";

  return (
    <section className="bg-[#EDE8E1] px-6 py-20 text-center md:py-28">
      <motion.div {...fadeUp()}>
        <Eyebrow>Para quem compra</Eyebrow>
      </motion.div>
      <motion.h2
        className="mx-auto mt-5 max-w-[16ch] font-light leading-[1.05]"
        style={{ fontFamily: SERIF, color: NAVY, fontSize: "clamp(2.3rem, 5vw, 4rem)" }}
        {...fadeUp(0.05)}
      >
        Encontre casa na <em className="italic">Região de Aveiro</em>
      </motion.h2>
      <motion.p className="mx-auto mt-5 max-w-md font-body text-[15px] text-black/60" {...fadeUp(0.1)}>
        As casas chegam primeiro a quem já tem o crédito simulado.
      </motion.p>

      <motion.form
        className="mx-auto mt-10 grid max-w-3xl grid-cols-1 divide-y divide-black/10 border border-black/10 bg-white/70 px-5 py-1 text-left backdrop-blur-sm md:grid-cols-[1fr_1fr_1fr_auto] md:items-stretch md:divide-x md:divide-y-0 md:px-0 md:py-0"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = href;
        }}
        {...fadeUp(0.15)}
      >
        <label className="block md:px-5 md:py-2">
          <span className="block pt-3 font-body text-[10px] uppercase tracking-[0.2em] text-black/40 md:pt-1">Tipo</span>
          <select className={selectCls} value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Qualquer</option>
            <option>Apartamento</option>
            <option>Moradia</option>
          </select>
        </label>
        <label className="block md:px-5 md:py-2">
          <span className="block pt-3 font-body text-[10px] uppercase tracking-[0.2em] text-black/40 md:pt-1">Zona</span>
          <select className={selectCls} value={zona} onChange={(e) => setZona(e.target.value)}>
            <option value="">Toda a região</option>
            <option>Aveiro (centro)</option>
            <option>Esgueira / Aradas / Glória e Vera Cruz</option>
            <option>Ílhavo / Gafanhas</option>
          </select>
        </label>
        <label className="block md:px-5 md:py-2">
          <span className="block pt-3 font-body text-[10px] uppercase tracking-[0.2em] text-black/40 md:pt-1">Orçamento</span>
          <select className={selectCls} value={orcamento} onChange={(e) => setOrcamento(e.target.value)}>
            <option value="">Qualquer</option>
            <option>Até 150.000 €</option>
            <option>150.000 € a 250.000 €</option>
            <option>250.000 € a 400.000 €</option>
          </select>
        </label>
        <div className="py-4 md:py-0">
          <button type="submit" className="btn-lux btn-lux--solid-dark w-full md:h-full">
            Procurar
          </button>
        </div>
      </motion.form>
    </section>
  );
}

// ── 4. Números (factos do modelo, não estatísticas inventadas) ──────
// Os algarismos rodam como num contador mecânico (estilo Emaar) quando a
// secção entra no ecrã: cada um dá uma volta e para no valor certo.

function RollingDigit({ digit, delay, play }) {
  // tira 0–9 duas vezes: roda uma volta inteira e para no algarismo certo
  const strip = [...Array(20)].map((_, i) => i % 10);
  return (
    <span className="relative inline-block h-[1.1em] overflow-hidden align-top">
      <motion.span
        className="flex flex-col"
        initial={{ y: "0em" }}
        animate={play ? { y: `-${(10 + digit) * 1.1}em` } : { y: "0em" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {strip.map((n, i) => (
          <span key={i} className="block h-[1.1em] leading-[1.1em]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function RollingNumber({ value, play, baseDelay = 0 }) {
  let d = 0;
  return (
    <span
      className="inline-flex items-start leading-[1.1em]"
      style={{ fontVariantNumeric: "lining-nums tabular-nums", fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
      aria-label={value}
    >
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <RollingDigit key={i} digit={+ch} play={play} delay={baseDelay + 0.08 * d++} />
        ) : (
          <motion.span
            key={i}
            className="inline-block leading-[1.1em]"
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: baseDelay + 0.4 }}
            aria-hidden="true"
          >
            {ch}
          </motion.span>
        )
      )}
    </span>
  );
}

function Stat({ s, i }) {
  const ref = React.useRef(null);
  const play = useInView(ref, { once: true, amount: 0.6 });
  const delay = i * 0.12;
  return (
    <div ref={ref}>
      <motion.span
        className="mb-6 block h-px origin-left bg-black/15"
        initial={{ scaleX: 0 }}
        animate={play ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay }}
      />
      <p
        className="flex items-start font-light"
        style={{ fontFamily: SERIF, color: NAVY, fontSize: "clamp(3rem, 5.5vw, 4.6rem)" }}
      >
        <RollingNumber value={s.n} play={play} baseDelay={delay + 0.15} />
        <motion.span
          className="ml-2 mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-black/45"
          initial={{ opacity: 0, y: 6 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: delay + 1.1 }}
        >
          {s.unit}
        </motion.span>
      </p>
      <motion.p
        className="mt-4 max-w-[20ch] font-body text-[13px] leading-snug text-black/60 md:text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + 0.9 }}
      >
        {s.label}
      </motion.p>
    </div>
  );
}

export function StatsRow() {
  const stats = [
    { n: "60", unit: "dias", label: "Prazo para vender" },
    { n: "0", unit: "€", label: "Comissão a somar ao seu valor" },
    { n: "5–10", unit: "%", label: "Sinal no CPCV, com condição de crédito" },
    { n: "3", unit: "meses", label: "De acompanhamento depois da escritura" },
  ];
  return (
    <section className="bg-[#F5F2ED] px-6 py-16 md:px-[6vw] md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-10">
        {stats.map((s, i) => (
          <Stat key={s.label} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

// ── 4b. Carrossel "Como vendemos" (computador, como o "Featured Homes") ──
const HOW = [
  { n: "01", title: "Estudar", text: "Vendas reais na sua zona, preços anunciados e a conta de uma imobiliária comum.", image: "/opt/m-estudar.jpg" },
  { n: "02", title: "Valorizar", text: "Fotografia profissional, renders à escala, orçamento de obra e relatório técnico.", image: "/opt/m-valorizar.jpg" },
  { n: "03", title: "Vender", text: "Primeiro para a base de compradores com crédito simulado. Janela de propostas com data limite.", image: "/opt/c-valor.jpg" },
  { n: "04", title: "Escritura", text: "Recebe o valor que pediu. Só ganhamos com o que vendermos acima dele.", image: "/opt/c-escritura.jpg" },
];

export function HowCarousel() {
  const rowRef = React.useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * rowRef.current.clientWidth * 0.6, behavior: "smooth" });
  return (
    <section className="hidden bg-[#F5F2ED] py-28 md:block">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-10 px-[6vw]">
        <div>
          <motion.div {...fadeUp()}>
            <Eyebrow>O modelo</Eyebrow>
          </motion.div>
          <motion.h2
            className="mt-5 font-light leading-[1]"
            style={{ fontFamily: SERIF, color: NAVY, fontSize: "clamp(3rem, 5vw, 4.6rem)" }}
            {...fadeUp(0.05)}
          >
            Como vendemos <em className="italic">em 60 dias</em>
          </motion.h2>
        </div>
        <motion.div className="flex items-center gap-3" {...fadeUp(0.1)}>
          <button type="button" aria-label="Anterior" onClick={() => scroll(-1)} className="flex size-12 items-center justify-center border border-black/20 text-[#1C1719] transition-colors hover:bg-[#1C1719] hover:text-[#F5F2ED]">←</button>
          <button type="button" aria-label="Seguinte" onClick={() => scroll(1)} className="flex size-12 items-center justify-center border border-black/20 text-[#1C1719] transition-colors hover:bg-[#1C1719] hover:text-[#F5F2ED]">→</button>
          <button type="button" onClick={openSellerForm} className="btn-lux btn-lux--solid-dark ml-4">
            Pedir estudo
          </button>
        </motion.div>
      </div>

      <div
        ref={rowRef}
        className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[6vw] pb-4 [scrollbar-width:none]"
      >
        {HOW.map((c, i) => (
          <motion.article
            key={c.n}
            className="group w-[30vw] min-w-[320px] max-w-[440px] shrink-0 snap-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 border border-white/50 bg-black/20 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                Passo {c.n}
              </span>
              <span className="absolute bottom-4 left-6 font-light leading-none text-white" style={{ fontFamily: SERIF, fontSize: "4.2rem" }}>
                {c.n}
              </span>
            </div>
            <h3 className="mt-5 text-3xl font-light" style={{ fontFamily: SERIF, color: NAVY }}>
              {c.title}
            </h3>
            <p className="mt-2 max-w-[38ch] font-body text-[15px] leading-relaxed text-black/60">{c.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ── 4c. "Descubra quanto recebe" (computador, como o "Discover the value") ──
export function ValueBento() {
  const cards = [
    { k: "Estudo de mercado", t: "Vendas reais, não anúncios. Recebe-o antes de nos dizer o seu valor." },
    { k: "Fotos & renders", t: "A casa como o comprador a quer, por nossa conta.", image: "/opt/c-fotos.jpg" },
    { k: "Janela de propostas", t: "Com 5 ou mais interessados, propostas com data limite, sem concorrência inventada." },
    { k: "Escritura em 60 dias", t: "Nunca abaixo do seu valor líquido. Se não vendermos, saímos.", image: "/opt/sala-render.jpg" },
  ];
  return (
    <section className="hidden bg-[#EDE8E1] px-[6vw] py-28 md:block">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1.35fr] items-center gap-20">
        <div>
          <motion.div {...fadeUp()}>
            <Eyebrow>Para quem vende</Eyebrow>
          </motion.div>
          <motion.h2
            className="mt-5 font-light leading-[1.02]"
            style={{ fontFamily: SERIF, color: NAVY, fontSize: "clamp(3rem, 4.6vw, 4.4rem)" }}
            {...fadeUp(0.05)}
          >
            Descubra quanto recebe <em className="italic">na carteira</em>
          </motion.h2>
          <motion.p className="mt-6 max-w-md font-body text-[16px] leading-relaxed text-black/60" {...fadeUp(0.1)}>
            Diga-nos onde fica a casa. Mostramos-lhe o estudo de mercado antes de nos dizer o valor que quer receber.
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap gap-4" {...fadeUp(0.15)}>
            <button type="button" onClick={openSimulator} className="btn-lux btn-lux--solid-dark">
              Fazer as contas
            </button>
            <button type="button" onClick={openSellerForm} className="btn-lux btn-lux--ghost-dark">
              Pedir estudo de mercado
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.k}
              className={`flex flex-col justify-between overflow-hidden border border-black/10 bg-[#FAF8F4] ${i % 2 ? "mt-10" : ""}`}
              {...fadeUp(0.08 * i)}
            >
              {c.image && <img src={c.image} alt="" loading="lazy" className="h-44 w-full object-cover" />}
              <div className="p-7">
                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold">0{i + 1}</p>
                <h3 className="mt-3 text-[1.7rem] font-light leading-tight" style={{ fontFamily: SERIF, color: NAVY }}>
                  {c.k}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-black/60">{c.t}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 5. Equipa ───────────────────────────────────────────────────────
export function TeamTeaser() {
  const people = [
    { initial: "A", name: "André", role: "Quem vende", text: "Estudo de mercado, contrato com o dono e parceiros." },
    { initial: "H", name: "Hugo", role: "Quem compra", text: "Base de compradores, visitas, propostas, CPCV e escritura." },
  ];
  return (
    <section className="bg-[#F5F2ED] px-6 py-20 md:px-[6vw] md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <motion.div {...fadeUp()}>
            <Eyebrow>Quem somos</Eyebrow>
          </motion.div>
          <motion.h2
            className="mt-5 font-light leading-[1.05]"
            style={{ fontFamily: SERIF, color: NAVY, fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)" }}
            {...fadeUp(0.05)}
          >
            Duas pessoas, um lado da venda cada uma.
          </motion.h2>
          <motion.p className="mt-5 font-body text-[15px] leading-relaxed text-black/60" {...fadeUp(0.1)}>
            Por trás, parceiros que já trabalham connosco: obras e relatório técnico, intermediário de crédito,
            advogado e engenheiro externo.
          </motion.p>
          <motion.div className="mt-7" {...fadeUp(0.15)}>
            <Link href="/equipe" className="btn-lux btn-lux--link" style={{ color: NAVY }}>
              Conhecer a equipa
            </Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {people.map((p, i) => (
            <motion.div key={p.name} className="border border-black/10 bg-white/60 p-6" {...fadeUp(0.1 + i * 0.08)}>
              <span
                className="flex size-16 items-center justify-center rounded-full text-3xl text-[#F5F2ED]"
                style={{ background: NAVY, fontFamily: SERIF }}
                aria-hidden="true"
              >
                {p.initial}
              </span>
              <p className="mt-6 font-body text-[11px] uppercase tracking-[0.25em] text-gold">{p.role}</p>
              <h3 className="mt-1 text-3xl font-light" style={{ fontFamily: SERIF, color: NAVY }}>
                {p.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-black/60">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 6. Transparência (no lugar dos testemunhos) ─────────────────────
export function TransparencyTeaser() {
  return (
    <section className="bg-[#EDE8E1] px-6 py-20 md:px-[6vw] md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
        <motion.div className="relative h-[300px] overflow-hidden md:h-[460px]" {...fadeUp()}>
          <img src="/opt/vender.jpg" alt="Entrega das chaves de uma casa em Aveiro" loading="lazy" className="h-full w-full object-cover" />
        </motion.div>
        <div>
          <motion.div {...fadeUp()}>
            <Eyebrow>Transparência</Eyebrow>
          </motion.div>
          <motion.blockquote
            className="mt-5 font-light italic leading-[1.15]"
            style={{ fontFamily: SERIF, color: NAVY, fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)" }}
            {...fadeUp(0.05)}
          >
            “Em cada casa escrevemos os motivos para não comprar. E dizemos sempre que somos pagos pelo vendedor.”
          </motion.blockquote>
          <motion.div className="mt-8" {...fadeUp(0.1)}>
            <Link href="/depoimentos" className="btn-lux btn-lux--ghost-dark btn-lux--block-mobile">
              Motivos para não comprar
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 7. Remate escuro ────────────────────────────────────────────────
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#2A2129] px-6 py-24 text-center text-white md:py-36">
      <img
        src="/opt/sala-ria.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="relative">
        <motion.div {...fadeUp()}>
          <Eyebrow light>Região de Aveiro</Eyebrow>
        </motion.div>
        <motion.h2
          className="mx-auto mt-5 max-w-[14ch] font-light leading-[1.02]"
          style={{ fontFamily: SERIF, fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
          {...fadeUp(0.05)}
        >
          Quanto recebe pela sua casa?
        </motion.h2>
        <motion.p className="mx-auto mt-5 max-w-sm font-body text-[15px] text-white/70" {...fadeUp(0.1)}>
          Mostramos-lhe o estudo de mercado antes de nos dizer o seu valor.
        </motion.p>
        <motion.div className="mx-auto mt-10 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4" {...fadeUp(0.15)}>
          <button type="button" onClick={openSellerForm} className="btn-lux btn-lux--solid-light">
            Pedir estudo de mercado
          </button>
          <a
            href="https://wa.me/351967708397"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux btn-lux--ghost-light"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
