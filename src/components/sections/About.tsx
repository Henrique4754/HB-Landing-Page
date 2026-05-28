import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { WA } from "../../lib/site";

/** Sobre — humaniza ("gente real") com vídeo da bancada (PRD seção 8). */
export function About() {
  return (
    <Section labelledBy="sobre-title">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Vídeo da bancada — preload leve, com poster p/ não pesar o load */}
          <motion.div
            variants={fadeUp}
            {...inViewProps}
            className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-hairline bg-surface"
          >
            <video
              className="aspect-[9/16] w-full object-cover"
              controls
              loop
              muted
              playsInline
              preload="metadata"
              poster="/video/poster.jpg"
            >
              <source src="/video/manutencao.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo. Veja nossos reparos no Instagram.
            </video>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...inViewProps}
            className="flex flex-col items-start gap-5"
          >
            <motion.span variants={fadeUp} className="spec-label text-xs text-brand">
              Quem cuida do seu aparelho
            </motion.span>
            <motion.h2
              id="sobre-title"
              variants={fadeUp}
              className="text-[clamp(1.75rem,5vw,2.5rem)] text-ink"
            >
              Bancada, ferramenta certa e gente que entende
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted">
              A HB Comércio é especializada em manutenção de celulares e
              computadores. Aqui não tem gambiarra nem atendente robô: tem bancada,
              ferramenta certa e gente que entende do assunto cuidando do seu
              aparelho como se fosse o próprio. Rápido, transparente e com
              garantia, do orçamento à entrega.
            </motion.p>
            <motion.div variants={fadeUp}>
              <CtaLink href={WA.generic} event="whatsapp_click" location="about">
                <WhatsAppGlyph size={20} />
                Falar com a HB
              </CtaLink>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
