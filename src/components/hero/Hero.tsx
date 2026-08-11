import { useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { Aurora } from "../ui/Aurora";
import {
  fadeUp,
  lineMask,
  staggerContainer,
  staggerLines,
} from "../../lib/motion";
import { useParallax } from "../../hooks/useParallax";
import { useMagnetic } from "../../hooks/useMagnetic";
import { WA, PHONE_TEL } from "../../lib/site";

const MICROCOPY = ["Resposta rápida", "Orçamento grátis", "Sem compromisso"];

// Chips de orientação rápida — o lead bate o olho e sabe que atende o aparelho
// dele; clicar leva direto pra seção de serviços.
const CONSERTAMOS = ["Celular", "Computador", "Videogame", "Tablet", "Smartwatch"];

/**
 * Hero — sem 3D/WebGL: o modelo three.js detonava o carregamento e a UX em
 * máquinas de baixo desempenho, então foi removido em favor de performance
 * garantida em qualquer dispositivo. A sensação de profundidade vem de
 * parallax em camadas sobre o WebP do iPhone (40KB), que custa ~0 e carrega
 * `eager`/`high` pra um LCP rápido.
 *
 * Camadas (proporção do scroll):
 *   0.1x  glow de marca      — fundo profundo, + respiração ambiente
 *   0.2x  imagem do iPhone   — fundo
 *   1.0x  texto e CTAs       — parados de propósito: texto em parallax é
 *                              texto ilegível, e é aqui que a conversão mora.
 *
 * Todo o parallax é desktop-only e desliga sob prefers-reduced-motion
 * (ver useParallax).
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const glowParallax = useParallax(ref, 30);
  const imageParallax = useParallax(ref, 70);

  return (
    <section
      ref={ref}
      id="topo"
      className="relative isolate overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-20"
    >
      {/* Aurora — manchas da marca derivando no fundo. É a camada que mais
          "mexe" no hero; anda junto com o glow, na profundidade 0.1x. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30"
        style={glowParallax}
      >
        <Aurora />
      </motion.div>

      {/* Glow de marca — camada mais profunda (0.1x) com respiração ambiente
          de 12s. Amplitude minúscula (±2%) de propósito: ambiente que chama
          atenção deixou de ser ambiente. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          ...glowParallax,
          background:
            "radial-gradient(60% 55% at 70% 30%, rgba(37,99,235,0.22), transparent 70%)",
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [1, 0.88, 1] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* iPhone como background sutil (40KB WebP) — camada de fundo (0.2x).
          Altura de 112% com -6% de topo dá folga pro deslocamento de ±35px
          não abrir faixa vazia nas bordas ao rolar. */}
      <motion.img
        src="/hero-iphone.webp"
        alt=""
        aria-hidden
        width={1600}
        height={900}
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none absolute -top-[6%] left-[-20%] -z-10 h-[112%] w-[140%] max-w-none object-cover opacity-40 sm:opacity-50"
        style={{
          ...imageParallax,
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
  const magnetic = useMagnetic();

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

      {/* Headline revelada linha a linha, cada uma subindo de trás de uma
          máscara. O `pb/-mb` dá folga pro overflow-hidden não cortar o
          text-shadow nem a perna do "p"/"q". */}
      <motion.h1
        variants={staggerLines}
        className="text-[clamp(2.25rem,6.5vw,4rem)] font-bold text-ink [text-shadow:0_2px_24px_rgba(7,11,24,0.7)]"
      >
        <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span variants={lineMask} className="block">
            Seu aparelho de volta rápido.
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span variants={lineMask} className="block text-brand">
            E em boas mãos.
          </motion.span>
        </span>
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
        {/* CTA principal magnético — o wrapper é que se desloca, então o
            alvo de clique acompanha o botão em vez de ficar pra trás. */}
        <motion.div
          style={magnetic.style}
          {...magnetic.handlers}
          className="w-full sm:w-auto"
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
        </motion.div>
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
