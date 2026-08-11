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
import { Marquee } from "../ui/Marquee";
import { fadeUp, inViewProps } from "../../lib/motion";

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
          {/* Rolagem infinita: com 12 marcas a faixa estática ocupava duas
              linhas quebradas e morria na página. Em movimento ela lê como
              "atendemos muita marca" e ainda resolve o layout. */}
          <motion.div variants={fadeUp} {...inViewProps} className="mt-6">
            <Marquee>
              {BRANDS.map((brand) => (
                <svg
                  key={brand.title}
                  role="img"
                  aria-label={brand.title}
                  viewBox="0 0 24 24"
                  className="h-6 w-auto shrink-0 fill-muted/70 transition-colors duration-200 hover:fill-ink sm:h-7"
                >
                  <title>{brand.title}</title>
                  <path d={brand.path} />
                </svg>
              ))}
            </Marquee>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
