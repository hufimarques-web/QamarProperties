import { Navbar14 } from "@/components/shared/Navbar14";
import { IntroHero } from "@/components/IntroHero";
import { InvestmentForm } from "@/components/inicio/InvestmentForm";
import { MonoHome, MonoMobileHome } from "@/components/mono/MonoHome";

// A página segue o template MONO (v0) no computador e no telemóvel: ver components/mono.
// No telemóvel, as secções entram em cascata (Emaar): cada uma fica presa ao ecrã
// e a seguinte sobe por cima.
export default function Page() {
  return (
    <div>
      <Navbar14 />
      <IntroHero />
      {/* Telemóvel: o mesmo design do computador, com as secções em cascata */}
      <MonoMobileHome />
      {/* Formulário: só o modal (abre a partir dos botões, no telemóvel e no computador) */}
      <InvestmentForm sectionClassName="hidden" />
      {/* Computador */}
      <MonoHome />
    </div>
  );
}
