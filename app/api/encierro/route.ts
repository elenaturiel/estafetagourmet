import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/data/site";
import { getEncierroSeats } from "@/lib/encierro";
import { escapeHtml as esc, sendWebMail } from "@/lib/mail";

/** Días de encierro (7 al 14 de julio) o "sin decidir". */
const DATES = new Set(["7", "8", "9", "10", "11", "12", "13", "14", "sin-decidir"]);
const PHONE_RE = /^\+?[\d\s().-]{6,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulario de /el-encierro (ver el encierro desde un balcón en la calle Estafeta):
 * llega por correo a la tienda (site.email) con nombre, correo, teléfono, fecha y personas;
 * se puede responder directamente a quien lo envió.
 */
export async function POST(req: NextRequest) {
  let data: { name?: unknown; email?: unknown; phone?: unknown; date?: unknown; people?: unknown; website?: unknown };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Campo trampa para bots.
  if (typeof data.website === "string" && data.website.trim()) return NextResponse.json({ ok: true });

  const name = typeof data.name === "string" ? data.name.trim().slice(0, 120) : "";
  const email = typeof data.email === "string" ? data.email.trim().slice(0, 254) : "";
  const phone = typeof data.phone === "string" ? data.phone.trim().slice(0, 30) : "";
  const date = typeof data.date === "string" ? data.date : "";
  const people = Number(data.people);
  if (!name || !EMAIL_RE.test(email) || !PHONE_RE.test(phone) || !DATES.has(date) || !Number.isInteger(people) || people < 1 || people > 50) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Día completo o sin plazas suficientes (el formulario ya lo evita).
  const seats = await getEncierroSeats();
  if (date in seats && people > seats[Number(date)]) return NextResponse.json({ ok: false, code: "sin_plazas" }, { status: 409 });

  const dateText = date === "sin-decidir" ? "Aún no lo sabe" : `${date} de julio`;
  const rows: [string, string][] = [
    ["Nombre", name],
    ["Correo electrónico", email],
    ["Teléfono", phone],
    ["Fecha elegida", dateText],
    ["Número de personas", String(people)],
  ];
  const sent = await sendWebMail({
    to: site.email,
    subject: `El encierro: ${name} (${dateText}, ${people} ${people === 1 ? "persona" : "personas"})`,
    // _replyto: Formspree permite responder a quien lo envió.
    fields: { ...Object.fromEntries(rows), _replyto: email },
    replyTo: { email, name },
    html: `<p>Nueva solicitud para ver <strong>el encierro desde un balcón</strong> en la calle Estafeta, enviada desde la web:</p><table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#777">${k}</td><td><strong>${esc(v)}</strong></td></tr>`)
      .join("")}</table><p><a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}">Llamar a ${esc(name)}</a> · <a href="mailto:${esc(email)}">Escribir a ${esc(email)}</a></p><p style="color:#777;font-size:12px">Puedes responder a este correo: le llegará a esa persona.</p>`,
  });
  if (!sent.ok) return NextResponse.json({ ok: false, code: sent.code }, { status: sent.status });
  return NextResponse.json({ ok: true });
}
