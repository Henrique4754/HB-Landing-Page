import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { WA } from "../../lib/site";

const STEPS = [
  { n: "01", title: "Chama no WhatsApp", body: "Conta o que tá rolando (ou manda foto). Se preferir, a gente busca." },
  { n: "02", title: "Orçamento grátis", body: "Avaliamos e passamos o preço. Sem compromisso, sem pegadinha." },
  { n: "03", title: "Conserto com garantia", body: "Aprovou? A gente resolve com peças de qualidade e 90 dias de garantia." },
  { n: "04", title: "De volta rápido", body: "Pronto no mesmo dia (celular) ou em até 48h (PC), funcionando como deve." },
];

/** Como funciona — tira a ansiedade do processo (PRD seção 6). */
export function HowItWorks() {
  return (
    <Section id="como-funciona" labelledBy="como-title" className="scroll-mt-20">
      <Container>
        <SectionHeading id="como-title" eyebrow="Como funciona" title="Simples assim" />

        <div className="relative mt-12">
          {/* Linha conectora que "desenha" ao entrar na viewport (desktop) */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-brand/60 via-brand/30 to-transparent lg:block"
          />

          <motion.ol
            variants={staggerContainer}
            {...inViewProps}
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4"
          >
            {STEPS.map((step) => (
              <motion.li key={step.n} variants={fadeUp} className="relative flex flex-col gap-3">
                <span className="grid size-14 place-items-center rounded-full border border-hairline bg-surface font-mono text-lg font-medium text-brand">
                  {step.n}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <div className="mt-12 flex justify-center">
          <CtaLink href={WA.generic} event="whatsapp_click" location="how_it_works">
            <WhatsAppGlyph size={20} />
            Começar agora no WhatsApp
          </CtaLink>
        </div>
      </Container>
    </Section>
  );
}
