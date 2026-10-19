import { slugify } from "@/lib/slug";
import type { Product } from "@/lib/types";
import { DESCRIPTIONS } from "./descriptions";
import { productImages } from "./images.generated";
import { giftLots } from "./gift-lots";
import { lots } from "./lots";
import { fixSpelling } from "@/lib/spelling";
import { productRows } from "./products.generated";
import { specRows } from "./specs.generated";

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
  "LVN QUESO RESERVA 1/2 PIEZAS 250 G.",
  "ARBIZU Txistorra individual",
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
 * Precios de venta (IVA incluido) que mandan sobre los de la hoja de cálculo,
 * por título exacto de la hoja. Vacío: los precios salen de la columna
 * «PVP final» de la plantilla de artículos (PLANTILLA_ARTÍCULOS.xlsx).
 */
const PRICES: Record<string, number> = {};

/**
 * Fotos propias (diseños de Estafeta Gourmet), por título exacto de la hoja.
 * Están en public/images/productos-estafeta/ y mandan sobre las de Drive
 * (data/images.generated.ts), así que no se pierden al volver a importar las fotos.
 */
const PHOTOS: Record<string, string> = {
  "NAVARRA NEGRO 85%": "/images/productos-estafeta/navarra-negro-85.webp",
  "AIDIN mermelada de castaña con patxaran": "/images/productos-estafeta/aidin-mermelada-de-castana-con-patxaran.webp",
  "AIDIN mermelada de cebolla confitada con vino": "/images/productos-estafeta/aidin-mermelada-de-cebolla-confitada-con-vino.webp",
  "AIDIN mermelada de fresa de mendigorria": "/images/productos-estafeta/aidin-mermelada-de-fresa-de-mendigorria.webp",
  "AIDIN mermelada de higos nueces y brandy": "/images/productos-estafeta/aidin-mermelada-de-higos-nueces-y-brandy.webp",
  "AIDIN mermelada de aceite": "/images/productos-estafeta/aidin-mermelada-de-aceite.webp",
  "LARRASOAÑA txistorra dulce 220g": "/images/productos-estafeta/larrasoana-txistorra-220g.webp",
  "LARRASOAÑA txistorra picante 220g": "/images/productos-estafeta/larrasoana-txistorra-220g.webp",
  "LARRALDEA sidra navarra": "/images/productos-estafeta/larraldea-sidra-navarra.webp",
  "LARRALDEA sidra ecologica navarra": "/images/productos-estafeta/larraldea-sidra-ecologica-navarra.webp",
  "LARRA GAZTAZARRA Crema oveja 200 g": "/images/productos-estafeta/larra-gaztazarra-crema-oveja-200-g.webp",
  "LARRA cuña 350g caja carton": "/images/productos-estafeta/larra-cuna-350g-caja-carton.webp",
  "LC Guindillas \"PIPARRAS\" 360 ml": "/images/productos/lc-guindillas-piparras.webp",
  "LC Guindillas \"PIPARRAS\" 630 ml": "/images/productos/lc-guindillas-piparras.webp",
  "IBERICOMIO Salchichón ibérico Galocha": "/images/productos-estafeta/ibericomio-salchichon-iberico-galocha.webp",
  "ECOPRO ESTUCHE OLIVE LOVERS": "/images/productos-estafeta/ecopro-estuche-olive-lovers.webp",
  "ECOPRO Cornicabra 500 ml": "/images/productos-estafeta/ecopro-cornicabra-500-ml.webp",
  "ECOPRO Coupage 500 ml": "/images/productos-estafeta/ecopro-coupage-500-ml.webp",
  "ECOPRO Edición Limitada 500 ml": "/images/productos-estafeta/ecopro-edicion-limitada-500-ml.webp",
  "ECOPRO Edición Limitada 250 ml": "/images/productos-estafeta/ecopro-edicion-limitada-250-ml.webp",
  "ECOPRO Sin filtrar 500 ml": "/images/productos-estafeta/ecopro-sin-filtrar-500-ml.webp",
  "ECOPRO Cornicabra 250 ml": "/images/productos-estafeta/ecopro-cornicabra-500-ml.webp",
  "ECOPRO Coupage 250 ml": "/images/productos-estafeta/ecopro-coupage-500-ml.webp",
  "LVN QUESO RESERVA 1/2 PIEZAS 250 G.": "/images/productos-estafeta/lvn-queso-reserva-1-2-piezas-350-g.webp",
  "LVN CUÑA DE QUESO D.O. IDIAZABAL AHUM. 250 G.": "/images/productos-estafeta/lvn-cuna-de-queso-d-o-idiazabal-ahum-250-g.webp",
  "LVN CUÑA DE QUESO D.O. IDIAZABAL NAT. 250 G.": "/images/productos-estafeta/lvn-cuna-de-queso-d-o-idiazabal-nat-250-g.webp",
  "LVN CUÑA DE QUESO OVEJA V NAVARRA AHUM. 250 G.": "/images/productos-estafeta/lvn-cuna-de-queso-oveja-v-navarra-ahum-250-g.webp",
  "LVN CUÑA DE QUESO OVEJA V NAVARRA NAT. 250 G.": "/images/productos-estafeta/lvn-cuna-de-queso-oveja-v-navarra-nat-250-g.webp",
  "LVN QUESO OVEJA V. NAVARRA CUÑA 250 G. EST. METALICO": "/images/productos-estafeta/lvn-queso-oveja-v-navarra-cuna-250-g-est-metalico.webp",
  "LVN CUÑA QUESO DE OVEJA INYECTADO CON TRUFA 150 G": "/images/productos-estafeta/lvn-cuna-queso-oveja-trufa.webp",
  "LVN CUÑA QUESO DE OVEJA INYECTADO CON AJO NEGRO 150 G": "/images/productos-estafeta/lvn-cuna-queso-oveja-ajo-negro.webp",
  "BRESKA Miel milflores 500g": "/images/productos-estafeta/breska-miel-milflores-500g.webp",
  "BRESKA Miel milflores 1000g": "/images/productos-estafeta/breska-miel-milflores-1000g.webp",
  "BRESKA Romero 500g": "/images/productos-estafeta/breska-romero-500g.webp",
  "BRESKA Romero 1000g": "/images/productos-estafeta/breska-romero-1000g.webp",
  "BRESKA Encina 500g": "/images/productos-estafeta/breska-encina-500g.webp",
  "BRESKA Encina 1000g": "/images/productos-estafeta/breska-encina-1000g.webp",
  "AIDIN mermelada de cascabillo de roncal": "/images/productos-estafeta/aidin-mermelada-de-cascabillo-de-roncal.webp",
  "CHIVITE Vendimia Tardía COLECCION 125": "/images/productos-estafeta/chivite-vendimia-tardia-coleccion-125.webp",
  "NAVARRA NEGRO CAFÉ": "/images/productos-estafeta/navarra-negro-cafe.webp",
  "NAVARRA NEGRO CEREZA Y MIEL": "/images/productos-estafeta/navarra-negro-cereza-y-miel.webp",
  "NAVARRA NEGRO NARANJA": "/images/productos-estafeta/navarra-negro-naranja.webp",
  "NAVARRA NEGRO PASAS AL RON": "/images/productos-estafeta/navarra-negro-pasas-al-ron.webp",
  "NAVARRA NEGRO PATXARAN": "/images/productos-estafeta/navarra-negro-patxaran.webp",
  "NAVARRA NEGRO VINO TINTO": "/images/productos-estafeta/chocolate-negro-72-vino-tinto.webp",
  "NAVARRA NEGRO 85% ARANDANOS": "/images/productos-estafeta/chocolate-negro-85-arandanos.webp",
  "NAVARRA NEGRO 62% S/AZUC": "/images/productos-estafeta/chocolate-negro-62-puro.webp",
  "NAVARRA CAFE BOMBON S/AZUC": "/images/productos-estafeta/chocolate-con-leche-cafe-bombon.webp",
  "NAVARRA NEGRO PIPARAS": "/images/productos-estafeta/chocolate-negro-72-piparras.webp",
  "NAVARRA CON LECHE SIDRA Y MANZANA": "/images/productos-estafeta/chocolate-con-leche-manzana-a-la-sidra.webp",
  "NAVARRICO PIQUILLO TIRAS FRASCO 250ml": "/images/productos-estafeta/navarrico-piquillo-tiras-primera.webp",
  "NAVARRICO ESPÁRRAGOS BRASA ALIÑADOS": "/images/productos-estafeta/navarrico-esparragos-braseados.webp",
  "NAVARRA PASTAS SAN FERMIN AL PATXARAN": "/images/productos-estafeta/navarra-pastas-san-fermin-al-patxaran.webp",
};

