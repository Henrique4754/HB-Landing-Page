import { useState } from "react";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, revealUnit, inViewProps, staggerContainer } from "../../lib/motion";
import { WA } from "../../lib/site";

/**
 * Sobre — coloca rosto e nome em quem cuida do aparelho.
 *  - Retrato do Henrique como âncora de confiança humana. Enquanto o arquivo
 *    `public/about/henrique.jpg` não existir, o placeholder fica visível;
 *    `onError` esconde a <img> quebrada.
 *  - Vídeo da bancada vira segundo bloco (prova visual do trabalho).
 */
export function About() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <Section labelledBy="sobre-title">
      <Container>
        <SectionHeading
          id="sobre-title"
          eyebrow="Quem cuida do seu aparelho"
          title="Por trás da bancada tem gente, não bot"
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
          {/* Retrato + identificação */}
          <motion.div
            variants={revealUnit}
            {...inViewProps}
            className="mx-auto w-full max-w-[360px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline bg-surface">
              {/* Placeholder atrás — aparece enquanto a foto não existe. */}
              <div
                aria-hidden
                className="absolute inset-0 grid place-items-center bg-gradient-to-br from-surface-2 via-surface to-base"
              >
                <div className="flex flex-col items-center gap-2 text-muted/70">
                  <UserRound size={56} strokeWidth={1.25} />
                  <span className="spec-label text-[10px]">Foto do Henrique</span>
                </div>
              </div>
              {photoOk && (
                <img
                  src="/about/henrique.jpg"
                  alt="Henrique Braga, técnico responsável pela HB Comércio"
                  width={720}
                  height={900}
                  loading="lazy"
                  onError={() => setPhotoOk(false)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {/* Selo discreto no canto da foto */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-xl bg-base/70 px-3 py-2 backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-ink">
                    Henrique Braga
                  </span>
                  <span className="spec-label text-[10px] text-brand">
                    Técnico responsável
                  </span>
                </div>
                <span className="size-2 rounded-full bg-cta" aria-hidden />
              </div>
            </div>
          </motion.div>

          {/* Bio + CTA */}
          <motion.div
            variants={staggerContainer}
            {...inViewProps}
            className="flex flex-col items-start gap-5"
          >
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted sm:text-lg"
            >
              Sou o Henrique, o técnico da HB. Cada aparelho que entra aqui
              passa pela minha bancada do começo ao fim. Te passo o preço antes
              e o serviço só começa depois que você aprovar.
            </motion.p>
            <motion.div variants={fadeUp}>
              <CtaLink href={WA.generic} event="whatsapp_click" location="about">
                <WhatsAppGlyph size={20} />
                Falar comigo no WhatsApp
              </CtaLink>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
