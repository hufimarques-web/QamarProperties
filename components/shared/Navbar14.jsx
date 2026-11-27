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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setIsDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    isScrolled,
    showLoading,
    isDesktop,
  };
}

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/oportunidades", label: "Comprar" },
  { href: "/equipe", label: "Equipa" },
];

const dropdownLinks = [
  { href: "/depoimentos", label: "Transparência" },
  { href: "/perguntas-frequentes", label: "Perguntas" },
  { href: "/equipe#contacto", label: "Contacto" },
];

export function Navbar14() {
  const pathname = usePathname();
  const nav = useNavbar();
  // Texto claro só com o menu móvel aberto (gaveta escura).
  // O site é branco (estilo MONO) no computador e no telemóvel: logo escuro.
  // todas as páginas seguem o design MONO da página inicial
  const isMono = true;
  const isHomepage = nav.isMobileMenuOpen;

  // Dynamic colors depending on whether we are on the homepage (light-on-dark/sky) or a subpage (dark-on-light)
  const textColorClass = isHomepage
    ? "text-white hover:text-white/70"
    : isMono
      ? "text-neutral-500 hover:text-black"
      : "text-[#4C3D4A] hover:text-[#4C3D4A]/70";
  const activeColorClass = isMono ? "text-black" : "text-gold";
  // todas as páginas têm o formulário (modal): abre-o sem sair da página
  const openSeller = (e) => {
    e.preventDefault();
    nav.setIsMobileMenuOpen(false);
    window.dispatchEvent(new Event("open-investment-form"));
  };
  const iconColor = isHomepage ? "text-white" : "text-[#4C3D4A]";

  return (
    <>
      {/* Loading line — appears once on page load */}
      {nav.showLoading && <div className="loading-line" aria-hidden="true" />}

      <motion.header
        className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-300 ${
          nav.isMobileMenuOpen
            ? "bg-[#2A2129] py-2"
            : nav.isScrolled
              ? "bg-[#F5F2ED]/95 py-1.5 shadow-[0_1px_0_rgba(76,61,74,0.08)] backdrop-blur-md"
              : "bg-transparent py-3 md:py-4"
        } ${
          nav.isPastHero ? "opacity-0 pointer-events-none" : "opacity-100"
        } ${
          isMono
            ? "lg:top-4 lg:mx-auto lg:w-[92%] lg:max-w-[1080px] lg:rounded-[4px] lg:border lg:border-black/[0.06] lg:!bg-white/85 lg:!py-0 lg:shadow-[0_10px_40px_rgba(0,0,0,0.06)] lg:backdrop-blur-md"
            : ""
        }`}
        style={isMono ? { fontFamily: "Inter, system-ui, sans-serif" } : undefined}
        data-nav-header
        data-menu-open={nav.isMobileMenuOpen ? "true" : "false"}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: nav.isPastHero ? 0 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`relative mx-auto flex h-[56px] md:h-[64px] max-w-7xl items-center justify-between px-5 md:px-6 lg:px-8 ${isMono ? "lg:h-[60px] lg:!px-6" : ""}`}>

          {/* Inline SVG Logo with dynamic fill to match page background */}
          <Link href="/" className="flex items-center overflow-visible">
            <img
              data-nav-logo
              src={isHomepage ? "/logo/qamar-logo-light.png" : "/logo/qamar-logo-dark.png"}
              alt="Qamar Properties"
              width={836}
              height={144}
              className={`h-7 md:h-11 w-auto transition-all duration-300 ${isMono ? "lg:h-8" : ""}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className={`hidden items-center lg:flex ${isMono ? "gap-8" : "gap-10"}`}>
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  data-text={label}
                  className={`nav-slide ${isMono ? "text-[14px] font-normal" : "font-body text-base tracking-wide font-medium"} transition-colors duration-300 ${
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
                className={`nav-slide flex items-center gap-1.5 ${isMono ? "text-[14px] font-normal" : "font-body text-base tracking-wide font-medium"} transition-colors duration-300 ${textColorClass}`}
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
              href="/oportunidades#formulario-comprador"
              className={`font-body text-sm font-medium transition-colors duration-300 ${textColorClass}`}
            >
              Sou comprador
            </Link>
            <Link
              href="/#formulario"
              onClick={openSeller}
              className={`btn-lux btn-lux--no-arrow min-h-[40px] px-5 text-[10px] ${isHomepage ? "btn-lux--ghost-light" : "btn-lux--solid-dark"}`}
            >
              Vender a minha casa
            </Link>
          </div>

          {/* Hamburger menu icon */}
          <button
            ref={nav.buttonRef}
            onClick={() => nav.setIsMobileMenuOpen((p) => !p)}
            className="-mr-2 flex size-11 flex-col items-center justify-center gap-[5px] lg:hidden"
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
                      className={`border-b border-white/10 py-4 font-body text-base font-medium last:border-0 hover:text-gold ${
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
                    href="/oportunidades#formulario-comprador"
                    className="btn-lux btn-lux--ghost-light w-full"
                    onClick={() => nav.setIsMobileMenuOpen(false)}
                  >
                    Sou comprador
                  </Link>
                  <Link
                    href="/#formulario"
                    className="btn-lux btn-lux--solid-light w-full"
                    onClick={() => nav.setIsMobileMenuOpen(false)}
                  >
                    Vender a minha casa
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
