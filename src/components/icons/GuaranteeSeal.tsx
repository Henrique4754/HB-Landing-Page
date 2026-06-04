/**
 * Selo "90 dias de garantia" — carimbo circular em SVG (não é só texto).
 * Herda a cor via `currentColor`, então dá pra colorir com `text-brand`/`text-cta`.
 * O texto circular usa <textPath> com `textLength` pra preencher o anel exato
 * independente do tamanho da fonte.
 */
export function GuaranteeSeal({
  className,
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label="Selo de garantia de 90 dias"
      className={className}
    >
      {/* Caminho invisível pro texto circular correr em volta */}
      <defs>
        <path
          id="seal-arc"
          d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
        />
      </defs>

      {/* Anéis do carimbo */}
      <circle cx="60" cy="60" r="57" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="60" cy="60" r="51" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />

      {/* Texto circular */}
      <text
        fill="currentColor"
        fontSize="9"
        fontWeight="700"
        letterSpacing="2"
        style={{ textTransform: "uppercase" }}
      >
        <textPath href="#seal-arc" startOffset="0" textLength="289" lengthAdjust="spacing">
          Garantia HB · Conserto com garantia ·
        </textPath>
      </text>

      {/* Estrelinhas separando o início/fim do texto, em cima */}
      <text x="60" y="20" fill="currentColor" fontSize="10" textAnchor="middle">★</text>

      {/* Núcleo: 90 DIAS */}
      <text
        x="60"
        y="62"
        fill="currentColor"
        fontSize="34"
        fontWeight="800"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-display, inherit)" }}
      >
        90
      </text>
      <text
        x="60"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontWeight="700"
        letterSpacing="4"
        textAnchor="middle"
      >
        DIAS
      </text>
    </svg>
  );
}
