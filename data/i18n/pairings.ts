import type { Locale } from "@/lib/i18n/config";
import type { Pairing, PairingGroup } from "@/data/pairings";

type PairingText = { kicker: string; title: string; with: string; text: string; shop?: string[] };
/** Textos de cada maridaje en inglés y francés, por número. Si falta, se usa el español. */
export const PAIRING_TEXTS: Record<number, [en: PairingText, fr: PairingText]> = {};
/** Títulos de cada sección de maridajes en inglés y francés, por slug. */
export const PAIRING_GROUP_TEXTS: Record<string, [en: { title: string; subtitle: string }, fr: { title: string; subtitle: string }]> = {};

export function localizePairing(p: Pairing, locale: Locale): Pairing {
  if (locale === "es") return p;
  const t = PAIRING_TEXTS[p.n]?.[locale === "en" ? 0 : 1];
  if (!t) return p;
  return {
    ...p,
    kicker: t.kicker,
    title: t.title,
    with: t.with,
    text: t.text,
    shop: p.shop.map((s, i) => ({ ...s, label: t.shop?.[i] ?? s.label })),
  };
}

export function localizePairingGroup(g: PairingGroup, locale: Locale): PairingGroup {
  if (locale === "es") return g;
  const t = PAIRING_GROUP_TEXTS[g.slug]?.[locale === "en" ? 0 : 1];
  return { ...g, title: t?.title ?? g.title, subtitle: t?.subtitle ?? g.subtitle, items: g.items.map((p) => localizePairing(p, locale)) };
}
