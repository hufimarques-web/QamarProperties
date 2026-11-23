"use client";

import React from "react";

export function PortfolioHeader9() {
  return (
    <section id="relume" className="px-[5%]">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-6 py-16 md:grid-cols-2 md:gap-x-12 md:py-24 lg:gap-20 lg:py-28">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Apartamento no Porto
            </h1>
            <div className="mt-5 flex flex-wrap gap-2 md:mt-6">
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  Fix & flip
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  9 meses
                </a>
              </li>
              <li className="flex">
                <a
                  href="#"
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  22% retorno
                </a>
              </li>
            </div>
          </div>
          <div>
            <p className="md:text-md">
              Propriedade de três quartos em zona de reabilitação urbana, com
              contrato de compra assinado e plano de obra aprovado. Retorno
              projetado de 22% em nove meses, com proteção legal completa e
              relatório de avaliação independente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
