import type { Metadata } from "next";
import { SITE_URL, site } from "@/data/site";
import { locales, localePath, ogLocales, type Locale } from "@/lib/i18n/config";

/**
 * Metadatos de cada página: título, descripción, URL canónica, idiomas
 * alternativos (hreflang) y Open Graph. La URL usa siempre el dominio de
 * NEXT_PUBLIC_SITE_URL. `path` es la ruta sin prefijo de idioma ("/tienda").
 */
export function pageMetadata({
  locale = "es",
  title,
  description,
  path,
  image,
  type = "website",
}: {
  locale?: Locale;
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const localized = localePath(locale, path);
  const url = new URL(localized, SITE_URL).toString();
  return {
    title,
    description,
    alternates: {
      canonical: localized,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
        "x-default": path,
      },
    },
    openGraph: {
      type,
      url,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: ogLocales[locale],
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