/** Ficha técnica del Excel de ingredientes y alérgenos (data/specs.generated.ts), por título de la hoja. */
function specsOf(sheetName: string): Product["specs"] {
  const r = specRows[slugify(sheetName)];
  if (!r) return undefined;
  return { weight: r.w, reference: r.ref, ingredients: r.i, allergens: r.a, packaging: r.p, other: r.o, exact: r.exact };
}

/**
 * Nombre y descripción en la web de productos que en la hoja no los tienen
 * (los "Chocolate sabor nº…"), por título exacto de la hoja. La dirección de
 * la ficha sale del nombre nuevo.
 */
const RENAMED: Record<string, { name: string; description: string }> = {
  "NAVARRA NEGRO VINO TINTO": {
    name: "Chocolate negro 72 % vino tinto",
    description: "Chocolate artesano negro 72 % cacao con vino tinto: notas de uva madura sobre un cacao intenso. Una tableta para la sobremesa, con una copa de tinto navarro.",
  },
  "NAVARRA NEGRO 85% ARANDANOS": {
    name: "Chocolate negro 85 % arándanos",
    description: "Chocolate artesano negro 85 % cacao con arándanos: el punto ácido de la fruta del bosque frente al amargor del cacao.",
  },
  "NAVARRA NEGRO 62% S/AZUC": {
    name: "Chocolate negro 62 % puro sin azúcar añadido",
    description: "Chocolate artesano negro 62 % cacao, sin azúcar añadido: haba de cacao y vainilla, suave y redondo.",
  },
  "NAVARRA CAFE BOMBON S/AZUC": {
    name: "Chocolate con leche café bombón sin azúcar añadido",
    description: "Chocolate artesano con leche, sin azúcar añadido, con sabor a café bombón: café y leche condensada en una tableta cremosa.",
  },
  "NAVARRA NEGRO PIPARAS": {
    name: "Chocolate negro 72 % piparras",
    description: "Chocolate artesano negro 72 % cacao con piparras, la guindilla vasco-navarra: un toque verde y suavemente picante sobre el cacao. Una sorpresa para el aperitivo o la sobremesa.",
  },
  "NAVARRA CON LECHE SIDRA Y MANZANA": {
    name: "Chocolate con leche manzana a la sidra",
    description: "Chocolate artesano con leche, con manzana a la sidra y canela: dulce, afrutado y con el aroma de la sidra.",
  },
};


const sheetProducts: Product[] = productRows.map(([sheetCategory, producerSlug, sheetName, price]) => {
  const categorySlug = sheetCategory;
  const renamed = RENAMED[sheetName];
  const baseName = renamed?.name ?? sheetName;
  const slug = uniqueSlug(baseName);
  const name = fixSpelling(baseName);
  const rank = (rankByCategory.get(categorySlug) ?? 0) + 1;
  rankByCategory.set(categorySlug, rank);
  return {
    slug,
    name,
    categorySlug,
    producerSlug,
    price: PRICES[sheetName] ?? price ?? null,
    description: renamed?.description ?? DESCRIPTIONS[slug] ?? DESCRIPTION,
    image: { alt: name, placeholder: "Foto · producto", src: PHOTOS[sheetName] ?? productImages[slug] },
    specs: specsOf(sheetName),
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
