import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "../ui/Container";
import { CtaLink } from "../ui/Button";
import { Logo } from "../brand/Logo";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { useScrolled } from "../../hooks/useScrolled";
import { WA } from "../../lib/site";
import { cn } from "../../lib/cn";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#por-que", label: "Por que a HB" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const scrolled = useScrolled(80);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        // Transparente sobre o hero -> ganha fundo glass após 80px (PRD §5)
        scrolled
          ? "border-b border-hairline bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <a href="#topo" aria-label="Início — HB Comércio" className="rounded-lg">
          <Logo />
        </a>

        {/* Âncoras — só no desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink
            href={WA.generic}
            event="whatsapp_click"
            location="nav"
            className="hidden h-11 min-h-0 px-5 text-sm sm:inline-flex"
          >
            <WhatsAppGlyph size={18} />
            WhatsApp
          </CtaLink>

          {/* Botão de menu — só no mobile */}
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-hairline text-ink lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Painel mobile colapsável */}
      {open && (
        <div className="border-t border-hairline bg-base/95 backdrop-blur-xl lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface-2"
              >
                {link.label}
              </a>
            ))}
            <CtaLink
              href={WA.generic}
              event="whatsapp_click"
              location="nav_mobile"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              <WhatsAppGlyph size={18} />
              Chamar no WhatsApp
            </CtaLink>
          </Container>
        </div>
      )}
    </header>
  );
}
