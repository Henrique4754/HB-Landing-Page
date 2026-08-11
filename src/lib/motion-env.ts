/**
 * Condição única que libera os efeitos "ricos" (scroll suave do Lenis e
 * parallax): desktop com ponteiro fino e sem pedido de redução de movimento.
 *
 * Fica isolado aqui pra que o scroll suave e o parallax nunca divirjam — se um
 * dia a regra mudar, muda num lugar só.
 */
export function richMotionQueries() {
  if (typeof window === "undefined" || !window.matchMedia) return null;
  return {
    reduce: window.matchMedia("(prefers-reduced-motion: reduce)"),
    finePointer: window.matchMedia("(pointer: fine)"),
  };
}
