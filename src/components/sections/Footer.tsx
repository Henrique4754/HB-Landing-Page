import { Phone, MapPin, Clock } from "lucide-react";
import { Container } from "../ui/Container";
import { Logo } from "../brand/Logo";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { InstagramGlyph } from "../icons/InstagramGlyph";
import { trackConversion } from "../../lib/analytics";
import {
  WA,
  PHONE_TEL,
  PHONE_DISPLAY,
  INSTAGRAM,
  MAPS,
  BUSINESS_HOURS,
} from "../../lib/site";

/** Footer — contato e localização (PRD seção 12). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface/40">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm text-muted">
            Manutenção de celulares e computadores em Campos dos Goytacazes – RJ.
            Busca e leva em Campos e região.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="spec-label text-xs text-brand">Contato</h3>
          <a
            href={WA.generic}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion("whatsapp_click", "footer")}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <WhatsAppGlyph size={16} /> WhatsApp {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_TEL}
            onClick={() => trackConversion("call_click", "footer")}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <Phone size={16} /> Ligar {PHONE_DISPLAY}
          </a>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion("instagram_click", "footer")}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <InstagramGlyph size={16} /> Instagram
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="spec-label text-xs text-brand">Onde &amp; quando</h3>
          <a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <MapPin size={16} /> Campos dos Goytacazes – RJ
          </a>
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <Clock size={16} /> {BUSINESS_HOURS}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="spec-label text-xs text-brand">Atendimento</h3>
          <p className="text-sm text-muted">
            Celulares e computadores · pessoas e empresas · orçamento grátis e sem
            compromisso.
          </p>
        </div>
      </Container>

      <div className="border-t border-hairline">
        <Container className="py-6">
          <p className="text-center text-xs text-muted">
            © {year} Henrique Braga de Carvalho · HB Comércio &amp; Acessórios.
          </p>
        </Container>
      </div>
    </footer>
  );
}
