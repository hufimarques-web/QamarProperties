"use client";

import React from "react";

const images = [
  { src: "/opt/obra-janela.jpg", alt: "Fotografia real da casa" },
  { src: "/opt/valorizar.jpg", alt: "Render da casa, identificado como simulação" },
  { src: "/opt/sala-ria.jpg", alt: "Render de interior com proposta de obra" },
];

export function Content6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-16 md:gap-y-20 lg:grid-cols-[1.5fr_1fr] lg:gap-x-20">
          <div className="order-2 grid grid-cols-1 gap-6 md:gap-8 lg:order-1">
            {images.map((img) => (
              <div key={img.src}>
                <img src={img.src} alt={img.alt} className="w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="static order-1 lg:sticky lg:top-20 lg:order-2">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              O que recebe
            </h2>
            <div className="prose">
              <div>
                <p>
                  <strong>A casa como está, e como a quer.</strong> Fotos reais
                  primeiro. Ao lado, um modelo 3D à escala com 2 ou 3 usos do
                  espaço e os seus móveis, sempre identificado como simulação.
                </p>
                <p>
                  <strong>Quanto custa a obra.</strong> Orçamento com âmbito,
                  exclusões e prazo, ligado ao render. Pode adjudicá-lo ou usá-lo
                  só como referência.
                </p>
                <p>
                  <strong>Quanto paga, de facto.</strong> Cenários de crédito com
                  a avaliação do banco a 100, 95, 90 e 85%: dinheiro até à
                  escritura, prestação, taxa de esforço com subida de juros e a
                  reserva que lhe sobra.
                </p>
                <p>
                  <strong>O que pode correr mal.</strong> Relatório técnico,
                  documentos do condomínio, áreas comparadas e os motivos para
                  não comprar, por escrito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
