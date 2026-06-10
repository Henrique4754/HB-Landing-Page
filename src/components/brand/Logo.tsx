import { cn } from "../../lib/cn";

/**
 * Logo oficial da HB Assistência Técnica e Acessórios.
 * Asset SVG vetorial em public/logo.svg — escala sem perder qualidade em
 * qualquer DPI. O SVG vem com fundo branco embutido, então fica como um
 * badge quadrado sobre o navy do tema.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Wrapper overflow-hidden + scale na img: dá zoom no HB sem mexer no tamanho do badge */}
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-md bg-white">
        <img
          src="/logo.svg"
          alt="HB Assistência Técnica e Acessórios"
          width={40}
          height={40}
          className="size-10 scale-[1.18] object-contain"
          loading="eager"
          fetchPriority="high"
        />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-bold leading-none tracking-tight text-ink">
          HB <span className="text-muted">Assistência Técnica</span>
        </span>
      )}
    </span>
  );
}
