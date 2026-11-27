"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Barra de navegação inferior só para telemóvel (inspirada na Emaar).
// Aparece depois de passar o topo da página.

const WHATSAPP = "https://wa.me/351967708397";

function Icon({ name }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
      );
    case "sell":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M14.5 9.2c-.6-.8-1.5-1.2-2.6-1.2-1.6 0-2.6.8-2.6 2 0 2.8 5.4 1.3 5.4 4.1 0 1.2-1.1 2-2.7 2-1.2 0-2.2-.5-2.8-1.3" />
        </svg>
      );
    case "buy":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      );
    case "faq":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2-2.4 3.6" />
          <path d="M12 17.2v.1" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.4L3.5 20.5 5 16.1A8.4 8.4 0 1 1 20.5 11.6Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function MobileTabBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Na home espera pelo fim do topo; nas outras páginas aparece logo ao descer
      const threshold = pathname === "/" ? window.innerHeight * 0.9 : 120;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const openSellerForm = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.dispatchEvent(new Event("open-investment-form"));
    }
  };

  const items = [
    { key: "home", label: "Início", href: "/", icon: "home", active: pathname === "/" },
    { key: "sell", label: "Vender", href: "/#formulario", icon: "sell", onClick: openSellerForm },
    { key: "buy", label: "Comprar", href: "/oportunidades", icon: "buy", active: pathname === "/oportunidades" },
    { key: "faq", label: "Perguntas", href: "/perguntas-frequentes", icon: "faq", active: pathname === "/perguntas-frequentes" },
    { key: "chat", label: "WhatsApp", href: WHATSAPP, icon: "chat", external: true },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Navegação rápida"
          className="fixed inset-x-0 bottom-0 z-[990] border-t border-white/10 bg-[#1C1719] pb-[env(safe-area-inset-bottom)] md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="grid grid-cols-5">
            {items.map((item) => {
              const content = (
                <span
                  className={`flex h-[60px] flex-col items-center justify-center gap-1 font-body text-[10px] uppercase tracking-[0.12em] transition-colors ${
                    item.active ? "text-gold" : "text-white/70 active:text-white"
                  }`}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </span>
              );
              return (
                <li key={item.key} className="relative">
                  {item.active && (
                    <span className="absolute inset-x-5 top-0 h-px bg-gold" aria-hidden="true" />
                  )}
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <Link href={item.href} onClick={item.onClick}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
