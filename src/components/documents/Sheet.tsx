import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/**
 * Folha A4 retrato — raiz de qualquer documento da HB (orçamento, laudo, OS, recibo).
 *
 * A faixa navy sangra de borda a borda no topo: é o único elemento que ignora a
 * margem, e é ela que identifica a papelaria à distância. Fundo branco explícito
 * (não herdado) porque o resto do app roda em tema escuro — sem isso a folha
 * puxaria o grafite da landing.
 */
export function Sheet({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "w-[210mm] min-h-[297mm] bg-doc-paper text-doc-ink font-sans",
        "flex flex-col overflow-hidden",
        // Sombra só na visualização em tela; na impressão ela some (print:shadow-none).
        "shadow-[0_2px_24px_rgba(0,0,0,0.18)] print:shadow-none",
        className,
      )}
    >
      <div className="h-[6mm] shrink-0 bg-doc-bar" />
      <div className="flex flex-1 flex-col px-[18mm] pt-[14mm] pb-[16mm]">
        {children}
      </div>
    </article>
  );
}
