import { NextResponse } from "next/server";
import { getSanityPosts } from "@/lib/sanity/posts";
import { isSanityConfigured } from "@/sanity/env";

/**
 * Diagnóstico del blog (sin datos privados): qué piezas de la configuración
 * están puestas. Ábrelo en https://tu-web/api/blog/status
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const posts = isSanityConfigured ? await getSanityPosts() : null;
  const has = (n: string) => Boolean((process.env[n] ?? "").trim());
  return NextResponse.json({
    sanity_proyecto: isSanityConfigured,
    sanity_aviso_automatico: has("SANITY_REVALIDATE_SECRET"),
    sanity_clave_de_escritura: has("SANITY_WRITE_TOKEN"),
    brevo_clave: has("BREVO_API_KEY"),
    brevo_lista: has("BREVO_LIST_ID"),
    brevo_remitente: has("BREVO_SENDER_EMAIL"),
    entradas_publicadas: posts ? posts.length : null,
    nota: !isSanityConfigured
      ? "Falta NEXT_PUBLIC_SANITY_PROJECT_ID: el blog muestra las entradas de ejemplo."
      : posts === null
        ? "Sanity no responde: revisa el proyecto y el dataset."
        : posts.length === 0
          ? "Sanity funciona pero no hay entradas publicadas (pulsa Publish en /admin)."
          : "Todo bien.",
  });
}
