"use client";

import { useEffect } from "react";

// Scroll suave da roda do rato (como os sites premiados): em vez de a página saltar
// ~100 px por cada "clique" da roda, desliza até lá. Assim as animações presas ao
// scroll mexem-se de forma contínua em vez de aos solavancos.
// Só no computador com rato; no telemóvel e no tablet fica o scroll nativo.
// Respeita "reduzir movimento", o zoom (Ctrl + roda), os modais abertos e
// as zonas com scroll próprio (ex.: o formulário).

const EASE_PER_FRAME = 0.11; // fração do caminho percorrida em cada frame (~60 fps)

function canScroll(el, dy) {
  while (el instanceof Element && el !== document.body && el !== document.documentElement) {
    const style = getComputedStyle(el);
    const oy = style.overflowY;
    if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1) {
      if (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
      if (dy < 0 && el.scrollTop > 0) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let last = 0;
    let animating = false;

    const max = () => document.documentElement.scrollHeight - window.innerHeight;

    const frame = (now) => {
      const dt = last ? Math.min(64, now - last) : 16.7;
      last = now;
      const k = 1 - Math.pow(1 - EASE_PER_FRAME, dt / 16.7);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo({ top: current, behavior: "instant" });
      if (current !== target) {
        raf = requestAnimationFrame(frame);
      } else {
        animating = false;
        last = 0;
      }
    };

    const onWheel = (e) => {
      if (e.ctrlKey || e.defaultPrevented) return; // zoom do browser
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // scroll horizontal
      if (document.body.style.overflow === "hidden") return; // modal aberto
      if (canScroll(e.target, e.deltaY)) return; // zona com scroll próprio
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      if (!animating) current = window.scrollY;
      target = Math.max(0, Math.min(max(), (animating ? target : window.scrollY) + e.deltaY * unit));
      if (!animating) {
        animating = true;
        raf = requestAnimationFrame(frame);
      }
    };

    // teclado, barra de scroll, links com âncora: acompanha o scroll nativo
    const onScroll = () => {
      if (!animating) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };
    // um clique ou tecla interrompe a animação (ex.: link âncora a meio)
    const stop = () => {
      if (!animating) return;
      cancelAnimationFrame(raf);
      animating = false;
      last = 0;
      target = current = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
    };
  }, []);
  return null;
}
