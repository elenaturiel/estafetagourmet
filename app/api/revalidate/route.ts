import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Webhook de Sanity: cuando la dueña publica o cambia una entrada, Sanity
 * llama aquí y la web se actualiza al momento (sin esperar los 5 minutos).
 * Se configura en sanity.io/manage → API → Webhooks (ver README).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Falta SANITY_REVALIDATE_SECRET" }, { status: 500 });
  }
  const { isValidSignature, body } = await parseBody<{ _type?: string; slug?: { current?: string } }>(
    req,
    secret,
  );
  if (!isValidSignature) {
    return NextResponse.json({ ok: false, error: "Firma no válida" }, { status: 401 });
  }
  if (body?._type === "post") {
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");
    if (body.slug?.current) revalidatePath(`/blog/${body.slug.current}`);
  }
  return NextResponse.json({ ok: true });
}
