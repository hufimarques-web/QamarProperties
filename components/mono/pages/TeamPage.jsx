"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MonoPage, Section, SectionHead, Columns, StatsRow, ExploreLinks, Eyebrow, Title, Lead, Serif, StaggerTitle, ExpandImage,
  fadeUp, EASE, openSeller, openBuyer,
} from "../MonoKit";
import { SANS } from "../MonoHero";

// /equipe — equipa e contacto.
// Estrutura inspirada na página "About" da Compass:
// missão → números → as pessoas → parceiros → como trabalhamos → contacto → continuar a explorar.

const NUMBERS = [
  { v: "2", k: "Pessoas, uma para cada lado da venda." },
  { v: "60 dias", k: "Prazo para vender. Se não vendermos, saímos." },
  { v: "4", k: "Parceiros em cada venda: obras, crédito, advogado e engenheiro." },
  { v: "3 meses", k: "De acompanhamento depois da escritura." },
];

const PEOPLE = [
  { initial: "A", name: "André", role: "Quem vende", text: "Estudo de mercado, contrato com o dono e parceiros." },
  { initial: "H", name: "Hugo", role: "Quem compra", text: "Base de compradores, visitas, propostas, CPCV e escritura." },
  { initial: "3D", name: "Equipa 3D", role: "Renders", text: "Renders à escala e personalizados, em Blender e D5." },
];

const PARTNERS = [
  { title: "Freitas Renovações", text: "Obras e relatório técnico (empresa do grupo)." },
  { title: "Intermediário de crédito", text: "Confirma os casos com taxa de esforço mais alta." },
  { title: "Advogado e solicitador", text: "Contratos, documentos e escritura." },
  { title: "Engenheiro externo", text: "Estrutura e humidades, com olhar independente." },
];

const PRINCIPLES = [
  { meta: "01", title: "Tudo por escrito.", text: "Estudo de mercado, propostas, motivos para não comprar e o estado de cada informação." },
  { meta: "02", title: "Dizemos quem nos paga.", text: "O vendedor, e só na escritura. Ao comprador não cobramos nada, e dizemos-lhe isso desde o início." },
  { meta: "03", title: "Sem pressão.", text: "Propostas com data e validade, sem concorrência inventada. Se não for a casa certa, dizemo-lo." },
];

const CONTACTS = [
  { k: "WhatsApp", v: "Enviar mensagem", href: "https://wa.me/351967708397", external: true },
  { k: "Telefone", v: "+351 967 708 397", href: "tel:+351967708397" },
  { k: "Zona de trabalho", v: "Região de Aveiro, Portugal" },
];

const EXPLORE = [
  { title: "Vender", text: "Diga quanto quer receber.", onClick: openSeller },
  { title: "Comprar", text: "Casas antes dos portais.", href: "/oportunidades" },
  { title: "Transparência", text: "Os motivos para não comprar.", href: "/depoimentos" },
  { title: "Perguntas", text: "Respostas sem letra pequena.", href: "/perguntas-frequentes" },
];

