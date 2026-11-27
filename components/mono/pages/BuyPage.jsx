"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MonoPage, Section, SectionHead, ValueCards, StepsWithImage, StatsRow, DarkCta, FaqList, Btn, Eyebrow, Title, Lead,
  Serif, WordReveal, ExpandImage, HorizontalScroll, EditorialHero, ArchImage, fadeUp, openBuyer, EASE,
} from "../MonoKit";
import { SANS } from "../MonoHero";

// /oportunidades — para quem compra.
// Estrutura inspirada na Compass (Private Exclusives) e na Opendoor:
// topo com o primeiro passo do formulário → 3 cartões de valor → o que é a base →
// como funciona (passos com imagem presa) → custos em números → falar com uma pessoa →
// chamada final → perguntas.

const TIPOS = ["Apartamento", "Moradia", "Indiferente"];
const ZONAS = ["Aveiro (centro)", "Esgueira / Aradas / Glória e Vera Cruz", "Ílhavo / Gafanhas", "Qualquer zona da Região de Aveiro"];
const ORCAMENTOS = ["Até 150.000 €", "150.000 € a 250.000 €", "250.000 € a 400.000 €"];

const VALUES = [
  { title: "Antes dos portais.", text: "Cada casa que vendemos vai primeiro para a base de compradores. Só depois chega ao Idealista e aos outros portais." },
  { title: "Crédito primeiro.", text: "Sabe quanto pode comprar antes de visitar. Sem simulação, não há visita: não se apaixona por uma casa que o banco não financia." },
  { title: "Tudo por escrito.", text: "Renders, orçamento de obra, cenários de crédito, relatório técnico e os motivos para não comprar." },
];

const DEALS = [
  { title: "Apartamentos", zone: "Aveiro centro", type: "T1 a T3", image: "/real/apt-quarto-janela.jpg" },
  { title: "Moradias", zone: "Esgueira / Aradas / Glória e Vera Cruz", type: "T2 a T4", image: "/real/apt-cozinha-mesa.jpg" },
  { title: "Apartamentos e moradias", zone: "Ílhavo / Gafanhas", type: "Até 400.000 €", image: "/real/apt-quarto-2.jpg" },
];

const STEPS = [
  {
    label: "Crédito primeiro",
    title: "Sabe quanto pode comprar antes de visitar.",
    text: "Simulamos o seu crédito com as regras do Banco de Portugal: taxa de esforço máxima de 45%, testada com subida de juros, e financiamento até 90%. Vê o dinheiro de que precisa até à escritura, a prestação e a reserva que lhe sobra. Os casos mais apertados são confirmados pelo nosso intermediário de crédito parceiro.",
    image: "/real/aveiro-azulejos.jpg",
    alt: "Fachada de azulejos em Aveiro",
  },
  {
    label: "Base de compradores",
    title: "Recebe as casas compatíveis primeiro.",
    text: "Quando entra uma casa que encaixa no que procura e no que pode pagar, recebe-a antes de ir para os portais. Fotos reais primeiro, renders sempre ao lado e identificados como simulação.",
    image: "/real/aveiro-moliceiro.jpg",
    alt: "Moliceiro no canal de Aveiro",
  },
  {
    label: "Dossier da casa",
    title: "A casa como a quer, com números reais.",
    text: "Depois da visita, e com interesse claro, preparamos o dossier: renders com 2 ou 3 usos do espaço e os seus móveis, orçamento de obra com âmbito e prazo, cenários de crédito, relatório técnico e documentos do condomínio.",
    image: "/real/apt-quarto.jpg",
    alt: "Quarto de um apartamento renovado",
  },
  {
    label: "Proposta e CPCV",
    title: "Propostas com data, sem concorrência inventada.",
    text: "Com 5 ou mais interessados, abrimos uma janela de propostas com data limite. Cada proposta fica registada com data e validade. O CPCV leva sinal de 5 a 10% e condição de crédito aprovado: se o crédito falhar, o sinal é devolvido.",
    image: "/real/costa-nova-ceu.jpg",
    alt: "Casas às riscas da Costa Nova",
  },
];

const NUMBERS = [
  { v: "0 €", k: "O que paga à Qamar. Somos pagos pelo vendedor." },
  { v: "90 %", k: "Financiamento máximo do banco, sobre o menor valor entre preço e avaliação." },
  { v: "45 %", k: "Taxa de esforço máxima, testada com subida de juros." },
  { v: "3 meses", k: "De acompanhamento depois da escritura." },
];

