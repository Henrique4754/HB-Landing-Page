import { useEffect } from "react";
import Lenis from "lenis";
import { richMotionQueries } from "../lib/motion-env";

// Compensa a nav fixa ao rolar por âncoras (casa com scroll-padding-top: 5rem).
const NAV_OFFSET = 80;

/**
 * Scroll suave com inércia (estilo "premium") na rodinha do mouse.
 *
 * Só roda no DESKTOP (ponteiro fino = mouse/trackpad) e NUNCA quando o usuário
 * pede "reduzir movimento" — coerente com o resto do site, que respeita
 * prefers-reduced-motion de propósito. No celular fica o scroll nativo (Lenis
 * não suaviza toque), então mobile não muda.
 *
 * Ajuste de intensidade: `lerp` menor = mais suave/amortecido (mais "lento" pra
 * acompanhar giros rápidos). 0.1 ~ leve, 0.08 ~ médio, 0.06 ~ bem deslizante.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const queries = richMotionQueries();
    if (!queries) return;
    const { reduce, finePointer } = queries;
    if (reduce.matches || !finePointer.matches) return;

    const lenis = new Lenis({
      lerp: 0.06,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    let rafId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // Âncoras internas (#topo etc.) passam a usar o scroll suave do Lenis.
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!a) return;
      // Skip-link de acessibilidade fica nativo (precisa mover o foco do teclado).
      if (a.classList.contains("sr-only")) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -NAV_OFFSET });
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
