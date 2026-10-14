/**
 * Textos de la interfaz en español, inglés y francés.
 *
 * Cada zona de la web tiene su archivo en ./messages con los tres idiomas
 * juntos (defineMessages obliga a que en y fr tengan las mismas claves que es).
 * Para añadir un texto: escríbelo en los tres idiomas en su zona y úsalo con
 * `const t = await getT()` (servidor) o `useT()` (componentes de cliente).
 * Los datos del catálogo (productos, categorías…) se traducen en data/i18n.
 */
import { defaultLocale, type Locale } from "./config";
import { common } from "./messages/common";
import { cart } from "./messages/cart";
import { forms } from "./messages/forms";
import { gifts } from "./messages/gifts";
import { home } from "./messages/home";
import { legal } from "./messages/legal";
import { pages } from "./messages/pages";
import { shop } from "./messages/shop";

const areas = { common, gifts, cart, home, forms, shop, pages, legal };

export type Dictionary = { [K in keyof typeof areas]: (typeof areas)[K]["es"] };

/** Zonas que necesitan los componentes de cliente (el resto no viaja al navegador). */
const CLIENT_AREAS = ["common", "gifts", "cart", "home", "forms", "shop"] as const satisfies readonly (keyof Dictionary)[];
export type ClientDictionary = Pick<Dictionary, (typeof CLIENT_AREAS)[number]>;

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(areas)) out[k] = v[locale];
  return out as Dictionary;
}

export function getClientDictionary(locale: Locale): ClientDictionary {
  const d = getDictionary(locale);
  return Object.fromEntries(CLIENT_AREAS.map((k) => [k, d[k]])) as ClientDictionary;
}