const FAQS = [
  { q: "Pago alguma coisa à Qamar?", a: "Não. Somos pagos pelo vendedor, e dizemos-lho desde o início. A simulação de crédito, os renders personalizados e o dossier não têm custo para si." },
  { q: "Porque pedem a simulação de crédito antes da visita?", a: "Porque o banco não financia pelo preço anunciado. Avalia pelo valor de transação e empresta, no máximo, 90% do menor valor entre o preço e a avaliação. Assim sabe, antes de se apaixonar por uma casa, quanto dinheiro precisa até à escritura e qual será a prestação." },
  { q: "Como entro na base de compradores?", a: "Diga-nos o que procura, em que zona e com que orçamento. Ajudamos com a simulação de crédito e, quando entra uma casa compatível, enviamos-lha antes de ir para os portais." },
  { q: "E se o banco avaliar a casa abaixo do preço?", a: "Os cenários de crédito mostram, antes do CPCV, quanto capital extra precisaria com a avaliação a 100, 95, 90 e 85%. E o CPCV leva condição de crédito aprovado até uma data: se o crédito falhar, o sinal é devolvido." },
  { q: "O orçamento de obra obriga-me a fazer a obra convosco?", a: "Não. Pode adjudicá-lo ou usá-lo só como referência para decidir." },
];

function OptionChip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-11 border px-3 text-[14px] transition-colors ${active ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-neutral-300 bg-white text-[#0A0A0A] hover:border-[#0A0A0A]"}`}
    >
      {children}
    </button>
  );
}

