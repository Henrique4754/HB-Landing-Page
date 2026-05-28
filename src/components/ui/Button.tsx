import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { trackConversion, type ConversionEvent } from "../../lib/analytics";

/**
 * Sistema de botões. Variantes (composição, não proliferação de flags):
 *  - whatsapp: ação primária verde (tinta escura p/ contraste AA)
 *  - secondary: ação secundária azul-marca (ligar / formulário)
 *  - ghost: link discreto sobre superfície
 * Tamanho mínimo 44px (tap target). Estados de hover/active só com transform/cor.
 */
export type ButtonVariant = "whatsapp" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "min-h-[48px] px-6 text-base leading-none touch-manipulation " +
  "transition-[transform,background-color,box-shadow,border-color] duration-150 " +
  "active:scale-[0.98] cursor-pointer select-none whitespace-nowrap " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants: Record<ButtonVariant, string> = {
  whatsapp:
    "bg-cta text-cta-ink hover:bg-cta-hover hover:scale-[1.02] glow-cta",
  secondary:
    "border border-brand/55 bg-surface/60 text-ink hover:border-brand hover:bg-surface-2",
  ghost: "text-ink/90 hover:text-ink hover:bg-surface-2",
};

export function buttonClasses(
  variant: ButtonVariant = "whatsapp",
  className?: string,
): string {
  return cn(base, variants[variant], className);
}

/** Props comuns para registrar conversão ao clicar. */
type TrackProps = { event?: ConversionEvent; location?: string };

type CtaLinkProps = {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  /** Link externo abre em nova aba com rel seguro (padrão true para wa.me/tel é tratado). */
  external?: boolean;
} & TrackProps &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "className">;

/** CTA que renderiza um <a> (WhatsApp, ligar, Instagram, âncoras). */
export function CtaLink({
  href,
  variant = "whatsapp",
  children,
  className,
  external = true,
  event,
  location,
  onClick,
  ...rest
}: CtaLinkProps) {
  // tel:/mailto: não devem abrir em nova aba.
  const isProtocol = /^(tel:|mailto:)/.test(href);
  const openNewTab = external && !isProtocol;

  return (
    <a
      href={href}
      target={openNewTab ? "_blank" : undefined}
      rel={openNewTab ? "noopener noreferrer" : undefined}
      className={buttonClasses(variant, className)}
      onClick={(e) => {
        if (event) trackConversion(event, location ?? "unknown");
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

type CtaButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

/** CTA que renderiza um <button> (ex.: submit do formulário). */
export function CtaButton({
  variant = "whatsapp",
  children,
  className,
  type = "button",
  ...rest
}: CtaButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </button>
  );
}
