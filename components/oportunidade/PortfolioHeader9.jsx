"use client";

import React from "react";

const tags = ["Exemplo", "Fotos reais + renders", "Tudo por escrito"];

export function PortfolioHeader9() {
  return (
    <section id="relume" className="px-[5%] pt-16">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-6 py-16 md:grid-cols-2 md:gap-x-12 md:py-24 lg:gap-20 lg:py-28">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              O dossier da casa
            </h1>
            <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
              {tags.map((tag) => (
                <li key={tag} className="flex">
                  <span className="bg-background-secondary px-2 py-1 text-sm font-semibold">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="md:text-md">
              Depois da visita, e com interesse claro, cada comprador recebe o
              dossier da casa: renders personalizados, orçamento de obra,
              cenários de crédito, relatório técnico e os motivos para não
              comprar. Os renders personalizados não têm custo para si.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
