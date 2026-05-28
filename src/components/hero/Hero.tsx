import { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useReducedMotion, useMotionValue } from "framer-motion";
import { Phone, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { WA, PHONE_TEL } from "../../lib/site";

const MICROCOPY = ["Resposta rápida", "Orçamento grátis", "Sem compromisso"];

// O three.js + modelo 3D fica num chunk separado, carregado depois do paint inicial.
// O hero renderiza imediatamente (texto + CTAs) e o 3D entra quando estiver pronto.
const IphoneCanvas = lazy(() =>
  import("./IphoneCanvas").then((m) => ({ default: m.IphoneCanvas })),
);

/**
 * Hero pinned: a seção tem 220vh; o conteúdo interno fica `sticky top-0`
 * ocupando uma tela inteira. Conforme o usuário rola pela faixa de 1.2vh
 * o `scrollYProgress` vai de 0→1 e dirige o tempo da animação 3D do iPhone
 * (desmontado → montado). Quando passa do final, o sticky libera e a
 * próxima seção entra normalmente.
 *
 * Sob `prefers-reduced-motion`, a seção vira altura normal e o iPhone fica
 * estático no estado montado (progress fixo em 1).
 */
export function Hero() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  // Progresso 0→1 ligado à rolagem da seção (sob reduced-motion, fica em 1).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const staticProgress = useMotionValue(1);
  const progress = prefersReduced ? staticProgress : scrollYProgress;

  return (
    <section
      id="topo"
      ref={containerRef}
      className={
        prefersReduced
          ? "relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-24"
          : "relative isolate h-[500vh]"
      }
    >
      {/* Wrapper sticky: enquanto o usuário rola pelos 220vh, ele fica pregado. */}
      <div
        className={
          prefersReduced
            ? "relative"
            : "sticky top-0 flex h-[100svh] items-center overflow-hidden pt-24 sm:pt-28"
        }
      >
        {/* Glow de marca atrás de tudo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(60% 55% at 70% 30%, rgba(37,99,235,0.22), transparent 70%)",
          }}
        />

        {/* iPhone 3D centralizado no viewport, atrás do texto. */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Suspense fallback={null}>
            <IphoneCanvas progress={progress} />
          </Suspense>
        </div>

        {/*
          Vinheta radial escura ancorada na esquerda (atrás do texto) +
          fade vertical leve nas extremidades pra suavizar transição com nav
          e trust bar. Garante contraste do headline mesmo quando o modelo
          mostra peças claras (tela acesa, traseira refletiva).
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(75% 80% at 22% 50%, rgba(7,11,24,0.88) 0%, rgba(7,11,24,0.55) 38%, rgba(7,11,24,0.05) 72%, transparent 100%), linear-gradient(180deg, rgba(7,11,24,0.55) 0%, transparent 18%, transparent 85%, rgba(7,11,24,0.55) 100%)",
          }}
        />

        <Container className="relative w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex max-w-2xl flex-col items-start gap-6"
          >
            <motion.span
              variants={fadeUp}
              className="spec-label inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/70 px-3 py-1.5 text-[11px] text-brand backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-cta" />
              Assistência técnica · Campos dos Goytacazes
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.25rem,6.5vw,4rem)] font-bold text-ink [text-shadow:0_2px_24px_rgba(7,11,24,0.7)]"
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
        </Container>
      </div>
    </section>
  );
}
