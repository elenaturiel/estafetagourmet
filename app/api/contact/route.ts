import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/data/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const env = (name: string) => (process.env[name] ?? "").trim();
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Formulario de contacto: el mensaje llega por correo a CONTACT_TO (si no se
 * define, a site.email) y se puede responder directamente a quien lo escribió.
 * Se envía con Brevo (BREVO_API_KEY y BREVO_SENDER_EMAIL, los de la newsletter).
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

  const apiKey = env("BREVO_API_KEY");
  const senderEmail = env("BREVO_SENDER_EMAIL");
  if (!apiKey || !senderEmail) return NextResponse.json({ ok: false, code: "sin_configurar" }, { status: 503 });
  const to = env("CONTACT_TO") || site.email;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: `${site.name} · Web`, email: senderEmail },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `Mensaje de la web: ${name}`,
      htmlContent: `<p><strong>${esc(name)}</strong> (<a href="mailto:${esc(email)}">${esc(email)}</a>) ha escrito desde el formulario de contacto de la web:</p><p style="white-space:pre-wrap">${esc(message)}</p><p style="color:#777;font-size:12px">Puedes responder a este correo: le llegará a esa persona.</p>`,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[contact]", res.status, (await res.text().catch(() => "")).slice(0, 300));
    return NextResponse.json({ ok: false, code: `brevo_${res.status}` }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
