import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CtaButton } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, inViewProps } from "../../lib/motion";
import { wa } from "../../lib/site";
import { trackConversion } from "../../lib/analytics";
import { cn } from "../../lib/cn";

type Errors = { name?: string; phone?: string };

/**
 * Formulário — captura quem não quer falar agora (PRD seção 9).
 * Sem backend: monta uma mensagem wa.me pré-preenchida e abre o WhatsApp.
 * Validação inline no blur; estado de loading -> sucesso; erros com aria-live.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [device, setDevice] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Diz seu nome pra gente te chamar.";
    // Telefone: ao menos 10 dígitos (DDD + número)
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) next.phone = "Coloca um telefone com DDD válido.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Foca o primeiro campo inválido (acessibilidade)
      document.getElementById(next.name ? "form-name" : "form-phone")?.focus();
      return;
    }

    const message =
      `Olá! Meu nome é ${name.trim()}. ` +
      `Telefone: ${phone.trim()}.` +
      (device.trim() ? ` Aparelho/problema: ${device.trim()}.` : "") +
      " Gostaria de um orçamento.";

    trackConversion("form_submit", "contact_form");

    // Abre o WhatsApp SÍNCRONO no clique — em setTimeout o bloqueador de popup
    // barraria por quebrar o "user gesture". Se mesmo assim vier null, navega na aba.
    const url = wa(message);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
    setStatus("success");
  }

  const fieldClass = (hasError?: string) =>
    cn(
      "w-full rounded-xl border bg-base/60 px-4 py-3 text-base text-ink placeholder:text-muted/60",
      "min-h-[48px] transition-colors focus:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40",
      hasError ? "border-red-400/70" : "border-hairline",
    );

  return (
    <Section id="contato" labelledBy="form-title" className="scroll-mt-20">
      <Container>
        <div className="mx-auto max-w-xl">
          <SectionHeading
            id="form-title"
            eyebrow="Contato"
            title="Prefere que a gente te chame?"
            subtitle="Deixa seu contato e a gente retorna rapidinho com seu orçamento."
          />

          <motion.div
            variants={fadeUp}
            {...inViewProps}
            className="mt-10 rounded-2xl border border-hairline bg-surface p-6 sm:p-8"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
                <CheckCircle2 size={48} className="text-cta" />
                <h3 className="font-display text-xl font-semibold text-ink">
                  Abrimos o WhatsApp pra você!
                </h3>
                <p className="text-sm text-muted">
                  Se não abriu, é só chamar a gente direto. A gente responde rapidinho.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="text-sm font-medium text-ink">
                    Nome <span className="text-cta">*</span>
                  </label>
                  <input
                    id="form-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setErrors((p) => ({ ...p, ...validate() }))}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "form-name-error" : undefined}
                    className={fieldClass(errors.name)}
                    placeholder="Seu nome"
                  />
                  {errors.name && (
                    <p id="form-name-error" role="alert" className="text-sm text-red-300">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-phone" className="text-sm font-medium text-ink">
                    Telefone (WhatsApp) <span className="text-cta">*</span>
                  </label>
                  <input
                    id="form-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setErrors((p) => ({ ...p, ...validate() }))}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "form-phone-error" : undefined}
                    className={fieldClass(errors.phone)}
                    placeholder="(22) 99999-9999"
                  />
                  {errors.phone && (
                    <p id="form-phone-error" role="alert" className="text-sm text-red-300">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-device" className="text-sm font-medium text-ink">
                    Qual aparelho e qual o problema?{" "}
                    <span className="text-muted">(opcional)</span>
                  </label>
                  <textarea
                    id="form-device"
                    name="device"
                    rows={3}
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className={cn(fieldClass(), "resize-none")}
                    placeholder="Ex.: iPhone 12 com a tela trincada"
                  />
                </div>

                <CtaButton type="submit" disabled={status === "loading"} className="w-full">
                  {status === "loading" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Abrindo WhatsApp…
                    </>
                  ) : (
                    <>
                      <WhatsAppGlyph size={20} />
                      Quero meu orçamento
                    </>
                  )}
                </CtaButton>

                <p className="text-center text-xs text-muted">
                  Sem spam. Usamos seu contato só pra te responder.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
