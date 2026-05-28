import { motion } from "framer-motion";
import { Star, ShieldCheck, Zap, BadgeDollarSign, type LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { GOOGLE_RATING } from "../../lib/site";

const BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: Star, label: `${GOOGLE_RATING} no Google` },
  { icon: ShieldCheck, label: "Garantia de 90 dias" },
  { icon: Zap, label: "Celular no mesmo dia" },
  { icon: BadgeDollarSign, label: "Orçamento grátis" },
];

/** Barra de confiança — mata a desconfiança logo no 1º scroll (PRD seção 2). */
export function TrustBar() {
  return (
    <div className="border-y border-hairline bg-surface/40">
      <Container>
        <motion.ul
          variants={staggerContainer}
          {...inViewProps}
          className="grid grid-cols-2 gap-x-4 gap-y-5 py-6 md:grid-cols-4"
        >
          {BADGES.map(({ icon: Icon, label }) => (
            <motion.li
              key={label}
              variants={fadeUp}
              className="flex items-center justify-center gap-2.5 text-center"
            >
              <Icon size={20} className="shrink-0 text-brand" aria-hidden />
              <span className="text-sm font-medium text-ink">{label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </div>
  );
}
