import Hero from "@/components/sections/Hero";
import BenefitsStrip from "@/components/sections/BenefitsStrip";
import About from "@/components/sections/About";
import Catalogo from "@/components/sections/Catalogo";
import ComoFunciona from "@/components/sections/ComoFunciona";
import Depoimentos from "@/components/sections/Depoimentos";
import Faq from "@/components/sections/Faq";
import CtaFinal from "@/components/sections/CtaFinal";
import Footer from "@/components/sections/Footer";
import WhatsFloatingButton from "@/components/common/WhatsFloatingButton";

export default function Page() {
  return (
    <>
      <Hero />
      <BenefitsStrip />
      <About />
      <Catalogo />
      <ComoFunciona />
      <Depoimentos />
      <Faq />
      <CtaFinal />
      <Footer />
      <WhatsFloatingButton />
    </>
  );
}
