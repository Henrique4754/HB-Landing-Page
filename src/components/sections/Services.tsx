import { motion } from "framer-motion";
import {
  Smartphone,
  Monitor,
  Tablet,
  Watch,
  Gamepad2,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { buttonClasses } from "../ui/Button";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { WA } from "../../lib/site";
import { trackConversion } from "../../lib/analytics";
import { cn } from "../../lib/cn";

type Service = {
  icon: LucideIcon;
  /** Título completo (desktop). */
  title: string;
  /** Rótulo curto (tile compacto no mobile). */
  short: string;
  body: string;
  cta: string;
  href: string;
  location: string;
};

const SERVICES: Service[] = [
  {
    icon: Smartphone,
    title: "Manutenção de Celulares",
    short: "Celulares",
    body: "iPhone e Android, todas as marcas. Tela, bateria, não carrega, molhou ou conector.",
    cta: "Orçar meu celular",
    href: WA.celular,
    location: "services_celular",
  },
  {
    icon: Monitor,
    title: "Manutenção de Computadores",
    short: "Computadores",
    body: "PC, notebook e Mac. Formatação, lentidão, não liga, upgrade de SSD/memória e limpeza.",
    cta: "Orçar meu PC",
    href: WA.pc,
    location: "services_pc",
  },
  {
    icon: Tablet,
    title: "Tablets e iPad",
    short: "Tablets",
    body: "Tablet Android e iPad. Tela, bateria, conector de carga ou não liga.",
    cta: "Orçar meu tablet",
    href: WA.tablet,
    location: "services_tablet",
  },
  {
    icon: Watch,
    title: "Smartwatch e Apple Watch",
    short: "Smartwatch",
    body: "Smartwatch e Apple Watch. Troca de tela, vidro e bateria.",
    cta: "Orçar meu relógio",
    href: WA.smartwatch,
    location: "services_smartwatch",
  },
  {
    icon: Gamepad2,
    title: "Videogames e Consoles",
    short: "Videogames",
    body: "PlayStation, Xbox e Nintendo. Não liga, superaquece, leitor, HDMI ou controle.",
    cta: "Orçar meu console",
    href: WA.videogame,
    location: "services_videogame",
  },
  {
    icon: MessageCircle,
    title: "Não é nada disso?",
    short: "Outro aparelho",
    body: "Fala direto com a gente que a gente resolve, seja qual for o problema do seu aparelho.",
    cta: "Falar com atendente",
    href: WA.atendente,
    location: "services_atendente",
  },
];

/**
 * Serviços — o visitante se identifica pelo aparelho (PRD seção 4).
 * Mobile: grade 2 colunas compacta (ícone + nome), card inteiro é o link →
 * WhatsApp; cabe tudo numa olhada. Desktop: 3 colunas com detalhes + botão.
 */
export function Services() {
  return (
    <Section id="servicos" labelledBy="servicos-title" className="scroll-mt-20">
      <Container>
        <SectionHeading
          id="servicos-title"
          eyebrow="O que a gente resolve"
          title="Qual é o problema do seu aparelho?"
        />

        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-3 md:gap-5"
        >
          {SERVICES.map((s) => (
            <motion.a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion("whatsapp_click", s.location)}
              variants={fadeUp}
              className="group flex flex-col items-center rounded-2xl border border-hairline bg-surface p-4 text-center transition-[translate,border-color,box-shadow] duration-300 ease-out-expo will-change-transform hover:-translate-y-1 hover:border-brand/70 hover:shadow-[0_12px_40px_-12px_rgba(37,99,235,0.35)] md:items-start md:p-7 md:text-left"
            >
              <span className="grid size-11 place-items-center rounded-xl border border-hairline bg-surface-2 text-brand transition-colors duration-300 ease-out-expo group-hover:border-brand/60 md:size-12">
                <s.icon size={22} aria-hidden />
              </span>

              {/* Mobile: rótulo curto. Desktop: título completo. */}
              <h3 className="mt-3 font-display text-sm font-semibold leading-tight text-ink group-hover:text-brand md:hidden">
                {s.short}
              </h3>
              <h3 className="mt-5 hidden font-display text-xl font-semibold text-ink md:block">
                {s.title}
              </h3>

              {/* Detalhes e CTA: só no desktop (no mobile o card todo já é o link). */}
              <p className="mt-3 hidden flex-1 text-sm leading-relaxed text-muted md:block">
                {s.body}
              </p>
              <span className="mt-6 hidden w-full md:block">
                <span className={cn(buttonClasses(), "w-full")}>
                  {s.cta}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
