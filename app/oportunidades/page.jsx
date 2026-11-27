import { Navbar14 } from "@/components/shared/Navbar14";
import { BuyPage } from "@/components/mono/pages/BuyPage";

export const metadata = {
  title: "Comprar casa em Aveiro antes dos portais",
  description: "Entre na base de compradores da Qamar Properties: casas na Região de Aveiro com renders, orçamento de obra, cenários de crédito e relatório técnico antes de chegarem aos portais.",
  alternates: { canonical: "/oportunidades" },
  openGraph: { title: "Comprar casa em Aveiro antes dos portais | Qamar Properties", description: "Entre na base de compradores da Qamar Properties: casas na Região de Aveiro com renders, orçamento de obra, cenários de crédito e relatório técnico antes de chegarem aos portais.", url: "/oportunidades" },
};


export default function Page() {
  return (
    <div>
      <Navbar14 />
      <BuyPage />
    </div>
  );
}
