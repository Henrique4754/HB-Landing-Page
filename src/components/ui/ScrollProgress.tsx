import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra de progresso de leitura, colada na base da nav fixa.
 *
 * O spring é o detalhe que importa: ligar a barra direto no scroll faz ela
 * tremer junto com a inércia do Lenis. Amortecida, ela "persegue" o scroll e
 * fica fluida.
 *
 * `transformOrigin: left` + scaleX (em vez de width) mantém a animação na GPU,
 * sem recalcular layout a cada frame.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-50 h-[2px] origin-left bg-gradient-to-r from-brand via-brand to-cta sm:top-[72px]"
    />
  );
}
