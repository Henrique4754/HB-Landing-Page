import type { Variants } from "framer-motion";

/**
 * Sistema de motion do site — personalidade "Premium" (elegante, controlado,
 * sem overshoot). Três constantes definem a identidade e valem pra 100% das
 * animações; se precisar de algo novo, componha a partir daqui em vez de
 * inventar curva/duração solta.
 *
 *  1. Curva assinatura: EASE (espelha --ease-out-expo do index.css)
 *  2. Paleta de durações: DUR (quick / standard / slow)
 *  3. Padrão de entrada: subir + fade (fadeUp)
 *
 * Animamos só transform/opacity (performático, sem layout shift). O MotionConfig
 * em main.tsx já reduz tudo isso sob prefers-reduced-motion.
 */

/** Curva assinatura — mesma do token CSS `--ease-out-expo`. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Paleta de durações (segundos). Premium = entradas de 350–600ms. */
export const DUR = {
  /** Micro-feedback: hover, ícone, cor. */
  quick: 0.15,
  /** Padrão: cards, painéis, entrada de conteúdo. */
  standard: 0.35,
  /** Revelação com peso: hero, seções grandes. */
  slow: 0.55,
} as const;

const transition = { duration: DUR.slow, ease: EASE };

// Entrada padrão: sobe + fade.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
};

// Entrada de card em grade: escala a partir de 96% + sobe + fade. A escala dá
// a sensação de "chegar de frente" que o fade puro não entrega (a skill de
// motion trata opacity-only como animação sem camada secundária).
export const cardIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR.standard, ease: EASE },
  },
};

// Container que escalona a entrada dos filhos (stagger 30–50ms — PRD §5).
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

// Stagger de grade, em ordem de leitura. 6 cards × 70ms = 420ms — dentro do
// orçamento de 500ms; passar disso faz a última célula parecer atrasada.
export const staggerGrid: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

// Revelação de headline linha a linha: a linha sobe de trás de uma máscara.
// O pai precisa de `overflow-hidden` — é ele que corta a linha enquanto ela
// entra. Um pouco mais lenta que o padrão porque é o gesto de abertura da
// página e ela carrega peso.
export const lineMask: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.75, ease: EASE } },
};

// Container das linhas da headline: intervalo maior que o stagger comum, pra
// cada linha ser lida como uma frase e não como um bloco só.
export const staggerLines: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

// Props padrão para revelar ao entrar na viewport (uma vez só).
export const inViewProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2 },
} as const;
