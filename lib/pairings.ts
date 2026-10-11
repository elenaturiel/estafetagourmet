import { PAIRING_PRODUCTS, type PairingRule } from "@/data/pairing-products";
import { pairingGroups, type Pairing } from "@/data/pairings";
import type { Product } from "@/lib/types";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const matches = (p: Product, rules: PairingRule[]) =>
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
