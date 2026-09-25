import "server-only";

/**
 * Suscripciones a la newsletter con Brevo (brevo.com).
 *
 * Variables de entorno (ver README → "Newsletter"):
 *   BREVO_API_KEY            Clave de la API de Brevo
 *   BREVO_LIST_ID            Número de la lista donde se guardan los contactos
 *   BREVO_DOI_TEMPLATE_ID    (Recomendado) Plantilla de "confirma tu suscripción".
 *                            Si existe, Brevo envía un correo de confirmación
 *                            antes de añadir el contacto (doble opt-in).
 *
 * Sin configurar, en desarrollo solo se registra en la consola y el popup se
 * muestra para poder verlo; en producción el popup no aparece.
 */
const API = "https://api.brevo.com/v3";

function config() {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  const doiTemplateId = Number(process.env.BREVO_DOI_TEMPLATE_ID) || null;
  return apiKey && listId ? { apiKey, listId, doiTemplateId } : null;
}

export function isNewsletterEnabled(): boolean {
  return Boolean(config()) || process.env.NODE_ENV !== "production";
}

export class NewsletterNotConfiguredError extends Error {}

/** Devuelve si se ha enviado un correo de confirmación (doble opt-in). */
export async function subscribe(email: string, source: string): Promise<{ doubleOptIn: boolean }> {
  const cfg = config();
  if (!cfg) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[newsletter] (sin Brevo configurado) ${email} desde ${source}`);
      return { doubleOptIn: false };
    }
    throw new NewsletterNotConfiguredError();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const request = cfg.doiTemplateId
    ? {
        url: `${API}/contacts/doubleOptinConfirmation`,
        body: {
          email,
          includeListIds: [cfg.listId],
          templateId: cfg.doiTemplateId,
          redirectionUrl: `${siteUrl}/?suscrito=1`,
          attributes: { ORIGEN: source },
        },
      }
    : {
        url: `${API}/contacts`,
        body: { email, listIds: [cfg.listId], updateEnabled: true, attributes: { ORIGEN: source } },
      };

  const res = await fetch(request.url, {
    method: "POST",
    headers: { "api-key": cfg.apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(request.body),
    cache: "no-store",
  });

  const result = { doubleOptIn: Boolean(cfg.doiTemplateId) };
  if (res.ok) return result;
  const detail = await res.text().catch(() => "");
  // Si el atributo ORIGEN no existe en Brevo, se reintenta sin él.
  if (res.status === 400 && /attribute/i.test(detail)) {
    const { attributes, ...rest } = request.body as Record<string, unknown>;
    void attributes;
    const retry = await fetch(request.url, {
      method: "POST",
      headers: { "api-key": cfg.apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(rest),
      cache: "no-store",
    });
    if (retry.ok) return result;
  }
  throw new Error(`Brevo respondió ${res.status}: ${detail.slice(0, 200)}`);
}
