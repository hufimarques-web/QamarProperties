"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export function Cta31() {
  return (
    <section className="relative overflow-hidden bg-navy-deep px-[5%] py-20 md:py-28 lg:py-32">
      {/* Background image with overlay */}
      <img
        src="/images/cta-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Comece agora
            </p>
            <h2 className="mb-6 font-display text-4xl font-light leading-[1.1] text-cream md:text-5xl lg:text-6xl">
              Comece agora,{" "}
              <em className="font-semibold text-gold-light not-italic">
                sem compromisso
              </em>
            </h2>
            <div className="mb-8 h-px w-14 bg-gold/40" />
            <p className="mb-10 font-body text-base leading-relaxed text-cream/60 md:text-lg">
              Preencha o formulário. Receba acesso às próximas operações. Decida com calma se quer entrar.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#registar"
                className="inline-block bg-gold px-8 py-4 font-body text-sm font-semibold text-navy-deep transition-all duration-200 hover:bg-gold-light hover:shadow-xl"
              >
                Quero aceder às oportunidades
              </Link>
              <Link
                href="/oportunidades"
                className="font-body text-sm font-medium text-cream/60 underline underline-offset-4 transition-colors hover:text-cream"
              >
                Saber mais →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
