import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * Função serverless que recebe o lead do formulário de contato e envia
 * um e-mail via Resend pra HB. Roda na Vercel (pasta /api), fora do build
 * do Vite — por isso a API key fica no servidor e nunca vai pro bundle.
 *
 * Variáveis de ambiente (configurar na Vercel):
 *  - RESEND_API_KEY   (obrigatória) — chave da conta Resend
 *  - LEAD_TO_EMAIL    (obrigatória) — pra onde os leads chegam
 *  - LEAD_FROM_EMAIL  (opcional)    — remetente; precisa ser de domínio
 *                                     verificado no Resend
 */

const FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? "orcamento@hbcomercio.com.br";
const FROM = `HB Assistência Técnica <${FROM_EMAIL}>`;

type LeadBody = {
  name?: unknown;
  phone?: unknown;
  device?: unknown;
  consent?: unknown;
  /** Honeypot anti-spam: campo invisível; se vier preenchido é bot. */
  company?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  if (!apiKey || !toEmail) {
    console.error("Resend não configurado: faltam RESEND_API_KEY ou LEAD_TO_EMAIL.");
    return res.status(500).json({ error: "Serviço de envio indisponível." });
  }

  const body = (req.body ?? {}) as LeadBody;

  // Honeypot: bot preencheu o campo oculto. Finge sucesso e não envia nada.
  if (asString(body.company)) {
    return res.status(200).json({ ok: true });
  }

  const name = asString(body.name);
  const phone = asString(body.phone);
  const device = asString(body.device);
  const consent = body.consent === true;
  const phoneDigits = phone.replace(/\D/g, "");

  if (name.length < 2 || phoneDigits.length < 10 || !consent) {
    return res.status(400).json({ error: "Dados do formulário inválidos." });
  }

  const when = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short",
  });

  const lines = [
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    device ? `Aparelho/problema: ${device}` : "Aparelho/problema: (não informado)",
    `Recebido em: ${when}`,
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111">
      <h2 style="margin:0 0 16px">Novo lead do site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Aparelho/problema:</strong> ${
        device ? escapeHtml(device) : "(não informado)"
      }</p>
      <p style="color:#666;font-size:13px">Recebido em ${escapeHtml(when)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: toEmail,
      replyTo: FROM_EMAIL,
      subject: `Novo lead do site — ${name}`,
      text: lines.join("\n"),
      html,
    });

    if (error) {
      console.error("Resend retornou erro:", error);
      return res.status(502).json({ error: "Não foi possível enviar agora." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Falha ao enviar via Resend:", err);
    return res.status(502).json({ error: "Não foi possível enviar agora." });
  }
}
