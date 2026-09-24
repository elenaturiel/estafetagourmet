/**
 * Internacionalización.
 *
 * Hoy la web se sirve solo en español, sin prefijo en la URL. Para activar el
 * inglés más adelante: completar en.ts, mover las rutas bajo app/[lang]/ y
 * usar getDictionary(lang) en cada página (ver README.md → "Idiomas").
 */
import { es, type Dictionary } from "./es";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Locales publicados. Añade "en" cuando la traducción esté lista. */
export const enabledLocales: Locale[] = ["es"];

export async function getDictionary(locale: Locale = defaultLocale): Promise<Dictionary> {
  if (locale === "es") return es;
  const { en } = await import("./en");
  return deepMerge(es, en) as Dictionary;
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!override || typeof override !== "object") return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(override)) {
    const b = out[k];
    out[k] =
      b && typeof b === "object" && v && typeof v === "object" ? deepMerge(b, v) : v;
  }
  return out as T;
}

/** Diccionario por defecto para componentes que no reciben el idioma. */
export const t = es;
