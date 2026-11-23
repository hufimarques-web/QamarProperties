"use client";

import { motion } from "framer-motion";
import React from "react";
import { BiSolidStar } from "react-icons/bi";

const testimonials = [
  {
    quote:
      "Entrei com dez mil euros e saí com dezoito em oito meses. Sem dor de cabeça, sem telefonema do construtor.",
    name: "Carlos Mendes",
    role: "Empresário, Porto",
    avatar: "https://i.pravatar.cc/120?img=11",
  },
  {
    quote:
      "A transparência aqui é real. Vi cada número, cada contrato, antes de assinar. Voltei a investir três vezes.",
    name: "Mariana Silva",
    role: "Consultora financeira, Lisboa",
    avatar: "https://i.pravatar.cc/120?img=49",
  },
  {
    quote:
      "Vinte e dois por cento de retorno em dez meses. O meu dinheiro trabalhou enquanto eu dormia.",
    name: "João Ferreira",
    role: "Investidor imobiliário, Cascais",
    avatar: "https://i.pravatar.cc/120?img=15",
  },
];

export function Testimonial17() {
  return (
    <section className="bg-white px-[5%] py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Depoimentos
          </p>
          <h2 className="mb-4 font-display text-4xl font-light text-navy md:text-5xl lg:text-6xl">
            Investidores satisfeitos
          </h2>
          <p className="font-body text-base text-ink/50">Quem já ganhou com a gente</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map(({ quote, name, role, avatar }, i) => (
            <motion.div
              key={name}
              className="flex flex-col justify-between border-l-2 border-gold bg-cream p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div>
                <div className="mb-6 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <BiSolidStar key={j} className="size-4 text-gold" />
                  ))}
                </div>
                <blockquote className="mb-8 font-body text-base leading-relaxed text-ink/80 md:text-[1.05rem]">
                  "{quote}"
                </blockquote>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={avatar}
                  alt={name}
                  className="size-11 rounded-full object-cover ring-2 ring-gold/30"
                />
                <div>
                  <p className="font-body text-sm font-semibold text-navy">{name}</p>
                  <p className="font-body text-xs text-ink/50">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
