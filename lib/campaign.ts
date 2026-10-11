import "server-only";
import { SITE_URL, site } from "@/data/site";

/**
 * Campañas de correo con Brevo: la entrada del blog o el aviso que se escribe
 * en /admin sale por correo a la lista de la newsletter.
 *
 * Variables (además de las de la newsletter, ver lib/newsletter.ts):
 *   BREVO_SENDER_EMAIL   Remitente VERIFICADO en Brevo (Remitentes y dominios)
 *   BREVO_SENDER_NAME    Nombre que ve quien lo recibe (por defecto "Estafeta Gourmet")
 *   SANITY_WRITE_TOKEN   Clave de Sanity con permiso de Editor, para marcar «enviado»
 */
const API = "https://api.brevo.com/v3";

const env = (name: string) => (process.env[name] ?? "").trim();

export class CampaignError extends Error {}

function cfg() {
  const apiKey = env("BREVO_API_KEY");
  const listId = Number(env("BREVO_LIST_ID").replace(/\D/g, ""));
  const senderEmail = env("BREVO_SENDER_EMAIL");
  if (!apiKey || !listId) throw new CampaignError("Falta BREVO_API_KEY o BREVO_LIST_ID");
  if (!senderEmail) throw new CampaignError("Falta BREVO_SENDER_EMAIL (el remitente verificado en Brevo)");
  return { apiKey, listId, senderEmail, senderName: env("BREVO_SENDER_NAME") || site.name };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export type EmailContent = {
  title: string;
  preheader?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** HTML del cuerpo (ver lib/portable-html.ts). */
  bodyHtml: string;
  cta?: { label: string; href: string };
};

/** Correo con el estilo de la tienda: cabecera, foto, texto, botón y pie con la baja. */
export function renderEmail(c: EmailContent): string {
  const cta = c.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px"><tr><td style="background:#6e1f2e"><a href="${esc(c.cta.href)}" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;color:#f6f0e4;text-decoration:none">${esc(c.cta.label)}</a></td></tr></table>`
    : "";
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(c.title)}</title></head>
<body style="margin:0;padding:0;background:#f6f0e4">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(c.preheader ?? "")}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f0e4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fbf8f1;border:1px solid #dccfb8;font-family:Arial,Helvetica,sans-serif">
<tr><td align="center" style="padding:28px 24px 8px"><a href="${SITE_URL}" style="font-family:Georgia,serif;font-size:26px;color:#6e1f2e;text-decoration:none">${esc(site.name)}</a><div style="margin-top:4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5e4e43">Calle Estafeta · Pamplona</div></td></tr>
${c.imageUrl ? `<tr><td style="padding:16px 0 0"><img src="${esc(c.imageUrl)}" alt="${esc(c.imageAlt ?? "")}" width="600" style="display:block;width:100%;height:auto;border:0"></td></tr>` : ""}
<tr><td style="padding:28px 32px 8px"><h1 style="margin:0 0 18px;font-family:Georgia,serif;font-size:30px;line-height:1.2;font-weight:normal;color:#2a1f1a">${esc(c.title)}</h1>${c.bodyHtml}${cta}</td></tr>
<tr><td style="padding:20px 32px 28px;border-top:1px solid #dccfb8;font-size:12px;line-height:1.6;color:#5e4e43">Recibes este correo porque te suscribiste a la newsletter de ${esc(site.name)}.<br>${site.address.street} · ${site.address.cityShort} · <a href="mailto:${site.email}" style="color:#6e1f2e">${site.email}</a><br><a href="{{ unsubscribe }}" style="color:#6e1f2e">Darme de baja</a></td></tr>
</table></td></tr></table></body></html>`;
}

async function brevo(path: string, apiKey: string, body?: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new CampaignError(`Brevo ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.status === 204 ? null : ((await res.json().catch(() => null)) as Record<string, unknown> | null);
}

/** Crea la campaña en Brevo y la manda a toda la lista, o solo una prueba a `testTo`. */
export async function sendCampaign(opts: { name: string; subject: string; preheader?: string; html: string; testTo?: string }) {
  const { apiKey, listId, senderEmail, senderName } = cfg();
  const created = await brevo("/emailCampaigns", apiKey, {
    name: opts.name,
    subject: opts.subject,
    previewText: opts.preheader || undefined,
    sender: { name: senderName, email: senderEmail },
    type: "classic",
    htmlContent: opts.html,
    recipients: { listIds: [listId] },
  });
  const id = created?.id as number | undefined;
  if (!id) throw new CampaignError("Brevo no devolvió el número de la campaña");
  if (opts.testTo) await brevo(`/emailCampaigns/${id}/sendTest`, apiKey, { emailTo: [opts.testTo] });
  else await brevo(`/emailCampaigns/${id}/sendNow`, apiKey);
  return id;
}
