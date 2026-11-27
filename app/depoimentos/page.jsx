import { Navbar14 } from "@/components/shared/Navbar14";
import { TransparencyPage } from "@/components/mono/pages/TransparencyPage";

export const metadata = {
  title: "Transparência: motivos para não comprar",
  description: "Em cada casa escrevemos os motivos para não comprar: financeiros, legais, técnicos e do condomínio. Comprar e vender casa em Aveiro com tudo por escrito.",
  alternates: { canonical: "/depoimentos" },
  openGraph: { title: "Transparência: motivos para não comprar | Qamar Properties", description: "Em cada casa escrevemos os motivos para não comprar: financeiros, legais, técnicos e do condomínio. Comprar e vender casa em Aveiro com tudo por escrito.", url: "/depoimentos" },
};


export default function Page() {
  return (
    <div>
      <Navbar14 />
      <TransparencyPage />
    </div>
  );
}
