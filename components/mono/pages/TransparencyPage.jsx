"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MonoPage, Section, SectionHead, Columns, CompareTable, DarkCta, Btn, Eyebrow, Title, Serif, Statement, EditorialHero,
  HorizontalScroll, fadeUp, openSeller, openBuyer,
} from "../MonoKit";

// /depoimentos — transparência.
// Estrutura inspirada na Opendoor ("custos e taxas", comparação com a venda tradicional):
// topo → comparação lado a lado → como ganhamos (exemplo com números) → vermelho e amarelo →
// as dúvidas dos compradores → estado de cada informação → chamada final.

const COMPARE_HEAD = ["Imobiliária comum", "Qamar"];
const COMPARE_ROWS = [
  ["Comissão", "Percentagem sobre o preço, descontada ao que recebe.", "0 € a somar. Recebe o valor que nos disse."],
  ["Como ganhamos", "Ganha sempre, venda por quanto vender.", "Só com o que vendermos acima do seu valor."],
  ["Prazo", "Contrato de meses, sem prazo de venda.", "60 dias. Se não vendermos, saímos."],
  ["Fotos e renders", "Fotografias do anúncio.", "Fotografia, renders e plantas por nossa conta. Ficam consigo."],
  ["Para quem compra", "Mostra-se o lado positivo.", "Motivos para não comprar, por escrito, em cada casa."],
  ["Propostas", "Negociação caso a caso.", "Janela de propostas com data limite, cada uma registada."],
  ["Depois da escritura", "O processo acaba.", "3 meses de acompanhamento."],
];

const EXAMPLE = [
  { k: "Vendemos por 200.000 €", you: "200.000 €", us: "0 €", note: "Vendemos pelo seu valor: não ganhamos nada." },
  { k: "Vendemos por 215.000 €", you: "200.000 €", us: "15.000 €", note: "O que passa do seu valor é a nossa remuneração." },
  { k: "Não vendemos em 60 dias", you: "A casa", us: "0 €", note: "Saímos. Fica com as fotos e os renders." },
];

const ROWS = [
  { area: "Financeiro", red: "Taxa de esforço acima de 45% com subida de juros; falta capital mesmo com avaliação a 100%.", yellow: "Falta capital com avaliação a 90%; reserva inferior a 6 meses." },
  { area: "Legal", red: "Ónus sem solução; construções não licenciáveis.", yellow: "Áreas divergentes; anexos por legalizar." },
  { area: "Técnico", red: "Problemas de estrutura, humidades graves, cobertura sem orçamento.", yellow: "Instalação elétrica antiga; inspeção por concluir." },
  { area: "Condomínio", red: "Obras grandes aprovadas sem preço fechado.", yellow: "Quotas em atraso; fundo de reserva baixo." },
];

const OBJECTIONS = [
  { q: "“A avaliação do banco pode não chegar.”", a: "Calculadora com avaliação a 100, 95, 90 e 85% do preço: vê o capital extra de que precisa em cada cenário, antes do CPCV. E o CPCV leva condição de crédito aprovado." },
  { q: "“Consigo pagar tudo?”", a: "Mostramos o dinheiro necessário até à escritura, a prestação, a taxa de esforço com subida de juros e a reserva que lhe sobra." },
  { q: "“Estou a comprar caro?”", a: "Comparamos com vendas reais, não com anúncios, e explicamos as diferenças entre cada casa." },
  { q: "“A casa esconde problemas?”", a: "Relatório técnico da Freitas Renovações, empresa do nosso grupo, e engenheiro externo para estrutura e humidades." },
  { q: "“Obras do prédio? Está tudo legal?”", a: "Atas e contas do condomínio. Áreas e documentos comparados; qualquer divergência segue para o solicitador." },
  { q: "“As fotos enganam.”", a: "Fotos reais primeiro. Os renders aparecem sempre ao lado e identificados como simulação." },
  { q: "“Não me imagino lá. Os meus móveis não cabem.”", a: "Modelo 3D à escala, com 2 ou 3 usos do espaço e os seus próprios móveis." },
  { q: "“Quanto custam as obras?”", a: "Orçamento com âmbito, exclusões e prazo, ligado ao render. Pode adjudicar ou usar só como referência." },
  { q: "“Estão a pressionar-me.”", a: "Propostas registadas com data e validade, sem concorrência inventada. Dizemos-lhe que somos pagos pelo vendedor. E depois da escritura, acompanhamos 3 meses." },
];

const STATES = [
  { title: "Comprovada", text: "Confirmada com documento." },
  { title: "Declarada", text: "Dita pelo dono, ainda sem documento." },
  { title: "Estimada", text: "Calculada por nós, com base em dados de mercado." },
  { title: "Desconhecida", text: "Não sabemos, e dizemo-lo." },
];

function Dot({ color, label }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
      <span className={`size-2 rounded-full ${color}`} aria-hidden="true" />
      {label}
    </span>
  );
}

