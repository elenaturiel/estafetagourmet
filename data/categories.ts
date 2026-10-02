import type { Category } from "@/lib/types";

/**
 * Categorías de la tienda, en el orden en que aparecen en la web.
 *
 * - Para añadir una categoría: añade un objeto aquí (o una línea con
 *   `simple(...)`), su foto en public/images/categorias/<slug>.webp y sus
 *   productos en products.ts.
 * - Las categorías sin productos muestran un aviso de "muy pronto".
 * - `href` hace que la categoría enlace a otra página en vez de a la suya.
 *
 * TODO: revisar los textos de presentación y SEO de las categorías nuevas.
 */

const img = (slug: string) => `/images/categorias/${slug}.webp`;

/** Categoría sencilla: sin filtros propios y con textos SEO genéricos. */
function simple(
  slug: string,
  name: string,
  title: string,
  intro: string,
  alt: string,
  extra: Partial<Category> = {},
): Category {
  const lower = name.toLowerCase();
  return {
    slug,
    name,
    title,
    intro,
    image: { src: img(slug), alt, placeholder: `Foto · ${lower}` },
    seo: {
      title: `${title}: compra online`,
      description: `${intro} Compra online con envío a toda la península en 24–48 h o recoge tu pedido en nuestra tienda de la calle Estafeta de Pamplona.`,
      heading: `${title}, online y en Pamplona`,
      text: [
        `${intro} Pide online con envío a toda la península en 24–48 h o recoge tu pedido en la calle Estafeta, 70.`,
      ],
    },
    filters: [],
    ...extra,
  };
}

