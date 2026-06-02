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

// No MOBILE as animações de scroll-reveal são desligadas: o conteúdo aparece
// direto (estático), garantindo zero flicker — versão enxuta pedida pro
// celular. No DESKTOP mantemos o reveal com fade + sobe (e stagger).

// Bloco/card que anima sozinho (não é filho de um container com stagger).
export const revealUnit: Variants = isMobile
  ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

// Filho de um container com stagger.
export const fadeUp: Variants = isMobile
  ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

// Container que revela os filhos (desktop: orquestra o stagger).
export const staggerContainer: Variants = isMobile
  ? { hidden: {}, show: {} }
  : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };

// Props padrão para revelar ao entrar na viewport (uma vez só).
export const inViewProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2 },
} as const;
