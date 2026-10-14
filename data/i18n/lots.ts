import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/lib/types";

/** Textos de los lotes en inglés y francés, por dirección (slug). Si falta, se usa el español. */
export type LotText = {
  name: string;
  description: string;
  details?: {
    contents: { name: string; by: string }[];
    why: string[];
    serve: string[];
    storage: string;
  };
};
export const LOT_TEXTS: Record<string, [en: LotText, fr: LotText]> = {};

/** Aplica la traducción de un lote (si la hay) sobre el producto ya traducido. */
export function localizeLot(base: Product, original: Product, locale: Locale): Product {
  if (locale === "es") return base;
  const t = LOT_TEXTS[original.slug]?.[locale === "en" ? 0 : 1];
  if (!t) return base;
  return {
    ...base,
    name: t.name,
    description: t.description,
    details: t.details ?? base.details,
    image: { ...base.image, alt: t.name },
    gallery: base.gallery?.map((g, i) => (i === 0 ? { ...g, alt: t.name } : g)),
  };
}
