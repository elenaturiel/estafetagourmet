import { site } from "@/data/site";

const env = (name: string) => (process.env[name] ?? "").trim();

/** Escapa un texto para meterlo en el HTML del correo. */
export const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export type WebMail = {
  subject: string;
  /** Cuerpo del correo (Brevo). */
  html: string;
  /** Los mismos datos como campos sueltos (Formspree los muestra en su correo). */
  fields: Record<string, string>;
  /** Destinatario (Brevo). Por defecto CONTACT_TO o el correo de la tienda. */
  to?: string;
  replyTo?: { email: string; name: string };
};

/**
 * Envía a la tienda un correo con lo que alguien ha escrito en un formulario de la web.
 * Con Formspree (FORMSPREE_FORM_ID) llega al correo de ese formulario; si no está,
 * con Brevo (BREVO_API_KEY y BREVO_SENDER_EMAIL). `code` dice qué falló.
 */
export async function sendWebMail(mail: WebMail): Promise<{ ok: true } | { ok: false; status: number; code: string }> {
  const formspree = env("FORMSPREE_FORM_ID");
  if (formspree) {
    const r = await fetch(`https://formspree.io/f/${encodeURIComponent(formspree)}`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ ...mail.fields, _subject: mail.subject }),
      cache: "no-store",
    });
    if (!r.ok) {
      console.error("[mail] formspree", r.status);
      return { ok: false, status: 502, code: `formspree_${r.status}` };
    }
    return { ok: true };
  }

  const apiKey = env("BREVO_API_KEY");
  const senderEmail = env("BREVO_SENDER_EMAIL");
  if (!apiKey || !senderEmail) return { ok: false, status: 503, code: "sin_configurar" };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: `${site.name} · Web`, email: senderEmail },
      to: [{ email: mail.to || env("CONTACT_TO") || site.email }],
      ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
      subject: mail.subject,
      htmlContent: mail.html,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[mail] brevo", res.status, (await res.text().catch(() => "")).slice(0, 300));
    return { ok: false, status: 502, code: `brevo_${res.status}` };
  }
  return { ok: true };
}
