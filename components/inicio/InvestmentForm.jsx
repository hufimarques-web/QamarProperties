"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { NetSimulator, bracketFor, eur } from "./NetSimulator";

// Formulário de venda / compra ao estilo do "Get in touch" da Emaar:
// cartão claro, título serifado, legendas pequenas em maiúsculas,
// campos retangulares finos e um botão escuro a toda a largura.
// Telemóvel: ocupa o ecrã todo, com scroll e área segura do iPhone.

const SERIF = "'Cormorant Garamond', Georgia, serif";
const INK = "#1C1719";

// legendas curtas para cada pergunta
const LABELS = {
  tipo: "Tipo de imóvel",
  situacao: "Situação da venda",
  zona: "Zona",
  licenca: "Licença de habitação",
  valor: "Quanto quer receber",
  orcamento: "Orçamento",
  capital: "Capital próprio",
  credito: "Simulação de crédito",
};

const VARIANTS = {
  vendedor: {
    sectionId: "formulario",
    ctaTitle: <>Quanto recebe <br/> na <span className="italic">carteira?</span></>,
    ctaText: "Diga-nos onde fica a casa. Mostramos-lhe o estudo de mercado antes de nos dizer o valor que quer receber.",
    ctaButton: "Pedir estudo de mercado",
    eyebrow: "Para quem vende",
    modalTitle: "Peça o estudo de mercado",
    modalText: "Diga-nos como o contactar. Mostramos-lhe o valor a que casas como a sua se vendem de facto, antes de nos dizer o seu valor.",
    panelTitle: <>Venda com <br/> <span className="italic" style={{ color: "#4C3D4ACC" }}>valor líquido</span></>,
    bullets: [
      "Estudo de mercado com vendas reais, não com anúncios.",
      "Venda em 60 dias. Se não vendermos, saímos e fica com as fotos e os renders.",
      "Sem comissão a somar: só ganhamos com o que vendermos acima do seu valor.",
    ],
    note: "Exemplo: pede 200.000 €. Na escritura recebe 200.000 €. Se vendermos por esse valor, ganhamos zero. Se vendermos acima, a diferença é a nossa remuneração.",
    noteLabel: "Como funciona",
    noteSub: "Fórmula A · Valor líquido",
    steps: [
      {
        id: "tipo",
        question: "Que imóvel quer vender?",
        options: ["Apartamento", "Moradia", "Outro"],
      },
      {
        id: "situacao",
        question: "Em que situação está a venda?",
        options: ["À venda há mais de 90 dias", "Herança ou partilha", "Divórcio ou separação", "Contrato com agência a terminar", "Ainda não está à venda"],
      },
      {
        id: "zona",
        question: "Onde fica o imóvel?",
        options: ["Aveiro (centro)", "Esgueira / Aradas / Glória e Vera Cruz", "Ílhavo / Gafanhas", "Outro concelho da Região de Aveiro"],
      },
      {
        id: "licenca",
        question: "O imóvel tem licença de habitação?",
        subtext: "Trabalhamos casas com licença de habitação até 400.000 €.",
        options: ["Sim", "Não", "Não sei"],
      },
      {
        id: "valor",
        question: "Quanto gostaria de receber, mais ou menos?",
        subtext: "Não precisa de ter certeza. O estudo de mercado ajuda a decidir.",
        options: ["Até 150.000 €", "150.000 € a 250.000 €", "250.000 € a 400.000 €", "Ainda não sei"],
      },
      {
        id: "contact",
        question: "Para onde enviamos o estudo de mercado?",
        subtext: "Ligamos-lhe para combinar uma visita à casa.",
        isFinal: true,
      },
    ],
    submitLabel: "Pedir estudo de mercado",
    successTitle: <>Pedido <br/> recebido.</>,
    successText: "Vamos preparar o estudo de mercado da sua casa e ligamos-lhe para combinar a visita.",
  },
  comprador: {
    sectionId: "formulario-comprador",
    ctaTitle: <>Entre na base <br/> de <span className="italic">compradores</span></>,
    ctaText: "As casas chegam primeiro a quem já tem o crédito simulado. Diga-nos o que procura e ajudamos com a simulação.",
    ctaButton: "Simular crédito",
    eyebrow: "Para quem compra",
    modalTitle: "Entre na base de compradores",
    modalText: "Ajudamos com a simulação de crédito e enviamos-lhe as casas compatíveis antes de chegarem aos portais.",
    panelTitle: <>A casa <br/> <span className="italic" style={{ color: "#4C3D4ACC" }}>como a quer</span></>,
    bullets: [
      "Vê as casas antes de chegarem aos portais.",
      "Renders à escala, orçamento de obra, cenários de crédito e relatório técnico.",
      "Motivos para não comprar, por escrito, em cada casa.",
    ],
    note: "Sem simulação de crédito, não marcamos visita. Assim não se apaixona por uma casa que o banco não financia.",
    noteLabel: "Regra da casa",
    noteSub: "Simulação primeiro",
    steps: [
      {
        id: "tipo",
        question: "Que tipo de casa procura?",
        options: ["Apartamento", "Moradia", "Indiferente"],
      },
      {
        id: "zona",
        question: "Em que zona?",
        options: ["Aveiro (centro)", "Esgueira / Aradas / Glória e Vera Cruz", "Ílhavo / Gafanhas", "Qualquer zona da Região de Aveiro"],
      },
      {
        id: "orcamento",
        question: "Qual o seu orçamento?",
        options: ["Até 150.000 €", "150.000 € a 250.000 €", "250.000 € a 400.000 €"],
      },
      {
        id: "capital",
        question: "Quanto tem de capital próprio?",
        subtext: "O banco financia no máximo 90% do menor valor entre o preço e a avaliação.",
        options: ["Menos de 10% do preço", "10% a 20% do preço", "Mais de 20% do preço", "Compro sem crédito"],
      },
      {
        id: "credito",
        question: "Já tem simulação de crédito?",
        options: ["Sim, com aprovação", "Fiz uma simulação", "Ainda não, quero ajuda"],
      },
      {
        id: "contact",
        question: "Como falamos consigo?",
        subtext: "Enviamos-lhe as casas compatíveis antes de irem para os portais.",
        isFinal: true,
      },
    ],
    submitLabel: "Entrar na base",
    successTitle: <>Bem-vindo <br/> à base.</>,
    successText: "Vamos ajudar com a simulação de crédito e enviamos-lhe as casas compatíveis.",
  },
};


