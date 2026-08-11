import { useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "framer-motion";

/**
 * Faixa em rolagem infinita.
 *
 * Truque do loop sem emenda: o conteúdo é renderizado DUAS vezes lado a lado e
 * o trilho desliza até -50% da própria largura. No instante em que a primeira
 * cópia sai, a segunda está no pixel onde a primeira começou, então o valor
 * volta pra 0 sem salto visível (é isso que o `wrap` faz).
 *
 * Por que frame a frame em vez de `animate={{ x: [...] }}`: pra poder pausar
 * no hover. A pausa de CSS (`animation-play-state`) não alcança animação do
 * framer-motion, e sem ela o usuário não consegue parar pra ler um logo.
 *
 * A duplicata leva aria-hidden pro leitor de tela não anunciar tudo duas vezes.
 * Máscara nas bordas pra faixa surgir e sumir em vez de "bater" no limite.
 */
export function Marquee({
  children,
  duration = 42,
  className = "",
}: {
  children: ReactNode;
  /** Segundos por volta completa. Maior = mais lento e mais discreto. */
  duration?: number;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  // Em porcentagem da largura do trilho: 0 → -50 é uma volta completa.
  const percent = useMotionValue(0);
  const x = useTransform(percent, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    if (paused || reduceMotion) return;
    // delta vem em ms; 50% de deslocamento é uma volta.
    const step = (delta / 1000) * (50 / duration);
    percent.set(wrap(-50, 0, percent.get() - step));
  });

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        style={{ x }}
        className="flex shrink-0 items-center will-change-transform"
      >
        <div className="flex shrink-0 items-center gap-x-10 pr-10 sm:gap-x-16 sm:pr-16">
          {children}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-x-10 pr-10 sm:gap-x-16 sm:pr-16"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
