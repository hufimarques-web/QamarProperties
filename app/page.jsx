import { Navbar14 } from "@/components/shared/Navbar14";
import { HeroScroll } from "@/components/HeroScroll";
import { Manifesto } from "@/components/inicio/Manifesto";
import { Layout16 } from "@/components/inicio/Layout16";
import { Layout394 } from "@/components/inicio/Layout394";
import { InvestmentForm } from "@/components/inicio/InvestmentForm";
import { Faq5 } from "@/components/inicio/Faq5";
import { Footer3 } from "@/components/shared/Footer3";

export default function Page() {
  return (
    <div>
      <Navbar14 />
      <HeroScroll />
      <Manifesto />
      <Layout16 />
      <Layout394 />
      <InvestmentForm />
      <Faq5 />
      <Footer3 />
    </div>
  );
}
