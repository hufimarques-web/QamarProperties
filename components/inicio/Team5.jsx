"use client";

import { motion } from "framer-motion";
import React from "react";
import { BiLogoLinkedinSquare } from "react-icons/bi";

const team = [
  {
    name: "Miguel Oliveira",
    role: "Fundador e CEO",
    bio: "Duas décadas em desenvolvimento imobiliário. Estruturou mais de cinquenta operações de fix and flip em Portugal.",
    avatar: "https://i.pravatar.cc/240?img=12",
  },
  {
    name: "Ana Costa",
    role: "Diretora jurídica",
    bio: "Advogada especializada em direito imobiliário. Garante que cada contrato protege o investidor como deve ser.",
    avatar: "https://i.pravatar.cc/240?img=47",
  },
  {
    name: "Ricardo Teixeira",
    role: "Diretor financeiro",
    bio: "Contabilista certificado. Audita cada número que você vê antes de sair do escritório.",
    avatar: "https://i.pravatar.cc/240?img=14",
  },
  {
    name: "Filipa Rocha",
    role: "Gerente de operações",
    bio: "Acompanha cada obra do início ao fim. Fala com construtores, inspetores, notários. Você não precisa.",
    avatar: "https://i.pravatar.cc/240?img=48",
  },
  {
    name: "Gonçalo Martins",
    role: "Analista de investimentos",
    bio: "Identifica as melhores oportunidades no mercado. Calcula risco e retorno com precisão de cirurgião.",
    avatar: "https://i.pravatar.cc/240?img=13",
  },
  {
    name: "Susana Alves",
    role: "Relacionamento com investidores",
    bio: "Responde suas dúvidas. Explica cada detalhe. Está aqui quando você precisa, não quando ela quer.",
    avatar: "https://i.pravatar.cc/240?img=46",
  },
];

export function Team5() {
  return (
    <section className="bg-cream px-[5%] py-20 md:py-28 lg:py-32">
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
            Equipe
          </p>
          <h2 className="mb-4 font-display text-4xl font-light text-navy md:text-5xl lg:text-6xl">
            Quem está por trás
          </h2>
          <p className="mx-auto max-w-md font-body text-base text-ink/55">
            Vinte anos de experiência em real estate português. Três sócios. Uma missão clara.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(({ name, role, bio, avatar }, i) => (
            <motion.div
              key={name}
              className="group bg-white p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={avatar}
                  alt={name}
                  className="size-16 rounded-full object-cover ring-2 ring-gold/20"
                />
                <div>
                  <h5 className="font-body text-sm font-semibold text-navy">{name}</h5>
                  <p className="font-body text-xs text-gold">{role}</p>
                </div>
              </div>
              <p className="mb-5 font-body text-sm leading-relaxed text-ink/65">{bio}</p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-navy/40 transition-colors hover:text-navy"
              >
                <BiLogoLinkedinSquare className="size-4" />
                <span className="font-body text-xs">LinkedIn</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Hiring CTA */}
        <motion.div
          className="mt-20 border border-gold/30 bg-white p-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h4 className="mb-3 font-display text-2xl font-light text-navy md:text-3xl">
            Estamos contratando
          </h4>
          <p className="mb-6 font-body text-sm text-ink/60">
            Procuramos analistas imobiliários e especialistas em compliance. Envie seu currículo.
          </p>
          <a
            href="mailto:info@relume.io"
            className="inline-block border border-navy px-7 py-3 font-body text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-cream"
          >
            Ver vagas
          </a>
        </motion.div>
      </div>
    </section>
  );
}
