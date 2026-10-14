import { site } from "@/data/site";
import { legalEntityFor } from "@/data/i18n/legal";
import type { Locale } from "@/lib/i18n/config";

/** Datos que usan los textos legales: titular y dirección web en el idioma de la página. */
export function legalContext(locale: Locale) {
  const e = legalEntityFor(locale);
  const placeholder = { es: "[dirección web]", en: "[website address]", fr: "[adresse du site]" }[locale];
  const domain = site.domainLabel.startsWith("[") ? placeholder : site.domainLabel;
  return { e, domain, site };
}
