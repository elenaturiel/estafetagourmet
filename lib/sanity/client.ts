import "server-only";
import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

// Sin CDN: la caché de Next (abajo) ya evita consultas repetidas y así una entrada nueva no tarda en verse.
const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" })
  : null;

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * Consulta a Sanity con caché de Next: los datos se guardan y se refrescan
 * cada 5 minutos, o al momento si Sanity avisa por el webhook
 * (app/api/revalidate).
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, { next: { revalidate: 300, tags: ["post"] } });
}

export function sanityImageUrl(source: unknown, width = 1600): string | undefined {
  if (!builder || !source) return undefined;
  return builder.image(source as Parameters<typeof builder.image>[0]).width(width).auto("format").url();
}
