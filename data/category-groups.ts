/**
 * Cómo se agrupan las categorías en los menús y en la tienda.
 *
 * Dos niveles: grupo (Comida, Bebida…) → subgrupo → categorías.
 * Cada categoría se indica por su slug (data/categories.ts). Para mover una
 * categoría de sitio, cambia su slug de lugar; el orden aquí es el que se ve.
 * Una categoría que no aparezca en esta lista se añade sola al final de
 * "Comida" para que nunca quede inaccesible.
 */
export type CategoryGroupConfig = {
  slug: string;
  name: string;
  sections: { name?: string; categories: string[] }[];
};

export const categoryGroups: CategoryGroupConfig[] = [
  {
    slug: "comida",
    name: "Comida",
    // Por orden alfabético.
    sections: [
      {
        categories: ["aceites", "chocolates", "condimentos", "conservas", "dulces", "embutidos", "legumbres", "pates", "preparados", "quesos", "verduras"],
      },
    ],
  },
  {
    slug: "bebida",
    name: "Bebida",
    sections: [{ categories: ["licores", "vinos"] }],
  },
  {
    slug: "lotes",
    name: "Lotes",
    sections: [{ categories: ["lotes"] }],
  },
];
