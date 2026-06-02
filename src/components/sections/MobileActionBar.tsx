import { Phone } from "lucide-react";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { useScrolled } from "../../hooks/useScrolled";
import { WA, PHONE_TEL } from "../../lib/site";
import { cn } from "../../lib/cn";

/**
 * Barra fixa inferior (só mobile): WhatsApp + Ligar sempre à mão.
 * Aparece depois de sair do hero. O padding-bottom reservado no App evita
 * que ela cubra o conteúdo (footer).
 */
export function MobileActionBar() {
  const visible = useScrolled(200);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transform-gpu lg:hidden",
        "border-t border-hairline bg-base/95",
        "px-4 pb-[env(safe-area-inset-bottom)] transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-3 py-3">
        <CtaLink
          href={WA.generic}
          event="whatsapp_click"
          location="mobile_bar"
          className="flex-1"
        >
          <WhatsAppGlyph size={20} />
          WhatsApp
        </CtaLink>
        <CtaLink
          href={PHONE_TEL}
          variant="secondary"
          event="call_click"
          location="mobile_bar"
          external={false}
          className="flex-1"
        >
          <Phone size={18} />
          Ligar
        </CtaLink>
      </div>
    </div>
  );
}
