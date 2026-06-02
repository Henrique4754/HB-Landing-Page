import type { Variants } from "framer-motion";

/**
 * Variantes de animação compartilhadas. Animamos só transform/opacity
 * (performático, sem layout shift). O MotionConfig em main.tsx já reduz
 * essas animações sob prefers-reduced-motion.
 *
 * Estratégia mobile (anti-flicker): no desktop cada filho entra com stagger
 * (várias camadas animando em sequência). No mobile isso causava flicker de
 * compositing (muitas camadas de opacity/transform durante o scroll). Então
 * no mobile cada BLOCO anima como UMA camada só (o container faz o fade-up e
 * os filhos ficam estáticos). Mantém a animação de entrada, sem o churn.
 * `isMobile` é avaliado uma vez no load — tipo de device não muda na sessão.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 1023px)").matches;

// Bloco/card que anima sozinho (não é filho de um container com stagger).
// Igual nos dois ambientes: fade + sobe, como uma unidade.
export const revealUnit: Variants = {
  hidden: { opacity: 0, y: isMobile ? 16 : 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Filho de um container com stagger.
// Desktop: entra com fade + sobe (individual). Mobile: estático (quem anima é
// o container, como uma camada só).
export const fadeUp: Variants = isMobile
  ? { hidden: {}, show: {} }
  : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

// Container que revela os filhos.
// Desktop: só orquestra o stagger (não anima a si mesmo). Mobile: anima a si
// mesmo como uma unidade (fade + sobe) e os filhos vêm junto, numa camada só.
export const staggerContainer: Variants = isMobile
  ? { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }
  : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };

// Props padrão para revelar ao entrar na viewport (uma vez só).
export const inViewProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2 },
} as const;
