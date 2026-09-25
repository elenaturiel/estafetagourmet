/**
 * Datos generales de la tienda.
 *
 * Todo lo que aparece entre corchetes es un MARCADOR: un dato que todavía
 * no conocemos. Se muestra tal cual en la web para que se vea que falta.
 * Consulta TODO.md para la lista completa.
 */

/**
 * Dirección pública de la web. Se configura con la variable de entorno
 * NEXT_PUBLIC_SITE_URL (p. ej. "https://www.midominio.com").
 * Mientras no haya dominio definitivo, en local se usa http://localhost:3000.
 */
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const SITE_URL = (rawSiteUrl || "http://localhost:3000").replace(/\/+$/, "");
export const HAS_PUBLIC_DOMAIN = Boolean(rawSiteUrl);

export const site = {
  name: "Estafeta Gourmet",
  tagline: "Alimentación gourmet · Navarra",
  description:
    "Tienda de productos gourmet de Navarra en la calle Estafeta de Pamplona: vinos, quesos, embutidos y verduras de pequeños productores, con envío a toda la península.",
  foundedYear: 2026,

  /** Texto que se muestra en el pie como dirección web. */
  domainLabel: HAS_PUBLIC_DOMAIN ? new URL(SITE_URL).host : "[dirección web]",

  address: {
    street: "Calle Estafeta, 70",
    postalCode: "31001",
    city: "Pamplona / Iruña",
    cityShort: "Pamplona",
    region: "Navarra",
    country: "ES",
  },

  /** Horario tal y como se muestra. Los días concretos están por definir. */
  hours: {
    label: "10:00–14:00 y 17:00–20:00",
    daysLabel: "[indicar días y festivos]",
    /**
     * Horario para los datos estructurados (schema.org). Se deja vacío
     * hasta confirmar los días de apertura; ver TODO.md.
     * Ejemplo: [{ days: ["Monday", "Tuesday"], opens: "10:00", closes: "14:00" }]
     */
    structured: [] as { days: string[]; opens: string; closes: string }[],
  },

  phone: {
    display: "624 642 742",
    href: "tel:+34624642742",
    international: "+34 624 642 742",
  },

  /** WhatsApp: se asume el mismo número que el teléfono. Confírmalo en TODO.md. */
  whatsappHref: "https://wa.me/34624642742",

  email: "[correo de contacto]",

  instagram: {
    handle: "@estafetagourmet",
    href: "https://www.instagram.com/estafetagourmet/",
  },

  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Calle+Estafeta+70+31001+Pamplona",

  shipping: {
    leadTime: "24–48 h",
    freeShippingFrom: "[importe]",
    /**
     * Mismo importe como número (euros) para la barra de progreso de la cesta
     * ("Te faltan X € para el envío gratis"). Null mientras no esté definido.
     */
    freeShippingThreshold: null as number | null,
  },

  googleRating: {
    rating: "[valoración]",
    count: "[nº]",
  },

  newsletterIncentive: "[incentivo: p. ej. descuento en tu primer pedido]",
} as const;

/** Un valor es marcador si sigue entre corchetes. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}
