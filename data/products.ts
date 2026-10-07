import { slugify } from "@/lib/slug";
import type { Product } from "@/lib/types";
import { DESCRIPTIONS } from "./descriptions";
import { productImages } from "./images.generated";
import { giftLots } from "./gift-lots";
import { lots } from "./lots";
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

/**
 * Precios con IVA de productos que en la hoja salen sin precio, por título
 * exacto. Si la hoja trae precio, manda el de la hoja.
 */
const PRICES: Record<string, number> = {
  "CHIVITE Blanco COLECCION 125": 31.9,
  "CHIVITE Rosado COLECCION 125": 31.9,
  "CHIVITE Tinto colección 125": 31,
  "MONJARDIN Blanco chardonnay reserva": 26.3,
};

/**
 * Fotos propias (diseños de Estafeta Gourmet), por título exacto de la hoja.
 * Están en public/images/productos-estafeta/ y mandan sobre las de Drive
 * (data/images.generated.ts), así que no se pierden al volver a importar las fotos.
 */
const PHOTOS: Record<string, string> = {
  "NAVARRA NEGRO 85%": "/images/productos-estafeta/navarra-negro-85.webp",
  "NAVARRA Chocolate sabor nº1": "/images/productos-estafeta/chocolate-negro-72-vino-tinto.webp",
  "NAVARRA Chocolate sabor nº2": "/images/productos-estafeta/chocolate-negro-85-arandanos.webp",
  "NAVARRA Chocolate sabor nº3": "/images/productos-estafeta/chocolate-negro-62-puro.webp",
  "NAVARRA Chocolate sabor nº4": "/images/productos-estafeta/chocolate-con-leche-cafe-bombon.webp",
};

/**
 * Nombre y descripción en la web de productos que en la hoja no los tienen
 * (los "Chocolate sabor nº…"), por título exacto de la hoja. La dirección de
 * la ficha sale del nombre nuevo.
 */
const RENAMED: Record<string, { name: string; description: string }> = {
  "NAVARRA Chocolate sabor nº1": {
    name: "Chocolate negro 72 % vino tinto",
    description: "Chocolate artesano negro 72 % cacao con vino tinto: notas de uva madura sobre un cacao intenso. Una tableta para la sobremesa, con una copa de tinto navarro.",
  },
  "NAVARRA Chocolate sabor nº2": {
    name: "Chocolate negro 85 % arándanos",
    description: "Chocolate artesano negro 85 % cacao con arándanos: el punto ácido de la fruta del bosque frente al amargor del cacao.",
  },
  "NAVARRA Chocolate sabor nº3": {
    name: "Chocolate negro 62 % puro sin azúcar añadido",
    description: "Chocolate artesano negro 62 % cacao, sin azúcar añadido: haba de cacao y vainilla, suave y redondo.",
  },
  "NAVARRA Chocolate sabor nº4": {
    name: "Chocolate con leche café bombón sin azúcar añadido",
    description: "Chocolate artesano con leche, sin azúcar añadido, con sabor a café bombón: café y leche condensada en una tableta cremosa.",
  },
};

const sheetProducts: Product[] = productRows.map(([categorySlug, producerSlug, sheetName, price]) => {
  const renamed = RENAMED[sheetName];
  const name = renamed?.name ?? sheetName;
  const slug = uniqueSlug(name);
  const rank = (rankByCategory.get(categorySlug) ?? 0) + 1;
  rankByCategory.set(categorySlug, rank);
  return {
    slug,
    name,
    categorySlug,
    producerSlug,
    price: price ?? PRICES[sheetName] ?? null,
    description: renamed?.description ?? DESCRIPTIONS[slug] ?? DESCRIPTION,
    image: { alt: name, placeholder: "Foto · producto", src: PHOTOS[sheetName] ?? productImages[slug] },
    attributes: {} as Record<string, string>,
    featured: featured.has(slug) || undefined,
    bestseller: bestsellerRank.get(slug),
    tags: TAGS[slug],
    pairsWith: PAIRS_WITH[slug],
    rank,
  };
});

/** Hoja de cálculo + lotes especiales (data/lots.ts), que van al final de "Lotes". */
export const products: Product[] = [
  ...sheetProducts,
  ...[...giftLots, ...lots].map((lot) => {
    taken.add(lot.slug);
    const rank = (rankByCategory.get(lot.categorySlug) ?? 0) + 1;
    rankByCategory.set(lot.categorySlug, rank);
    return { ...lot, rank };
  }),
];
