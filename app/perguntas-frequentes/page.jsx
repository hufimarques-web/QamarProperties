import { Navbar14 } from "@/components/shared/Navbar14";
import { FaqPage } from "@/components/mono/pages/FaqPage";
import { faqs } from "@/lib/faqs";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export const metadata = {
  title: "Perguntas frequentes sobre vender casa com valor líquido",
  description: "Como funciona a venda com valor líquido, o prazo de 60 dias, a remuneração na escritura e que casas aceitamos na Região de Aveiro.",
  alternates: { canonical: "/perguntas-frequentes" },
  openGraph: { title: "Perguntas frequentes sobre vender casa com valor líquido | Qamar Properties", description: "Como funciona a venda com valor líquido, o prazo de 60 dias, a remuneração na escritura e que casas aceitamos na Região de Aveiro.", url: "/perguntas-frequentes" },
};


export default function Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Navbar14 />
      <FaqPage />
    </div>
  );
}
