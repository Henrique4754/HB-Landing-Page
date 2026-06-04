import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { useScrolled } from "../../hooks/useScrolled";
import { trackConversion } from "../../lib/analytics";
import { WA } from "../../lib/site";
import { cn } from "../../lib/cn";

/**
 * Botão flutuante de WhatsApp (só desktop): fica sempre à mão no canto inferior
 * direito. No mobile esse papel é da MobileActionBar, então aqui é `hidden lg:flex`.
 * Aparece depois de sair do hero (mesmo gatilho da barra mobile) pra não competir
 * com o CTA principal logo de cara.
 */
export function DesktopWhatsAppFab() {
  const visible = useScrolled(400);

  return (
    <a
      href={WA.generic}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={() => trackConversion("whatsapp_click", "desktop_fab")}
      className={cn(
        "group fixed bottom-6 right-6 z-40 hidden items-center gap-3 lg:flex",
        "rounded-full bg-cta px-5 py-4 font-semibold text-cta-ink glow-cta",
        "transition-[transform,opacity] duration-300 ease-out-expo hover:scale-[1.03]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppGlyph size={24} />
      {/* Rótulo que expande no hover — colapsado por padrão pra ocupar pouco espaço */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-base leading-none opacity-0 transition-[max-width,opacity] duration-300 ease-out-expo group-hover:max-w-[12rem] group-hover:opacity-100">
        Chamar no WhatsApp
      </span>
    </a>
  );
}
