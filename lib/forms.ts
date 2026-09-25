/**
 * Envío de formularios desde el navegador.
 *
 * - Newsletter: /api/newsletter (Brevo). Ver lib/newsletter.ts.
 * - Contacto: TODO (ver TODO.md). Hoy solo se simula el envío.
 */
export type ContactPayload = { name: string; email: string; message: string };

export async function submitNewsletter(
  email: string,
  source: "popup" | "portada" | "web" = "web",
  website = "",
): Promise<{ doubleOptIn: boolean }> {
  const res = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, source, website }),
  });
  const json = (await res.json().catch(() => null)) as
    | { ok?: boolean; error?: string; code?: string; doubleOptIn?: boolean }
    | null;
  if (!res.ok || !json?.ok) {
    const message = json?.error ?? "No hemos podido apuntarte. Inténtalo de nuevo en un momento.";
    throw new Error(json?.code ? `${message} (código: ${json.code})` : message);
  }
  return { doubleOptIn: Boolean(json.doubleOptIn) };
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  void payload;
  await new Promise((r) => setTimeout(r, 400));
}