export const categories: Category[] = [
  simple(
    "esparragos",
    "Espárragos",
    "Espárragos de Navarra",
    "Espárragos de la huerta navarra, seleccionados en nuestra tienda.",
    "Espárragos blancos con aceite y perejil",
  ),
  simple(
    "alcachofas",
    "Alcachofas",
    "Alcachofas",
    "Alcachofas en conserva de la huerta, seleccionadas en nuestra tienda.",
    "Corazones de alcachofa con perejil",
  ),
  simple(
    "pimientos",
    "Pimientos",
    "Pimientos",
    "Pimientos del piquillo y otras variedades, seleccionados en nuestra tienda.",
    "Pimientos del piquillo asados con ajo laminado",
  ),
  simple(
    "conservas",
    "Conservas",
    "Conservas",
    "Conservas seleccionadas en nuestra tienda de la calle Estafeta.",
    "Lata de conserva de pescado con un tenedor",
  ),
  simple(
    "atun-y-bonito",
    "Atún y bonito",
    "Atún y bonito en conserva",
    "Bonito y atún en aceite y en escabeche, seleccionados en nuestra tienda.",
    "Conserva de bonito del norte",
    { image: { alt: "Atún y bonito en conserva", placeholder: "Foto · atún y bonito" } },
  ),
  simple(
    "legumbres",
    "Legumbres",
    "Legumbres",
    "Alubias, lentejas y otras legumbres seleccionadas en nuestra tienda.",
    "Alubias blancas, alubias rojas y lentejas",
  ),
  simple(
    "verduras",
    "Verduras",
    "Verduras",
    "Verduras en conserva de la huerta, seleccionadas en nuestra tienda.",
    "Menestra de verduras, borraja y cardo",
  ),
  {
    slug: "quesos",
    name: "Quesos",
    title: "Quesos navarros",
    intro:
      "Quesos artesanos de pequeños productores, catados uno a uno en nuestra tienda.",
    image: { src: img("quesos"), alt: "Cuña de queso curado y dados de queso", placeholder: "Foto · quesos" },
    seo: {
      title: "Quesos navarros artesanos: Roncal e Idiazábal",
      description:
        "Compra quesos navarros artesanos de pequeños productores: DOP Roncal, Idiazábal, oveja, cabra y vaca. Envío en 24–48 h o recogida en la calle Estafeta de Pamplona.",
      heading: "Quesos navarros artesanos, online y en Pamplona",
      text: [
        "Selección de quesos de pequeños productores navarros, catados uno a uno en nuestra tienda de la calle Estafeta. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos.",
      ],
    },
    filters: [],
  },
  {
    slug: "embutidos",
    name: "Embutidos",
    title: "Embutidos navarros",
    intro: "Chistorra, chorizo y embutidos curados de obradores navarros.",
    image: { src: img("embutidos"), alt: "Chorizo, jamón y salchichón cortados en lonchas", placeholder: "Foto · embutidos" },
    seo: {
      title: "Embutidos navarros artesanos: chistorra y chorizo",
      description:
        "Chistorra, chorizo y embutidos artesanos de obradores navarros. Compra online con envío en 24–48 h o recoge tu pedido en la calle Estafeta de Pamplona.",
      heading: "Embutidos navarros artesanos, online y en Pamplona",
      text: [
        "Embutidos de pequeños obradores navarros, seleccionados en nuestra tienda de la calle Estafeta. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos.",
      ],
    },
    filters: [],
  },
  {
    slug: "aceites",
    name: "Aceites",
    title: "Aceites de Navarra",
    intro: "Aceite de oliva virgen extra de almazaras navarras.",
    image: { src: img("aceites"), alt: "Botella de aceite de oliva virgen extra", placeholder: "Foto · aceites" },
    seo: {
      title: "Aceite de oliva virgen extra de Navarra",
      description:
        "Aceite de oliva virgen extra de almazaras navarras, seleccionado en nuestra tienda de la calle Estafeta de Pamplona. Envío a toda la península en 24–48 h.",
      heading: "Aceites de Navarra, online y en Pamplona",
      text: [
        "Aceites de oliva virgen extra de almazaras navarras. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos por la calle Estafeta.",
      ],
    },
    filters: [],
  },
  simple(
    "setas-y-hongos",
    "Setas y hongos",
    "Setas y hongos",
    "Hongos y setas en conserva, seleccionados en nuestra tienda.",
    "Setas y hongos en aceite",
    { image: { alt: "Setas y hongos en conserva", placeholder: "Foto · setas y hongos" } },
  ),
  simple(
    "cremas",
    "Cremas",
    "Cremas",
    "Cremas de verduras listas para calentar y servir.",
    "Dos cuencos de crema de verduras",
  ),
  simple(
    "salsas",
    "Salsas",
    "Salsas",
    "Salsas para acompañar carnes, pescados y verduras.",
    "Tarro de salsa con una cuchara",
  ),
  simple(
    "pates",
    "Patés",
    "Patés",
    "Patés para untar, ideales para el aperitivo.",
    "Paté en terrina y sobre una tostada",
  ),
  simple(
    "encurtidos",
    "Encurtidos",
    "Encurtidos",
    "Guindillas y encurtidos para el aperitivo.",
    "Cuenco de guindillas encurtidas",
  ),
  simple(
    "condimentos",
    "Condimentos",
    "Condimentos",
    "Sales, especias y condimentos para cocinar.",
    "Escamas de sal sobre un plato",
  ),
  simple(
    "preparados",
    "Preparados",
    "Platos preparados",
    "Platos preparados listos para calentar y servir.",
    "Cazuela de alubias guisadas",
  ),
  simple(
    "mermeladas",
    "Mermeladas",
    "Mermeladas",
    "Mermeladas y confituras para desayunos y tablas de quesos.",
    "Tarro de mermelada con una cuchara",
  ),
  simple(
    "chocolates",
    "Chocolates",
    "Chocolates",
    "Chocolates seleccionados en nuestra tienda de la calle Estafeta.",
    "Tableta de chocolate negro en onzas",
  ),
  simple(
    "dulces",
    "Dulces",
    "Dulces",
    "Pastas, dulces tradicionales y caprichos para el café.",
    "Pastas y dulces tradicionales",
  ),
  {
    slug: "vinos",
    name: "Vinos D.O. Navarra",
    title: "Vinos D.O. Navarra",
    intro: "Tintos, rosados y blancos de bodegas pequeñas de Navarra.",
    image: { src: img("vinos"), alt: "Copas de vino tinto, rosado y blanco", placeholder: "Foto · vinos" },
    seo: {
      title: "Vinos D.O. Navarra: tintos, rosados y blancos",
      description:
        "Vinos de la D.O. Navarra de bodegas pequeñas: tintos, rosados y blancos seleccionados en nuestra tienda de Pamplona. Envío a toda la península en 24–48 h.",
      heading: "Vinos de Navarra, online y en Pamplona",
      text: [
        "Vinos de bodegas pequeñas de la D.O. Navarra, catados en nuestra tienda de la calle Estafeta. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos.",
      ],
    },
    filters: [],
  },
  simple(
    "espumosos",
    "Espumosos",
    "Espumosos",
    "Vinos espumosos para brindar y celebrar.",
    "Copa de vino espumoso",
  ),
  simple(
    "bebidas",
    "Bebidas",
    "Bebidas y licores",
    "Pacharán, licores y otras bebidas.",
    "Copas de pacharán y licor",
  ),
  simple(
    "lotes",
    "Lotes",
    "Lotes",
    "Lotes con lo mejor de la tienda, ya preparados para disfrutar o regalar.",
    "Lote con chistorra, espárragos, pimientos y vino",
  ),
];
