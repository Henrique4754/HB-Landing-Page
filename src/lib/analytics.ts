import { track as vercelTrack } from "@vercel/analytics";

/**
 * Wrapper fino sobre o Vercel Analytics para registrar conversões.
 * Métrica de sucesso do PRD: cliques em WhatsApp / Ligar / envio de formulário.
 * É no-op em dev (o script de analytics só carrega em produção).
 */
export type ConversionEvent =
  | "whatsapp_click"
  | "call_click"
  | "form_submit"
  | "instagram_click";

export function trackConversion(
  event: ConversionEvent,
  location: string,
): void {
  vercelTrack(event, { location });
}
