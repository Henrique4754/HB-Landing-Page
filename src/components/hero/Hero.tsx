import { motion } from "framer-motion";
import { Phone, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { WA, PHONE_TEL } from "../../lib/site";

const MICROCOPY = ["Resposta rápida", "Orçamento grátis", "Sem compromisso"];

// Chips de orientação rápida — o lead bate o olho e sabe que atende o aparelho
// dele; clicar leva direto pra seção de serviços.
const CONSERTAMOS = ["Celular", "Computador", "Videogame", "Tablet", "Smartwatch"];

/**
 * Hero — estático em todos os dispositivos. Mantém o copy, o ritmo e os CTAs
 * acima da dobra, com um WebP do iPhone (40KB) como fundo sutil. Sem 3D/WebGL:
 * o modelo three.js detonava o carregamento e a UX em máquinas de baixo
 * desempenho, então foi removido em favor de performance garantida em qualquer
 * dispositivo. A imagem carrega `eager`/`high` pra um LCP rápido.
 */
export function Hero() {
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
 * Conteúdo do hero (eyebrow, headline, sub, CTAs, microcopy).
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
