import type { Locale } from "@/lib/i18n/config";

const formats: Record<Locale, Intl.NumberFormat> = {
  es: new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }),
  en: new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }),
  fr: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }),
};

/** "12,50 €" (es, fr) o "€12.50" (en); o el marcador "[precio] €" si el precio no está definido. */
export function formatPrice(price: number | null | undefined, locale: Locale = "es"): string {
  if (price === null || price === undefined) return locale === "en" ? "€[price]" : locale === "fr" ? "[prix] €" : "[precio] €";
  // Espacio normal (no el espacio duro de Intl) delante del símbolo para que el texto pueda partirse.
  return formats[locale].format(price);
}

/** Fecha larga en el idioma de la página: "12 de octubre de 2026". */
export function formatDate(iso: string | null | undefined, locale: Locale = "es"): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const tag = { es: "es-ES", en: "en-GB", fr: "fr-FR" }[locale];
  return d.toLocaleDateString(tag, { day: "numeric", month: "long", year: "numeric" });
}
