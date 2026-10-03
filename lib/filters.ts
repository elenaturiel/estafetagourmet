/**
 * Filtrado y orden de productos en la tienda.
 * Funciones puras: se usan en cliente y se pueden testear aisladas.
 */
import type { Product } from "@/lib/types";

export type SortKey =
  | "relevancia"
  | "precio-desc"
  | "precio-asc"
  | "nombre"
  | "nombre-desc"
  | "productor";

export const DEFAULT_SORT: SortKey = "relevancia";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-desc", label: "Precio: de mayor a menor" },
  { value: "precio-asc", label: "Precio: de menor a mayor" },
  { value: "nombre", label: "Nombre (A–Z)" },
  { value: "nombre-desc", label: "Nombre (Z–A)" },
  { value: "productor", label: "Agrupar por productor" },
];

/** Valida el orden que llega en la URL (?orden=); si no es válido, el de por defecto. */
export function parseSort(value: string | null): SortKey {
  return SORT_OPTIONS.some((o) => o.value === value) ? (value as SortKey) : DEFAULT_SORT;
}

/** Puntuación de relevancia: favoritos de la casa, luego con etiquetas, luego con precio. */
function relevance(p: Product): number {
  return (p.featured ? 4 : 0) + (p.tags?.length ? 2 : 0) + (p.price !== null ? 1 : 0);
}

export type FilterState = {
  /** Slugs de categoría marcados (solo en la tienda completa). */
  categories: string[];
  /** Valores marcados por clave de atributo: { denominacion: ["dop-roncal"] } */
  attributes: Record<string, string[]>;
  /** Slugs de productor (la "subfamilia" de la hoja de productos). */
  producers: string[];
  minPrice: number | null;
  maxPrice: number | null;
};

export const emptyFilters: FilterState = {
  categories: [],
  attributes: {},
  producers: [],
  minPrice: null,
  maxPrice: null,
};

export function countActiveFilters(state: FilterState): number {
  return (
    state.categories.length +
    Object.values(state.attributes).reduce((n, v) => n + v.length, 0) +
    state.producers.length +
    (state.minPrice !== null ? 1 : 0) +
    (state.maxPrice !== null ? 1 : 0)
  );
}

export function filterProducts(products: Product[], state: FilterState): Product[] {
  return products.filter((p) => {
    // Dentro de un mismo filtro las opciones se suman (O); entre filtros, se cruzan (Y).
    if (state.categories.length && !state.categories.includes(p.categorySlug)) return false;
    for (const [key, values] of Object.entries(state.attributes)) {
      if (values.length && !values.includes(p.attributes[key] ?? "")) return false;
    }
    if (state.producers.length && !state.producers.includes(p.producerSlug ?? "")) {
      return false;
    }
    if (state.minPrice !== null || state.maxPrice !== null) {
      // Sin precio definido no se puede comprobar el rango: se excluye.
      if (p.price === null) return false;
      if (state.minPrice !== null && p.price < state.minPrice) return false;
      if (state.maxPrice !== null && p.price > state.maxPrice) return false;
    }
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];
  // Los productos sin precio van siempre al final al ordenar por precio.
  const priceOf = (p: Product, fallback: number) => p.price ?? fallback;
  switch (sort) {
    case "productor":
      // Todos los de un mismo productor juntos (A–Z) y, dentro, en el orden de la tienda.
      return list.sort(
        (a, b) =>
          (a.producerSlug ?? "~").localeCompare(b.producerSlug ?? "~", "es") ||
          a.categorySlug.localeCompare(b.categorySlug, "es") ||
          a.rank - b.rank,
      );
    case "precio-asc":
      return list.sort((a, b) => priceOf(a, Infinity) - priceOf(b, Infinity) || a.rank - b.rank);
    case "precio-desc":
      return list.sort((a, b) => priceOf(b, -Infinity) - priceOf(a, -Infinity) || a.rank - b.rank);
    case "nombre":
      return list.sort((a, b) => a.name.localeCompare(b.name, "es"));
    case "nombre-desc":
      return list.sort((a, b) => b.name.localeCompare(a.name, "es"));
    default:
      // Relevancia: a igual puntuación se respeta el orden de la tienda (sort es estable).
      return list.sort((a, b) => relevance(b) - relevance(a));
  }
}
