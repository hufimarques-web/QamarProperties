"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./Services.module.css";

const items = [
  {
    id: "vigiar",
    number: "1",
    label: "Vigiar",
    image: "/services/vigiar.png",
    body: "Monitorizamos cada portal de Aveiro em tempo real — Idealista, Imovirtual, Casa Sapo, Remax, ERA, Century 21, BPI Casa — mais a nossa rede privada off-market. Nenhum deal nos escapa. Nenhum dia te escapa.",
    modal: {
      heading: "Motor de Vigilância",
      points: [
        "Portais cobertos: Idealista · Imovirtual · Casa Sapo · Remax · ERA · Century 21 · BPI Casa.",
        "Rede off-market privada de proprietários e mediadores parceiros em Aveiro.",
        "Frequência de scan: a cada 15 minutos. Qualquer novo imóvel é imediatamente indexado e avaliado.",
        "Se corresponder ao teu perfil, recebes alerta instantâneo — antes de aparecer nas listas genéricas.",
      ],
    },
  },
  {
    id: "calcular",
    number: "2",
    label: "Calcular",
    image: "/services/calcular.png",
    body: "Cada novo imóvel é avaliado em segundos contra o teu critério: yield bruto e líquido, cash-on-cash, ARV, custos de renovação estimados. Sabes se o deal faz sentido antes de visitar.",
    modal: {
      heading: "Motor de Cálculo",
      points: [
        "Yield bruto e yield líquido calculados com base em rendas de mercado em Aveiro.",
        "Cash-on-cash return ajustado ao teu capital próprio e estrutura de financiamento.",
        "ARV (after repair value) estimado com base em comparáveis recentes na mesma zona.",
        "Custos de renovação estimados por m² com dados de empreiteiros locais.",
      ],
    },
  },
  {
    id: "filtrar",
    number: "3",
    label: "Filtrar",
    image: "/services/filtrar.png",
    body: "Só vês os deals que correspondem ao teu perfil de investimento. Sem ruído. Sem listas genéricas. Sem perder oportunidades enquanto dormes — o algoritmo trabalha 24/7 por ti.",
    modal: {
      heading: "Motor de Filtragem",
      points: [
        "O teu perfil define os filtros: tipo de imóvel, zona, yield mínima, preço máximo, estado.",
        "O algoritmo filtra centenas de imóveis por dia. Só os que passam todos os critérios chegam a ti.",
        "Zero ruído. Zero listas genéricas. Só oportunidades que fazem sentido para o teu modelo.",
        "24/7 — o algoritmo não dorme. Enquanto descansas, ele trabalha.",
      ],
    },
  },
];

// Mirrors the findrealestate scrub-reveal structure exactly:
// a positioned wrapper + an absolute overlay div that scaleX 1→0 as the element enters the viewport.
function ScrubLine({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.45"],
  });
  const clipPercent = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(clipPercent, (v) => `inset(0 ${v}% 0 0)`);

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "block", textAlign: "start", width: "fit-content" }}
    >
      <motion.div style={{ clipPath }}>
        {children}
      </motion.div>
    </div>
  );
}

function ArrowSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3.315 10.996h16.623l-.884.707-8.084-8.135h2.526l8.261 8.337-8.286 8.337h-2.526l8.11-8.135.883.708H3.315z"
      />
    </svg>
  );
}

function Modal({ item, onClose }) {
  return (
    <motion.div
      className={styles.modal_overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className={styles.modal_backdrop} />
      <motion.div
        className={styles.modal_panel}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modal_close} onClick={onClose}>
          Fechar ×
        </button>
        <p className={styles.modal_label}>
          {item.number} — {item.label}
        </p>
        <h3 className={styles.modal_heading}>{item.modal.heading}</h3>
        <div className={styles.modal_divider} />
        <ul className={styles.modal_list}>
          {item.modal.points.map((point, i) => (
            <li key={i} className={styles.modal_list_item}>
              <span className={styles.modal_bullet} />
              <p>{point}</p>
            </li>
          ))}
        </ul>
        <a
          href="#formulario"
          className={styles.modal_cta}
          onClick={(e) => {
            e.preventDefault();
            onClose();
            const el = document.getElementById("formulario");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => window.dispatchEvent(new Event("open-investment-form")), 600);
          }}
        >
          Calibrar o meu algoritmo →
        </a>
      </motion.div>
    </motion.div>
  );
}

export function Layout16() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <section className={styles.services_root}>

        {/* ── Header row ── */}
        <div className={styles.container}>
          <div className={styles.services_hgrid}>
            <div className={styles.services_hgrid_col}>
              <div className={styles.services_caption}>O Algoritmo</div>
            </div>
            <div className={styles.services_hgrid_col}>
              <div className={styles.services_title}>
                <h2>
                  <div aria-label="Como o FLIX trabalha por ti.">
                    <ScrubLine>Como o FLIX</ScrubLine>
                    <ScrubLine>
                      <span className={styles.em}>trabalha por ti.</span>
                    </ScrubLine>
                  </div>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* ── Three full-bleed item buttons ── */}
        <div className={styles.services_items}>
          {items.map((item) => (
            <button
              key={item.id}
              className={styles.services_item}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={activeModal?.id === item.id}
              aria-controls={`modal-${item.id}`}
              data-state={activeModal?.id === item.id ? "open" : "closed"}
              onClick={() => setActiveModal(item)}
            >
              <div className={styles.item_container}>
                <div className={styles.services_item_bg}>
                  <img
                    alt=""
                    loading="lazy"
                    src={item.image}
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      color: "transparent",
                    }}
                    onError={(e) => {
                      e.target.src = "/images/hero-bg.jpg";
                    }}
                  />
                </div>
                <div className={styles.services_item_num}>{item.number}</div>
                <div className={styles.services_item_text}>
                  <h3>{item.body}</h3>
                </div>
                <div className={styles.services_item_word}>{item.label}</div>
                <div className={styles.services_item_more}>
                  <ArrowSvg />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ── Brief paragraph + CTA ── */}

      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {activeModal && (
          <Modal
            key={activeModal.id}
            item={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
