import { motion } from "framer-motion";
import { ShieldCheck, PackageCheck, ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { CtaLink } from "../ui/Button";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";

const SELOS = [
  { icon: ShieldCheck, label: "Lacrado com garantia Apple" },
  { icon: PackageCheck, label: "Estoque pronto, entrega imediata" },
];

/**
 * Venda de iPhone — banda de destaque na home que empurra pra /iphones/.
 * Link interno com anchor text descritivo: além de converter, dá o sinal de
 * relevância que a página de produto precisa (ela não é âncora, é rota nova).
 */
export function IphoneStore() {
  return (
    <Section id="iphones" labelledBy="iphones-title" className="scroll-mt-20">
      <Container>
        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="relative overflow-hidden rounded-3xl border border-hairline bg-surface px-6 py-12 sm:px-10 sm:py-14"
        >
          {/* Glow de marca contido atrás do card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(55% 65% at 15% 0%, rgba(37,99,235,0.16), transparent 70%)",
            }}
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="lg:max-w-xl">
              <motion.p variants={fadeUp} className="spec-label text-xs text-brand">
                Novidade na HB
              </motion.p>

              <motion.h2
                id="iphones-title"
                variants={fadeUp}
                className="mt-3 text-[clamp(1.6rem,4.5vw,2.5rem)] text-ink"
              >
                Agora a HB também vende iPhone lacrado.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
              >
                iPhone 17 Pro Max lacrado de fábrica, em todas as cores e nas
                capacidades 256GB, 512GB e 1TB. Você compra de quem tem loja com
                endereço fixo aqui em Campos, e suporte técnico próprio depois da
                compra.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              className="flex shrink-0 flex-col gap-5 lg:items-start"
            >
              <ul className="flex flex-col gap-2.5 text-sm text-muted">
                {SELOS.map((selo) => (
                  <li key={selo.label} className="inline-flex items-center gap-2">
                    <selo.icon size={17} className="shrink-0 text-cta" />
                    {selo.label}
                  </li>
                ))}
              </ul>

              <CtaLink href="/iphones/" external={false} className="group w-full sm:w-auto">
                Ver iPhone 17 Pro Max
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
                />
              </CtaLink>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
