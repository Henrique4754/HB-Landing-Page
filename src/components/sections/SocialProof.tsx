import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight, ArrowUpRight as ExternalIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CtaLink } from "../ui/Button";
import { InstagramGlyph } from "../icons/InstagramGlyph";
import { fadeUp, revealUnit, inViewProps, staggerContainer } from "../../lib/motion";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { INSTAGRAM, MAPS, GOOGLE_RATING, REELS, REVIEWS } from "../../lib/site";

// Tempo (ms) que cada depoimento fica visível antes do próximo entrar.
// Ciclo curto pra dar sensação de "muitos clientes" mesmo com 5 reviews reais.
const AUTOPLAY_MS = 3500;

/**
 * Carrossel auto-cíclico com efeito "baralho":
 *  - 3 cards visíveis empilhados (front + 2 atrás peek pelo bottom) → dá
 *    sensação de "tem mais vindo" mesmo com poucos reviews.
 *  - A cada ciclo o card da frente sobe e some, e o deck se reorganiza.
 *
 * Como funciona: render todos os reviews uma vez com `key` estável por
 * autor; cada card calcula sua distância circular do front e anima pra
 * y/scale/opacity correspondentes. Quando index avança, todos os cards
 * animam pra suas novas posições simultaneamente — daí o efeito de
 * baralho se realinhando.
 */
/** Conteúdo do card de avaliação (compartilhado entre mobile e desktop). */
function ReviewBody({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <>
      <div
        className="flex items-center gap-1 text-cta"
        aria-label={`${review.rating} de 5 estrelas`}
      >
        {Array.from({ length: review.rating }).map((_, j) => (
          <Star key={j} size={16} fill="currentColor" aria-hidden />
        ))}
      </div>
      <p className="text-base leading-relaxed text-muted sm:text-lg">
        "{review.text}"
      </p>
      <div className="mt-auto flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">{review.author}</span>
        <span className="spec-label text-[10px] text-muted/80">Google</span>
      </div>
    </>
  );
}

/** Carrossel simples (mobile-friendly): trilha única com translateX, sem bolinhas. */
function SimpleReviewsCarousel({ index }: { index: number }) {
  return (
    <div className="mt-10 overflow-hidden" aria-live="polite" aria-atomic="true">
      <div
        className="flex transition-transform duration-500 ease-out-expo"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {REVIEWS.map((review, i) => (
          <div key={review.author} className="w-full shrink-0" aria-hidden={i !== index}>
            <article className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface p-5">
              <ReviewBody review={review} />
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsCarousel() {
  const isDesktop = useIsDesktop();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = REVIEWS.length;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  // MOBILE: carrossel simples (sem flicker, sem bolinhas).
  if (!isDesktop) return <SimpleReviewsCarousel index={index} />;

  // DESKTOP: efeito "baralho" (deck) — cards empilhados que se realinham.
  return (
    <motion.div
      variants={revealUnit}
      {...inViewProps}
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative mx-auto h-[210px] max-w-2xl overflow-hidden sm:h-[170px]"
        aria-live="polite"
        aria-atomic="true"
      >
        {REVIEWS.map((review) => {
          const rawDist = (REVIEWS.indexOf(review) - index + total) % total;
          const isOutgoing = rawDist === total - 1;
          const inStack = rawDist <= 2;

          let y: number;
          let scale: number;
          let opacity: number;
          if (isOutgoing) {
            y = -90;
            scale = 0.96;
            opacity = 0;
          } else if (inStack) {
            y = rawDist * 14;
            scale = 1 - rawDist * 0.04;
            opacity = 1 - rawDist * 0.3;
          } else {
            y = 48;
            scale = 0.88;
            opacity = 0;
          }

          return (
            <motion.article
              key={review.author}
              style={{ zIndex: total - rawDist }}
              animate={{ y, scale, opacity }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] sm:p-6"
              aria-hidden={rawDist !== 0}
            >
              <ReviewBody review={review} />
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}

/**
 * Prova social — crença vira confiança (PRD seção 7).
 * Reels reais hospedados por nós (mp4 comprimido) com poster do 1º frame.
 * Player nativo HTML5: zero chrome do Instagram, zero JS de terceiros,
 * `preload="metadata"` baixa só ~100KB pro poster ser exibido sem clique.
 */
export function SocialProof() {
  return (
    <Section labelledBy="prova-title">
      <Container>
        <SectionHeading
          id="prova-title"
          eyebrow="Prova social"
          title="Trabalho de verdade, cliente satisfeito"
          subtitle="Veja reparos reais e o que diz quem já confiou na HB."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Card de avaliação do Google (usa só a nota — sem texto inventado) */}
          <motion.a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            variants={revealUnit}
            {...inViewProps}
            className="group flex flex-col justify-between gap-6 rounded-2xl border border-hairline bg-surface p-7 transition-colors hover:border-brand/60"
          >
            <div className="flex items-center gap-1 text-cta">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={22} fill="currentColor" aria-hidden />
              ))}
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-ink">{GOOGLE_RATING}</p>
              <p className="mt-1 text-sm text-muted">Avaliações reais no Google</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
              Ver no Google Maps
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.a>

          {/* Grade de reels — player nativo */}
          <motion.div
            variants={staggerContainer}
            {...inViewProps}
            className="grid grid-cols-3 gap-4"
          >
            {REELS.map((reel, i) => (
              <motion.div
                key={reel.videoSrc}
                variants={fadeUp}
                className="group relative aspect-[9/16] transform-gpu overflow-hidden rounded-2xl border border-hairline bg-surface [backface-visibility:hidden]"
              >
                <video
                  className="absolute inset-0 h-full w-full transform-gpu object-cover [backface-visibility:hidden]"
                  src={reel.videoSrc}
                  poster={reel.poster}
                  preload="metadata"
                  controls
                  playsInline
                  controlsList="nodownload"
                  aria-label={`Reel de reparo HB ${i + 1}`}
                />
                {/*
                  Link sutil pro Instagram original — não rouba o click do player,
                  só fica visível no hover (botão flutuante no canto).
                */}
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver reel original no Instagram"
                  className="absolute right-2 top-2 z-10 grid size-8 place-items-center rounded-full bg-base/70 text-ink opacity-0 backdrop-blur-sm transition-opacity hover:bg-base/90 group-hover:opacity-100 focus-visible:opacity-100"
                >
                  <ExternalIcon size={14} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/*
          Carrossel auto-cíclico dos 5 depoimentos reais do Google Meu Negócio.
          Copiados literalmente — sem fabricação (restrição do PRD).
        */}
        <ReviewsCarousel />

        <div className="mt-10 flex justify-center">
          <CtaLink
            href={INSTAGRAM}
            variant="secondary"
            event="instagram_click"
            location="social_proof"
          >
            <InstagramGlyph size={18} />
            Ver mais no Instagram
          </CtaLink>
        </div>
      </Container>
    </Section>
  );
}
