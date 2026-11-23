"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { RxChevronDown } from "react-icons/rx";

function useNavbar() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isPastHero = false;
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleClickOutside = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    menuRef,
    buttonRef,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isDropdownOpen,
    setIsDropdownOpen,
    isPastHero,
    showLoading,
  };
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/equipe", label: "Equipe" },
];

const dropdownLinks = [
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/perguntas-frequentes", label: "Perguntas" },
  { href: "/equipe", label: "Contato" },
];

export function Navbar14() {
  const pathname = usePathname();
  const nav = useNavbar();
  const isHomepage = pathname === "/";

  // Dynamic colors depending on whether we are on the homepage (light-on-dark/sky) or a subpage (dark-on-light)
  const textColorClass = isHomepage
    ? "text-white hover:text-white/70"
    : "text-[#4C3D4A] hover:text-[#4C3D4A]/70";
  const activeColorClass = "text-gold";
  const iconColor = isHomepage ? "text-white" : "text-[#4C3D4A]";

  return (
    <>
      {/* Loading line — appears once on page load */}
      {nav.showLoading && <div className="loading-line" aria-hidden="true" />}

      <motion.header
        className={`fixed inset-x-0 top-0 z-[1000] bg-transparent py-4 transition-all duration-300 ${
          nav.isPastHero ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: nav.isPastHero ? 0 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative mx-auto flex h-[64px] max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Inline SVG Logo with dynamic fill to match page background */}
          <Link href="/" className="flex items-center overflow-visible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-10 -10 460 170"
              fill="none"
              className={`h-8 md:h-[38px] w-auto overflow-visible transition-colors duration-300 ${
                isHomepage ? "text-white" : "text-[#4C3D4A]"
              }`}
            >
              <path d="M0 0 L0 150 L40 150 L40 95 L100 95 L100 65 L40 65 L40 35 L105 35 L105 0 Z" fill="currentColor"/>
              <path d="M115 0 L115 150 L225 150 L225 120 L195 95 L155 95 L155 0 Z" fill="currentColor"/>
              <path d="M240 0 L240 150 L280 150 L280 0 Z" fill="currentColor"/>
              <path d="M295 0 L340 68 L295 150 L340 150 L365 108 L390 150 L435 150 L390 68 L435 0 L390 0 L365 38 L340 0 Z" fill="currentColor"/>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  data-text={label}
                  className={`nav-slide font-body text-base tracking-wide font-medium transition-colors duration-300 ${
                    isActive ? activeColorClass : textColorClass
                  }`}
                >
                  <span>{label}</span>
                </Link>
              );
            })}

            {/* Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => nav.setIsDropdownOpen(true)}
              onMouseLeave={() => nav.setIsDropdownOpen(false)}
            >
              <button
                data-text="Recursos"
                className={`nav-slide flex items-center gap-1.5 font-body text-base tracking-wide font-medium transition-colors duration-300 ${textColorClass}`}
              >
                <span>Recursos</span>
                <motion.span
                  animate={{ rotate: nav.isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-0.5"
                >
                  <RxChevronDown className={`size-3.5 ${iconColor}`} />
                </motion.span>
              </button>
              <AnimatePresence>
                {nav.isDropdownOpen && (
                  <motion.nav
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 min-w-[180px] border border-white/10 bg-[#4C3D4A]/95 backdrop-blur-md p-2 shadow-xl rounded-xl"
                  >
                    {dropdownLinks.map(({ href, label }) => {
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          className={`block px-4 py-2.5 rounded-lg font-body text-sm transition-colors ${
                            isActive
                              ? "bg-white/10 text-gold"
                              : "text-cream/80 hover:bg-white/10 hover:text-cream"
                          }`}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA — rounded pill */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/equipe"
              className={`font-body text-sm font-medium transition-colors duration-300 ${textColorClass}`}
            >
              Entrar
            </Link>
            <Link
              href="/#formulario"
              className="rounded-full px-5 py-2.5 font-body text-sm font-semibold transition-all duration-300 bg-gold text-navy-deep hover:bg-gold-light hover:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.12)]"
            >
              Registrar
            </Link>
          </div>

          {/* Hamburger menu icon */}
          <button
            ref={nav.buttonRef}
            onClick={() => nav.setIsMobileMenuOpen((p) => !p)}
            className="flex size-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={`h-px w-6 transition-colors duration-300 ${
                  isHomepage ? "bg-cream" : "bg-[#4C3D4A]"
                }`}
                animate={
                  nav.isMobileMenuOpen
                    ? i === 0 ? { rotate: 45, y: 6 }
                      : i === 1 ? { opacity: 0 }
                        : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu (dark drawer layout) */}
        <AnimatePresence>
          {nav.isMobileMenuOpen && (
            <motion.div
              ref={nav.menuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10 bg-[#4C3D4A]/95 backdrop-blur-md"
            >
              <nav className="flex flex-col px-6 py-4">
                {[...navLinks, ...dropdownLinks].map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href + label}
                      href={href}
                      className={`border-b border-white/10 py-3.5 font-body text-sm font-medium last:border-0 hover:text-gold ${
                        isActive ? "text-gold font-semibold" : "text-cream/80"
                      }`}
                      onClick={() => nav.setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  );
                })}
                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href="/equipe"
                    className="border border-cream/20 px-4 py-3 text-center font-body text-sm font-medium text-cream rounded-full"
                    onClick={() => nav.setIsMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/#formulario"
                    className="rounded-full bg-gold px-4 py-3 text-center font-body text-sm font-semibold text-navy-deep"
                    onClick={() => nav.setIsMobileMenuOpen(false)}
                  >
                    Registrar
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
