import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Phone, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { ExplodedPhone } from "./ExplodedPhone";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { WA, PHONE_TEL } from "../../lib/site";

const MICROCOPY = ["Resposta rápida", "Orçamento grátis", "Sem compromisso"];

export function Hero() {
  const prefersReduced = useReducedMotion();

  // Progresso ligado ao scroll: o iPhone se monta nos primeiros ~620px de rolagem.
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 620], [0, 1], { clamp: true });
  // Sob prefers-reduced-motion: aparelho já montado (progresso fixo em 1, sem labels).
  const staticProgress = useMotionValue(1);
  const progress = prefersReduced ? staticProgress : scrollProgress;

  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* Glow de marca atrás do conteúdo (luz, não sombra) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(37,99,235,0.18), transparent 70%)",
        }}
      />

      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Coluna de texto — entra com fade-up em stagger */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="spec-label inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1.5 text-[11px] text-brand"
          >
            <span className="size-1.5 rounded-full bg-cta" />
            Assistência técnica · Campos dos Goytacazes
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.25rem,6.5vw,4rem)] font-bold text-ink"
          >
            Seu aparelho de volta rápido.{" "}
            <span className="text-brand">E em boas mãos.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base text-muted sm:text-lg"
          >
            Celular e computador em Campos dos Goytacazes e região. Orçamento
            grátis, garantia de 90 dias e pronto no mesmo dia. Sem gambiarra.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <CtaLink href={WA.generic} event="whatsapp_click" location="hero">
              <WhatsAppGlyph size={20} />
              Chamar no WhatsApp
            </CtaLink>
            <CtaLink
              href={PHONE_TEL}
              variant="secondary"
              event="call_click"
              location="hero"
              external={false}
            >
              <Phone size={18} />
              Ligar agora
            </CtaLink>
          </motion.div>

          {/* Microcopy de redução de risco */}
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
          >
            {MICROCOPY.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check size={15} className="text-cta" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Coluna do iPhone explodido */}
        <div className="relative mx-auto h-[380px] w-full max-w-[360px] sm:h-[460px] lg:h-[560px]">
          <ExplodedPhone progress={progress} />
        </div>
      </Container>
    </section>
  );
}
