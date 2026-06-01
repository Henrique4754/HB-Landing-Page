import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/**
 * Wrapper semântico de seção com ritmo vertical padrão (clamp 64–120px).
 * `id` alimenta as âncoras da nav; `aria-labelledby` melhora a navegação por leitor de tela.
 */
export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-[clamp(3rem,8vw,7.5rem)]", className)}
    >
      {children}
    </section>
  );
}
