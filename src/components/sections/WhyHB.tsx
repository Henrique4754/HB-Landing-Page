import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Truck,
  BadgeDollarSign,
  Lock,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { WA } from "../../lib/site";

type Spec = { icon: LucideIcon; label: string; body: string };

// 6 specs em mono — cada uma desarma um medo específico (PRD seção 5).
const SPECS: Spec[] = [
  { icon: ShieldCheck, label: "GARANTIA · 90 DIAS", body: "Deu problema no que a gente consertou? Conserta de novo, sem custo." },
  { icon: Clock, label: "PRAZO · MESMO DIA", body: "Celular pronto no mesmo dia, PC em até 48h. (Varia com a complexidade.)" },
  { icon: Truck, label: "BUSCA E LEVA", body: "A gente busca seu aparelho e devolve. Você não sai de casa." },
  { icon: BadgeDollarSign, label: "ORÇAMENTO · GRÁTIS", body: "Avaliamos sem cobrar nada. Você só paga se aprovar." },
  { icon: Lock, label: "DADOS · SEGUROS", body: "Suas fotos, conversas e arquivos ficam intactos e em sigilo." },
  { icon: Scale, label: "PREÇO · JUSTO", body: "Sem surpresa na conta. O combinado é o que você paga." },
];

/** Por que a HB — a seção que desarma cada medo, com cara de "spec sheet". */
export function WhyHB() {
  return (
    <Section
      id="por-que"
      labelledBy="por-que-title"
      className="relative scroll-mt-20 overflow-hidden"
    >
      {/* Textura blueprint faível (PRD: só nesta seção) */}
      <div className="blueprint pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
      <Container>
        <SectionHeading
          id="por-que-title"
          eyebrow="Confiança"
          title="Por que confiar seu aparelho à HB"
        />

        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3"
        >
          {SPECS.map((spec) => (
            <motion.div
              key={spec.label}
              variants={fadeUp}
              className="flex gap-4 bg-surface p-5 sm:flex-col sm:gap-3 sm:p-7"
            >
              <spec.icon size={22} className="mt-0.5 shrink-0 text-brand sm:mt-0" aria-hidden />
              <div className="flex flex-col gap-1.5 sm:contents">
                <span className="spec-label text-xs text-cta">{spec.label}</span>
                <p className="text-sm leading-relaxed text-muted">{spec.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <CtaLink href={WA.generic} event="whatsapp_click" location="why_hb">
            <WhatsAppGlyph size={20} />
            Pedir meu orçamento grátis
          </CtaLink>
        </div>
      </Container>
    </Section>
  );
}
