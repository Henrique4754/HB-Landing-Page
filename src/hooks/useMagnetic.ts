import { useMotionValue, useSpring, type MotionStyle } from "framer-motion";
import { useRichMotion } from "./useParallax";

const SPRING = { stiffness: 220, damping: 22, mass: 0.5 };

/**
 * Botão "magnético": o elemento é atraído na direção do cursor quando ele
 * chega perto, e volta pro lugar com mola ao sair.
 *
 * Amplitude curta de propósito (`pull`, 10px). O charme é o CTA parecer vivo,
 * não fugir do clique — puxão grande faz o usuário errar o alvo, o que num
 * botão de WhatsApp custa conversão.
 *
 * Igual ao tilt: escreve em MotionValue, sem estado, então não re-renderiza
 * por frame. Desliga no toque e sob prefers-reduced-motion.
 */
export function useMagnetic(pull = 10): {
  style: MotionStyle;
  handlers: {
    onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: () => void;
  };
} {
  const allowed = useRichMotion();

  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  if (!allowed) return { style: {}, handlers: {} };

  return {
    style: { x, y },
    handlers: {
      onMouseMove: (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        // -0.5 … 0.5 a partir do centro; ×2 normaliza pra -1 … 1.
        const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        x.set(px * pull);
        y.set(py * pull);
      },
      onMouseLeave: () => {
        x.set(0);
        y.set(0);
      },
    },
  };
}
