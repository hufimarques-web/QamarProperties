"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

// Rodapé editorial escuro. Pensado primeiro para telemóvel:
// links com área de toque confortável, colunas que passam a 2 e depois a 4.

const SERIF = "'Cormorant Garamond', Georgia, serif";

const columns = [
  {
    title: "Explorar",
    links: [
      { href: "/#formulario", label: "Vender a minha casa" },
      { href: "/oportunidades", label: "Comprar casa" },
      { href: "/depoimentos", label: "Transparência" },
      { href: "/equipe", label: "Equipa" },
      { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { href: "tel:+351967708397", label: "+351 967 708 397" },
      { href: "https://wa.me/351967708397", label: "WhatsApp", external: true },
      { label: "Região de Aveiro, Portugal" },
    ],
  },
  {
    // TODO: pôr os links reais quando as contas existirem
    title: "Seguir",
    links: [
      { href: "#", label: "Instagram" },
      { href: "#", label: "Facebook" },
      { href: "#", label: "LinkedIn" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Política de privacidade" },
      { href: "#", label: "Cookies" },
      { href: "https://www.livroreclamacoes.pt", label: "Livro de Reclamações", external: true },
      { href: "#", label: "Resolução alternativa de litígios" },
    ],
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
});

export function Footer3() {
  return (
    <footer className="relative overflow-hidden bg-[#141011] text-[#F5F2ED]">
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-[6vw] md:pt-24">
        {/* Topo: logo + frase */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
          <motion.div {...fade()}>
            <Link href="/" aria-label="Qamar Properties — início">
              <img
                src="/logo/qamar-logo-light.png"
                alt="Qamar Properties"
                width={836}
                height={144}
                className="h-9 w-auto md:h-11"
              />
            </Link>
          </motion.div>
          <motion.p
            className="max-w-md font-light leading-[1.15] text-white/80"
            style={{ fontFamily: SERIF, fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}
            {...fade(0.08)}
          >
            Diga quanto quer receber. <em className="italic text-gold">Nós vendemos em 60 dias.</em>
          </motion.p>
        </div>

        {/* Colunas */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4 md:py-16">
          {columns.map((col, i) => (
            <motion.div key={col.title} {...fade(0.05 * i)}>
              <p className="mb-4 font-body text-[10px] uppercase tracking-[0.32em] text-gold">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group inline-flex min-h-[40px] items-center font-body text-[14px] text-white/65 transition-colors duration-300 hover:text-white"
                      >
                        <span className="relative">
                          {l.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                        </span>
                      </a>
                    ) : (
                      <span className="inline-flex min-h-[40px] items-center font-body text-[14px] text-white/45">
                        {l.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marca d'água */}
      <div className="pointer-events-none select-none px-4" aria-hidden="true">
        <p
          className="text-center font-light leading-[0.8] tracking-[0.06em] text-white/[0.05]"
          style={{ fontFamily: SERIF, fontSize: "22vw" }}
        >
          QAMAR
        </p>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-[6vw]">
          <p className="font-body text-[11px] leading-relaxed tracking-[0.04em] text-white/40">
            © 2026 Qamar Properties · Mediação imobiliária · AMI n.º [a preencher]
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn-lux btn-lux--link btn-lux--no-arrow self-start text-white/60 hover:text-white md:self-auto"
          >
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
