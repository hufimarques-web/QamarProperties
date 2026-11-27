"use client";

import React from "react";

const states = [
  { label: "Comprovada", text: "Confirmada com documento." },
  { label: "Declarada", text: "Dita pelo dono, ainda sem documento." },
  { label: "Estimada", text: "Calculada por nós, com base em dados de mercado." },
  { label: "Desconhecida", text: "Não sabemos, e dizemo-lo." },
];

export function Logo6() {
  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="mx-auto mb-8 w-full max-w-lg text-center text-base font-bold leading-[1.2] md:mb-10 md:text-md md:leading-[1.2] lg:mb-12">
          Cada informação do dossier vem marcada com o seu estado
        </h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {states.map(({ label, text }) => (
            <div
              key={label}
              className="flex w-full flex-col items-center justify-center bg-neutral-lightest px-4 py-6 text-center"
            >
              <p className="mb-1 text-lg font-bold">{label}</p>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
