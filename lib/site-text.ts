import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n/config";

/** Horario con la «y» en el idioma de la página. */
export function hoursLabel(locale: Locale): string {
  const joiner = { es: " y ", en: " and ", fr: " et " }[locale];
  return site.hours.label.replace(/ y /g, joiner);
}

/** Incentivo de la newsletter en el idioma de la página. */
export function newsletterIncentive(locale: Locale): string {
  return site.newsletterIncentive[locale];
}
