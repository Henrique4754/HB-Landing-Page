import { motion } from "framer-motion";
import { Phone, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { revealUnit, inViewProps } from "../../lib/motion";
import { WA, PHONE_TEL, PHONE_DISPLAY } from "../../lib/site";

const REFORCO = ["Resposta rápida", "Sem compromisso", "Você só paga se aprovar"];

/**
 * CTA final — fecha quem rolou até o fim (PRD seção 11).
 * O card inteiro anima como UMA unidade (fadeUp). Antes era staggerContainer:
 * o card ficava visível e só o conteúdo dava fade, deixando uma moldura vazia
 * (~480px) antes do reveal disparar — o "espaço enorme" no fim no mobile.
 */
export function FinalCTA() {
  return (
    <Section className="relative overflow-hidden">
      <Container>
        <motion.div
          variants={revealUnit}
          {...inViewProps}
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 overflow-hidden rounded-3xl border border-hairline bg-surface px-6 py-14 text-center sm:px-12"
        >
          {/* Glow de marca contido atrás do card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 0%, rgba(37,211,102,0.14), transparent 70%)",
            }}
          />
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] text-ink">
            Seu aparelho não precisa ficar parado.
          </h2>
          <p className="max-w-xl text-base text-muted sm:text-lg">
            Orçamento grátis, garantia de 90 dias e conserto rápido. Manda uma
            mensagem agora que a gente resolve.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {/* Pulso sutil só aqui (respeita reduced-motion via CSS) */}
            <CtaLink href={WA.generic} event="whatsapp_click" location="final_cta" className="cta-pulse">
              <WhatsAppGlyph size={20} />
              Manda mensagem agora
            </CtaLink>
            <CtaLink
              href={PHONE_TEL}
              variant="secondary"
              event="call_click"
              location="final_cta"
              external={false}
            >
              <Phone size={18} />
              Ou ligue: {PHONE_DISPLAY}
            </CtaLink>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted">
            {REFORCO.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check size={15} className="text-cta" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </Section>
  );
}
