import type { Variants } from "framer-motion";

/**
 * Variantes de animação compartilhadas. Animamos só transform/opacity
 * (performático, sem layout shift). O MotionConfig em main.tsx já reduz
 * essas animações sob prefers-reduced-motion.
 */

// Entrada padrão: sobe + fade (ease-out expressivo).
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Container que escalona a entrada dos filhos (stagger 30–50ms — PRD §5).
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

// Props padrão para revelar ao entrar na viewport (uma vez só).
export const inViewProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2 },
} as const;
