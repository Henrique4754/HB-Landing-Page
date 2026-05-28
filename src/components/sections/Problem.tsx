import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";

/** Destaque visual nas palavras de medo (PRD seção 3). */
function Fear({ children }: { children: string }) {
  return <span className="font-semibold text-ink">{children}</span>;
}

/** Problema / empatia — gera o "isso sou eu". */
export function Problem() {
  return (
    <Section labelledBy="problema-title">
      <Container>
        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            id="problema-title"
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.75rem)] text-ink"
          >
            Já levou seu aparelho numa assistência e voltou pior?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-muted"
          >
            Você conhece a sensação: deixa o celular ou o PC, espera dias, paga, e
            o <Fear>problema continua</Fear>. Ou some uma peça, mexem nas suas{" "}
            <Fear>fotos</Fear>, e ninguém te dá garantia de nada. Enquanto isso, o
            aparelho que você usa pra trabalhar <Fear>fica parado</Fear>.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-8 font-display text-xl font-semibold text-brand sm:text-2xl"
          >
            Na HB é o contrário disso.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}
