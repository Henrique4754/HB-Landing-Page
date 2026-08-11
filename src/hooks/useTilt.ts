import { useMotionValue, useSpring, type MotionStyle } from "framer-motion";
import { useRichMotion } from "./useParallax";

const SPRING = { stiffness: 260, damping: 30, mass: 0.6 };

/**
 * Inclinação 3D sutil seguindo o mouse — o "3D" que roda em qualquer máquina,
 * porque é só transform na GPU (sem WebGL, sem canvas, sem download de modelo).
 *
 * Usa MotionValue direto: o mousemove escreve no valor sem passar por estado
 * do React, então não há re-render por frame (o ponto fraco das versões que
 * usam useState — com 6 cards na tela isso engasga).
 *
 * `max` em graus. 6° é o teto do "premium": acima disso o card parece de
 * borracha e a atenção sai do conteúdo. Desliga no toque e sob
 * prefers-reduced-motion.
 */
export function useTilt(max = 6): {
  style: MotionStyle;
  handlers: {
    onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: () => void;
  };
} {
  const allowed = useRichMotion();

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  if (!allowed) return { style: {}, handlers: {} };

  return {
    style: { rotateX, rotateY, transformPerspective: 900 },
    handlers: {
      onMouseMove: (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        // -0.5 … 0.5 a partir do centro do card.
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        // Y do mouse inclina no eixo X (e invertido: mouse em cima = topo
        // afastando), X do mouse inclina no eixo Y.
        rotateX.set(-py * 2 * max);
        rotateY.set(px * 2 * max);
      },
      onMouseLeave: () => {
        rotateX.set(0);
        rotateY.set(0);
      },
    },
  };
}
