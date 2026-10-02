import { categoryGroups } from "@/data/category-groups";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { categoryHref } from "@/lib/product-utils";

/** Una categoría lista para pintar en un menú (solo datos simples, sirve en cliente). */
export type CategoryNode = {
  slug: string;
  name: string;
  href: string;
  src?: string;
  alt: string;
  placeholder: string;
  /** Número de productos; 0 = todavía sin productos ("pronto"). */
  count: number;
};

export type CategorySection = { name?: string; items: CategoryNode[] };
export type CategoryGroup = { slug: string; name: string; sections: CategorySection[] };

/**
 * Árbol Comida / Bebida / Lotes → subgrupos → categorías, a partir de
 * data/category-groups.ts. Las categorías que falten en la configuración se
 * añaden al final de "Comida".
 */
export function getCategoryTree(): CategoryGroup[] {
  const counts = new Map<string, number>();
  for (const p of products) counts.set(p.categorySlug, (counts.get(p.categorySlug) ?? 0) + 1);
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const used = new Set<string>();

  const node = (slug: string): CategoryNode | null => {
    const c = bySlug.get(slug);
    if (!c) return null;
    used.add(slug);
    return {
      slug: c.slug,
      name: c.name,
      href: categoryHref(c),
      src: c.image.src,
      alt: c.image.alt,
      placeholder: c.image.placeholder,
      count: counts.get(c.slug) ?? 0,
    };
  };

  const tree: CategoryGroup[] = categoryGroups.map((g) => ({
    slug: g.slug,
    name: g.name,
    sections: g.sections.map((s) => ({
      name: s.name,
      items: s.categories.map(node).filter((n): n is CategoryNode => n !== null),
    })),
  }));

  const leftovers = categories.filter((c) => !used.has(c.slug)).map((c) => node(c.slug)!);
  if (leftovers.length) {
    const food = tree.find((g) => g.slug === "comida") ?? tree[0];
    food.sections.push({ name: "Otros", items: leftovers });
  }
  return tree;
}

/** Grupo al que pertenece una categoría. */
export function groupOfCategory(tree: CategoryGroup[], slug: string): CategoryGroup | undefined {
  return tree.find((g) => g.sections.some((s) => s.items.some((i) => i.slug === slug)));
}

/**
 * Reparte los subgrupos en `n` columnas de altura parecida (en orden: cada
 * subgrupo va a la columna que tenga menos categorías en ese momento).
 */
export function balanceSections(sections: CategorySection[], n: number): CategorySection[][] {
  const cols: CategorySection[][] = Array.from({ length: n }, () => []);
  const weight = (c: CategorySection[]) => c.reduce((sum, s) => sum + s.items.length + 2, 0);
  for (const s of sections) {
    const target = cols.reduce((best, c) => (weight(c) < weight(best) ? c : best), cols[0]);
    target.push(s);
  }
  return cols.filter((c) => c.length);
}
