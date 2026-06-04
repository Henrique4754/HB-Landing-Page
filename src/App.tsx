import { Analytics } from "@vercel/analytics/react";
import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/hero/Hero";
import { TrustBar } from "./components/sections/TrustBar";
import { Problem } from "./components/sections/Problem";
import { Services } from "./components/sections/Services";
import { BrandStrip } from "./components/sections/BrandStrip";
import { WhyHB } from "./components/sections/WhyHB";
import { HowItWorks } from "./components/sections/HowItWorks";
import { SocialProof } from "./components/sections/SocialProof";
import { About } from "./components/sections/About";
import { ContactForm } from "./components/sections/ContactForm";
import { FAQ } from "./components/sections/FAQ";
import { FinalCTA } from "./components/sections/FinalCTA";
import { Footer } from "./components/sections/Footer";
import { MobileActionBar } from "./components/sections/MobileActionBar";
import { DesktopWhatsAppFab } from "./components/sections/DesktopWhatsAppFab";

export default function App() {
  return (
    <>
      {/* Skip link — primeiro foco do teclado pula direto pro conteúdo */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <Nav />

      <main id="conteudo">
        <Hero />
        <TrustBar />
        <Problem />
        <Services />
        <BrandStrip />
        <WhyHB />
        <HowItWorks />
        <SocialProof />
        <About />
        <ContactForm />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />

      {/* Espaço reservado pra barra fixa não cobrir o footer no mobile */}
      <div aria-hidden className="h-[72px] lg:hidden" />
      <MobileActionBar />
      <DesktopWhatsAppFab />

      <Analytics />
    </>
  );
}
