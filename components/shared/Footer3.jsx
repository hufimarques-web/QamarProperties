"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/equipe", label: "Conceito" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
];

const legalLinks = [
  { href: "#", label: "Política de privacidade" },
  { href: "#", label: "Termos de serviço" },
  { href: "#", label: "Configurações de cookies" },
  { href: "#", label: "Suporte ao investidor" },
  { href: "#", label: "Documentação legal" },
];

const socials = [
  { Icon: BiLogoFacebookCircle, label: "Facebook" },
  { Icon: BiLogoInstagram, label: "Instagram" },
  { Icon: FaXTwitter, label: "X / Twitter" },
  { Icon: BiLogoLinkedinSquare, label: "LinkedIn" },
  { Icon: BiLogoYoutube, label: "YouTube" },
];

export function Footer3() {
  return (
    <footer className="bg-gold px-[5%] pt-16 pb-8 md:pt-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 gap-12 border-b border-navy-deep/20 pb-14 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="mb-6 inline-block text-navy-deep">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-10 -10 460 170"
                fill="none"
                className="h-10 w-auto"
              >
                <path d="M0 0 L0 150 L40 150 L40 95 L100 95 L100 65 L40 65 L40 35 L105 35 L105 0 Z" fill="currentColor"/>
                <path d="M115 0 L115 150 L225 150 L225 120 L195 95 L155 95 L155 0 Z" fill="currentColor"/>
                <path d="M240 0 L240 150 L280 150 L280 0 Z" fill="currentColor"/>
                <path d="M295 0 L340 68 L295 150 L340 150 L365 108 L390 150 L435 150 L390 68 L435 0 L390 0 L365 38 L340 0 Z" fill="currentColor"/>
              </svg>
            </Link>
            <p className="mb-6 max-w-xs font-body text-sm leading-relaxed text-navy-deep/70">
              Plataforma de investimento imobiliário português com retorno entre 15 e 30% por operação.
            </p>
            <div className="mb-6">
              <p className="mb-1 font-body text-xs font-semibold uppercase tracking-wider text-navy-deep/50">
                Endereço
              </p>
              <p className="font-body text-sm text-navy-deep/80">
                Aveiro, Portugal
              </p>
            </div>
            <div className="mb-8">
              <p className="mb-1 font-body text-xs font-semibold uppercase tracking-wider text-navy-deep/50">
                Contato
              </p>
              <a
                href="tel:+351213500300"
                className="block font-body text-sm text-navy-deep/80 transition-colors hover:text-navy-deep"
              >
                +351 967 708 397
              </a>
              <a
                href="mailto:info@capitalatlantico.pt"
                className="block font-body text-sm text-navy-deep/80 transition-colors hover:text-navy-deep"
              >
                info@capitalatlantico.pt
              </a>
            </div>
            <div className="flex gap-4">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-navy-deep/60 transition-colors hover:text-navy-deep"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep">
              Navegação
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-navy-deep/75 transition-colors hover:text-navy-deep"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep">
              Legal
            </p>
            <ul className="space-y-3">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-sm text-navy-deep/75 transition-colors hover:text-navy-deep"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="font-body text-xs text-navy-deep/45">
            © 2025 Flix. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Política de privacidade", "Termos e condições", "Cookies"].map(
              (label) => (
                <a
                  key={label}
                  href="#"
                  className="font-body text-xs text-navy-deep/45 underline underline-offset-2 transition-colors hover:text-navy-deep/85"
                >
                  {label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
