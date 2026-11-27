"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React from "react";

export function Cta51() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center border border-border-primary p-8 md:p-12 lg:p-16">
          <div className="max-w-lg text-center">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Quer receber o próximo dossier?
            </h2>
            <p className="md:text-md">
              Simule o crédito e entre na base. As casas compatíveis chegam-lhe
              antes de irem para os portais.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            <Link href="/oportunidades#formulario-comprador">
              <Button title="Simular crédito">Simular crédito</Button>
            </Link>
            <Link href="/oportunidades">
              <Button title="Como compra connosco" variant="secondary">
                Como compra connosco
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
