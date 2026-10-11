import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

/** Cliente de lectura fresca (sin caché) para leer el documento que se va a enviar por correo. */
export function sanityFresh() {
  if (!isSanityConfigured) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });
}

/** Cliente con permiso de escritura (SANITY_WRITE_TOKEN) para marcar un correo como enviado. */
export function sanityWriter() {
  const token = (process.env.SANITY_WRITE_TOKEN ?? "").trim();
  if (!isSanityConfigured || !token) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn: false, token });
}
