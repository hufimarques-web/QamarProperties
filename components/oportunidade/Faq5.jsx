"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";
import { RxPlus } from "react-icons/rx";

const faqs = [
  {
    q: "Pago alguma coisa pelo dossier?",
    a: "Não. Somos pagos pelo vendedor, e dizemos-lho desde o início. Os renders personalizados e os cenários de crédito não têm custo para si.",
  },
  {
    q: "O orçamento de obra obriga-me a fazer a obra convosco?",
    a: "Não. Pode adjudicá-lo ou usá-lo só como referência para decidir.",
  },
  {
    q: "Os renders mostram a casa real?",
    a: "Mostram uma simulação à escala, sempre identificada como tal e sempre ao lado das fotos reais. Servem para ver se a casa funciona para si.",
  },
  {
    q: "E se o banco avaliar a casa abaixo do preço?",
    a: "Os cenários de crédito mostram, antes do CPCV, quanto capital extra precisaria com a avaliação a 100, 95, 90 e 85%. E o CPCV leva condição de crédito aprovado até uma data: se o crédito falhar, o sinal é devolvido.",
  },
  {
    q: "Quem faz o relatório técnico?",
    a: "A Freitas Renovações, empresa do nosso grupo, e dizemo-lo claramente. Para estrutura e humidades, chamamos um engenheiro externo.",
  },
];

export function Faq5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Perguntas sobre o dossier
          </h2>
        </div>
        <Accordion type="multiple" className="grid items-start justify-stretch gap-4">
          {faqs.map(({ q, a }, i) => (
            <AccordionItem
              key={q}
              value={`item-${i}`}
              className="border border-border-primary px-5 md:px-6"
            >
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                {q}
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Ainda tem dúvidas?
          </h4>
          <p className="md:text-md">Fale connosco diretamente.</p>
          <div className="mt-6 md:mt-8">
            <Link
              href="/equipe#contacto"
              className="inline-block border border-border-primary px-6 py-3 font-semibold"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
