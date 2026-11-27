"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Botão de WhatsApp sempre à vista, no canto inferior direito.
// No telemóvel fica por cima da barra de baixo e sai da frente nas secções de ecrã
// inteiro (túnel, imagem que cresce, frase final, rodapé), como a barra do computador.
// Esconde-se quando um formulário ou o menu estão abertos.
const NUMBER = "351967708397";
const MESSAGE = "Olá! Vim pelo site da Qamar Properties.";
export const WHATSAPP_URL = `https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

export function WhatsAppButton() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [covered, setCovered] = useState(false); // telemóvel: secção de ecrã inteiro à vista
  const [locked, setLocked] = useState(false); // formulário ou menu aberto
  useEffect(() => {
    // entra pouco depois de a página abrir, para não competir com o topo
    const t = setTimeout(() => setReady(true), 1200);

    // telemóvel: vê o que está mesmo por baixo do botão (na cascata, as secções
    // anteriores continuam presas por baixo, por isso só conta a de cima)
    const mobile = window.matchMedia("(max-width: 767px)");
    let raf = 0;
    const check = () => {
      raf = 0;
      if (!mobile.matches) return setCovered(false);
      const x = window.innerWidth - 42;
      const y = window.innerHeight - 110;
      const under = document
        .elementsFromPoint(x, y)
        .find((el) => !el.closest("[data-wa-button]") && getComputedStyle(el).position !== "fixed" && !el.closest("nav, header"));
      setCovered(!!(under && under.closest("[data-hide-cta]")));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t2 = setTimeout(check, 1300);

    const checkLock = () => setLocked(document.body.style.overflow === "hidden");
    const mo = new MutationObserver(checkLock);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    checkLock();

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, [pathname]); // cada página tem as suas secções
  const show = ready && !covered && !locked;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar connosco por WhatsApp"
      data-wa-button
      className={`group fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-[950] flex items-center gap-3 md:bottom-6 md:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      } transition-all duration-500 ease-out`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <span className="pointer-events-none hidden max-w-0 md:inline-block overflow-hidden whitespace-nowrap bg-white text-[13px] font-medium text-[#0A0A0A] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:max-w-[220px] group-hover:px-4 group-hover:py-2.5 group-hover:opacity-100">
        Falar por WhatsApp
      </span>
      <span className="flex size-[52px] items-center md:size-14 justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16.004 3C8.82 3 3 8.82 3 16.002c0 2.29.6 4.528 1.74 6.5L3 29l6.68-1.75a12.95 12.95 0 0 0 6.32 1.62h.004C23.184 28.87 29 23.05 29 15.996 29 12.53 27.65 9.27 25.2 6.82A12.92 12.92 0 0 0 16.004 3Zm0 23.68h-.004a10.77 10.77 0 0 1-5.49-1.5l-.394-.234-3.964 1.04 1.058-3.866-.257-.397a10.7 10.7 0 0 1-1.643-5.72c0-5.92 4.818-10.738 10.744-10.738 2.87 0 5.566 1.12 7.594 3.15a10.66 10.66 0 0 1 3.144 7.594c-.002 5.922-4.82 10.67-10.788 10.67Zm5.89-8.034c-.322-.162-1.91-.942-2.206-1.05-.296-.108-.512-.162-.727.162-.215.322-.834 1.05-1.022 1.266-.188.215-.377.242-.7.08-.322-.16-1.36-.5-2.59-1.597-.957-.854-1.603-1.908-1.79-2.23-.188-.323-.02-.497.14-.658.146-.145.323-.377.485-.565.161-.188.215-.323.322-.538.108-.215.054-.404-.027-.565-.08-.162-.727-1.752-.996-2.4-.262-.63-.529-.545-.727-.555l-.62-.011a1.19 1.19 0 0 0-.861.404c-.296.323-1.13 1.104-1.13 2.693 0 1.59 1.157 3.125 1.318 3.34.162.216 2.277 3.476 5.516 4.874.771.333 1.373.531 1.842.68.774.246 1.478.211 2.035.128.62-.093 1.91-.781 2.18-1.535.269-.754.269-1.4.188-1.535-.08-.135-.296-.216-.619-.377Z" />
        </svg>
      </span>
    </a>
  );
}
