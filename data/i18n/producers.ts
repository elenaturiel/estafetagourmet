import type { Locale } from "@/lib/i18n/config";
import type { Producer } from "@/lib/types";
import { categories } from "@/data/categories";
import { localizeCategory } from "./categories";

const LOGO: Record<"en" | "fr", (name: string) => string> = {
  en: (name) => `${name} logo`,
  fr: (name) => `Logo de ${name}`,
};
const PHOTO: Record<"en" | "fr", string> = { en: "Portrait · producer", fr: "Portrait · producteur" };
const LOCALITY: Record<"en" | "fr", string> = { en: "[Location]", fr: "[Localité]" };

/** El productor en el idioma pedido: su especialidad (el nombre de su categoría) y los textos de la foto. */
export function localizeProducer(p: Producer, locale: Locale): Producer {
  if (locale === "es") return p;
  const category = categories.find((c) => c.slug === p.categorySlug);
  return {
    ...p,
    specialty: category ? localizeCategory(category, locale).name : p.specialty,
    locality: /^\[.*\]$/.test(p.locality.trim()) ? LOCALITY[locale] : p.locality,
    image: { ...p.image, alt: LOGO[locale](p.name), placeholder: PHOTO[locale] },
  };
}
