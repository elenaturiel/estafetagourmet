import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

/**
 * Diagnóstico del blog (sin datos privados): qué piezas de la configuración
 * están puestas. Ábrelo en https://tu-web/api/blog/status
 */
export const dynamic = "force-dynamic";

export async function GET() {
  let posts: { title: string }[] | null = null;
  let error: string | null = null;
  if (isSanityConfigured) {
    try {
      posts = await createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" }).fetch(
        `*[_type == "post" && defined(slug.current) && publishedAt <= now()]{title}`,
      );
    } catch (e) {
      error = e instanceof Error ? e.message.slice(0, 300) : "error desconocido";
    }
  }
  const has = (n: string) => Boolean((process.env[n] ?? "").trim());
  // La misma lectura que usa /blog (con la caché de Next), para ver si falla ahí.
  let blogRead: string = "no probado";
  if (isSanityConfigured) {
    try {
      const r = await sanityFetch<{ title: string }[]>(
        `*[_type == "post" && defined(slug.current) && publishedAt <= now()]{title}`,
      );
      blogRead = r ? `ok (${r.length})` : "sin cliente";
    } catch (e) {
      blogRead = `error: ${e instanceof Error ? e.message.slice(0, 300) : "desconocido"}`;
    }
  }
  return NextResponse.json({
    lectura_del_blog: blogRead,
    sanity_proyecto: isSanityConfigured,
    sanity_proyecto_id: projectId || null,
    sanity_dataset: dataset,
    error_de_sanity: error,
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
