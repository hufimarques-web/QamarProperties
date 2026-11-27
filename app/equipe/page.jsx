import { Navbar14 } from "@/components/shared/Navbar14";
import { TeamPage } from "@/components/mono/pages/TeamPage";

export const metadata = {
  title: "Equipa e contacto",
  description: "Fale com a Qamar Properties: venda e compra de casas na Região de Aveiro. Telefone, WhatsApp e parceiros (obras, crédito, advogado e engenheiro).",
  alternates: { canonical: "/equipe" },
  openGraph: { title: "Equipa e contacto | Qamar Properties", description: "Fale com a Qamar Properties: venda e compra de casas na Região de Aveiro. Telefone, WhatsApp e parceiros (obras, crédito, advogado e engenheiro).", url: "/equipe" },
};


export default function Page() {
  return (
    <div>
      <Navbar14 />
      <TeamPage />
    </div>
  );
}
