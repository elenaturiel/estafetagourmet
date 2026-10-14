import { legalEntity } from "@/data/legal";
import type { Locale } from "@/lib/i18n/config";

/** Los datos del titular en el idioma de la página (los marcadores entre corchetes también se traducen). */
export function legalEntityFor(locale: Locale) {
  if (locale === "es") return legalEntity;
  const en = locale === "en";
  const t = (s: string, englishPlaceholder: string, frenchPlaceholder: string) =>
    /^\[.*\]$/.test(s.trim()) ? (en ? englishPlaceholder : frenchPlaceholder) : s;
  return {
    ...legalEntity,
    name: t(legalEntity.name, "[Company name or holder's name]", "[Raison sociale ou nom du titulaire]"),
    taxId: t(legalEntity.taxId, "[Tax ID (NIF/CIF)]", "[Numéro fiscal (NIF/CIF)]"),
    registry: t(legalEntity.registry, "[Commercial Register details, if applicable]", "[Données du registre du commerce, le cas échéant]"),
    address: en ? "Calle Estafeta, 70 · 31001 Pamplona / Iruña (Navarre)" : "Calle Estafeta, 70 · 31001 Pampelune / Iruña (Navarre)",
    returnDays: en ? "14 calendar days" : "14 jours calendaires",
    updated: en ? "October 2026" : "octobre 2026",
  };
}
