import { NextResponse, type NextRequest } from "next/server";
import { escapeHtml as esc, sendWebMail } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulario de contacto: el mensaje llega por correo a CONTACT_TO (si no se
 * define, a site.email) y se puede responder directamente a quien lo escribió.
 * Se envía con Formspree o Brevo (lib/mail.ts).
 */
export async function POST(req: NextRequest) {
  let data: { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Campo trampa para bots.
  if (typeof data.website === "string" && data.website.trim()) return NextResponse.json({ ok: true });

  const name = typeof data.name === "string" ? data.name.trim().slice(0, 120) : "";
  const email = typeof data.email === "string" ? data.email.trim().slice(0, 254) : "";
  const message = typeof data.message === "string" ? data.message.trim().slice(0, 5000) : "";
  if (!name || !EMAIL_RE.test(email) || message.length < 10) return NextResponse.json({ ok: false }, { status: 400 });

  const sent = await sendWebMail({
    subject: `Mensaje de la web: ${name}`,
    fields: { name, email, message },
    replyTo: { email, name },
    html: `<p><strong>${esc(name)}</strong> (<a href="mailto:${esc(email)}">${esc(email)}</a>) ha escrito desde el formulario de contacto de la web:</p><p style="white-space:pre-wrap">${esc(message)}</p><p style="color:#777;font-size:12px">Puedes responder a este correo: le llegará a esa persona.</p>`,
  });
  if (!sent.ok) return NextResponse.json({ ok: false, code: sent.code }, { status: sent.status });
  return NextResponse.json({ ok: true });
}
