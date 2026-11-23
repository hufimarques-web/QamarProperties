"use client";

import { motion } from "framer-motion";
import React from "react";

const partners = [
  "Banco BPI",
  "Savills Portugal",
  "JLL Portugal",
  "CBRE Lisboa",
  "Nortada Capital",
  "Vítor & Associados",
];

export function Logo6() {
  return (
    <section className="bg-navy px-[5%] py-14 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <motion.p
          className="mb-10 text-center font-body text-xs font-semibold uppercase tracking-[0.25em] text-cream/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Parceiros que você conhece e confia
        </motion.p>
        <div className="grid grid-cols-2 gap-px bg-white/5 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              className="flex items-center justify-center bg-navy px-6 py-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <span className="font-body text-sm font-medium text-cream/35 transition-colors hover:text-cream/70">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
