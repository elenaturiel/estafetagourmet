import type { Product } from "@/lib/types";
import { lotRows } from "./lots.generated";

/**
 * Lotes especiales (Amigos, Cumpleaños, Empresas, Navidad, Pareja, San Fermín).
 *
 * Las fotos y la lista de productos de cada lote salen de la carpeta
 * "5. Lotes especiales" de Drive con `python3 scripts/importar-lotes.py`
 * (data/lots.generated.ts). Lo que se escribe a mano está aquí: los precios,
 * y los nombres cuidados de los productos que lleva cada lote.
 */

/** Precio de cada lote (IVA incluido), por slug. Sin precio = "Precio a consultar". */
const PRICES: Record<string, number> = {
  // "lote-amigos-opcion-a": 49.9,
};

/** Nombre de cada producto tal y como se muestra en la descripción (el original sale del nombre del archivo de la foto). */
const NAMES: Record<string, string> = {
  "Pimientos del piquillo ecologicos enteros extra (Anko)": "Pimientos del piquillo ecológicos enteros extra (Anko)",
  "Chorizo a la sidra lata (Arbizu)": "Chorizo a la sidra, lata (Arbizu)",
  "Chocolate especial postres (Pedro Mayo)": "Chocolate especial para postres (Pedro Mayo)",
  "Sierra perra garnacha tinta": "Sierra Perra, garnacha tinta (Alconde)",
  "Txorizo dulce 250g (Arbizu)": "Txorizo dulce 250 g (Arbizu)",
  "Txorizo picante 250g (Arbizu)": "Txorizo picante 250 g (Arbizu)",
  "Higo con pimentón de ezpeleta (Irular)": "Mermelada de higo con pimentón de Ezpeleta (Irular)",
  "Fresa (Aidin)": "Mermelada de fresa (Aidin)",
  "castaña con patxarán (Aidin)": "Mermelada de castaña con patxarán (Aidin)",
  "Frambuesa con arandanos (Aidin)": "Mermelada de frambuesa con arándanos (Aidin)",
  "Cojonudos Espárragos de navarra 8-12 tarro (El Navarrico)": "Espárragos de Navarra Cojonudos 8-12, tarro (El Navarrico)",
  "Cojonudos Espárragos de navarra 9-12 tarro (El Navarrico)": "Espárragos de Navarra Cojonudos 9-12, tarro (El Navarrico)",
  "Cojonudos Espárragos de navarra 4-6 lata (El Navarrico)": "Espárragos de Navarra Cojonudos 4-6, lata (El Navarrico)",
  "Alcachofas corazones enteros 10-12 tarro cuadrado (La Catedral)": "Corazones de alcachofa enteros 10-12, tarro cuadrado (La Catedral)",
  "Alcachofas corazones en mitades primera al natural (La Catedral)": "Corazones de alcachofa en mitades, primera al natural (La Catedral)",
  "Cuvee especial (Pago de Cirsus)": "Cuvée especial (Pago de Cirsus)",
  "Seleccion de familia (Pago de Cirsus)": "Selección de familia (Pago de Cirsus)",
  "Chocolate extrafino negro 70 (Leyre)": "Chocolate extrafino negro 70 % (Leyre)",
  "1891 crianza (Irache)": "1891 Crianza (Irache)",
  "1891 rosado (Irache)": "1891 Rosado (Irache)",
  "colección 125 (Chivite)": "Colección 125 (Chivite)",
  "62 chocolate negro (Pedro Mayo)": "Chocolate negro 62 % (Pedro Mayo)",
  "62 chocolate negro con almendras marconas (Pedro Mayo)": "Chocolate negro 62 % con almendras marconas (Pedro Mayo)",
  "Espárragos (Dantza)": "Espárragos de Navarra (Dantza)",
  "Dulce garnacha (Unsi)": "Dulce Garnacha (Unsi)",
  "Sanfermines pastas de patxarán (Navarra en Dulce)": "Pastas de San Fermín al patxarán (Navarra en Dulce)",
  "Regenera Metanoia tinto": "Regenera Metanoia, tinto (Alconde)",
  "Altos de Inurrieta": "Altos de Inurrieta, tinto (Inurrieta)",
  "Habitas baby tarro cuadrado (La Catedral)": "Habitas baby, tarro cuadrado (La Catedral)",
  "Espárragos blancos extra gruesos tarro (La Catedral)": "Espárragos blancos extra gruesos, tarro (La Catedral)",
  "Pimientos del piquillo tarro cuadrado (La Catedral)": "Pimientos del piquillo, tarro cuadrado (La Catedral)",
  "Yemas de Espárragos blancos extra 8-12 (La Catedral)": "Yemas de espárrago blanco extra 8-12 (La Catedral)",
  "Espárragos enteros extra gruesos 6 frutos lata (La Catedral)": "Espárragos enteros extra gruesos, 6 frutos, lata (La Catedral)",
  "Espárragos enteros extra muy gruesos 5 frutos lata (La Catedral)": "Espárragos enteros extra muy gruesos, 5 frutos, lata (La Catedral)",
  "Pimientos del piquillo de navarra extra enteros (Anko)": "Pimientos del piquillo de Navarra extra enteros (Anko)",
};

/** Valor del filtro "Ocasión" de la categoría Lotes según el slug (lote-<ocasión>-opcion-x). */
const OCCASION_FILTER: Record<string, string> = {
  amigos: "amigos", cumpleanos: "cumpleanos", empresas: "empresas", navidad: "navidad", pareja: "pareja", "san-fermin": "sanfermin",
};

const clean = (n: string) => {
  const c = NAMES[n] ?? n;
  return c.charAt(0).toUpperCase() + c.slice(1);
};

const list = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}` : items[0];

/** Los lotes, listos para añadir al catálogo (categoría "lotes"). `rank` lo pone products.ts. */
export const lots: Omit<Product, "rank">[] = lotRows.map((l) => {
  const name = `Lote ${l.occasion} · Opción ${l.option}`;
  const items = l.items.map(clean);
  const gallery = l.images.map((im, i) => ({
    src: im.src,
    alt: i === 0 ? `${name}: todos los productos` : clean(im.alt),
    placeholder: "Foto · lote",
  }));
  return {
    slug: l.slug,
    name,
    categorySlug: "lotes",
    producerSlug: null,
    price: PRICES[l.slug] ?? null,
    subtitle: "Selección de la casa",
    description: `Lote ${l.why}, con ${items.length} productos. Contiene: ${list(items)}.`,
    image: gallery[0],
    gallery,
    attributes: { ocasion: OCCASION_FILTER[l.slug.replace(/^lote-/, "").replace(/-opcion-[ab]$/, "")] ?? "" },
  };
});
