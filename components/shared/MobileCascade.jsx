"use client";

import React, { useEffect, useRef, useState } from "react";

// Efeito "cascata" da Emaar, só no telemóvel:
// cada secção fica presa ao ecrã e a seguinte desliza por cima dela,
// enquanto a de baixo escurece. Secções mais altas do que o ecrã ficam
// presas pelo fundo (top negativo), para se poderem ler até ao fim.
//
// Nota: não usamos transform/filter nas secções presas, porque isso
// partiria os elementos "fixed" lá dentro (ex.: o formulário em ecrã inteiro).

const MOBILE_QUERY = "(max-width: 767px)";

export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function CascadeItem({ children, index, isLast, className = "", overlapPrevious = false }) {
  const ref = useRef(null);
  const shadeRef = useRef(null);
  const mobile = useIsMobile();
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!mobile) return;
    const el = ref.current;
    if (!el) return;

    const measure = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // escurece à medida que a secção seguinte sobe por cima
        let next = el.nextElementSibling;
        while (next && next.offsetHeight === 0) next = next.nextElementSibling;
        if (!next || !shadeRef.current) return;
        const t = next.getBoundingClientRect().top;
        const p = Math.max(0, Math.min(1, 1 - t / window.innerHeight));
        shadeRef.current.style.opacity = String(p * 0.6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mobile]);

  const style = mobile
    ? {
        position: isLast ? "relative" : "sticky",
        // a última secção não fica presa: sem deslocamento (senão sobe e deixa um buraco no fim)
        top: isLast ? 0 : top,
        zIndex: index + 2,
        ...(overlapPrevious ? { marginTop: "-100svh" } : {}),
      }
    : undefined;

  return (
    <div ref={ref} className={`relative ${className}`} style={style}>
      {children}
      {mobile && !isLast && (
        <div
          ref={shadeRef}
          className="pointer-events-none absolute inset-0 z-[5] bg-black"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * <MobileCascade overlapFirst>{secções}</MobileCascade>
 * - overlapFirst: a primeira secção sobe por cima do que está antes (ex.: o topo do site).
 * - Cada filho pode trazer `data-cascade-bg` com uma classe de fundo opaco.
 */
export function MobileCascade({ children, overlapFirst = false }) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <div className="relative">
      {items.map((child, i) => (
        <CascadeItem
          key={child.key ?? i}
          index={i}
          isLast={i === items.length - 1}
          overlapPrevious={overlapFirst && i === 0}
          className={child.props?.["data-cascade-bg"] ?? ""}
        >
          {child}
        </CascadeItem>
      ))}
    </div>
  );
}
