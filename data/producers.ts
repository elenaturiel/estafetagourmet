import type { Producer } from "@/lib/types";

/**
 * Productores. Nombres y localidades son MARCADORES hasta tener los reales.
 * `featured: true` los muestra en "Conoce a quienes lo hacen" (inicio).
 */
export const producers: Producer[] = [
  {
    slug: "productor-queso-1",
    name: "[Productor 1]",
    locality: "[Localidad]",
    specialty: "Queso",
    categorySlug: "quesos",
    featured: true,
    image: { alt: "Retrato del productor", placeholder: "Retrato · productor/a" },
  },
  {
    slug: "productor-vino-1",
    name: "[Bodega 1]",
    locality: "[Localidad]",
    specialty: "Vino",
    categorySlug: "vinos",
    featured: true,
    image: { alt: "Retrato del productor", placeholder: "Retrato · productor/a" },
  },
  {
    slug: "productor-embutido-1",
    name: "[Obrador 1]",
    locality: "[Localidad]",
    specialty: "Embutido",
    categorySlug: "embutidos",
    featured: true,
    image: { alt: "Retrato del productor", placeholder: "Retrato · productor/a" },
  },
  {
    slug: "productor-verdura-1",
    name: "[Huerta 1]",
    locality: "[Localidad]",
    specialty: "Verdura",
    categorySlug: "conservas-y-verduras",
    featured: true,
    image: { alt: "Retrato del productor", placeholder: "Retrato · productor/a" },
  },
  {
    slug: "productor-queso-2",
    name: "[Productor 2]",
    locality: "[Localidad]",
    specialty: "Queso",
    categorySlug: "quesos",
    image: { alt: "Retrato del productor", placeholder: "Retrato · productor/a" },
  },
  {
    slug: "productor-queso-3",
    name: "[Productor 3]",
    locality: "[Localidad]",
    specialty: "Queso",
    categorySlug: "quesos",
    image: { alt: "Retrato del productor", placeholder: "Retrato · productor/a" },
  },
  {
    slug: "productor-aceite-1",
    name: "[Almazara 1]",
    locality: "[Localidad]",
    specialty: "Aceite",
    categorySlug: "aceites",
    image: { alt: "Retrato del productor", placeholder: "Retrato · productor/a" },
  },
  {
    slug: "productor-licor-1",
    name: "[Productor de pacharán 1]",
    locality: "[Localidad]",
    specialty: "Pacharán",
    categorySlug: "dulces-y-licores",
    image: { alt: "Retrato del productor", placeholder: "Retrato · productor/a" },
  },
];
