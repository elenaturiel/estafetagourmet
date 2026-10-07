import { producerImages } from "./images.generated";
import { categories } from "./categories";
import { producerNames, productRows } from "./products.generated";
import type { Producer } from "@/lib/types";

/**
 * Productores / proveedores (la "subfamilia" de la hoja de productos).
 *
 * Los nombres vienen de la hoja (data/products.generated.ts). Aquí se
 * completan la localidad y la foto de cada uno, y se elige cuáles salen en la
 * portada ("Conoce a quienes lo hacen").
 */

/** Slugs de los que salen en la portada, en este orden. TODO: elegir los reales. */
const FEATURED = ["la-catedral", "el-navarrico", "la-vasco-navarra", "inurrieta"];

/** Localidad de cada productor, por slug. TODO: rellenar (mientras tanto sale el marcador). */
const LOCALITY: Record<string, string> = {};

/** Categoría donde más productos tiene cada productor. */
function mainCategory(producerSlug: string) {
  const count = new Map<string, number>();
  for (const [category, producer] of productRows) {
    if (producer === producerSlug) count.set(category, (count.get(category) ?? 0) + 1);
  }
  const top = [...count.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  return categories.find((c) => c.slug === top) ?? categories[0];
}

export const producers: Producer[] = Object.entries(producerNames)
  .map(([slug, name]) => {
    const category = mainCategory(slug);
    return {
      slug,
      name,
      locality: LOCALITY[slug] ?? "[Localidad]",
      specialty: category.name,
      categorySlug: category.slug,
      featured: FEATURED.includes(slug) || undefined,
      image: { alt: `Logotipo de ${name}`, placeholder: "Retrato · productor/a", src: producerImages[slug] },
    };
  })
  .sort((a, b) => {
    const fa = FEATURED.indexOf(a.slug);
    const fb = FEATURED.indexOf(b.slug);
    if (fa !== -1 || fb !== -1) return (fa === -1 ? 99 : fa) - (fb === -1 ? 99 : fb);
    return a.name.localeCompare(b.name, "es");
  });
