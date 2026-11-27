"use client";

import React from "react";

const rows = [
  {
    area: "Financeiro",
    red: "Taxa de esforço acima de 45% com subida de juros; falta capital mesmo com avaliação a 100%.",
    yellow: "Falta capital com avaliação a 90%; reserva inferior a 6 meses.",
  },
  {
    area: "Legal",
    red: "Ónus sem solução; construções não licenciáveis.",
    yellow: "Áreas divergentes; anexos por legalizar.",
  },
  {
    area: "Técnico",
    red: "Problemas de estrutura, humidades graves, cobertura sem orçamento.",
    yellow: "Instalação elétrica antiga; inspeção por concluir.",
  },
  {
    area: "Condomínio",
    red: "Obras grandes aprovadas sem preço fechado.",
    yellow: "Quotas em atraso; fundo de reserva baixo.",
  },
];

export function Layout19() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Em cada casa, por escrito</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Vermelho e amarelo
          </h2>
          <p className="md:text-md">
            <strong>Vermelho:</strong> recomendamos não avançar.{" "}
            <strong>Amarelo:</strong> avançar, mas com condições.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {rows.map(({ area, red, yellow }) => (
            <div
              key={area}
              className="grid grid-cols-1 gap-4 border border-border-primary p-6 md:grid-cols-[1fr_2fr_2fr] md:gap-8 md:p-8"
            >
              <p className="text-xl font-bold md:text-2xl">{area}</p>
              <p>
                <span className="mr-2 inline-block size-3 rounded-full bg-red-600 align-middle" aria-hidden="true" />
                <span className="sr-only">Vermelho: </span>
                {red}
              </p>
              <p>
                <span className="mr-2 inline-block size-3 rounded-full bg-yellow-400 align-middle" aria-hidden="true" />
                <span className="sr-only">Amarelo: </span>
                {yellow}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl md:text-md">
          Não aceitamos casas sem licença de habitação nem acima de 400.000 €, e
          dizemos ao dono porquê, por escrito.
        </p>
      </div>
    </section>
  );
}
