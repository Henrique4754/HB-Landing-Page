import { motion } from "framer-motion";
import {
  siApple,
  siSamsung,
  siXiaomi,
  siMotorola,
  siLg,
  siDell,
  siLenovo,
  siHp,
  siAsus,
  siAcer,
  siSony,
  siPlaystation,
  type SimpleIcon,
} from "simple-icons";
import { Container } from "../ui/Container";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";

// Marcas reais que a HB atende (celular + computador + console). Só entram as
// que têm logo disponível na lib; a ordem agrupa por categoria.
const BRANDS: SimpleIcon[] = [
  siApple,
  siSamsung,
  siXiaomi,
  siMotorola,
  siLg,
  siDell,
  siLenovo,
  siHp,
  siAsus,
  siAcer,
  siSony,
  siPlaystation,
];

/** Faixa de logos em cinza — "a gente mexe na sua marca também". */
export function BrandStrip() {
  return (
    <div className="border-y border-hairline bg-surface/30">
      <Container>
        <div className="py-9">
          <p className="spec-label text-center text-xs text-muted">
            Marcas que a gente conserta
          </p>
          <motion.ul
            variants={staggerContainer}
            {...inViewProps}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12"
          >
            {BRANDS.map((brand) => (
              <motion.li key={brand.title} variants={fadeUp}>
                <svg
                  role="img"
                  aria-label={brand.title}
                  viewBox="0 0 24 24"
                  className="h-6 w-auto fill-muted/70 transition-colors duration-200 hover:fill-ink sm:h-7"
                >
                  <title>{brand.title}</title>
                  <path d={brand.path} />
                </svg>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </div>
  );
}
