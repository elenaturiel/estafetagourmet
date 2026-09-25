import "server-only";

/**
 * Suscripciones a la newsletter con Brevo (brevo.com).
 *
 * Variables de entorno (ver README → "Newsletter"):
 *   BREVO_API_KEY            Clave de la API de Brevo (empieza por "xkeysib-")
 *   BREVO_LIST_ID            Número de la lista donde se guardan los contactos
 *   BREVO_DOI_TEMPLATE_ID    (Recomendado) Plantilla de "confirma tu suscripción".
 *                            Si existe, Brevo envía un correo de confirmación
 *                            antes de añadir el contacto (doble opt-in).
 *
 * Sin configurar, en desarrollo solo se registra en la consola y el popup se
 * muestra para poder verlo; en producción el popup no aparece.
 */
const API = "https://api.brevo.com/v3";

/** Lee una variable quitando espacios o saltos de línea pegados sin querer. */
function env(name: string): string {
  return (process.env[name] ?? "").trim();
}

function config() {
  const apiKey = env("BREVO_API_KEY");
  const listId = Number(env("BREVO_LIST_ID").replace(/\D/g, ""));
  const doiTemplateId = Number(env("BREVO_DOI_TEMPLATE_ID").replace(/\D/g, "")) || null;
  return apiKey && listId ? { apiKey, listId, doiTemplateId } : null;
}

export function isNewsletterEnabled(): boolean {
  return Boolean(config()) || process.env.NODE_ENV !== "production";
}

export class NewsletterNotConfiguredError extends Error {}

/**
 * Error devuelto por Brevo, con un código corto que explica la causa.
 * El código se muestra en el formulario para poder diagnosticar sin mirar
 * los registros del servidor (no contiene datos privados).
 */
export class BrevoError extends Error {
  constructor(
    readonly status: number,
    readonly detail: string,
    readonly code: string,
  ) {
    super(`Brevo respondió ${status} (${code}): ${detail.slice(0, 300)}`);
  }
}

function classify(status: number, detail: string): string {
  const d = detail.toLowerCase();
  if (status === 401 && /ip address|unrecognised ip|unrecognized ip/.test(d)) return "ip_no_autorizada";
  if (status === 401) return "clave_api_incorrecta";
  if (status === 403) return "cuenta_sin_permiso";
  if (/template/.test(d)) return "plantilla_doi_no_valida";
  if (/redirection/.test(d)) return "url_de_vuelta_no_valida";
  if (status === 404 || /list/.test(d)) return "lista_no_encontrada";
  if (/email/.test(d)) return "correo_rechazado";
  return `brevo_${status}`;
}

async function post(url: string, apiKey: string, body: Record<string, unknown>) {
  return fetch(url, {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

/**
 * Da de alta el correo. `origin` es la dirección de la web desde la que se
 * apunta (para el enlace de vuelta del correo de confirmación).
 * Devuelve si se ha enviado un correo de confirmación (doble opt-in).
 */
export async function subscribe(
  email: string,
  source: string,
  origin: string,
): Promise<{ doubleOptIn: boolean }> {
  const cfg = config();
  if (!cfg) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[newsletter] (sin Brevo configurado) ${email} desde ${source}`);
      return { doubleOptIn: false };
    }
    throw new NewsletterNotConfiguredError();
  }

  const siteUrl = env("NEXT_PUBLIC_SITE_URL") || origin;
  const [url, body] = cfg.doiTemplateId
    ? [
        `${API}/contacts/doubleOptinConfirmation`,
        {
          email,
          includeListIds: [cfg.listId],
          templateId: cfg.doiTemplateId,
          redirectionUrl: `${siteUrl.replace(/\/+$/, "")}/?suscrito=1`,
          attributes: { ORIGEN: source },
        },
      ]
    : [
        `${API}/contacts`,
        { email, listIds: [cfg.listId], updateEnabled: true, attributes: { ORIGEN: source } },
      ];

  const result = { doubleOptIn: Boolean(cfg.doiTemplateId) };
  let res = await post(url, cfg.apiKey, body);
  if (res.ok) return result;

  let detail = await res.text().catch(() => "");
  // Si el atributo ORIGEN no existe en Brevo, se reintenta sin él.
  if (res.status === 400 && /attribute/i.test(detail)) {
    const { attributes, ...rest } = body as Record<string, unknown>;
    void attributes;
    res = await post(url, cfg.apiKey, rest);
    if (res.ok) return result;
    detail = await res.text().catch(() => "");
  }
  // El contacto ya estaba en la lista: para quien se apunta, es un éxito.
  if (res.status === 400 && /duplicate|already exist/i.test(detail)) return result;

  throw new BrevoError(res.status, detail, classify(res.status, detail));
}
