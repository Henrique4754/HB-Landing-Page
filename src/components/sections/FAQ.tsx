import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { cn } from "../../lib/cn";

const FAQS = [
  { q: "Quanto custa o conserto?", a: "Depende do serviço. Por isso o orçamento é grátis e sem compromisso: a gente avalia e te passa o preço antes de qualquer coisa." },
  { q: "Quanto tempo demora?", a: "Celular costuma ficar pronto no mesmo dia e PC em até 48h. Casos mais complexos podem levar um pouco mais, e a gente sempre avisa o prazo antes." },
  { q: "Vocês buscam o aparelho?", a: "Sim. Na nossa região a gente busca e devolve. Você não sai de casa." },
  { q: "Meus dados e fotos estão seguros?", a: "Totalmente. Seus arquivos ficam intactos e em sigilo. Se o serviço exigir formatação, avisamos antes e fazemos backup com você." },
  { q: "Tem garantia?", a: "Tem sim, são 90 dias no serviço. Deu problema no que consertamos, resolvemos de novo sem custo." },
  { q: "Atendem empresas?", a: "Sim. Cuidamos de PCs e celulares de empresas e comércios da região também." },
];

/** FAQ — derruba as últimas objeções. Accordion acessível, um aberto por vez. */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section labelledBy="faq-title">
      <Container>
        <SectionHeading id="faq-title" eyebrow="Dúvidas" title="Perguntas frequentes" />

        <motion.dl
          variants={staggerContainer}
          {...inViewProps}
          className="mx-auto mt-10 max-w-2xl divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface"
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={item.q} variants={fadeUp}>
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {item.q}
                    </span>
                    <Plus
                      size={20}
                      aria-hidden
                      className={cn(
                        "shrink-0 text-brand transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.dl>
      </Container>
    </Section>
  );
}
