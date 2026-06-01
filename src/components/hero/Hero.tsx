import { Suspense, lazy, useRef, useState } from "react";
import { motion, useScroll, useReducedMotion, useMotionValue } from "framer-motion";
import { Phone, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { WA, PHONE_TEL } from "../../lib/site";
import { useIsDesktop } from "../../hooks/useIsDesktop";

const MICROCOPY = ["Resposta rápida", "Orçamento grátis", "Sem compromisso"];

// Chips de orientação rápida — o lead bate o olho e sabe que atende o aparelho
// dele; clicar leva direto pra seção de serviços.
const CONSERTAMOS = ["Celular", "Computador", "Videogame", "Tablet", "Smartwatch"];

// O three.js + modelo 3D fica num chunk separado, carregado depois do paint inicial.
// E SÓ é importado se o usuário cair no caminho desktop (mobile nunca baixa o chunk).
const IphoneCanvas = lazy(() =>
  import("./IphoneCanvas").then((m) => ({ default: m.IphoneCanvas })),
);

/**
 * Hero — dois caminhos:
 *  - **Desktop (≥1024px) + motion permitido:** 3D pinned no scroll (220vh+),
 *    iPhone real montando, câmera orbitando, peso visual máximo.
 *  - **Mobile / reduced-motion:** hero estático com WebP do iPhone como
 *    background (40KB), texto e CTAs em uma única dobra. Zero R3F carregado,
 *    zero scroll extra pra passar do hero, performance garantida em qualquer
 *    Android baratinho. Conversão preservada (CTAs above-the-fold).
 */
export function Hero() {
  const prefersReduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const useStaticHero = !isDesktop || prefersReduced;

  if (useStaticHero) {
    return <StaticHero />;
  }
  return <Scroll3DHero />;
}

/* ──────────────────────────────────────────────────────────────────────────── */

/**
 * Versão estática: usada em telas <lg (mobile/tablet) e quando o sistema pede
 * menos movimento. Mantém o copy, o ritmo e os CTAs do hero principal — só
 * troca o 3D animado por uma imagem (PNG/WebP) do iPhone já montado.
 */
function StaticHero() {
  return (
    <section
      id="topo"
      className="relative isolate overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-20"
    >
      {/* Glow de marca */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 55% at 70% 30%, rgba(37,99,235,0.22), transparent 70%)",
        }}
      />

      {/* iPhone estático como background sutil (40KB WebP). */}
      <img
        src="/hero-iphone.webp"
        alt=""
        aria-hidden
        width={1600}
        height={900}
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none absolute inset-y-0 left-[-20%] -z-10 h-full w-[140%] max-w-none object-cover opacity-40 sm:opacity-50"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      />

      {/* Fade pra garantir contraste do texto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,11,24,0.55) 0%, rgba(7,11,24,0.25) 40%, rgba(7,11,24,0.55) 100%)",
        }}
      />

      <Container>
        <HeroContent />
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

/**
 * Versão desktop com 3D pinned: scroll vai de 0→1 dentro de uma janela alta;
 * `IphoneCanvas` lê esse progresso e dirige a animação + a órbita da câmera.
 * Quando o scroll passa do fim da seção, o sticky libera e a próxima seção entra.
 */
function Scroll3DHero() {
  const containerRef = useRef<HTMLElement>(null);
  // `canvasReady` vira true quando o GLB de fato carrega e a cena é resolvida.
  // Driva o fade-in que mascara o delay de download/parse do modelo (4MB).
  const [canvasReady, setCanvasReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Mantemos um motion value de fallback caso precise (não usado neste caminho).
  useMotionValue(1);

  return (
    <section
      id="topo"
      ref={containerRef}
      className="relative isolate h-[300vh]"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-24 sm:pt-28">
        {/* Glow de marca */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(60% 55% at 70% 30%, rgba(37,99,235,0.22), transparent 70%)",
          }}
        />

        {/*
          Canvas 3D centralizado atrás do texto. Começa invisível (opacity 0)
          e faz fade-in suave em 900ms assim que o GLB termina de carregar
          (`onReady` é chamado quando a cena é resolvida no Model). Isso
          mascara o delay de download/parse do modelo de 4MB.
        */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: canvasReady ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Suspense fallback={null}>
            <IphoneCanvas
              progress={scrollYProgress}
              onReady={() => setCanvasReady(true)}
            />
          </Suspense>
        </motion.div>

        {/*
          Vinheta radial escura na esquerda (atrás do texto) + fade vertical
          leve nas pontas. Garante legibilidade do headline mesmo quando o
          modelo mostra peças claras (tela acesa, traseira refletiva).
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
          <HeroContent />
        </Container>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

/**
 * Conteúdo do hero (eyebrow, headline, sub, CTAs, microcopy). Compartilhado
 * pelas duas versões pra não duplicar copy nem variantes de animação.
 */
function HeroContent() {
  return (
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
        Celular, computador, videogame e mais, em Campos dos Goytacazes.
        Orçamento grátis, garantia de 90 dias e pronto no mesmo dia. Sem gambiarra.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
      >
        <CtaLink
          href={WA.generic}
          event="whatsapp_click"
          location="hero"
          className="w-full sm:w-auto"
        >
          <WhatsAppGlyph size={20} />
          Chamar no WhatsApp
        </CtaLink>
        <CtaLink
          href={PHONE_TEL}
          variant="secondary"
          event="call_click"
          location="hero"
          external={false}
          className="w-full sm:w-auto"
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

      {/* Chips: orientação rápida do que consertamos → leva pra seção de serviços. */}
      <motion.ul variants={fadeUp} className="flex flex-wrap items-center gap-2">
        <li className="spec-label text-[11px] text-muted/80">Consertamos:</li>
        {CONSERTAMOS.map((item) => (
          <li key={item}>
            <a
              href="#servicos"
              className="inline-flex min-h-[36px] items-center rounded-full border border-hairline bg-surface/60 px-3 text-xs font-medium text-muted transition-colors duration-300 ease-out-expo hover:border-brand/60 hover:text-ink"
            >
              {item}
            </a>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
