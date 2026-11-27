"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MonoPage, Section, SectionHead, Columns, DarkCta, FaqList, Btn, Eyebrow, Title, Lead, Serif, WordReveal, Statement, StaggerTitle, fadeUp, openBuyer, EASE,
} from "../MonoKit";
import { SANS } from "../MonoHero";

// /oportunidade — o dossier da casa.
// Estrutura de uma página de imóvel premium (Sotheby's, Compass):
// título + barra de factos → galeria com separadores (Fotos / Renders / Planta) →
// conteúdo à esquerda com painel de contacto preso à direita → cenários de crédito em tabela →
// estado de cada informação → proteção → chamada final → perguntas.

const FACTS = [
  ["Fotos reais", "Primeiro"],
  ["Renders 3D", "2 a 3 usos"],
  ["Orçamento de obra", "Âmbito e prazo"],
  ["Cenários de crédito", "4 avaliações"],
  ["Relatório técnico", "Incluído"],
];

const GALLERY = {
  Fotos: [
    { src: "/opt/p-sala2.jpg", alt: "Fotografia da sala" },
    { src: "/opt/p-cozinha.jpg", alt: "Fotografia da cozinha" },
    { src: "/opt/p-dia.jpg", alt: "Fotografia da sala de jantar" },
  ],
  Renders: [
    { src: "/mono/sk-sala.jpg", alt: "Render da sala, identificado como simulação" },
    { src: "/mono/sk-cozinha.jpg", alt: "Render da cozinha, identificado como simulação" },
    { src: "/opt/valorizar.jpg", alt: "Materiais e planta 3D" },
  ],
  Planta: [
    { src: "/mono/sk-planta.jpg", alt: "Planta da casa" },
    { src: "/mono/sk-corte.jpg", alt: "Corte da casa" },
    { src: "/mono/sk-fachada.jpg", alt: "Alçado da fachada" },
  ],
};

const RECEIVE = [
  { b: "A casa como está, e como a quer.", t: "Fotos reais primeiro. Ao lado, um modelo 3D à escala com 2 ou 3 usos do espaço e os seus móveis, sempre identificado como simulação." },
  { b: "Quanto custa a obra.", t: "Orçamento com âmbito, exclusões e prazo, ligado ao render. Pode adjudicá-lo ou usá-lo só como referência." },
  { b: "Quanto paga, de facto.", t: "Cenários de crédito com a avaliação do banco a 100, 95, 90 e 85%: dinheiro até à escritura, prestação, taxa de esforço com subida de juros e a reserva que lhe sobra." },
  { b: "O que pode correr mal.", t: "Relatório técnico, documentos do condomínio, áreas comparadas e os motivos para não comprar, por escrito." },
];

// Exemplo: casa de 250.000 €; o banco empresta 90% do menor valor entre preço e avaliação
const PRICE = 250000;
const eur = (n) => new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 }).format(n) + " €";
const SCENARIOS = [100, 95, 90, 85].map((pct) => {
  const aval = (PRICE * pct) / 100;
  const loan = 0.9 * Math.min(PRICE, aval);
  return { pct, aval, loan, capital: PRICE - loan };
});

const STATES = [
  { h: "Comprovada", d: "Confirmada com documento: caderneta, certidão, licença, atas do condomínio.", ex: "Área da caderneta", img: "/opt/p-escritorio.jpg" },
  { h: "Declarada", d: "Dita pelo dono, ainda sem documento que a confirme.", ex: "Ano das últimas obras", img: "/opt/p-sala.jpg" },
  { h: "Estimada", d: "Calculada por nós ou pelos parceiros, como o orçamento de obra ou os cenários de crédito.", ex: "Orçamento da cozinha", img: "/opt/p-cozinha.jpg" },
  { h: "Desconhecida", d: "Ainda não sabemos. Fica escrito, para não ser surpresa.", ex: "Estado da canalização interior", img: "/opt/p-noite2.jpg" },
];

const PROTECTION = [
  { meta: "01", title: "Sinal no CPCV", text: "Entre 5% e 10% do preço." },
  { meta: "02", title: "Condição de crédito", text: "Se o crédito falhar até à data acordada, o sinal é devolvido." },
  { meta: "03", title: "Depois da escritura", text: "3 meses de acompanhamento: obras, despesas e problemas escondidos." },
];

const FAQS = [
  { q: "Pago alguma coisa pelo dossier?", a: "Não. Somos pagos pelo vendedor, e dizemos-lho desde o início. Os renders personalizados e os cenários de crédito não têm custo para si." },
  { q: "O orçamento de obra obriga-me a fazer a obra convosco?", a: "Não. Pode adjudicá-lo ou usá-lo só como referência para decidir." },
  { q: "Os renders mostram a casa real?", a: "Mostram uma simulação à escala, sempre identificada como tal e sempre ao lado das fotos reais. Servem para ver se a casa funciona para si." },
  { q: "E se o banco avaliar a casa abaixo do preço?", a: "Os cenários de crédito mostram, antes do CPCV, quanto capital extra precisaria com a avaliação a 100, 95, 90 e 85%. E o CPCV leva condição de crédito aprovado até uma data: se o crédito falhar, o sinal é devolvido." },
  { q: "Quem faz o relatório técnico?", a: "A Freitas Renovações, empresa do nosso grupo, e dizemo-lo claramente. Para estrutura e humidades, chamamos um engenheiro externo." },
];

