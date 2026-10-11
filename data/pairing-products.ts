/**
 * Qué productos de la tienda entran en cada maridaje de data/pairings.ts, para
 * enseñarlo en la ficha de cada producto. `a` es el plato o producto y `b` la
 * bebida (o el acompañamiento). Un producto entra si cumple cualquier regla de
 * `a` o de `b`; sus compañeros son los productos del otro lado.
 * Reglas: categoría, productor y/o nombre (expresión regular sobre el título).
 */
export type PairingRule = { cat?: string; producer?: string; name?: RegExp };

export const PAIRING_PRODUCTS: Record<number, { a: PairingRule[]; b: PairingRule[] }> = {
  1: { a: [{ cat: "esparragos" }], b: [{ name: /MONJARDIN Blanco chardonnay reserva/i }] },
  2: { a: [{ producer: "olasagasti", name: /bonito|ventresca/i }, { producer: "ubidea" }], b: [{ name: /BRUT CHARDONNAY MILLESIME/i }] },
  3: { a: [{ cat: "pimientos" }], b: [{ name: /PALACIO DE SADA ROSADO/i }, { name: /IRACHE ROSADO/i }] },
  4: { a: [{ producer: "la-vasco-navarra", cat: "quesos" }, { producer: "irular", name: /higo/i }], b: [{ name: /IRACHE TINTO 1891 CRIANZA/i }] },
  5: { a: [{ producer: "ibericomio" }, { producer: "salamanca-iberica" }], b: [{ name: /PCIRSUS Tinto CUVEE/i }, { name: /BRUT CHARDONNAY MILLESIME/i }] },
  6: { a: [{ producer: "arbizu", cat: "embutidos" }], b: [{ name: /altos de inurrieta/i }, { name: /UNSI TINTO TERRAZAS/i }] },
  7: { a: [{ name: /pochas/i }], b: [{ name: /IRACHE TINTO 1891 COL PRIV GARNACHA/i }] },
  8: { a: [{ producer: "beola", name: /alubias/i }], b: [{ name: /CHIVITE Tinto colecci/i }] },
  9: { a: [{ name: /crema de hongos/i }], b: [{ name: /MONJARDIN Blanco chardonnay gran reserva/i }] },
  10: { a: [{ producer: "katealde", name: /foie|bloc/i }], b: [{ name: /OCHOA Moscatel Vendimia/i }] },
  11: { a: [{ producer: "katealde", name: /foie|bloc/i }], b: [{ name: /SAL ESCAMAS/i }] },
  12: { a: [{ name: /ARBIZU Pate de campana/i }, { producer: "beola", name: /pate|pate/i }], b: [{ name: /AIDIN mermelada de tomate/i }, { name: /UNSI TINTO TERRAZAS/i }] },
  13: { a: [{ name: /PEDRO MAYO S\/azucar almendra/i }, { name: /LEYRE 85/i }], b: [{ name: /UNSI DULCE GARNACHA/i }] },
  14: { a: [{ name: /NAVARRA NEGRO PATXARAN/i }], b: [{ name: /Patxaran ETXEKO/i }, { name: /BAINES Patxaran BAINES etiqueta oro/i }, { name: /BELASCO/i }] },
  15: { a: [{ name: /NAVARRA NEGRO NARANJA/i }], b: [{ name: /BLANCA VILLA Crema de naranja/i }] },
  16: { a: [{ name: /LEYRE CAFE/i }], b: [{ name: /BAINES Crema de patxaran/i }] },
  17: { a: [{ name: /PASTAS SAN FERMIN/i }], b: [{ name: /LAXOA Patxaran/i }] },
  18: { a: [{ producer: "la-vasco-navarra", cat: "quesos" }], b: [{ name: /LN Patxaran LA NAVARRA/i }] },
};
