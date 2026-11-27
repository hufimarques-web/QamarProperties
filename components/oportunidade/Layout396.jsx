"use client";

import React from "react";

const cards = [
  { title: "Sinal no CPCV", text: "Entre 5% e 10% do preço." },
  { title: "Condição de crédito", text: "Se o crédito falhar até à data acordada, o sinal é devolvido." },
  { title: "Depois da escritura", text: "3 meses de acompanhamento: obras, despesas e problemas escondidos." },
];

export function Layout396() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Proteção</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Compra com rede
          </h2>
          <p className="md:text-md">O que fica escrito quando avança.</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {cards.map(({ title, text }) => (
            <div key={title} className="flex flex-col justify-center border border-border-primary p-6 md:p-8">
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                {title}
              </h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
