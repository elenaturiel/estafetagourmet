import { slugify } from "@/lib/slug";

/**
 * Ideas de regalo (página /regalos y apartado de los menús).
 *
 * Tres cosas se pueden regalar: un LOTE (data/lots.ts y los de la hoja), un
 * PRODUCTO suelto o una PAREJA de productos que funcionan bien juntos. Cada una
 * se etiqueta con a quién va dirigida (`RECIPIENTS`), y la página deja filtrar.
 * Todo se escribe con el título tal cual sale en la hoja (data/products.generated.ts).
 */

export type RecipientSlug = "padres" | "amigos" | "pareja" | "cumpleanos" | "navidad" | "sanfermin" | "eventos" | "empresas";

export const RECIPIENTS: { slug: RecipientSlug; label: string; short: string; blurb: string }[] = [
  { slug: "padres", label: "Para padres", short: "Padres", blurb: "Los clásicos que nunca fallan" },
  { slug: "amigos", label: "Para amigos", short: "Amigos", blurb: "Para compartir y picar" },
  { slug: "pareja", label: "Para parejas", short: "Pareja", blurb: "Una cena, un detalle, un brindis" },
  { slug: "cumpleanos", label: "Cumpleaños", short: "Cumpleaños", blurb: "Para celebrar un año más" },
  { slug: "navidad", label: "Navidad", short: "Navidad", blurb: "Para las mesas de fiesta" },
  { slug: "sanfermin", label: "San Fermín", short: "San Fermín", blurb: "Txistorra, patxarán y fiesta" },
  { slug: "eventos", label: "Para eventos", short: "Eventos", blurb: "Celebraciones, bodas y reuniones" },
  { slug: "empresas", label: "Para empresas", short: "Empresas", blurb: "Regalos para clientes y equipos" },
];

export const isRecipient = (v: string | undefined): v is RecipientSlug => RECIPIENTS.some((r) => r.slug === v);
export const giftsHref = (para?: RecipientSlug) => (para ? `/regalos?para=${para}` : "/regalos");

/** A quién va cada lote, por slug de producto. */
export const LOT_RECIPIENTS: Record<string, RecipientSlug[]> = {
  "navarra-en-una-caja": ["padres", "amigos", "navidad", "eventos"],
  "sobremesa-navarra": ["padres", "sanfermin", "navidad", "amigos"],
  "regalo-gourmet": ["pareja", "padres", "navidad", "empresas"],
  txupinazo: ["sanfermin", "amigos", "eventos"],
  "brisa-del-cantabrico": ["amigos", "pareja", "eventos"],
  dehesa: ["padres", "empresas", "navidad"],
  "huerta-de-la-ribera": ["padres", "pareja"],
  "dulce-tentacion": ["pareja", "amigos", "cumpleanos"],
  "oro-de-navarra": ["padres", "amigos", "empresas"],
  "lote-amigos-opcion-a": ["amigos"],
  "lote-amigos-opcion-b": ["amigos"],
  "lote-cumpleanos-opcion-a": ["cumpleanos", "amigos"],
  "lote-cumpleanos-opcion-b": ["cumpleanos", "amigos"],
  "lote-empresas-opcion-a": ["empresas"],
  "lote-empresas-opcion-b": ["empresas"],
  "lote-navidad-opcion-a": ["navidad", "padres"],
  "lote-navidad-opcion-b": ["navidad", "padres"],
  "lote-pareja-opcion-a": ["pareja"],
  "lote-pareja-opcion-b": ["pareja"],
  "lote-san-fermin-opcion-a": ["sanfermin", "amigos"],
  "lote-san-fermin-opcion-b": ["sanfermin", "amigos"],
  "navarrico-lote-detalle": ["padres", "amigos"],
  "navarrico-lote-navarro": ["padres", "amigos"],
  "navarrico-lote-fusion-blanco": ["pareja", "padres"],
  "navarrico-lote-fusiontinto": ["pareja", "padres"],
  "navarrico-lote-imprescindible": ["padres", "navidad", "eventos"],
  "navarrico-lote-gourmet": ["padres", "navidad", "empresas"],
  "navarrico-lote-capricho": ["padres", "navidad", "empresas", "eventos"],
};

