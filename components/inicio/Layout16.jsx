"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./Services.module.css";

const items = [
  {
    id: "estudar",
    number: "1",
    label: "Estudar",
    image: "/opt/estudar.jpg",
    body: "Antes de nos dizer o seu valor, mostramos-lhe o estudo de mercado: vendas reais na sua zona, preços anunciados e quanto lhe ficaria com uma imobiliária comum. Decide com números à frente.",
    modal: {
      heading: "Estudo de mercado",
      points: [
        "Valor de transação: o preço a que casas comparáveis se venderam de facto, não o preço a que se anunciam.",
        "Valor anunciado: o que está hoje nos portais. No início de 2026, a oferta anunciada andava cerca de 45% acima das vendas reais.",
        "A conta de uma imobiliária comum: preço, menos 5% de comissão, menos IVA, sem prazo.",
        "Não é uma avaliação: é informação de mercado para decidir, com calma, quanto quer receber.",
      ],
    },
  },
  {
    id: "valorizar",
    number: "2",
    label: "Valorizar",
    image: "/opt/valorizar.jpg",
    body: "O comprador não vê só a casa como está. Vê a casa como a quer: fotografia profissional, renders à escala, orçamento de obra e relatório técnico. É assim que se vende rápido.",
    modal: {
      heading: "A casa como o comprador a quer",
      points: [
        "Fotografia profissional e pack de renders 3D à escala, sempre identificados como simulação, ao lado das fotos reais.",
        "Relatório técnico da Freitas Renovações (empresa do grupo, dito claramente) e engenheiro externo para estrutura e humidades.",
        "Orçamento de obra ligado ao render, com âmbito, exclusões e prazo.",
        "Pequenas melhorias, como pintura e limpeza, só as propomos quando devolvem pelo menos 4 vezes o que custam.",
      ],
    },
  },
  {
    id: "vender",
    number: "3",
    label: "Vender",
    image: "/opt/vender.jpg",
    body: "A sua casa vai primeiro para a nossa base de compradores com crédito já simulado, e só depois para os portais. Com 5 ou mais interessados, abrimos uma janela de propostas com data limite.",
    modal: {
      heading: "Venda em 60 dias",
      points: [
        "Base de compradores qualificados: sem simulação de crédito, não há visita.",
        "Com 5 ou mais interessados, janela de propostas com data e validade registadas. Sem concorrência inventada.",
        "Nunca abaixo do seu valor líquido. CPCV com sinal de 5 a 10% e condição de crédito aprovado.",
        "Se não vendermos em 60 dias, saímos e fica com as fotos e os renders.",
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
          Quanto recebo na carteira? →
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
              <div className={styles.services_caption}>O Modelo</div>
            </div>
            <div className={styles.services_hgrid_col}>
              <div className={styles.services_title}>
                <h2>
                  <div aria-label="Como vendemos em 60 dias.">
                    <ScrubLine>Como vendemos</ScrubLine>
                    <ScrubLine>
                      <span className={styles.em}>em 60 dias.</span>
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
