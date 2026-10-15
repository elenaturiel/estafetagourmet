import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n/config";

/** Horario con la «y» en el idioma de la página. */
export function hoursLabel(locale: Locale): string {
  const joiner = { es: " y ", en: " and ", fr: " et " }[locale];
  return site.hours.label.replace(/ y /g, joiner);
}

const INCENTIVE_PLACEHOLDER = "[incentivo: p. ej. descuento en tu primer pedido]";

/** Incentivo de la newsletter; si aún es el texto de ejemplo, se traduce el ejemplo. */
export function newsletterIncentive(locale: Locale): string {
  if (site.newsletterIncentive !== INCENTIVE_PLACEHOLDER) return site.newsletterIncentive;
  return {
    es: INCENTIVE_PLACEHOLDER,
    en: "[incentive: e.g. a discount on your first order]",
    fr: "[incitation : p. ex. une remise sur votre première commande]",
  }[locale];
}
