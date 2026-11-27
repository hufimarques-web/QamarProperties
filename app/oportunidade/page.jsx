import { Navbar14 } from "@/components/shared/Navbar14";
import { DossierPage } from "@/components/mono/pages/DossierPage";

export const metadata = {
  title: "O dossier da casa",
  description: "O que recebe antes de comprar casa em Aveiro: renders à escala, orçamento de obra, cenários de crédito, relatório técnico e motivos para não comprar.",
  alternates: { canonical: "/oportunidade" },
  openGraph: { title: "O dossier da casa | Qamar Properties", description: "O que recebe antes de comprar casa em Aveiro: renders à escala, orçamento de obra, cenários de crédito, relatório técnico e motivos para não comprar.", url: "/oportunidade" },
};


export default function Page() {
  return (
    <div>
      <Navbar14 />
      <DossierPage />
    </div>
  );
}
