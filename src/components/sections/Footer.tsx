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
  ADDRESS_SHORT,
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
            Busca e leva em Campos dos Goytacazes.
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
            className="inline-flex items-start gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>
              {ADDRESS_SHORT}
              <br />
              Campos dos Goytacazes/RJ
            </span>
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
          {/*
            Reforço SEO local — bairros atendidos em Campos dos Goytacazes.
            Cobre buscas long-tail por bairro ("conserto celular Pelinca",
            "assistência técnica Parque Califórnia" etc).
          */}
          <p className="text-xs leading-relaxed text-muted/80">
            <span className="font-medium text-muted">Bairros atendidos em Campos dos
            Goytacazes:</span> Centro, Pelinca, Parque Califórnia, Lapa,
            Custodópolis, Penha, Parque Tamandaré, Goytacazes e demais bairros da
            cidade.
          </p>
        </div>
      </Container>

      <div className="border-t border-hairline">
        <Container className="flex flex-col items-center gap-1.5 py-6">
          <p className="text-center text-xs text-muted">
            © {year} Henrique Braga de Carvalho · HB Comércio &amp; Acessórios ·{" "}
            <a
              href="/privacidade.html"
              className="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink"
            >
              Política de Privacidade
            </a>
          </p>
          <p className="text-center text-xs text-muted">
            Feito por{" "}
            <a
              href="https://www.henriquebraga.dev.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink/90 underline decoration-dotted underline-offset-2 transition-colors hover:text-brand"
            >
              Henrique Braga Dev
            </a>
          </p>
          {/*
            Atribuição obrigatória do modelo 3D usado no hero (licença CC BY 4.0).
            Mantém autor, link da fonte e link da licença visíveis conforme
            exigido por creativecommons.org/licenses/by/4.0.
          */}
          <p className="text-center text-[11px] text-muted/70">
            Modelo 3D{" "}
            <a
              href="https://skfb.ly/o7QrM"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted hover:text-ink"
            >
              "iPhone 12 Teardown"
            </a>{" "}
            por Peter_D, sob{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer license"
              className="underline decoration-dotted hover:text-ink"
            >
              CC BY 4.0
            </a>
            .
          </p>
        </Container>
      </div>
    </footer>
  );
}
