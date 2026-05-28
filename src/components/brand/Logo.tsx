import { cn } from "../../lib/cn";

/**
 * Wordmark da HB recriado em SVG (substitui o JPEG de baixa resolução).
 * Monograma geométrico "HB" desenhado em paths — nítido em qualquer escala,
 * sem depender de fonte. "H" em navy profundo, "B" em azul-cobalto (cores da marca).
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
      <svg
        width="40"
        height="40"
        viewBox="0 0 44 44"
        role="img"
        aria-label="HB Comércio e Acessórios"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="hb-badge" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0B1E4D" />
            <stop offset="1" stopColor="#16224A" />
          </linearGradient>
        </defs>
        {/* Badge com borda hairline de marca */}
        <rect x="0.75" y="0.75" width="42.5" height="42.5" rx="11" fill="url(#hb-badge)" stroke="#2563EB" strokeOpacity="0.5" strokeWidth="1.5" />
        {/* "H" — duas hastes + travessão, em texto claro */}
        <rect x="10" y="13" width="3.4" height="18" rx="1" fill="#F4F7FF" />
        <rect x="18.2" y="13" width="3.4" height="18" rx="1" fill="#F4F7FF" />
        <rect x="12.6" y="20.3" width="6.6" height="3.2" fill="#F4F7FF" />
        {/* "B" — haste + duas barrigas, em azul-cobalto */}
        <rect x="25" y="13" width="3.4" height="18" rx="1" fill="#2563EB" />
        <path
          d="M28.4 13h4.2a3.7 3.7 0 0 1 0 7.4h-4.2v-3h4a0.85 0.85 0 0 0 0-1.7h-4V13z"
          fill="#2563EB"
        />
        <path
          d="M28.4 22h4.6a3.85 3.85 0 0 1 0 7.7h-4.6v-3.05h4.4a0.9 0.9 0 0 0 0-1.8h-4.4V22z"
          fill="#2563EB"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-bold leading-none tracking-tight text-ink">
          HB <span className="text-muted">Comércio</span>
        </span>
      )}
    </span>
  );
}