export function TransparencyPage() {
  return (
    <MonoPage buyer>
      {/* 1. Topo */}
      <EditorialHero
        label="Transparência"
        lines={["Tudo por escrito.", "Até os motivos", "para não comprar."]}
        text="Para quem vende e para quem compra: o que custa, quem nos paga e o que pode correr mal, antes de assinar."
        image="/real/aveiro-azulejos.jpg"
        imageAlt="Fachada de azulejos em Aveiro"
      />

      {/* Frase que se acende */}
      <Section className="md:!py-44">
        <Statement
          label="O nosso princípio"
          text="Uma imobiliária comum mostra só o lado positivo. Nós escrevemos, em cada casa, as razões para não avançar."
          note="E dizemos sempre quem nos paga: o vendedor, e só na escritura."
        />
      </Section>

      {/* 2. Comparação lado a lado */}
      <Section tone="grey">
        <SectionHead eyebrow="Lado a lado" title={<>O que muda face a uma imobiliária comum.</>} text="Para quem vende e para quem compra." />
        <CompareTable head={COMPARE_HEAD} rows={COMPARE_ROWS} note="Comparação geral com o modelo de comissão sobre o preço. Cada imobiliária tem as suas condições." />
      </Section>

      {/* 3. Como ganhamos: exemplo com números */}
      <Section tone="dark">
        <SectionHead light eyebrow="Como ganhamos" title={<>Exemplo: pede 200.000 €.</>} text="Na escritura recebe 200.000 €. A nossa remuneração é o que conseguirmos acima, e só na escritura." />
        <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
          {EXAMPLE.map((e, i) => (
            <motion.div key={e.k} className="border-t border-white/25 pt-7 md:pr-6" {...fadeUp(i * 0.08)}>
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/55">{e.k}</p>
              <dl className="mt-8 grid grid-cols-1 gap-5">
                <div>
                  <dt className="text-[13px] text-white/55">Recebe</dt>
                  <dd className="mt-1 whitespace-nowrap text-[44px] font-medium leading-none tracking-[-0.03em] text-white md:text-[56px]">{e.you}</dd>
                </div>
                <div>
                  <dt className="text-[13px] text-white/55">Qamar</dt>
                  <dd className="mt-1 whitespace-nowrap text-[44px] font-medium leading-none tracking-[-0.03em] text-white/55 md:text-[56px]">{e.us}</dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-white/15 pt-5 text-[14px] leading-relaxed text-white/70">{e.note}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Btn onClick={openSeller} variant="solid-light">Pedir estudo de mercado</Btn>
        </div>
      </Section>

      {/* 4. Vermelho e amarelo */}
      <Section>
        <SectionHead eyebrow="Em cada casa, por escrito" title={<>Vermelho e amarelo.</>}>
          <p className="text-[16px] leading-relaxed text-neutral-600 md:text-[17px]">
            <span className="font-medium text-[#0A0A0A]">Vermelho:</span> recomendamos não avançar.{" "}
            <span className="font-medium text-[#0A0A0A]">Amarelo:</span> avançar, mas com condições.
          </p>
        </SectionHead>
        <div className="mt-14 border-t border-neutral-300 md:mt-20">
          {ROWS.map((r, i) => (
            <motion.div key={r.area} className="grid grid-cols-1 gap-5 border-b border-neutral-300 py-8 md:grid-cols-12 md:gap-10 md:py-10" {...fadeUp(i * 0.05)}>
              <p className="text-[26px] font-medium tracking-[-0.025em] text-[#0A0A0A] md:col-span-3 md:text-[32px]">{r.area}</p>
              <div className="md:col-span-4 md:col-start-5">
                <Dot color="bg-red-600" label="Vermelho" />
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{r.red}</p>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <Dot color="bg-yellow-400" label="Amarelo" />
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{r.yellow}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
          Não aceitamos casas sem licença de habitação nem acima de 400.000 €, e dizemos ao dono porquê, por escrito.
        </p>
      </Section>

      {/* 5. As dúvidas dos compradores: galeria horizontal presa */}
      <HorizontalScroll
        head={
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Antes do CPCV</Eyebrow>
              <Title className="mt-5">As suas dúvidas, respondidas.</Title>
            </div>
            <p className="max-w-sm text-[16px] leading-relaxed text-neutral-600">O que os compradores nos perguntam, e o que lhes mostramos antes do CPCV.</p>
          </div>
        }
      >
        {OBJECTIONS.map((o, i) => (
          <div key={o.q} className="flex h-[46vh] w-[78vw] shrink-0 flex-col justify-between border-t border-neutral-300 pt-6 md:h-[50vh] md:w-[26vw] md:pr-6">
            <p className="text-[12px] font-medium tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")} / {String(OBJECTIONS.length).padStart(2, "0")}</p>
            <div>
              <p className="text-[30px] font-medium leading-[1.08] tracking-[-0.025em] text-[#0A0A0A] md:text-[36px]">{o.q}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">{o.a}</p>
            </div>
          </div>
        ))}
      </HorizontalScroll>

      {/* 6. Estado de cada informação */}
      <Section>
        <SectionHead eyebrow="O dossier" title={<>Cada informação com o seu estado.</>} />
        <Columns items={STATES} cols={4} />
      </Section>

      {/* 7. Chamada final */}
      <DarkCta
        eyebrow="Tudo por escrito"
        title="Comprar ou vender com tudo por escrito."
        text="Quem vende sabe quanto recebe antes de assinar. Quem compra sabe quanto paga, e porque não deve comprar, antes do CPCV."
        image="/real/apt-quarto-2.jpg"
      >
        <Btn onClick={openSeller} variant="solid-light">Vender a minha casa</Btn>
        <Btn onClick={openBuyer} variant="ghost-light">Quero comprar</Btn>
      </DarkCta>
    </MonoPage>
  );
}
