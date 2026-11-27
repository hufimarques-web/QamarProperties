"use client";

import React from "react";
import { BiLogoWhatsapp, BiMap, BiPhone } from "react-icons/bi";

export function Contact15() {
  return (
    <section id="contacto" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div>
          <div className="mb-12 grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:mb-20 md:grid-cols-[1fr_.75fr] md:gap-x-20 md:gap-y-16">
            <div className="rb-12 max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Contacto</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Fale connosco
              </h2>
              <p className="md:text-md">
                Quer saber quanto recebe pela sua casa, ou procura casa na
                Região de Aveiro? Fale connosco.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-6 py-2">
                <div className="flex flex-row">
                  <div className="mr-4 md:mb-4">
                    <BiLogoWhatsapp className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                      WhatsApp
                    </h3>
                    <a className="underline" href="https://wa.me/351967708397" target="_blank" rel="noopener noreferrer">
                      Enviar mensagem
                    </a>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="mr-4 md:mb-4">
                    <BiPhone className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                      Telefone
                    </h3>
                    <a className="underline" href="tel:+351967708397">
                      +351 967 708 397
                    </a>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="mr-4 md:mb-4">
                    <BiMap className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                      Zona de trabalho
                    </h3>
                    <p>Região de Aveiro, Portugal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
