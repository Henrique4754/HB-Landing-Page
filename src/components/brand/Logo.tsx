import { cn } from "../../lib/cn";

/**
 * Logo oficial da HB Comércio & Acessórios.
 * Asset PNG transparente em public/logo.png — fundo branco original do JPEG
 * foi removido via alpha matting (scripts/process_logo.js) pra encaixar
 * limpo sobre o navy do tema.
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
      <img
        src="/logo.png"
        alt="HB Comércio e Acessórios"
        width={40}
        height={40}
        className="size-10 shrink-0 object-contain"
        loading="eager"
        fetchPriority="high"
      />
      {showWordmark && (
        <span className="font-display text-lg font-bold leading-none tracking-tight text-ink">
          HB <span className="text-muted">Comércio</span>
        </span>
      )}
    </span>
  );
}
