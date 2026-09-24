/**
 * Envío de formularios.
 *
 * TODO (ver TODO.md): conectar con el servicio real. Opciones habituales:
 *  - Newsletter: Shopify Customer (acceptsMarketing), Mailchimp, Brevo…
 *  - Contacto: un Route Handler (app/api/contacto/route.ts) que envíe un
 *    correo con Resend, Postmark o similar.
 * Hoy solo se simula el envío para poder mostrar la confirmación.
 */
export type ContactPayload = { name: string; email: string; message: string };

export async function submitNewsletter(email: string): Promise<void> {
  void email;
  await new Promise((r) => setTimeout(r, 400));
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  void payload;
  await new Promise((r) => setTimeout(r, 400));
}
