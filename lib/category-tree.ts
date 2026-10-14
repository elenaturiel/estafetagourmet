import { categoryGroups } from "@/data/category-groups";
import { products } from "@/data/products";
import { getCategories } from "@/lib/catalog";
import { categoryHref } from "@/lib/product-utils";
import { getT } from "@/lib/i18n/server";
import type { CategoryGroup, CategoryNode } from "@/lib/category-tree-utils";

export type { CategoryGroup, CategoryNode, CategorySection } from "@/lib/category-tree-utils";
export { balanceSections, groupOfCategory } from "@/lib/category-tree-utils";

/**
 * Árbol Comida / Bebida / Lotes → subgrupos → categorías, a partir de
 * data/category-groups.ts, con los nombres en el idioma de la página. Las
 * categorías que falten en la configuración se añaden al final de "Comida".
 */
export async function getCategoryTree(): Promise<CategoryGroup[]> {
  const [categories, t] = await Promise.all([getCategories(), getT()]);
  const groupNames = t.shop.menu.groups as Record<string, string>;
  const sectionNames = t.shop.menu.sections as Record<string, string>;
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
    name: groupNames[g.slug] ?? g.name,
    sections: g.sections.map((s) => ({
      name: s.name ? (sectionNames[s.name] ?? s.name) : undefined,
      items: s.categories.map(node).filter((n): n is CategoryNode => n !== null),
    })),
  }));

  const leftovers = categories.filter((c) => !used.has(c.slug)).map((c) => node(c.slug)!);
  if (leftovers.length) {
    const food = tree.find((g) => g.slug === "comida") ?? tree[0];
    food.sections.push({ name: sectionNames.Otros ?? "Otros", items: leftovers });
  }
  return tree;
}

