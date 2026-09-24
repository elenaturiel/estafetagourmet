/**
 * Filtrado y orden de productos en la página de categoría.
 * Funciones puras: se usan en cliente y se pueden testear aisladas.
 */
import type { Product } from "@/lib/types";

export type SortKey = "destacados" | "precio-asc" | "precio-desc" | "nombre";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "destacados", label: "Destacados" },
  { value: "precio-asc", label: "Precio: de menor a mayor" },
  { value: "precio-desc", label: "Precio: de mayor a menor" },
  { value: "nombre", label: "Nombre (A–Z)" },
];

export type FilterState = {
  /** Valores marcados por clave de atributo: { denominacion: ["dop-roncal"] } */
  attributes: Record<string, string[]>;
  producers: string[];
  minPrice: number | null;
  maxPrice: number | null;
};

export const emptyFilters: FilterState = {
  attributes: {},
  producers: [],
  minPrice: null,
  maxPrice: null,
};

export function countActiveFilters(state: FilterState): number {
  return (
    Object.values(state.attributes).reduce((n, v) => n + v.length, 0) +
    state.producers.length +
    (state.minPrice !== null ? 1 : 0) +
    (state.maxPrice !== null ? 1 : 0)
  );
}

export function filterProducts(products: Product[], state: FilterState): Product[] {
  return products.filter((p) => {
    // Dentro de un mismo filtro las opciones se suman (O); entre filtros, se cruzan (Y).
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
    case "precio-asc":
      return list.sort((a, b) => priceOf(a, Infinity) - priceOf(b, Infinity) || a.rank - b.rank);
    case "precio-desc":
      return list.sort((a, b) => priceOf(b, -Infinity) - priceOf(a, -Infinity) || a.rank - b.rank);
    case "nombre":
      return list.sort((a, b) => a.name.localeCompare(b.name, "es"));
    default:
      return list.sort((a, b) => a.rank - b.rank);
  }
}
