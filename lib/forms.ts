/**
 * Envío de formularios desde el navegador.
 *
 * - Newsletter: /api/newsletter (Brevo). Ver lib/newsletter.ts.
 * - Contacto: /api/contact (correo por Brevo a CONTACT_TO o al correo de la tienda).
 */
import type { Locale } from "@/lib/i18n/config";

export type ContactPayload = { name: string; email: string; message: string };

/** Error al apuntarse: "invalid" (correo no válido), "unavailable" (sin configurar) u otro. `code` ayuda a saber qué ajustar en Brevo. */
export class SubscribeError extends Error {
  constructor(
    public kind: "invalid" | "unavailable" | "failed",
    public code?: string,
  ) {
    super(kind);
  }
}

export async function submitNewsletter(
  email: string,
  source: "popup" | "portada" | "web" = "web",
  website = "",
  lang: Locale = "es",
): Promise<{ doubleOptIn: boolean }> {
  const res = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, source, website, lang }),
  });
  const json = (await res.json().catch(() => null)) as { ok?: boolean; code?: string; doubleOptIn?: boolean } | null;
  if (!res.ok || !json?.ok) {
    throw new SubscribeError(res.status === 400 ? "invalid" : res.status === 503 ? "unavailable" : "failed", json?.code);
  }
  return { doubleOptIn: Boolean(json.doubleOptIn) };
}

/** Envía el mensaje de contacto (/api/contact). Devuelve false si no se pudo enviar. */
export async function submitContact(payload: ContactPayload & { website?: string }): Promise<boolean> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
