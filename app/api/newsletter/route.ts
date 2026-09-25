import { NextResponse, type NextRequest } from "next/server";
import { BrevoError, NewsletterNotConfiguredError, subscribe } from "@/lib/newsletter";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Alta en la newsletter. Recibe { email, source, website } (website = trampa para bots). */
export async function POST(req: NextRequest) {
  let data: { email?: unknown; source?: unknown; website?: unknown };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Petición no válida." }, { status: 400 });
  }

  // Campo trampa: las personas no lo ven; si viene relleno, es un bot. Se responde "ok" sin guardar.
  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Escribe un correo electrónico válido." }, { status: 400 });
  }
  const source = typeof data.source === "string" ? data.source.slice(0, 40) : "web";

  try {
    const { doubleOptIn } = await subscribe(email, source, req.nextUrl.origin);
    return NextResponse.json({ ok: true, doubleOptIn });
  } catch (err) {
    if (err instanceof NewsletterNotConfiguredError) {
      return NextResponse.json(
        { ok: false, error: "La suscripción no está disponible todavía." },
        { status: 503 },
      );
    }
    console.error("[newsletter]", err);
    // El código (p. ej. "ip_no_autorizada") ayuda a saber qué ajustar en Brevo.
    const code = err instanceof BrevoError ? err.code : "error_de_conexion";
    return NextResponse.json(
      { ok: false, error: "No hemos podido apuntarte. Inténtalo de nuevo en un momento.", code },
      { status: 502 },
    );
  }
}