// Primeiro passo do formulário de comprador, já no topo (Compass põe o formulário no topo)
function BuyerStart() {
  const [tipo, setTipo] = useState("");
  const [zona, setZona] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const go = () => {
    const detail = {};
    if (tipo) detail.tipo = tipo;
    if (zona) detail.zona = zona;
    if (orcamento) detail.orcamento = orcamento;
    window.dispatchEvent(new CustomEvent("open-buyer-form", { detail }));
  };
  return (
    <div className="bg-white p-6 md:p-9">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">Passo 1 de 2 · Sem compromisso</p>
      <p className="mt-3 text-[22px] font-medium tracking-[-0.02em] text-[#0A0A0A]">O que procura?</p>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {TIPOS.map((t) => (
          <OptionChip key={t} active={tipo === t} onClick={() => setTipo(tipo === t ? "" : t)}>{t}</OptionChip>
        ))}
      </div>
      <label htmlFor="buyer-zona" className="mt-5 block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">Zona</label>
      <select
        id="buyer-zona"
        value={zona}
        onChange={(e) => setZona(e.target.value)}
        className={`mt-2 h-11 w-full border border-neutral-300 bg-white px-3 text-[14px] outline-none focus:border-[#0A0A0A] ${zona ? "text-[#0A0A0A]" : "text-neutral-400"}`}
      >
        <option value="">Escolher</option>
        {ZONAS.map((z) => <option key={z} value={z} className="text-[#0A0A0A]">{z}</option>)}
      </select>
      <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">Orçamento</p>
      <div className="mt-2 grid grid-cols-1 gap-2">
        {ORCAMENTOS.map((o) => (
          <OptionChip key={o} active={orcamento === o} onClick={() => setOrcamento(orcamento === o ? "" : o)}>{o}</OptionChip>
        ))}
      </div>
      <button type="button" onClick={go} className="btn-lux btn-lux--solid-dark mt-6 w-full">Continuar</button>
      <p className="mt-3 text-center text-[12px] text-neutral-400">A si não cobramos nada.</p>
    </div>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function BuyPage() {
  return (
    <MonoPage buyer>
      {/* 1. Topo editorial: título em serifa sobre um retrato em arco (ERA Residence) */}
      <EditorialHero
        label="Para quem compra"
        lines={["A casa antes", "dos portais."]}
        text="Casas na Região de Aveiro com renders à escala, orçamento de obra, cenários de crédito e relatório técnico. E, em cada casa, os motivos para não comprar, por escrito."
        image="/real/apt-quarto-janela.jpg"
        imageAlt="Quarto com janela grande"
      >
        <Btn onClick={openBuyer}>Simular crédito</Btn>
        <Btn href="#comecar" variant="ghost-dark">Começar aqui</Btn>
      </EditorialHero>

      {/* Moldura ameixa que se abre até ao ecrã inteiro (ERA Residence) */}
      <ExpandImage
        src="/real/aveiro-moliceiro.jpg"
        alt="Moliceiro no canal de Aveiro, frente às fachadas"
        title={<>Antes dos<br />portais</>}
        caption={
          <p className="max-w-3xl font-medium leading-[1.08] tracking-[-0.025em]" style={{ fontSize: "clamp(38px, 5vw, 88px)" }}>
            Primeiro na base. Só depois nos portais.
          </p>
        }
      />

      {/* Primeiro passo do formulário (Compass põe o formulário logo no início) */}
      <Section id="comecar">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center md:gap-10">
          <motion.div className="md:col-span-6" {...fadeUp()}>
            <Eyebrow n="01">Começar</Eyebrow>
            <Title className="mt-6">Diga-nos o que procura.</Title>
            <Lead className="mt-6 max-w-md">Tipo de casa, zona e orçamento. No passo seguinte ajudamos com a simulação de crédito. A si não cobramos nada.</Lead>
          </motion.div>
          <motion.div className="md:col-span-5 md:col-start-8" {...fadeUp(0.1)}>
            <BuyerStart />
          </motion.div>
        </div>
      </Section>

      {/* 2. Frase que se acende + três cartões de valor */}
      <Section tone="grey">
        <Eyebrow n="02">Porquê comprar connosco</Eyebrow>
        <WordReveal
          className="mt-8 max-w-5xl"
          text="Três coisas que uma imobiliária comum não faz: mostrar-lhe a casa antes dos portais, simular o crédito antes da visita e escrever os motivos para não comprar."
        />
        <ValueCards items={VALUES} />
      </Section>

      {/* 3. O que está na base: galeria horizontal presa (Privalia) */}
      <HorizontalScroll
        head={
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow n="03">Base de compradores</Eyebrow>
              <Title className="mt-5">O que está na base agora.</Title>
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-neutral-600">
              Preço e morada só depois da simulação de crédito. Cada casa vem com renders, orçamento de obra e relatório técnico.
            </p>
          </div>
        }
      >
        {[...DEALS, { title: "A sua próxima casa", zone: "Diga-nos o que procura", type: "Entrar na base", image: "/real/costa-nova.jpg", open: true }].map((d) => (
          <button key={d.title} type="button" onClick={openBuyer} className="group w-[70vw] shrink-0 text-left md:w-[24vw]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3px] bg-neutral-100">
              <img
                src={d.image}
                alt=""
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${d.open ? "" : "scale-110 blur-[10px]"}`}
              />
              <div className={`absolute inset-0 ${d.open ? "bg-black/20" : "bg-black/25"}`} />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
                {d.open ? "Entrar na base →" : <><Lock /> Disponível após simulação</>}
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-neutral-500">{d.zone}</p>
                <h3 className="mt-2 text-[28px] font-medium leading-[1.08] tracking-[-0.025em] text-[#0A0A0A]">{d.title}</h3>
              </div>
              <p className="shrink-0 pt-6 text-[15px] font-medium text-[#0A0A0A]">{d.type}</p>
            </div>
          </button>
        ))}
      </HorizontalScroll>

      {/* 4. Como funciona: passos com a imagem presa ao lado */}
      <Section>
        <SectionHead n="04" eyebrow="Como funciona" title={<>Da simulação à escritura.</>} />
        <StepsWithImage items={STEPS} cta={<Btn onClick={openBuyer}>Simular crédito</Btn>} />
      </Section>

      {/* 5. Custos em números */}
      <Section tone="dark">
        <SectionHead light eyebrow="Custos e regras" title={<>Os números, antes de visitar.</>} text="Sem letra pequena: o que paga, quanto o banco empresta e até onde vai a taxa de esforço." />
        <StatsRow light items={NUMBERS} />
      </Section>

      {/* 6. Falar com uma pessoa (Opendoor: "online, mas nunca sozinho") */}
      <Section>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          <motion.div className="md:col-span-6" {...fadeUp()}>
            <Eyebrow>Quem o acompanha</Eyebrow>
            <Title className="mt-5">Uma pessoa, do primeiro contacto à escritura.</Title>
            <Lead className="mt-6 max-w-lg">
              O Hugo trabalha só com quem compra: base de compradores, visitas, propostas, CPCV e escritura. Pode falar com ele
              diretamente.
            </Lead>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Btn href="https://wa.me/351967708397">Falar por WhatsApp</Btn>
              <Btn href="/equipe" variant="ghost-dark">Conhecer a equipa</Btn>
            </div>
          </motion.div>
          <motion.div className="md:col-span-5 md:col-start-8" {...fadeUp(0.1)}>
            <ArchImage src="/real/aveiro-azulejos.jpg" className="aspect-[4/5] w-full" />
          </motion.div>
        </div>
      </Section>

      {/* 7. Chamada final */}
      <DarkCta
        id="formulario-comprador"
        eyebrow="Para quem compra"
        title="Entre na base de compradores."
        text="Diga-nos o que procura e quanto pode investir. Ajudamos com a simulação de crédito e enviamos-lhe as casas compatíveis antes de chegarem aos portais."
        image="/real/aveiro-canal-dourado.jpg"
      >
        <Btn onClick={openBuyer} variant="solid-light">Simular crédito</Btn>
        <Btn href="/oportunidade" variant="ghost-light">Ver um dossier</Btn>
      </DarkCta>

      {/* 8. Perguntas */}
      <Section>
        <FaqList items={FAQS} title="Perguntas de quem compra." />
      </Section>
    </MonoPage>
  );
}
