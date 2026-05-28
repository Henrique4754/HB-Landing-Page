import { motion } from "framer-motion";
import { Star, Play, ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CtaLink } from "../ui/Button";
import { InstagramGlyph } from "../icons/InstagramGlyph";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { INSTAGRAM, MAPS, GOOGLE_RATING, REELS } from "../../lib/site";

// Usa os reels reais se houver; senão, 3 cards de fallback que linkam ao Instagram.
const reelLinks = REELS.length > 0 ? REELS : [INSTAGRAM, INSTAGRAM, INSTAGRAM];

/** Extrai o código de um reel da URL do Instagram (entre `/reel/` e a próxima `/` ou `?`). */
function extractReelCode(url: string): string | null {
  const m = url.match(/\/reel\/([^/?]+)/);
  return m ? m[1] : null;
}

/**
 * Prova social — crença vira confiança (PRD seção 7).
 * NOTA: os reels/fotos de bancada reais entram antes do go-live (PRD §7 pendências).
 * Aqui montamos a estrutura com placeholders que já linkam ao Instagram — sem
 * inventar depoimentos (restrição do PRD: não fabricar provas).
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

          {/* Grade de reels (placeholders linkando ao Instagram) */}
          <motion.div
            variants={staggerContainer}
            {...inViewProps}
            className="grid grid-cols-3 gap-4"
          >
            {reelLinks.map((href, i) => {
              const code = extractReelCode(href);
              // Sem código de reel: cai no card de fallback (link pro perfil).
              if (!code) {
                return (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeUp}
                    className="group relative grid aspect-[9/16] place-items-center overflow-hidden rounded-2xl border border-hairline bg-gradient-to-b from-surface-2 to-surface transition-colors hover:border-brand/60"
                    aria-label="Ver reels no Instagram"
                  >
                    <span className="grid size-12 place-items-center rounded-full bg-base/70 text-ink backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play size={20} fill="currentColor" />
                    </span>
                    <span className="spec-label absolute bottom-3 left-3 text-[10px] text-muted">
                      REEL · HB
                    </span>
                  </motion.a>
                );
              }
              // Embed oficial do Instagram. `loading="lazy"` evita carregar
              // o JS pesado do Insta enquanto a seção não entra na viewport.
              return (
                <motion.div
                  key={code}
                  variants={fadeUp}
                  className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-hairline bg-surface"
                >
                  <iframe
                    src={`https://www.instagram.com/reel/${code}/embed/`}
                    title={`Reel de reparo HB ${i + 1}`}
                    loading="lazy"
                    scrolling="no"
                    allow="autoplay; encrypted-media; picture-in-picture; web-share"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

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
