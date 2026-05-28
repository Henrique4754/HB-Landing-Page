import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * iPhone reconstruído em CAMADAS SVG (decisão de design: controle total + nítido).
 * Cada camada (tela, chassi, placa+bateria, tampa+câmera) parte "explodida" e se
 * encaixa conforme `progress` vai de 0 → 1. Anima só transform/opacity (sem CLS).
 * As labels mono ("spec sheet" estilo iFixit) somem quando o aparelho se monta.
 *
 * Recebe `progress` como MotionValue para que o scrubbing seja ligado ao scroll
 * (e fixado em 1 sob prefers-reduced-motion — quem decide é o Hero).
 */
export function ExplodedPhone({ progress }: { progress: MotionValue<number> }) {
  // Vetores de "explosão" por camada (deslocam ao longo de um eixo diagonal).
  const backY = useTransform(progress, [0, 1], [-230, 0]);
  const backX = useTransform(progress, [0, 1], [-34, 0]);
  const backRot = useTransform(progress, [0, 1], [-7, 0]);

  const boardY = useTransform(progress, [0, 1], [-78, 0]);
  const boardX = useTransform(progress, [0, 1], [-12, 0]);
  const boardRot = useTransform(progress, [0, 1], [-3.5, 0]);

  const frameY = useTransform(progress, [0, 1], [80, 0]);
  const frameX = useTransform(progress, [0, 1], [12, 0]);
  const frameRot = useTransform(progress, [0, 1], [3.5, 0]);

  const screenY = useTransform(progress, [0, 1], [236, 0]);
  const screenX = useTransform(progress, [0, 1], [34, 0]);
  const screenRot = useTransform(progress, [0, 1], [7, 0]);

  // Labels só aparecem enquanto está explodido; somem na primeira metade da montagem.
  const labelOpacity = useTransform(progress, [0, 0.55], [1, 0]);
  // A tela "acende" quando o aparelho fica inteiro.
  const screenGlow = useTransform(progress, [0.6, 1], [0, 1]);

  return (
    <svg
      viewBox="0 0 360 620"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Vista explodida de um iPhone que se monta conforme a página rola"
    >
      <defs>
        <linearGradient id="screen-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16224A" />
          <stop offset="1" stopColor="#0B1430" />
        </linearGradient>
        <linearGradient id="screen-on" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563EB" stopOpacity="0.55" />
          <stop offset="1" stopColor="#25D366" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2A3A66" />
          <stop offset="0.5" stopColor="#16224A" />
          <stop offset="1" stopColor="#2A3A66" />
        </linearGradient>
      </defs>

      {/* ---------- CAMADA 1 — Tampa traseira + módulo de câmera ---------- */}
      <motion.g style={{ x: backX, y: backY, rotate: backRot }}>
        <rect x="100" y="120" width="160" height="340" rx="34" fill="#0F1830" stroke="#2563EB" strokeOpacity="0.45" strokeWidth="1.5" />
        {/* Módulo de câmera (3 lentes + flash) */}
        <rect x="116" y="136" width="58" height="58" rx="16" fill="#0B1430" stroke="#2563EB" strokeOpacity="0.55" strokeWidth="1.5" />
        <circle cx="133" cy="153" r="9" fill="#16224A" stroke="#2563EB" strokeOpacity="0.7" />
        <circle cx="157" cy="153" r="9" fill="#16224A" stroke="#2563EB" strokeOpacity="0.7" />
        <circle cx="133" cy="177" r="9" fill="#16224A" stroke="#2563EB" strokeOpacity="0.7" />
        <circle cx="159" cy="177" r="4" fill="#9DAAC6" />
        <motion.g style={{ opacity: labelOpacity }}>
          <line x1="260" y1="150" x2="300" y2="150" stroke="#2563EB" strokeOpacity="0.6" strokeWidth="1" />
          <text x="304" y="154" fill="#9DAAC6" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="1">CÂMERA</text>
        </motion.g>
      </motion.g>

      {/* ---------- CAMADA 2 — Placa lógica + bateria ---------- */}
      <motion.g style={{ x: boardX, y: boardY, rotate: boardRot }}>
        <rect x="112" y="132" width="136" height="316" rx="26" fill="#0B1430" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1.5" />
        {/* Placa lógica (chips + trilhas) */}
        <rect x="124" y="150" width="112" height="86" rx="8" fill="#0F1830" stroke="#2563EB" strokeOpacity="0.4" />
        <rect x="134" y="162" width="26" height="26" rx="4" fill="#16224A" stroke="#2563EB" strokeOpacity="0.6" />
        <rect x="168" y="162" width="20" height="20" rx="3" fill="#16224A" stroke="#2563EB" strokeOpacity="0.6" />
        <rect x="196" y="162" width="30" height="14" rx="3" fill="#16224A" stroke="#2563EB" strokeOpacity="0.5" />
        <line x1="134" y1="200" x2="226" y2="200" stroke="#2563EB" strokeOpacity="0.35" />
        <line x1="134" y1="210" x2="210" y2="210" stroke="#2563EB" strokeOpacity="0.35" />
        <line x1="134" y1="220" x2="226" y2="220" stroke="#2563EB" strokeOpacity="0.35" />
        {/* Bateria */}
        <rect x="124" y="248" width="112" height="184" rx="12" fill="#0F1830" stroke="#25D366" strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="124" y="248" width="112" height="120" rx="12" fill="#25D366" fillOpacity="0.08" />
        <text x="180" y="345" fill="#25D366" fillOpacity="0.7" fontSize="13" fontFamily="JetBrains Mono, monospace" textAnchor="middle">100%</text>
        <motion.g style={{ opacity: labelOpacity }}>
          <line x1="100" y1="190" x2="60" y2="190" stroke="#2563EB" strokeOpacity="0.6" strokeWidth="1" />
          <text x="56" y="194" fill="#9DAAC6" fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="end" letterSpacing="1">PLACA</text>
          <line x1="100" y1="330" x2="60" y2="330" stroke="#25D366" strokeOpacity="0.6" strokeWidth="1" />
          <text x="56" y="334" fill="#9DAAC6" fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="end" letterSpacing="1">BATERIA</text>
        </motion.g>
      </motion.g>

      {/* ---------- CAMADA 3 — Chassi / mid-frame (rails + botões) ---------- */}
      <motion.g style={{ x: frameX, y: frameY, rotate: frameRot }}>
        <rect x="104" y="124" width="152" height="332" rx="32" fill="none" stroke="url(#metal)" strokeWidth="5" />
        {/* Botões laterais */}
        <rect x="100" y="190" width="5" height="40" rx="2.5" fill="#2A3A66" />
        <rect x="100" y="240" width="5" height="26" rx="2.5" fill="#2A3A66" />
        <rect x="255" y="200" width="5" height="52" rx="2.5" fill="#2A3A66" />
        <motion.g style={{ opacity: labelOpacity }}>
          <line x1="256" y1="300" x2="300" y2="300" stroke="#2563EB" strokeOpacity="0.6" strokeWidth="1" />
          <text x="304" y="304" fill="#9DAAC6" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="1">CHASSI</text>
        </motion.g>
      </motion.g>

      {/* ---------- CAMADA 4 — Tela / frente (fica por cima quando montado) ---------- */}
      <motion.g style={{ x: screenX, y: screenY, rotate: screenRot }}>
        <rect x="100" y="120" width="160" height="340" rx="34" fill="url(#screen-fill)" stroke="#2563EB" strokeOpacity="0.6" strokeWidth="1.5" />
        {/* Brilho da tela "ligada" ao montar */}
        <motion.rect x="108" y="128" width="144" height="324" rx="28" fill="url(#screen-on)" style={{ opacity: screenGlow }} />
        {/* Dynamic Island */}
        <rect x="155" y="136" width="50" height="14" rx="7" fill="#070B18" />
        <motion.g style={{ opacity: labelOpacity }}>
          <line x1="100" y1="430" x2="60" y2="430" stroke="#2563EB" strokeOpacity="0.6" strokeWidth="1" />
          <text x="56" y="434" fill="#9DAAC6" fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="end" letterSpacing="1">TELA</text>
        </motion.g>
      </motion.g>
    </svg>
  );
}
