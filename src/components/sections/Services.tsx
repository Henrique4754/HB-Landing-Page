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
import { CtaLink } from "../ui/Button";
import { fadeUp, inViewProps, staggerContainer } from "../../lib/motion";
import { WA } from "../../lib/site";
import type { ConversionEvent } from "../../lib/analytics";

type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
  cta: string;
  href: string;
  location: string;
};

const SERVICES: Service[] = [
  {
    icon: Smartphone,
    title: "Manutenção de Celulares",
    body: "Tela quebrada, bateria viciada, não carrega, molhou? iPhone e Android, todas as marcas. Troca de tela, bateria e conector, com peças de qualidade e garantia.",
    cta: "Orçar meu celular",
    href: WA.celular,
    location: "services_celular",
  },
  {
    icon: Monitor,
    title: "Manutenção de Computadores",
    body: "PC, notebook e Mac travando, lento ou não liga? Formatação, limpeza, upgrade de SSD/memória, montagem e pasta térmica. Rápido de novo.",
    cta: "Orçar meu PC",
    href: WA.pc,
    location: "services_pc",
  },
  {
    icon: Tablet,
    title: "Tablets e iPad",
    body: "Tela trincada, bateria que não segura, conector de carga ou não liga? A gente cuida do seu tablet Android e do iPad.",
    cta: "Orçar meu tablet",
    href: WA.tablet,
    location: "services_tablet",
  },
  {
    icon: Watch,
    title: "Smartwatch e Apple Watch",
    body: "Tela ou vidro trincado e bateria fraca no seu relógio inteligente? Avaliamos e trocamos com cuidado.",
    cta: "Orçar meu relógio",
    href: WA.smartwatch,
    location: "services_smartwatch",
  },
  {
    icon: Gamepad2,
    title: "Videogames e Consoles",
    body: "PlayStation, Xbox e Nintendo. Não liga, superaquece, leitor com defeito, sem imagem (HDMI) ou controle com problema? A gente resolve.",
    cta: "Orçar meu console",
    href: WA.videogame,
    location: "services_videogame",
  },
  {
    icon: MessageCircle,
    title: "Não é nada disso?",
    body: "Fala direto com a gente que a gente resolve, seja qual for o problema do seu aparelho.",
    cta: "Falar com atendente",
    href: WA.atendente,
    location: "services_atendente",
  },
];

/** Serviços — deixa o visitante se identificar (PRD seção 4). */
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
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.title}
              variants={fadeUp}
              className="group flex flex-col rounded-2xl border border-hairline bg-surface p-7 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-brand/70"
            >
              <span className="grid size-12 place-items-center rounded-xl border border-hairline bg-surface-2 text-brand transition-colors group-hover:border-brand/60">
                <s.icon size={24} aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {s.body}
              </p>
              <CtaLink
                href={s.href}
                event={"whatsapp_click" satisfies ConversionEvent}
                location={s.location}
                className="mt-6 w-full"
              >
                {s.cta}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </CtaLink>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
