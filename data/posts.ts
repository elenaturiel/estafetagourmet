import type { Post } from "@/lib/types";

/** Entradas del blog. Títulos de ejemplo; el contenido está por escribir. */
export const posts: Post[] = [
  {
    slug: "que-vino-elegir-para-cada-queso-navarro",
    category: "Maridajes",
    title: "Qué vino elegir para cada queso navarro",
    excerpt: "[Entradilla del artículo]",
    date: null,
    image: { alt: "Maridaje de queso y vino navarro", placeholder: "Foto · maridaje" },
  },
  {
    slug: "que-comprar-en-cada-epoca-del-ano-en-navarra",
    category: "Temporada",
    title: "Qué comprar en cada época del año en Navarra",
    excerpt: "[Entradilla del artículo]",
    date: null,
    image: { alt: "Verduras de temporada de Navarra", placeholder: "Foto · verduras de temporada" },
  },
  {
    slug: "el-productor-del-mes",
    category: "Productores",
    title: "El productor del mes: [nombre]",
    excerpt: "[Entradilla del artículo]",
    date: null,
    image: { alt: "Productor del mes", placeholder: "Foto · productor" },
  },
];
