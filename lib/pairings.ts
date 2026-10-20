import { PAIRING_PRODUCTS, type PairingRule } from "@/data/pairing-products";
import { pairingGroups, type Pairing } from "@/data/pairings";
import type { Product } from "@/lib/types";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const matches = (p: Product, rules: PairingRule[]) =>
  rules.some(
    (r) =>
      (!r.cat || p.categorySlug === r.cat) &&
      (!r.producer || p.producerSlug === r.producer) &&
      (!r.name || r.name.test(norm(p.name))) &&
      Boolean(r.cat || r.producer || r.name),
  );

export type ProductPairing = { group: string; pairing: Pairing; partners: Product[] };

/** Maridajes (de /maridajes) en los que entra un producto, con los productos de la tienda con los que marida. */
export function pairingsFor(product: Product, all: Product[], maxPartners = 3): ProductPairing[] {
  const out: ProductPairing[] = [];
  for (const group of pairingGroups) {
    for (const pairing of group.items) {
      const rules = PAIRING_PRODUCTS[pairing.n];
      if (!rules) continue;
      const side = matches(product, rules.a) ? rules.b : matches(product, rules.b) ? rules.a : null;
      if (!side) continue;
      const partners = all.filter((p) => p.slug !== product.slug && matches(p, side)).slice(0, maxPartners);
      out.push({ group: group.slug, pairing, partners });
    }
  }
  return out;
}

const words = (s: string) =>
  new Set(norm(s).toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3));

/**
 * Productos parecidos: de la misma categoría, ordenados por cercanía (mismo
 * productor, palabras en común en el nombre y precio similar).
 */
export function similarProducts(product: Product, all: Product[]): Product[] {
  const mine = words(product.name);
  const score = (p: Product) => {
    let n = 0;
    if (product.producerSlug && p.producerSlug === product.producerSlug) n += 3;
    for (const w of words(p.name)) if (mine.has(w)) n += 1;
    if (product.price !== null && p.price !== null) n += Math.max(0, 2 - Math.abs(p.price - product.price) / Math.max(product.price, 1) * 2);
    return n;
  };
  return all
    .filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug)
    .sort((a, b) => score(b) - score(a) || a.rank - b.rank);
}

/** Producto que encaja con una regla; entre varios, uno u otro según la ficha (para variar los enlaces). */
export function pickPartner(rule: PairingRule | undefined, all: Product[], product: Product): Product | undefined {
  if (!rule) return undefined;
  const found = all.filter((p) => p.slug !== product.slug && matches(p, [rule]));
  if (!found.length) return undefined;
  let h = 0;
  for (const ch of product.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return found[h % found.length];
}
