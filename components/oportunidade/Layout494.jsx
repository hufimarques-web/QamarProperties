"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import clsx from "clsx";

const tabs = [
  {
    heading: "Comprovada",
    description: "Confirmada com documento: caderneta, certidão, licença, atas do condomínio.",
    image: { src: "/opt/sala-ria.jpg", alt: "Documentação da casa" },
  },
  {
    heading: "Declarada",
    description: "Dita pelo dono, ainda sem documento que a confirme.",
    image: { src: "/opt/sala-render.jpg", alt: "Visita à casa" },
  },
  {
    heading: "Estimada",
    description: "Calculada por nós ou pelos parceiros, como o orçamento de obra ou os cenários de crédito.",
    image: { src: "/opt/valorizar.jpg", alt: "Render e orçamento de obra" },
  },
  {
    heading: "Desconhecida",
    description: "Ainda não sabemos. Fica escrito, para não ser surpresa.",
    image: { src: "/opt/obra-janela.jpg", alt: "Casa por inspecionar" },
  },
];

export function Layout494() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="relative flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-6 lg:pr-10">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex size-full items-center justify-center"
              >
                <img
                  src={tabs[activeTab].image.src}
                  alt={tabs[activeTab].image.alt}
                  className="mb-6 size-full object-cover md:mb-0"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-full md:w-1/2 md:pl-6 lg:pl-10">
            <p className="mb-3 font-semibold md:mb-4">Cada informação, com o seu estado</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Sabe sempre em que se baseia
            </h2>
            <div className="mt-8 flex flex-col">
              {tabs.map((tab, index) => (
                <div
                  key={tab.heading}
                  onClick={() => setActiveTab(index)}
                  className={clsx("cursor-pointer border-b border-border-primary py-4", {
                    "opacity-100": activeTab === index,
                    "opacity-25": activeTab !== index,
                  })}
                >
                  <h3 className="text-xl font-bold md:text-2xl">{tab.heading}</h3>
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeTab === index ? "auto" : 0,
                      opacity: activeTab === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2">{tab.description}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
