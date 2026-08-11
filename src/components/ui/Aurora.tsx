import { motion } from "framer-motion";

/**
 * Fundo "aurora" — manchas de cor da marca que derivam devagar, dando vida ao
 * fundo sem competir com o conteúdo.
 *
 * Por que é barato: são 3 divs com radial-gradient animadas só por
 * transform/opacity na GPU. Sem `filter: blur()` (que é caro em área grande) —
 * o borrão vem da própria suavidade do gradiente.
 *
 * Durações propositalmente primas entre si (19s/26s/31s): se fossem múltiplas,
 * as manchas sincronizariam e o olho leria o loop. Assim o padrão nunca
 * se repete de forma perceptível.
 *
 * O MotionConfig (main.tsx) congela tudo isso sob prefers-reduced-motion.
 */
const BLOBS = [
  {
    color: "rgba(37,99,235,0.28)", // brand
    className: "left-[8%] top-[-18%] size-[46rem]",
    duration: 19,
    x: [0, 70, -30, 0],
    y: [0, 50, 30, 0],
    scale: [1, 1.12, 0.95, 1],
  },
  {
    color: "rgba(11,30,77,0.55)", // brand-deep
    className: "right-[-12%] top-[6%] size-[40rem]",
    duration: 26,
    x: [0, -60, 40, 0],
    y: [0, 40, -30, 0],
    scale: [1, 0.92, 1.1, 1],
  },
  {
    color: "rgba(37,211,102,0.14)", // verde do CTA, bem discreto
    className: "left-[38%] bottom-[-24%] size-[34rem]",
    duration: 31,
    x: [0, 50, -40, 0],
    y: [0, -40, 20, 0],
    scale: [1, 1.08, 0.96, 1],
  },
];

export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${blob.className}`}
          style={{
            background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 68%)`,
          }}
          animate={{ x: blob.x, y: blob.y, scale: blob.scale }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
