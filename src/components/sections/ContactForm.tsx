import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, MapPin, Clock } from "lucide-react";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { CtaButton, CtaLink } from "../ui/Button";
import { WhatsAppGlyph } from "../icons/WhatsAppGlyph";
import { fadeUp, inViewProps } from "../../lib/motion";
import { wa, MAPS, MAPS_EMBED, ADDRESS, BUSINESS_HOURS } from "../../lib/site";
import { trackConversion } from "../../lib/analytics";
import { cn } from "../../lib/cn";

type Errors = { name?: string; phone?: string; consent?: string };

/**
 * Formulário — captura quem não quer falar agora (PRD seção 9).
 * Envia o lead pra função serverless /api/lead (Resend manda o e-mail pra HB).
 * Validação inline no blur; estados loading -> sucesso/erro; erros com aria-live.
 * Honeypot oculto (`company`) filtra bots. Em falha de envio, oferece o WhatsApp
 * como fallback pra nenhum lead se perder.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [device, setDevice] = useState("");
  const [company, setCompany] = useState(""); // honeypot anti-spam (sempre vazio)
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Diz seu nome pra gente te chamar.";
    // Telefone: ao menos 10 dígitos (DDD + número)
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) next.phone = "Coloca um telefone com DDD válido.";
    // LGPD: consentimento explícito antes do envio.
    if (!consent) next.consent = "Confirma a autorização pra gente te chamar.";
    return next;
  }

  // Mensagem de fallback pro WhatsApp se o envio do e-mail falhar.
  const waFallback = wa(
    `Olá! Meu nome é ${name.trim()}. ` +
      `Telefone: ${phone.trim()}.` +
      (device.trim() ? ` Aparelho/problema: ${device.trim()}.` : "") +
      " Gostaria de um orçamento.",
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Foca o primeiro campo inválido (acessibilidade)
      const firstInvalid = next.name
        ? "form-name"
        : next.phone
          ? "form-phone"
          : "form-consent";
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          device: device.trim(),
          consent,
          company, // honeypot — vazio em humanos
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackConversion("form_submit", "contact_form");
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
                  Recebemos seu contato!
                </h3>
                <p className="text-sm text-muted">
                  A gente retorna rapidinho com seu orçamento. Se preferir, já pode
                  chamar no WhatsApp também.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Honeypot: invisível pra humanos, atrai bots. Fora do tab e do leitor de tela. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="form-company">Não preencha este campo</label>
                  <input
                    id="form-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

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
                    onBlur={() => setErrors(validate())}
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
                    onBlur={() => setErrors(validate())}
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

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="form-consent"
                    className="flex cursor-pointer items-start gap-2.5 text-sm text-muted"
                  >
                    <input
                      id="form-consent"
                      name="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (e.target.checked && errors.consent) {
                          setErrors((prev) => ({ ...prev, consent: undefined }));
                        }
                      }}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "form-consent-error" : undefined}
                      className="mt-0.5 size-4 shrink-0 cursor-pointer accent-cta"
                    />
                    <span>
                      Autorizo a HB Assistência Técnica a usar meu nome e telefone só pra
                      me responder. Veja a{" "}
                      <a
                        href="/privacidade.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-dotted underline-offset-2 hover:text-brand"
                      >
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="form-consent-error" role="alert" className="text-sm text-red-300">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-400/70 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  >
                    <p className="font-medium">Ops, não conseguimos enviar agora.</p>
                    <p className="mt-1 text-red-200/90">
                      Tenta de novo em instantes ou fala com a gente direto no WhatsApp.
                    </p>
                    <CtaLink
                      href={waFallback}
                      event="whatsapp_click"
                      location="contact_form_fallback"
                      className="mt-3 w-full"
                    >
                      <WhatsAppGlyph size={20} />
                      Falar no WhatsApp
                    </CtaLink>
                  </div>
                )}

                <CtaButton
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    "Quero meu orçamento"
                  )}
                </CtaButton>

                <p className="text-center text-xs text-muted">
                  Sem spam. Seu contato fica só com a gente.
                </p>
              </form>
            )}
          </motion.div>

          {/* Mapa real — reforça "loja física de verdade" e ajuda no LocalSEO */}
          <motion.div
            variants={fadeUp}
            {...inViewProps}
            className="mt-6 overflow-hidden rounded-2xl border border-hairline bg-surface"
          >
            <div className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <div className="flex flex-col gap-1.5 text-sm">
                <span className="inline-flex items-center gap-2 font-medium text-ink">
                  <MapPin size={16} className="shrink-0 text-brand" aria-hidden />
                  {ADDRESS}
                </span>
                <span className="inline-flex items-center gap-2 text-muted">
                  <Clock size={16} className="shrink-0 text-brand" aria-hidden />
                  {BUSINESS_HOURS}
                </span>
              </div>
              <CtaLink
                href={MAPS}
                variant="secondary"
                event="maps_click"
                location="contact_map"
                className="min-h-[40px] shrink-0 px-4 text-sm"
              >
                <MapPin size={16} />
                Como chegar
              </CtaLink>
            </div>
            <iframe
              src={MAPS_EMBED}
              title="Localização da HB Assistência Técnica no Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-64 w-full border-0 grayscale-[0.2]"
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
