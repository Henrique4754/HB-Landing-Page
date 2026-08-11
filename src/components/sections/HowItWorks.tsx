import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

/**
 * Como funciona — tira a ansiedade do processo (PRD seção 6).
 *
 * A linha conectora e os números são LIGADOS AO SCROLL, não a um gatilho de
 * "entrou na viewport": a linha se desenha na medida em que você rola e cada
 * número acende quando ela chega nele. É o usuário que conduz o progresso, o
 * que casa com a mensagem da seção (um processo que avança passo a passo).
 */
export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);

  // A janela começa quando a seção está a 75% da viewport e fecha quando o fim
  // dela chega no mesmo ponto — assim o desenho acontece durante a leitura,
  // não antes nem depois.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.75"],
  });

  // Sem o spring, a linha treme junto com a inércia do Lenis.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="como-funciona" labelledBy="como-title" className="scroll-mt-20">
      <Container>
        <SectionHeading id="como-title" eyebrow="Como funciona" title="Simples assim" />

        <div ref={trackRef} className="relative mt-12">
          {/* Trilho apagado + linha que se desenha por cima (desktop). */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-hairline lg:block"
          />
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-brand via-brand to-cta lg:block"
          />

          <motion.ol
            variants={staggerContainer}
            {...inViewProps}
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4"
          >
            {STEPS.map((step, i) => (
              <Step key={step.n} step={step} index={i} progress={progress} />
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

/**
 * Um passo. O círculo do número acende conforme o progresso passa por ele.
 *
 * Só o círculo reage ao scroll — título e corpo ficam em opacidade cheia o
 * tempo todo. Texto que depende da posição do scroll pra ficar legível é uma
 * armadilha de acessibilidade, e aqui não custa nada evitar.
 */
function Step({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // O passo acende no trecho em que a linha cruza a posição dele.
  const start = index / STEPS.length;
  const end = (index + 0.5) / STEPS.length;

  const fill = useTransform(progress, [start, end], [0, 1]);
  const halo = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.li variants={fadeUp} className="relative flex flex-col gap-3">
      <span className="relative grid size-14 place-items-center">
        {/* Estado apagado (base) */}
        <span className="absolute inset-0 rounded-full border border-hairline bg-surface" />
        {/* Estado aceso, revelado por opacidade conforme o scroll avança */}
        <motion.span
          aria-hidden
          style={{ opacity: fill, scale: halo }}
          className="absolute inset-0 rounded-full border border-brand/70 bg-brand/12 shadow-[0_0_28px_-6px_rgba(37,99,235,0.65)]"
        />
        <span className="relative font-mono text-lg font-medium text-brand">
          {step.n}
        </span>
      </span>
      <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
      <p className="text-sm leading-relaxed text-muted">{step.body}</p>
    </motion.li>
  );
}
