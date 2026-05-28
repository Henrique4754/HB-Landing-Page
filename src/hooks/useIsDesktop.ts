import { useEffect, useState } from "react";

/**
 * Retorna true em viewports ≥ 1024px (breakpoint `lg` do Tailwind).
 * SSR-safe: começa em `false` e atualiza após mount.
 * Hot path: usado pra decidir entre o hero 3D (desktop) e o hero estático (mobile).
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}
