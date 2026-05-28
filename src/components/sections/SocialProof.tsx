import { motion } from "framer-motion";
import { Star, ArrowUpRight, ArrowUpRight as ExternalIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CtaLink } from "../ui/Button";
import { InstagramGlyph } from "../icons/InstagramGlyph";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { INSTAGRAM, MAPS, GOOGLE_RATING, REELS, REVIEWS } from "../../lib/site";

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
            variants={fadeUp}
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
                className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-hairline bg-surface"
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover"
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
          Faixa de depoimentos reais — copiados literalmente do Google Meu
          Negócio (5 reviews). Sem fabricação, conforme restrição do PRD.
        */}
        <motion.ul
          variants={staggerContainer}
          {...inViewProps}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {REVIEWS.map((review) => (
            <motion.li
              key={review.author}
              variants={fadeUp}
              className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-6"
            >
              <div className="flex items-center gap-1 text-cta" aria-label={`${review.rating} de 5 estrelas`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" aria-hidden />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted">"{review.text}"</p>
              <div className="mt-auto flex items-baseline justify-between gap-3 pt-1">
                <span className="text-sm font-medium text-ink">{review.author}</span>
                <span className="spec-label text-[10px] text-muted/80">
                  Google · {review.date}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>

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
