"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/faqs";
import { MonoPage, Section, Eyebrow, Title, Lead, Serif, StaggerTitle, fadeUp, EASE, openSeller, openBuyer } from "../MonoKit";
import { SANS } from "../MonoHero";

// /perguntas-frequentes — estrutura de centro de ajuda (Opendoor Help Center):
// "Como podemos ajudar?" com pesquisa → temas → perguntas agrupadas → cartão de ajuda no fim.

const BUYER = [
  { q: "Pago alguma coisa à Qamar quando compro?", a: "Não. Somos pagos pelo vendedor, e dizemos-lho desde o início. A simulação de crédito, os renders personalizados e o dossier não têm custo para si." },
  { q: "Porque pedem a simulação de crédito antes da visita?", a: "Porque o banco não financia pelo preço anunciado. Avalia pelo valor de transação e empresta, no máximo, 90% do menor valor entre o preço e a avaliação. Assim sabe, antes de se apaixonar por uma casa, quanto dinheiro precisa até à escritura." },
  { q: "E se o banco avaliar a casa abaixo do preço?", a: "Os cenários de crédito mostram, antes do CPCV, quanto capital extra precisaria com a avaliação a 100, 95, 90 e 85%. E o CPCV leva condição de crédito aprovado até uma data: se o crédito falhar, o sinal é devolvido." },
  { q: "O orçamento de obra obriga-me a fazer a obra convosco?", a: "Não. Pode adjudicá-lo ou usá-lo só como referência para decidir." },
  { q: "Os renders mostram a casa real?", a: "Mostram uma simulação à escala, sempre identificada como tal e sempre ao lado das fotos reais. Servem para ver se a casa funciona para si." },
  { q: "Quem faz o relatório técnico?", a: "A Freitas Renovações, empresa do nosso grupo, e dizemo-lo claramente. Para estrutura e humidades, chamamos um engenheiro externo." },
];

const GROUPS = [
  { id: "vender", title: "Vender com valor líquido", items: faqs },
  { id: "comprar", title: "Comprar e o dossier", items: BUYER },
];

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function Item({ f, open, onToggle }) {
  return (
    <div className="border-b border-neutral-200">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6">
        <span className="text-[16px] font-medium tracking-[-0.01em] text-[#0A0A0A] md:text-[18px]">{f.q}</span>
        <span className={`text-2xl font-light text-neutral-500 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
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
}

export function FaqPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState("vender-0");
  const q = norm(query.trim());
  const groups = useMemo(
    () =>
      GROUPS.map((g) => ({
        ...g,
        items: g.items.map((f, i) => ({ ...f, key: `${g.id}-${i}` })).filter((f) => !q || norm(f.q + " " + f.a).includes(q)),
      })),
    [q]
  );
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <MonoPage buyer>
      {/* 1. Como podemos ajudar? + pesquisa */}
      <header className="bg-[#F7F7F5]" style={{ fontFamily: SANS }}>
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-32 md:px-[5vw] md:pb-20 md:pt-44">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
            <h1 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">Perguntas frequentes</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}>
            <StaggerTitle as="p" className="mt-6" lines={[{ text: "Como podemos" }, { text: "ajudar?" }]} />
          </motion.div>
          <motion.div className="mt-10 max-w-2xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.25 }}>
            <label htmlFor="faq-search" className="sr-only">Pesquisar nas perguntas</label>
            <div className="flex items-center gap-3 border-b-2 border-[#0A0A0A] pb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5 shrink-0 text-neutral-500" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar: comissão, prazo, crédito, renders…"
                className="w-full bg-transparent text-[20px] text-[#0A0A0A] outline-none placeholder:text-neutral-400 md:text-[26px]"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="border border-neutral-300 bg-white px-3 py-1.5 text-[13px] font-medium text-[#0A0A0A] transition-colors hover:border-[#0A0A0A]">
                  {g.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* 2. Perguntas agrupadas por tema */}
      <Section>
        {total === 0 && (
          <p className="text-[17px] text-neutral-600">
            Não encontrámos nada sobre “{query}”. Experimente outra palavra, ou fale connosco diretamente.
          </p>
        )}
        <div className="flex flex-col gap-20 md:gap-28">
          {groups.map(
            (g) =>
              g.items.length > 0 && (
                <div key={g.id} id={g.id} className="grid scroll-mt-28 grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
                  <motion.div className="md:col-span-4" {...fadeUp()}>
                    <p className="text-[12px] font-medium tabular-nums text-neutral-400">{g.items.length} {g.items.length === 1 ? "pergunta" : "perguntas"}</p>
                    <h2 className="mt-3 text-[40px] font-medium leading-[1.08] tracking-[-0.025em] text-[#0A0A0A] md:text-[56px]">{g.title}</h2>
                  </motion.div>
                  <div className="border-t border-neutral-200 md:col-span-7 md:col-start-6">
                    {g.items.map((f) => (
                      <Item key={f.key} f={f} open={open === f.key || (q && g.items.length <= 3)} onToggle={() => setOpen(open === f.key ? "" : f.key)} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </Section>

      {/* 3. Cartão de ajuda no fim */}
      <Section className="!pt-0">
        <motion.div className="grid grid-cols-1 gap-8 bg-[#0A0A0A] p-8 text-white md:grid-cols-12 md:p-14" {...fadeUp()}>
          <div className="md:col-span-7">
            <Eyebrow light>Ainda com dúvidas?</Eyebrow>
            <h2 className="mt-5 font-medium leading-[1.08] tracking-[-0.025em]" style={{ fontSize: "clamp(44px, 5vw, 80px)" }}>
              Fale com uma pessoa.
            </h2>
            <Lead light className="mt-5 max-w-md">O André responde a quem vende, o Hugo a quem compra.</Lead>
          </div>
          <div className="flex flex-col justify-end gap-3 md:col-span-4 md:col-start-9">
            <a href="https://wa.me/351967708397" target="_blank" rel="noopener noreferrer" className="btn-lux btn-lux--solid-light w-full">WhatsApp</a>
            <button type="button" onClick={openSeller} className="btn-lux btn-lux--ghost-light w-full">Pedir estudo de mercado</button>
            <button type="button" onClick={openBuyer} className="btn-lux btn-lux--ghost-light w-full">Quero comprar</button>
          </div>
        </motion.div>
      </Section>
    </MonoPage>
  );
}
