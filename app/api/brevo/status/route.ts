import { NextResponse } from "next/server";

/**
 * Diagnóstico de Brevo: comprueba de verdad cada pieza (clave, lista, remitente,
 * plantilla de confirmación) y dice qué hay que arreglar. Sin datos privados.
 * Ábrelo en https://tu-web/api/brevo/status
 */
export const dynamic = "force-dynamic";

const env = (n: string) => (process.env[n] ?? "").trim();

async function brevo(path: string, key: string) {
  try {
    const res = await fetch(`https://api.brevo.com/v3${path}`, { headers: { "api-key": key, accept: "application/json" }, cache: "no-store" });
    const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
    return { status: res.status, json };
  } catch {
    return { status: 0, json: null };
  }
}

export async function GET() {
  const key = env("BREVO_API_KEY");
  const listId = env("BREVO_LIST_ID").replace(/\D/g, "");
  const sender = env("BREVO_SENDER_EMAIL");
  const doi = env("BREVO_DOI_TEMPLATE_ID").replace(/\D/g, "");
  const out: Record<string, string> = {};
  const todo: string[] = [];

  if (!key) {
    out["1_clave_api"] = "FALTA la variable BREVO_API_KEY";
    todo.push("Crea una clave en Brevo (SMTP y API → Claves API) y ponla en Vercel como BREVO_API_KEY.");
  } else {
    const acc = await brevo("/account", key);
    if (acc.status === 200) out["1_clave_api"] = `OK (${key.startsWith("xkeysib-") ? "clave de API correcta" : "funciona"})`;
    else {
      out["1_clave_api"] = `NO VÁLIDA (Brevo responde ${acc.status}${key.startsWith("xkeysib-") ? "" : "; no empieza por xkeysib-, parece otro tipo de clave"})`;
      todo.push("La clave de API no vale: crea una nueva en Brevo → SMTP y API → Claves API (la de tipo API, empieza por xkeysib-) y pégala en BREVO_API_KEY.");
    }
    if (acc.status === 200) {
      if (!listId) {
        out["2_lista"] = "FALTA la variable BREVO_LIST_ID";
        todo.push("Pon en BREVO_LIST_ID el número de tu lista (Brevo → Contactos → Listas; el número va junto al nombre).");
      } else {
        const l = await brevo(`/contacts/lists/${listId}`, key);
        out["2_lista"] = l.status === 200 ? `OK (“${String(l.json?.name ?? "")}”, ${String(l.json?.uniqueSubscribers ?? 0)} contactos)` : `NO EXISTE la lista ${listId}`;
        if (l.status !== 200) todo.push(`BREVO_LIST_ID=${listId} no es una lista de tu cuenta: revisa el número en Brevo → Contactos → Listas.`);
      }
      if (!sender) {
        out["3_remitente"] = "FALTA la variable BREVO_SENDER_EMAIL";
        todo.push("Pon en BREVO_SENDER_EMAIL un correo verificado en Brevo (Remitentes, dominios e IP dedicadas → Remitentes).");
      } else {
        const s = await brevo("/senders", key);
        const found = ((s.json?.senders as { email: string; active: boolean }[]) ?? []).find((x) => x.email.toLowerCase() === sender.toLowerCase());
        out["3_remitente"] = found ? (found.active ? `OK (${sender})` : `Existe pero NO está verificado (${sender})`) : `${sender} NO está dado de alta en Brevo`;
        if (!found || !found.active) todo.push(`Da de alta y verifica ${sender} en Brevo → Remitentes, dominios e IP dedicadas → Remitentes (te llega un correo con un código).`);
      }
      if (!doi) out["4_correo_de_confirmacion"] = "No configurado: quien se apunta queda en la lista directamente (sin correo de confirmación). Es válido.";
      else {
        const t = await brevo(`/smtp/templates/${doi}`, key);
        out["4_correo_de_confirmacion"] = t.status === 200 ? `OK (plantilla “${String(t.json?.name ?? "")}”)` : `La plantilla ${doi} NO existe`;
        if (t.status !== 200) todo.push("BREVO_DOI_TEMPLATE_ID no es una plantilla válida: bórrala de Vercel (se apuntarán sin confirmación) o pon el número de una plantilla de confirmación.");
      }
    }
  }
  return NextResponse.json({ ...out, que_hacer: todo.length ? todo : ["Todo correcto: suscripción y envío de correos deberían funcionar."] });
}
