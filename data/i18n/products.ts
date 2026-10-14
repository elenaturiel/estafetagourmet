import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/lib/types";
import { PRODUCT_DESCRIPTIONS } from "./product-descriptions";
import { PRODUCT_NAMES } from "./product-names";
import { SPEC_TEXT } from "./product-specs";
import { localizeLot } from "./lots";

const PLACEHOLDER_DESCRIPTION: Record<"en" | "fr", string> = {
  en: "[Product description: origin, production, storage and pairing]",
  fr: "[Description du produit : origine, élaboration, conservation et accord]",
};
const SUBTITLES: Record<string, Record<"en" | "fr", string>> = {
  "Selección de la casa": { en: "House selection", fr: "Sélection de la maison" },
};
const PHOTO_PRODUCT: Record<"en" | "fr", string> = { en: "Photo · product", fr: "Photo · produit" };

/** El producto en el idioma pedido (en español se devuelve tal cual). Lo que no está traducido queda en español. */
export function localizeProduct(p: Product, locale: Locale): Product {
  if (locale === "es") return p;
  const i = locale === "en" ? 0 : 1;
  const name = PRODUCT_NAMES[p.slug]?.[i] ?? p.name;
  const description = PRODUCT_DESCRIPTIONS[p.slug]?.[i] ?? (/^\[Descripción/.test(p.description) ? PLACEHOLDER_DESCRIPTION[locale] : p.description);
  const st = (key: keyof typeof SPEC_TEXT, v: string | undefined) => (v ? (SPEC_TEXT[key][v]?.[i] ?? v) : v);
  const specs = p.specs
    ? {
        ...p.specs,
        weight: st("w", p.specs.weight),
        reference: st("ref", p.specs.reference),
        ingredients: st("i", p.specs.ingredients),
        allergens: st("a", p.specs.allergens),
        packaging: st("p", p.specs.packaging),
        other: st("o", p.specs.other),
      }
    : undefined;
  const base: Product = {
    ...p,
    name,
    description,
    specs,
    subtitle: p.subtitle ? (SUBTITLES[p.subtitle]?.[locale] ?? p.subtitle) : undefined,
    image: { ...p.image, alt: name, placeholder: PHOTO_PRODUCT[locale] },
  };
  return localizeLot(base, p, locale);
}