export function TeamPage() {
  return (
    <MonoPage buyer>
      {/* 1. Missão: título desencontrado (Lenval) */}
      <header className="bg-white" style={{ fontFamily: SANS }}>
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-32 md:px-[5vw] md:pb-24 md:pt-44">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
            <Eyebrow>Equipa</Eyebrow>
          </motion.div>
          <StaggerTitle
            className="mt-6"
            lines={[
              { text: "Uma imobiliária" },
              { text: "com dois", indent: "14vw" },
              { text: "lados.", indent: "34vw" },
            ]}
          />
          <motion.div
            className="mt-10 grid grid-cols-1 md:mt-14 md:grid-cols-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          >
            <Lead className="md:col-span-4 md:col-start-9">
              O André trabalha com quem vende, o Hugo com quem compra. Cada lado sabe sempre com quem fala, e por trás estão
              parceiros que já trabalham connosco.
            </Lead>
          </motion.div>
        </div>
      </header>

      {/* Imagem que cresce até ao ecrã inteiro (Stillform) */}
      <ExpandImage
        src="/real/costa-nova.jpg"
        alt="Casas às riscas da Costa Nova"
        title={<>Dois<br />lados</>}
        caption={
          <p className="max-w-3xl font-medium leading-[1.08] tracking-[-0.025em]" style={{ fontSize: "clamp(38px, 5vw, 88px)" }}>
            Do primeiro contacto à escritura.
          </p>
        }
      />

      {/* 2. Números */}
      <Section>
        <SectionHead eyebrow="Em números" title={<>Pequenos de propósito.</>} text="Poucas pessoas, cada uma responsável por um lado da venda, do primeiro contacto à escritura." />
        <StatsRow items={NUMBERS} />
      </Section>

      {/* 3. As pessoas */}
      <Section tone="grey">
        <SectionHead eyebrow="As pessoas" title={<>Quem está do outro lado.</>} />
        <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
          {PEOPLE.map((p, i) => (
            <motion.div key={p.name} className="flex flex-col" {...fadeUp(i * 0.08)}>
              <div className="flex aspect-[4/3] items-center justify-center rounded-[3px] bg-white">
                <span className="font-medium tracking-[-0.05em] text-[#0A0A0A]/80" style={{ fontSize: "clamp(64px, 7vw, 120px)" }} aria-hidden="true">
                  {p.initial}
                </span>
              </div>
              <div className="border-t border-neutral-200 pt-6 mt-6">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-neutral-500">{p.role}</p>
                <h3 className="mt-3 text-[40px] font-medium leading-none tracking-[-0.03em] text-[#0A0A0A] md:text-[48px]">{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 4. Parceiros */}
      <Section>
        <SectionHead eyebrow="Parceiros" title={<>Parceiros em cada venda.</>} text="Quem entra em cada processo, e o que faz." />
        <Columns items={PARTNERS} cols={4} />
      </Section>

      {/* 5. Como trabalhamos */}
      <Section tone="dark">
        <SectionHead light eyebrow="Como trabalhamos" title={<>Três regras, sem exceções.</>} />
        <Columns light items={PRINCIPLES} />
      </Section>

      {/* 6. Contacto */}
      <Section id="contacto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <motion.div className="md:col-span-6" {...fadeUp()}>
            <Eyebrow>Contacto</Eyebrow>
            <Title className="mt-5">Fale connosco.</Title>
            <Lead className="mt-6 max-w-md">
              Quer saber quanto recebe pela sua casa, ou procura casa na Região de Aveiro? Fale connosco.
            </Lead>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openSeller} className="btn-lux btn-lux--solid-dark btn-lux--block-mobile">Pedir estudo de mercado</button>
              <button type="button" onClick={openBuyer} className="btn-lux btn-lux--ghost-dark btn-lux--block-mobile">Quero comprar</button>
            </div>
          </motion.div>
          <div className="border-t border-neutral-200 md:col-span-5 md:col-start-8">
            {CONTACTS.map((c, i) => (
              <motion.div key={c.k} className="flex items-baseline justify-between gap-6 border-b border-neutral-200 py-6" {...fadeUp(i * 0.06)}>
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-neutral-500">{c.k}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-right text-[18px] font-medium tracking-[-0.01em] text-[#0A0A0A] underline-offset-4 hover:underline md:text-[20px]"
                  >
                    {c.v}
                  </a>
                ) : (
                  <p className="text-right text-[18px] font-medium tracking-[-0.01em] text-[#0A0A0A] md:text-[20px]">{c.v}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. Continuar a explorar */}
      <Section className="!pt-0">
        <SectionHead eyebrow="Continuar" title={<>Por onde quer seguir?</>} />
        <ExploreLinks items={EXPLORE} />
      </Section>
    </MonoPage>
  );
}
