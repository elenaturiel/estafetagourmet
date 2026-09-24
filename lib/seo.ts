import type { Metadata } from "next";
import { SITE_URL, site } from "@/data/site";

/**
 * Metadatos de cada página: título, descripción, URL canónica y Open Graph.
 * La URL canónica usa siempre el dominio de NEXT_PUBLIC_SITE_URL.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: "es_ES",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