function Gallery() {
  const tabs = Object.keys(GALLERY);
  const [tab, setTab] = useState(tabs[0]);
  const imgs = GALLERY[tab];
  return (
    <div>
      <div className="flex gap-2" role="tablist" aria-label="Galeria do dossier">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`h-10 border px-4 text-[13px] font-medium transition-colors ${tab === t ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-neutral-300 text-[#0A0A0A] hover:border-[#0A0A0A]"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          className="mt-5 grid h-[60svh] grid-cols-2 grid-rows-2 gap-2 md:h-[74vh] md:grid-cols-3 md:gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {imgs.map((im, i) => (
            <figure key={im.src} className={`relative overflow-hidden rounded-[3px] bg-neutral-100 ${i === 0 ? "col-span-2 row-span-1 md:row-span-2" : ""}`}>
              <img src={im.src} alt={im.alt} className="h-full w-full object-cover" />
              {tab === "Renders" && (
                <figcaption className="absolute bottom-3 left-3 bg-white/85 px-2.5 py-1 text-[11px] font-medium text-neutral-700 backdrop-blur">Simulação</figcaption>
              )}
            </figure>
          ))}
        </motion.div>
      </AnimatePresence>
      <p className="mt-3 text-[12px] text-neutral-400">Exemplo de dossier. Imagens ilustrativas.</p>
    </div>
  );
}

function States() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-6">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-neutral-100 md:aspect-[5/6]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={active}
              src={STATES[active].img}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </AnimatePresence>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-white/90 px-4 py-3 backdrop-blur">
            <span className="text-[13px] text-neutral-600">{STATES[active].ex}</span>
            <span className="border border-[#0A0A0A] px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#0A0A0A]">{STATES[active].h}</span>
          </div>
        </div>
      </div>
      <div className="md:col-span-5 md:col-start-8">
        <motion.div {...fadeUp()}>
          <Eyebrow>Cada informação, com o seu estado</Eyebrow>
          <Title className="mt-5">Sabe sempre em que se baseia.</Title>
        </motion.div>
        <div className="mt-10 border-t border-neutral-200">
          {STATES.map((s, i) => (
            <button
              key={s.h}
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={active === i}
              className={`block w-full border-b border-neutral-200 py-5 text-left transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
            >
              <span className="text-[20px] font-medium tracking-[-0.015em] text-[#0A0A0A] md:text-[22px]">{s.h}</span>
              <motion.span
                initial={false}
                animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="block overflow-hidden"
              >
                <span className="block pt-2 text-[15px] leading-relaxed text-neutral-600">{s.d}</span>
              </motion.span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DossierPage() {
  return (
    <MonoPage buyer>
      {/* 1. Título + barra de factos (como numa página de imóvel) */}
      <header className="bg-white" style={{ fontFamily: SANS }}>
        <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-32 md:px-[5vw] md:pb-14 md:pt-44">
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
                <Eyebrow>Para quem compra · Exemplo</Eyebrow>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}>
                <StaggerTitle className="mt-6" lines={[{ text: "O dossier" }, { text: "da casa." }]} />
              </motion.div>
            </div>
            <motion.div className="md:col-span-4" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.25 }}>
              <Lead>
                Depois da visita, e com interesse claro, cada comprador recebe o dossier da casa. Os renders personalizados não têm
                custo para si.
              </Lead>
            </motion.div>
          </div>
          <motion.dl
            className="mt-12 grid grid-cols-2 border-y border-neutral-200 md:mt-16 md:grid-cols-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {FACTS.map(([k, v], i) => (
              <div key={k} className={`py-5 md:px-5 md:first:pl-0 ${i > 0 ? "md:border-l md:border-neutral-200" : ""} ${i % 2 === 1 ? "pl-4 border-l border-neutral-200 md:pl-5" : ""}`}>
                <dt className="text-[12px] text-neutral-500">{k}</dt>
                <dd className="mt-1 text-[17px] font-medium tracking-[-0.01em] text-[#0A0A0A]">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>

      {/* 2. Galeria com separadores */}
      <section className="bg-white px-5 md:px-[5vw]" style={{ fontFamily: SANS }}>
        <div className="mx-auto max-w-[1400px]">
          <Gallery />
        </div>
      </section>

      {/* 3. Conteúdo + painel preso à direita (Compass: "sticky contact rail") */}
      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <motion.div {...fadeUp()}>
              <Eyebrow>O que recebe</Eyebrow>
              <Title className="mt-5">Quatro respostas, antes do CPCV.</Title>
            </motion.div>
            <div className="mt-10 border-t border-neutral-200">
              {RECEIVE.map((r, i) => (
                <motion.div key={r.b} className="grid grid-cols-1 gap-2 border-b border-neutral-200 py-7 md:grid-cols-[48px_1fr]" {...fadeUp(i * 0.05)}>
                  <p className="text-[12px] font-medium tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <p className="text-[28px] font-medium leading-[1.08] tracking-[-0.025em] text-[#0A0A0A]">{r.b}</p>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-neutral-600">{r.t}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 4. Cenários de crédito */}
            <motion.div className="mt-20" {...fadeUp()}>
              <Eyebrow>Cenários de crédito · Exemplo</Eyebrow>
              <h3 className="mt-5 text-[38px] font-medium leading-[1.08] tracking-[-0.025em] text-[#0A0A0A] md:text-[52px]">
                Se o banco avaliar abaixo do preço.
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600">
                Casa de {eur(PRICE)}. O banco empresta até 90% do menor valor entre o preço e a avaliação. A diferença sai do seu capital.
              </p>
              <div className="mt-8 overflow-x-auto [scrollbar-width:none]">
                <table className="w-full min-w-[480px] border-collapse text-left text-[15px]">
                  <thead>
                    <tr className="border-b border-neutral-300 text-[12px] uppercase tracking-[0.16em] text-neutral-500">
                      <th className="py-3 pr-4 font-medium">Avaliação</th>
                      <th className="py-3 pr-4 font-medium">Valor avaliado</th>
                      <th className="py-3 pr-4 font-medium">Crédito máximo</th>
                      <th className="py-3 font-medium text-[#0A0A0A]">Capital próprio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCENARIOS.map((s) => (
                      <tr key={s.pct} className="border-b border-neutral-200">
                        <td className="py-4 pr-4 font-medium text-[#0A0A0A]">{s.pct}%</td>
                        <td className="py-4 pr-4 tabular-nums text-neutral-600">{eur(s.aval)}</td>
                        <td className="py-4 pr-4 tabular-nums text-neutral-600">{eur(s.loan)}</td>
                        <td className="py-4 tabular-nums font-medium text-[#0A0A0A]">{eur(s.capital)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[12px] text-neutral-400">Exemplo ilustrativo, sem impostos nem custos de escritura. No dossier, os números são os da casa e os seus.</p>
            </motion.div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-28">
              <div className="bg-[#0A0A0A] p-6 text-white md:p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/55">Próximo dossier</p>
                <p className="mt-3 text-[26px] font-medium leading-[1.1] tracking-[-0.025em] text-white">Quer receber o próximo?</p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                  Simule o crédito e entre na base. As casas compatíveis chegam-lhe antes de irem para os portais.
                </p>
                <button type="button" onClick={openBuyer} className="btn-lux btn-lux--solid-light mt-6 w-full">Simular crédito</button>
                <a href="https://wa.me/351967708397" target="_blank" rel="noopener noreferrer" className="btn-lux btn-lux--ghost-light mt-3 w-full">
                  WhatsApp
                </a>
                <p className="mt-4 text-center text-[12px] text-white/45">Somos pagos pelo vendedor. A si não cobramos nada.</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* 5. Frase que se acende + estado de cada informação */}
      <Section tone="grey">
        <Statement
          label="Sem surpresas"
          text="Cada informação vem marcada: comprovada, declarada, estimada ou desconhecida."
          note="O que não sabemos também fica escrito."
        />
        <div className="mt-20 md:mt-28">
          <States />
        </div>
      </Section>

      {/* 6. Proteção */}
      <Section tone="dark">
        <SectionHead light eyebrow="Proteção" title={<>Compra com rede.</>} text="O que fica escrito quando avança." />
        <Columns light items={PROTECTION} />
      </Section>

      {/* 7. Chamada final */}
      <DarkCta
        eyebrow="Para quem compra"
        title="Quer receber o próximo dossier?"
        text="Simule o crédito e entre na base. As casas compatíveis chegam-lhe antes de irem para os portais."
        image="/opt/p-noite.jpg"
      >
        <Btn onClick={openBuyer} variant="solid-light">Simular crédito</Btn>
        <Btn href="/oportunidades" variant="ghost-light">Como compra connosco</Btn>
      </DarkCta>

      {/* 8. Perguntas */}
      <Section>
        <FaqList
          items={FAQS}
          title={<>Perguntas sobre o dossier.</>}
          aside={
            <div className="mt-8">
              <p className="text-[15px] text-neutral-600">Ainda tem dúvidas? Fale connosco diretamente.</p>
              <Link href="/equipe#contacto" className="btn-lux btn-lux--link mt-4 text-[#0A0A0A]">Contacto</Link>
            </div>
          }
        />
      </Section>
    </MonoPage>
  );
}
