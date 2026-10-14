/**
 * Idiomas de la web. El español es el principal y va sin prefijo en la URL
 * (/tienda); el inglés y el francés llevan prefijo (/en/tienda, /fr/tienda).
 * Las direcciones de las páginas y de los productos son las mismas en los tres.
 */
export const locales = ["es", "en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const localeNames: Record<Locale, string> = { es: "Español", en: "English", fr: "Français" };
/** Valor de og:locale. */
export const ogLocales: Record<Locale, string> = { es: "es_ES", en: "en_GB", fr: "fr_FR" };

/** Dirección con el prefijo del idioma: ("en", "/tienda") → "/en/tienda". Deja igual lo externo, las anclas, /api y /admin. */
export function localePath(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//") || /^\/(api|admin)(\/|$)/.test(href)) return href;
  if (locale === defaultLocale) return href;
  if (/^\/(es|en|fr)(\/|$|\?|#)/.test(href)) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

/** Separa el idioma de una ruta: "/en/tienda" → { locale: "en", path: "/tienda" }. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(en|fr)(\/.*)?$/);
  if (m) return { locale: m[1] as Locale, path: m[2] || "/" };
  return { locale: defaultLocale, path: pathname || "/" };
}

/** Rellena {marcas}: fmt("Hola {name}", { name: "Ana" }). */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
