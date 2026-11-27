"use client";

import React from "react";

const objections = [
  {
    q: "“A avaliação do banco pode não chegar.”",
    a: "Calculadora com avaliação a 100, 95, 90 e 85% do preço: vê o capital extra de que precisa em cada cenário, antes do CPCV. E o CPCV leva condição de crédito aprovado.",
  },
  {
    q: "“Consigo pagar tudo?”",
    a: "Mostramos o dinheiro necessário até à escritura, a prestação, a taxa de esforço com subida de juros e a reserva que lhe sobra.",
  },
  {
    q: "“Estou a comprar caro?”",
    a: "Comparamos com vendas reais, não com anúncios, e explicamos as diferenças entre cada casa.",
  },
  {
    q: "“A casa esconde problemas?”",
    a: "Relatório técnico da Freitas Renovações, empresa do nosso grupo, e engenheiro externo para estrutura e humidades.",
  },
  {
    q: "“Obras do prédio? Está tudo legal?”",
    a: "Atas e contas do condomínio. Áreas e documentos comparados; qualquer divergência segue para o solicitador.",
  },
  {
    q: "“As fotos enganam.”",
    a: "Fotos reais primeiro. Os renders aparecem sempre ao lado e identificados como simulação.",
  },
  {
    q: "“Não me imagino lá. Os meus móveis não cabem.”",
    a: "Modelo 3D à escala, com 2 ou 3 usos do espaço e os seus próprios móveis.",
  },
  {
    q: "“Quanto custam as obras?”",
    a: "Orçamento com âmbito, exclusões e prazo, ligado ao render. Pode adjudicar ou usar só como referência.",
  },
  {
    q: "“Estão a pressionar-me.”",
    a: "Propostas registadas com data e validade, sem concorrência inventada. Dizemos-lhe que somos pagos pelo vendedor. E depois da escritura, acompanhamos 3 meses.",
  },
];

export function Testimonial17() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            As suas dúvidas, respondidas
          </h2>
          <p className="md:text-md">
            O que os compradores nos perguntam, e o que lhes mostramos antes do CPCV.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {objections.map(({ q, a }) => (
            <div
              key={q}
              className="flex w-full flex-col items-start border border-border-primary p-6 md:p-8"
            >
              <p className="mb-4 text-xl font-bold leading-[1.4] md:text-2xl">{q}</p>
              <p className="md:text-md">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
