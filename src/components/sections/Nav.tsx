import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Container } from "../ui/Container";
import { CtaLink } from "../ui/Button";
import { Logo } from "../brand/Logo";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { WA, PHONE_TEL, PHONE_DISPLAY } from "../../lib/site";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#por-que", label: "Por que a HB" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "/blog/", label: "Blog" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-base/80 backdrop-blur-xl">

      {/*
        gap-6 aqui é o piso de separação ENTRE os três grupos (logo, menu,
        botões). Precisa ser maior que o gap interno do menu (gap-5), senão o
        logo parece colado no primeiro link e os grupos não se lêem como grupos.
      */}
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-[72px]">
        <a href="#topo" aria-label="Início — HB Assistência Técnica" className="rounded-lg">
          <Logo />
        </a>

        {/* Âncoras — só no desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/*
            Visibilidade controlada no WRAPPER (span), não no CtaLink: o botão
            tem `inline-flex` no base, que venceria o `hidden` na cascata e faria
            os botões transbordarem no mobile. O span não tem display competindo.
          */}
          {/*
            Telefone direto — só a partir de xl. Entre lg e xl o menu tem 6
            itens e não sobra largura pros dois botões; o WhatsApp (CTA
            primário) tem prioridade, e o telefone segue no rodapé e na barra
            fixa do mobile.
          */}
          <span className="hidden xl:inline-flex">
            <CtaLink
              href={PHONE_TEL}
              variant="secondary"
              event="call_click"
              location="nav"
              external={false}
              className="h-11 min-h-0 px-4 text-sm"
              aria-label={`Ligar para ${PHONE_DISPLAY}`}
            >
              <Phone size={16} />
              <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
              <span className="xl:hidden">Ligar</span>
            </CtaLink>
          </span>

          <span className="hidden sm:inline-flex">
            <CtaLink
              href={WA.generic}
              event="whatsapp_click"
              location="nav"
              className="h-11 min-h-0 px-5 text-sm"
            >
              <WhatsAppGlyph size={18} />
              WhatsApp
            </CtaLink>
          </span>

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

      {/* Painel mobile colapsável — abre/fecha com expand suave (height + fade) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-hairline bg-base/95 backdrop-blur-xl lg:hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
