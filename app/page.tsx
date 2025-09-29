import CutoffBanner from "@/components/common/CutoffBanner";
import Hero from "@/components/sections/Hero";
// import BenefitsStrip from "@/components/sections/BenefitsStrip"; // REMOVIDO
import QuickOrder from "@/components/sections/QuickOrder";
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
    <main className="pb-20 md:pb-0">
      {/* Urgência / SLA (edite o horário de corte se precisar) */}
      <CutoffBanner cutoffHour={15} />

      {/* Acima da dobra */}
      <Hero />
      {/* <BenefitsStrip /> */} {/* REMOVIDO DO JSX */}

      <ComoFunciona />

      {/* Conteúdo */}
      <About />
      <Catalogo />

      {/* Pedido rápido (conversão) */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <QuickOrder />
      </div>

      <Depoimentos />
      <Faq />

      {/* Fechamento */}
      <CtaFinal />
      <Footer />

      {/* Ação rápida (mobile + desktop) */}
      <WhatsFloatingButton />
    </main>
  );
}
