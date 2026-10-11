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
    sections: [
      { name: "Quesos y embutidos", categories: ["quesos", "embutidos"] },
      {
        name: "Conservas y verduras",
        categories: [
          "esparragos",
          "alcachofas",
          "pimientos",
          "verduras",
          "legumbres",
          "setas-y-hongos",
          "conservas",
          "encurtidos",
        ],
      },
      {
        name: "Despensa",
        categories: ["aceites", "condimentos", "salsas", "cremas", "preparados", "pates"],
      },
      { name: "Dulces", categories: ["mermeladas", "chocolates", "dulces"] },
    ],
  },
  {
    slug: "bebida",
    name: "Bebida",
    sections: [{ categories: ["vinos", "espumosos", "bebidas"] }],
  },
  {
    slug: "lotes",
    name: "Lotes",
    sections: [{ categories: ["lotes"] }],
  },
];