/** Productos sueltos que dan buen regalo (título de la hoja → a quién). */
const SINGLES: [string, RecipientSlug[]][] = [
  ["INURRIETA TINTO altos de inurrieta", ["padres", "amigos"]],
  ["SALAMANCA Jamón ibérico bellota 100%", ["padres", "navidad", "empresas"]],
  ["LN Patxarán ETXEKO", ["sanfermin", "padres", "amigos"]],
  ["PCIRSUS Tinto SELECCIÓN DE FAMILIA", ["navidad", "padres", "empresas"]],
  ["LVN QUESO RESERVA 1/2 PIEZAS 350 G.", ["padres"]],
  ["ARBIZU Txistorra 1 kg", ["sanfermin", "amigos", "eventos"]],
  ["OCHOA Labrit rosado", ["amigos", "cumpleanos"]],
  ["KATEALDE Foie gras tarro", ["navidad", "pareja", "padres"]],
  ["NAVARRA NEGRO PATXARAN", ["pareja"]],
  ["OCHOA Moscatel Vendimia Tardía", ["pareja"]],
  ["INURRIETA BLANCO orchidea cuvee", ["pareja", "eventos"]],
  ["HQ ANFORA TRUFA BLANCA AOVE 250 ml", ["navidad", "pareja", "empresas", "padres"]],
  ["PCIRSUS Tinto CUVEE ESPECIAL", ["cumpleanos", "eventos", "empresas"]],
  ["DANTZA Espárrago DO Navarra Lata Fiesta", ["sanfermin", "eventos"]],
  ["KATEALDE Bloc de foie pato con champagne", ["navidad", "eventos", "pareja"]],
  ["ECOPRO ESTUCHE OLIVE LOVERS", ["empresas", "padres"]],
  ["LEYRE TABLETON NEGRO ALMENDRAS 800 GRS.", ["cumpleanos", "amigos", "eventos"]],
  ["SALAMANCA Jamón ibérico cebo 50%", ["cumpleanos", "eventos", "amigos"]],
  ["UNSI DULCE GARNACHA TINTA", ["pareja", "padres"]],
];
export const GIFT_PRODUCTS: { slug: string; para: RecipientSlug[] }[] = SINGLES.map(([title, para]) => ({
  slug: slugify(title),
  para,
}));

/** Parejas de productos que suenan bien juntos (se compran con un solo botón). */
const PAIRS: { name: string; blurb: string; titles: [string, string]; para: RecipientSlug[] }[] = [
  { name: "Queso y vino", blurb: "Un queso curado de oveja y un tinto navarro con carácter.", titles: ["LVN QUESO CURADO 1/2 PIEZAS 400 G.", "INURRIETA TINTO altos de inurrieta"], para: ["padres", "amigos", "pareja"] },
  { name: "Txistorra y patxarán", blurb: "La fiesta navarra en dos productos: la txistorra de siempre y un buen patxarán para el final.", titles: ["ARBIZU Txistorra 1 kg", "LN Patxarán LA NAVARRA"], para: ["sanfermin", "amigos", "eventos", "padres"] },
  { name: "Jamón y tinto", blurb: "Jamón ibérico de bellota y un tinto joven para abrir sin pensar.", titles: ["SALAMANCA Jamón ibérico bellota 100%", "PCIRSUS VENDIMIA SELECCIONADA"], para: ["navidad", "padres", "pareja"] },
  { name: "Foie y mermelada", blurb: "Foie gras de pato con mermelada de higo: el aperitivo que luce en cualquier mesa.", titles: ["KATEALDE Foie gras barqueta micuit", "IRULAR Mermelada higo"], para: ["navidad", "pareja", "eventos"] },
  { name: "Espárragos y blanco", blurb: "Espárragos blancos de Navarra y un blanco fresco para acompañarlos.", titles: ["LC ESPÁRRAGOS 6", "INURRIETA BLANCO orchidea"], para: ["cumpleanos", "amigos", "pareja", "eventos"] },
  { name: "Chocolate y moscatel", blurb: "Chocolate negro 85 % y un moscatel de vendimia tardía: el postre perfecto.", titles: ["LEYRE 85 % 125 GRS.", "OCHOA Moscatel Vendimia Tardía"], para: ["cumpleanos", "pareja", "padres"] },
  { name: "Aperitivo de piparras", blurb: "Piparras y bonito del norte en escabeche: un pincho clásico en casa.", titles: ["UBIDEA PIPARRAS MEDIANAS", "OLASAGASTI Bonito en escabeche 112G"], para: ["sanfermin", "amigos", "eventos"] },
  { name: "Cena fácil para dos", blurb: "Piquillos rellenos de bacalao y un rosado fresco: lista en minutos.", titles: ["NAVARRICO Pimientos rellenos de bacalao", "INURRIETA ROSADO mediodia"], para: ["pareja"] },
  { name: "Ibérico y rosado", blurb: "Chorizo ibérico de bellota y un rosado de garnacha, para picar con amigos.", titles: ["IBERICOMIO Chorizo ibérico Galocha", "PALACIO DE SADA ROSADO GARNACHA"], para: ["amigos", "eventos"] },
  { name: "Detalle para clientes", blurb: "Aceite de oliva virgen extra de edición limitada y pastas de patxarán: un regalo de empresa con sabor a Navarra.", titles: ["ECOPRO Edición Limitada 500 ml", "NAVARRA PASTAS SAN FERMIN AL PATXARAN"], para: ["empresas"] },
];
export const GIFT_PAIRS = PAIRS.map((p) => ({
  slug: slugify(p.name),
  name: p.name,
  blurb: p.blurb,
  products: [slugify(p.titles[0]), slugify(p.titles[1])] as [string, string],
  para: p.para,
}));
