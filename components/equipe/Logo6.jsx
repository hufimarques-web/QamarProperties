"use client";

import React from "react";

const people = [
  {
    name: "André",
    role: "Quem vende",
    text: "Estudo de mercado, contrato com o dono e parceiros.",
  },
  {
    name: "Hugo",
    role: "Quem compra",
    text: "Base de compradores, visitas, propostas, CPCV e escritura.",
  },
  {
    name: "Equipa 3D",
    role: "Renders",
    text: "Renders à escala e personalizados, em Blender e D5.",
  },
];

const partners = [
  { name: "Freitas Renovações", text: "Obras e relatório técnico (empresa do grupo)." },
  { name: "Intermediário de crédito", text: "Confirma os casos com taxa de esforço mais alta." },
  { name: "Advogado e solicitador", text: "Contratos, documentos e escritura." },
  { name: "Engenheiro externo", text: "Estrutura e humidades, com olhar independente." },
];

export function Logo6() {
  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {people.map(({ name, role, text }) => (
            <div key={name} className="border border-border-primary p-6 md:p-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider">{role}</p>
              <h3 className="mb-3 text-3xl font-bold md:text-4xl">{name}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <h2 className="mx-auto mb-8 w-full max-w-lg text-center text-base font-bold leading-[1.2] md:mb-10 md:text-md md:leading-[1.2] lg:mb-12">
          Parceiros em cada venda
        </h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {partners.map(({ name, text }) => (
            <div
              key={name}
              className="flex w-full flex-col items-center justify-center bg-neutral-lightest px-4 py-6 text-center"
            >
              <p className="mb-1 text-lg font-bold">{name}</p>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
