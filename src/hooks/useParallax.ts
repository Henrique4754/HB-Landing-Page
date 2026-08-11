import { useEffect, useState, type RefObject } from "react";
import { useScroll, useTransform, type MotionStyle } from "framer-motion";
import { richMotionQueries } from "../lib/motion-env";

/**
 * Parallax por scroll para camadas decorativas.
 *
 * Regras seguidas (skill de motion design):
 *  - NUNCA em texto — só fundo/decoração. Texto parado é texto legível.
 *  - Deslocamento total < 100px. Mais que isso vira enjoo, não profundidade.
 *  - Desktop com ponteiro fino apenas, e nunca sob prefers-reduced-motion —
 *    mesma regra do useSmoothScroll, pra o site inteiro se comportar igual.
 *
 * Velocidades sugeridas (proporção do scroll): fundo profundo 0.1x,
 * fundo 0.2x, meio 0.5x. O conteúdo em si é sempre 1.0x (ou seja, sem hook).
 *
 * Retorna um `style` pronto pra espalhar num <motion.*>. Quando o movimento
 * não é permitido, devolve `{}` — o elemento fica estático, sem custo.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance: number,
): MotionStyle {
  const allowed = useRichMotion();

  // "start end" → "end start": progresso 0→1 durante toda a passagem do
  // elemento pela viewport, então o parallax nunca "estoura" nas bordas.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Centrado em zero: o elemento fica na posição neutra no meio da viewport.
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return allowed ? { y } : {};
}

/**
 * `true` quando o usuário está num desktop com ponteiro fino e não pediu
 * redução de movimento. Começa em `false` pra que a primeira pintura seja
 * sempre a estática (nada de "pulo" no carregamento).
 */
export function useRichMotion(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const queries = richMotionQueries();
    if (!queries) return;

    const { reduce, finePointer } = queries;
    const update = () => setAllowed(!reduce.matches && finePointer.matches);
    update();

    reduce.addEventListener("change", update);
    finePointer.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      finePointer.removeEventListener("change", update);
    };
  }, []);

  return allowed;
}
