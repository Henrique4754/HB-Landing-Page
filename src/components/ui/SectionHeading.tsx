import { motion } from "framer-motion";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { cn } from "../../lib/cn";

/**
 * Cabeçalho de seção reutilizável: eyebrow mono opcional + título + subtítulo.
 * Entra com fade-up em stagger ao aparecer na viewport.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      {...inViewProps}
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="spec-label text-xs text-brand"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        id={id}
        variants={fadeUp}
        className="max-w-2xl text-[clamp(1.75rem,5vw,2.75rem)] text-ink"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