const fieldCls =
  "h-14 w-full rounded-none border border-[#CFC8BF] bg-white px-4 font-body text-base text-[#1C1719] outline-none transition-colors placeholder:text-[#9A9089] focus:border-[#1C1719] focus:ring-1 focus:ring-[#1C1719]";
const labelCls = "mb-2 block font-body text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B6157]";

function Select({ id, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldCls} appearance-none pr-10 ${value ? "" : "text-[#9A9089]"}`}
      >
        <option value="">Escolher</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-[#1C1719]">
            {o}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6157]"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export function InvestmentForm({ variant = "vendedor", sectionClassName = "", sectionId }) {
  const cfg = VARIANTS[variant] || VARIANTS.vendedor;
  // perguntas curtas primeiro (aos pares), as de muitas opções no fim, a toda a largura
  const questions = cfg.steps
    .filter((st) => !st.isFinal)
    .sort((a, b) => (a.options.length > 4) - (b.options.length > 4));
  const contactStep = cfg.steps.find((st) => st.isFinal);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [view, setView] = useState("form"); // "form" | "sim"
  const scrollRef = useRef(null);
  const isSeller = variant === "vendedor";

  useEffect(() => setMounted(true), []);

  const goTo = (v) => {
    setView(v);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  const openWith = (v = "form") => {
    setDone(false);
    setView(isSeller ? v : "form");
    setOpen(true);
  };
  const onSimContinue = (res) => {
    setData((d) => ({
      ...d,
      simulacao: res,
      valor: d.valor && d.valor !== "Ainda não sei" ? d.valor : bracketFor(res.liquido),
    }));
    goTo("form");
  };

  // abre a partir de qualquer botão do site (com ou sem respostas já escolhidas)
  useEffect(() => {
    const handler = (e) => {
      const { view: wanted, ...detail } = e.detail && typeof e.detail === "object" ? e.detail : {};
      setData((d) => ({ ...d, ...detail }));
      openWith(wanted === "sim" ? "sim" : "form");
    };
    window.addEventListener(variant === "vendedor" ? "open-investment-form" : "open-buyer-form", handler);
    return () =>
      window.removeEventListener(variant === "vendedor" ? "open-investment-form" : "open-buyer-form", handler);
  }, [variant]);

  // comprador: /oportunidades?tipo=…&zona=…&orcamento=… abre já preenchido
  useEffect(() => {
    if (variant !== "comprador") return;
    const params = new URLSearchParams(window.location.search);
    const pre = {};
    questions.forEach((q) => {
      const v = params.get(q.id);
      if (v && q.options?.includes(v)) pre[q.id] = v;
    });
    if (Object.keys(pre).length) {
      setData((d) => ({ ...d, ...pre }));
      setOpen(true);
    }
  }, [variant]); // eslint-disable-line react-hooks/exhaustive-deps

  // bloquear o scroll da página e fechar com Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const set = (k) => (v) => setData((d) => ({ ...d, [k]: v }));

  // TODO: ligar a um destino real (email / CRM). Por agora só simula o envio.
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1200);
  };

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="form-modal"
          className="fixed inset-0 z-[1100] flex items-center justify-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${cfg.sectionId}-title`}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <motion.div
            ref={scrollRef}
            className={`relative h-full w-full overflow-y-auto bg-[#FAF8F4] md:h-auto md:max-h-[92vh] ${
              view === "sim" && !done ? "md:max-w-[1040px]" : "md:max-w-[620px]"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {view === "sim" && !done ? (
              <div className="relative px-6 pt-[max(1.5rem,env(safe-area-inset-top))] md:px-14 md:py-14">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="absolute right-5 top-[max(1.25rem,env(safe-area-inset-top))] flex size-12 items-center justify-center rounded-full border border-[#CFC8BF] text-[#1C1719] transition-colors hover:border-[#1C1719] md:right-10 md:top-10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
                <NetSimulator
                  idPrefix={`${cfg.sectionId}-sim`}
                  initial={data.simulacao ? { ...data.simulacao } : undefined}
                  onContinue={onSimContinue}
                  onSkip={() => goTo("form")}
                />
                <div className="h-6 md:hidden" />
              </div>
            ) : (
            <div className="px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] md:px-14 md:py-14">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2
                    id={`${cfg.sectionId}-title`}
                    className="font-light leading-[1.05] text-[#1C1719]"
                    style={{ fontFamily: SERIF, fontSize: "clamp(2.2rem, 5vw, 3rem)" }}
                  >
                    {done ? "Pedido recebido." : cfg.modalTitle}
                  </h2>
                  <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed text-[#4A423C]">
                    {done ? cfg.successText : cfg.modalText}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#CFC8BF] text-[#1C1719] transition-colors hover:border-[#1C1719]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>

              {done ? (
                <button type="button" onClick={() => setOpen(false)} className="btn-lux btn-lux--solid-dark mt-10 w-full">
                  Voltar ao site
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="mt-9 space-y-6">
                  {/* Simulação opcional (só para quem vende) */}
                  {isSeller &&
                    (data.simulacao ? (
                      <div className="flex items-center justify-between gap-4 border border-[#CFC8BF] bg-white px-5 py-4">
                        <div>
                          <p className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B6157]">A sua simulação</p>
                          <p className="mt-1 font-body text-[14px] leading-snug text-[#1C1719]">
                            Anúncio de {eur(data.simulacao.preco)}: sobram cerca de{" "}
                            <span className="font-medium">{eur(data.simulacao.liquido)}</span> em {data.simulacao.meses} meses.
                          </p>
                        </div>
                        <button type="button" onClick={() => goTo("sim")} className="shrink-0 font-body text-[13px] text-[#1C1719] underline underline-offset-4">
                          Editar
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => goTo("sim")}
                        className="group flex w-full items-center justify-between gap-4 border border-[#CFC8BF] bg-white px-5 py-4 text-left transition-colors hover:border-[#1C1719]"
                      >
                        <span>
                          <span className="block font-body text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B6157]">Simulação opcional</span>
                          <span className="mt-1 block font-body text-[15px] text-[#1C1719]">Quanto lhe fica no bolso numa venda tradicional?</span>
                        </span>
                        <span className="shrink-0 font-body text-[12px] uppercase tracking-[0.2em] text-[#1C1719] transition-transform group-hover:translate-x-1">
                          Fazer as contas →
                        </span>
                      </button>
                    ))}

                  {/* Sobre a casa */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {questions.map((q) => (
                      <div key={q.id} className={q.options.length > 4 ? "sm:col-span-2" : ""}>
                        <label htmlFor={`${cfg.sectionId}-${q.id}`} className={labelCls}>
                          {LABELS[q.id] || q.question}
                        </label>
                        <Select id={`${cfg.sectionId}-${q.id}`} value={data[q.id]} onChange={set(q.id)} options={q.options} />
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-[#E4DED6]" />

                  {/* Contacto */}
                  <div>
                    <label htmlFor={`${cfg.sectionId}-name`} className={labelCls}>
                      Nome completo
                    </label>
                    <input
                      id={`${cfg.sectionId}-name`}
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="O seu nome"
                      className={fieldCls}
                      value={data.name || ""}
                      onChange={(e) => set("name")(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${cfg.sectionId}-email`} className={labelCls}>
                      Email
                    </label>
                    <input
                      id={`${cfg.sectionId}-email`}
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="nome@exemplo.pt"
                      className={fieldCls}
                      value={data.email || ""}
                      onChange={(e) => set("email")(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${cfg.sectionId}-tel`} className={labelCls}>
                      Telemóvel
                    </label>
                    <div className="flex gap-3">
                      <span className="flex h-14 shrink-0 items-center gap-2 border border-[#CFC8BF] bg-white px-4 font-body text-base text-[#1C1719]">
                        <span aria-hidden="true">🇵🇹</span> +351
                      </span>
                      <input
                        id={`${cfg.sectionId}-tel`}
                        required
                        type="tel"
                        name="tel"
                        autoComplete="tel-national"
                        inputMode="tel"
                        placeholder="912 345 678"
                        className={fieldCls}
                        value={data.phone || ""}
                        onChange={(e) => set("phone")(e.target.value)}
                      />
                    </div>
                  </div>

                  <p className="font-body text-[13px] leading-relaxed text-[#6B6157]">
                    {contactStep?.subtext ? `${contactStep.subtext} ` : ""}Ao enviar, aceita a nossa{" "}
                    <a href="#" className="underline underline-offset-2">
                      política de privacidade
                    </a>
                    .
                  </p>

                  <button type="submit" disabled={submitting} className="btn-lux btn-lux--solid-dark btn-lux--no-arrow w-full min-h-[60px]">
                    {submitting ? "A enviar…" : cfg.submitLabel}
                  </button>
                </form>
              )}
            </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section
      id={sectionId || cfg.sectionId}
      className={`relative flex min-h-[80svh] flex-col items-center justify-center bg-[#EDE8E1] px-6 py-24 text-center md:min-h-screen ${sectionClassName}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex max-w-3xl flex-col items-center"
      >
        <p className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-[#6B6157]">{cfg.eyebrow}</p>
        <h2
          className="mt-6 font-light leading-[0.98] tracking-tight text-[#1C1719]"
          style={{ fontFamily: SERIF, fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
        >
          {cfg.ctaTitle}
        </h2>
        <p className="mt-6 max-w-xl font-body text-[16px] font-light leading-relaxed text-[#4A423C] md:text-lg">
          {cfg.ctaText}
        </p>
        <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <button type="button" onClick={() => openWith("form")} className="btn-lux btn-lux--solid-dark btn-lux--block-mobile">
            {cfg.ctaButton}
          </button>
          {isSeller && (
            <button type="button" onClick={() => openWith("sim")} className="btn-lux btn-lux--ghost-dark btn-lux--block-mobile">
              Fazer as contas
            </button>
          )}
        </div>
      </motion.div>

      {mounted && createPortal(modal, document.body)}
    </section>
  );
}
