/** Tipos y utilidades del árbol de categorías que también usan los componentes de cliente. */

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
