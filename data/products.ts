import { slugify } from "@/lib/slug";
import type { Product } from "@/lib/types";
import { DESCRIPTIONS } from "./descriptions";
import { productImages } from "./images.generated";
import { productRows } from "./products.generated";

/**
 * Catálogo.
 *
 * Los productos (categoría, proveedor, título y precio) vienen de la hoja de
 * cálculo y se cargan con `python3 scripts/importar-productos.py <hoja.ods>`
 * en data/products.generated.ts. Aquí se añaden los extras que no están en la
 * hoja: destacados, etiquetas y maridajes. Ver README → "Cómo cambiar el catálogo".
 */

/** Descripciones (borrador, ver data/descriptions.ts). Si falta alguna, se muestra este marcador. */
const DESCRIPTION = "[Descripción del producto: origen, elaboración, conservación y maridaje]";

/**
 * "Los favoritos de la casa" de la portada: títulos exactos de la hoja.
 * TODO: elegir los favoritos reales (se muestran 4: el primero de cada categoría, en el orden de la tienda).
 */
const FEATURED = [
  "NAVARRICO ESPÁRRAGO FRASCO 580 ml 9/12 FR D.O",
  "LVN QUESO CURADO 1/2 PIEZAS 400 G.",
  "ARBIZU Txistorra 1 kg",
  "INURRIETA TINTO altos de inurrieta",
];

/**
 * "Más vendidos" (orden de la tienda): títulos exactos de la hoja, del más
 * vendido al menos. Los que no estén aquí van detrás, por relevancia.
 * TODO: poner los más vendidos reales (ahora son los favoritos de la casa).
 */
const BESTSELLERS = [...FEATURED];

/** Etiquetas visibles sobre la foto (máx. 2), por slug de producto. */
const TAGS: Record<string, string[]> = {};

/** "Combina con" en la ficha, por slug de producto. Si no se indica, se sugieren otros de la categoría. */
const PAIRS_WITH: Record<string, string[]> = {};

const featured = new Set(FEATURED.map(slugify));
const bestsellerRank = new Map(BESTSELLERS.map((name, i) => [slugify(name), i + 1]));
const taken = new Set<string>();
const rankByCategory = new Map<string, number>();

function uniqueSlug(name: string): string {
  const base = slugify(name) || "producto";
  let slug = base;
  for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`;
  taken.add(slug);
  return slug;
}

export const products: Product[] = productRows.map(([categorySlug, producerSlug, name, price]) => {
  const slug = uniqueSlug(name);
  const rank = (rankByCategory.get(categorySlug) ?? 0) + 1;
  rankByCategory.set(categorySlug, rank);
  return {
    slug,
    name,
    categorySlug,
    producerSlug,
    price,
    description: DESCRIPTIONS[slug] ?? DESCRIPTION,
    image: { alt: name, placeholder: "Foto · producto", src: productImages[slug] },
    attributes: {},
    featured: featured.has(slug) || undefined,
    bestseller: bestsellerRank.get(slug),
    tags: TAGS[slug],
    pairsWith: PAIRS_WITH[slug],
    rank,
  };
});
