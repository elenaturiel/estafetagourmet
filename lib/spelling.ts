/**
 * Corrección ortográfica de los títulos de producto que vienen de la hoja
 * (tildes que faltan, erratas…). Solo cambia lo que se VE: la dirección de
 * cada producto (slug), sus fotos y sus datos siguen colgando del título
 * original de la hoja, así que no hace falta tocar nada más.
 */
const WORDS: [string, string][] = [
  ["esparrago", "espárrago"], ["esparragos", "espárragos"], ["cilindrico", "cilíndrico"],
  ["calabacin", "calabacín"], ["vizcaina", "vizcaína"], ["alegrias", "alegrías"], ["clasica", "clásica"],
  ["metalico", "metálico"], ["monjardin", "monjardín"], ["azucar", "azúcar"], ["viejisimo", "viejísimo"],
  ["mediodia", "mediodía"], ["cuvee", "cuvée"], ["millesime", "millésime"], ["rose", "rosé"],
  ["ancko", "anko"], ["maiz", "maíz"], ["higado", "hígado"], ["pate", "paté"], ["albondigas", "albóndigas"],
  ["patxaran", "patxarán"], ["pacharan", "patxarán"], ["pacharanes", "patxaranes"], ["pinon", "piñón"],
  ["micuit", "mi-cuit"], ["fermin", "Fermín"], ["arroniz", "arróniz"], ["idiazabal", "Idiazábal"],
  ["coleccion", "colección"], ["tableton", "tabletón"], ["corazon", "corazón"], ["blanca", "blanca"],
];

function matchCase(found: string, to: string): string {
  if (found === found.toUpperCase() && found.length > 1) return to.toUpperCase();
  if (found[0] === found[0].toUpperCase()) return to[0].toUpperCase() + to.slice(1);
  return to;
}

export function fixSpelling(name: string): string {
  let out = name;
  for (const [from, to] of WORDS) {
    if (from === to) continue;
    out = out.replace(new RegExp(`(?<![\\p{L}])${from}(?![\\p{L}])`, "giu"), (m) => matchCase(m, to));
  }
  return out
    .replace(/\bCuvee(?=[A-Z])/g, "Cuvée ") // "CuveeLaderas"
    .replace(/^C Lágrimas/, "LC Lágrimas") // falta la L de "LC"
    .replace(/BLANCA VILLA/g, "BIANCA VILLA") // la marca es Bianca Villa
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\bMIO\b/g, "MIO");
}
