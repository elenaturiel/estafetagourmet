import type { Category } from "@/lib/types";

/**
 * Categorías de la tienda, en el orden en que aparecen en la web.
 * Para añadir una categoría, añade un objeto aquí y sus productos en products.ts.
 */
export const categories: Category[] = [
  {
    slug: "quesos",
    name: "Quesos",
    title: "Quesos navarros",
    intro:
      "Quesos artesanos de pequeños productores, catados uno a uno en nuestra tienda.",
    image: { alt: "Quesos navarros", placeholder: "Foto · quesos" },
    seo: {
      title: "Quesos navarros artesanos: Roncal e Idiazábal",
      description:
        "Compra quesos navarros artesanos de pequeños productores: DOP Roncal, Idiazábal, oveja, cabra y vaca. Envío en 24–48 h o recogida en la calle Estafeta de Pamplona.",
      heading: "Quesos navarros artesanos, online y en Pamplona",
      text: [
        "Selección de quesos de pequeños productores navarros, catados uno a uno en nuestra tienda de la calle Estafeta. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos.",
      ],
    },
    filters: [
      {
        key: "denominacion",
        label: "Denominación",
        options: [
          { value: "dop-roncal", label: "DOP Roncal" },
          { value: "dop-idiazabal", label: "DOP Idiazábal" },
          { value: "sin-denominacion", label: "Sin denominación" },
        ],
      },
      {
        key: "leche",
        label: "Tipo de leche",
        options: [
          { value: "oveja", label: "Oveja" },
          { value: "cabra", label: "Cabra" },
          { value: "vaca", label: "Vaca" },
        ],
      },
    ],
  },
  {
    slug: "embutidos",
    name: "Embutidos",
    title: "Embutidos navarros",
    intro: "Chistorra, chorizo y embutidos curados de obradores navarros.",
    image: { alt: "Embutidos navarros", placeholder: "Foto · embutidos" },
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
    slug: "vinos",
    name: "Vinos D.O. Navarra",
    title: "Vinos D.O. Navarra",
    intro: "Tintos, rosados y blancos de bodegas pequeñas de Navarra.",
    image: { alt: "Vinos de la D.O. Navarra", placeholder: "Foto · vinos" },
    seo: {
      title: "Vinos D.O. Navarra: tintos, rosados y blancos",
      description:
        "Vinos de la D.O. Navarra de bodegas pequeñas: tintos, rosados y blancos seleccionados en nuestra tienda de Pamplona. Envío a toda la península en 24–48 h.",
      heading: "Vinos de Navarra, online y en Pamplona",
      text: [
        "Vinos de bodegas pequeñas de la D.O. Navarra, catados en nuestra tienda de la calle Estafeta. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos.",
      ],
    },
    filters: [
      {
        key: "tipo",
        label: "Tipo de vino",
        options: [
          { value: "tinto", label: "Tinto" },
          { value: "rosado", label: "Rosado" },
          { value: "blanco", label: "Blanco" },
        ],
      },
    ],
  },
  {
    slug: "conservas-y-verduras",
    name: "Conservas y verduras",
    title: "Conservas y verduras de Navarra",
    intro: "Pimientos del piquillo, espárragos y verduras de la huerta navarra.",
    image: { alt: "Conservas y verduras de Navarra", placeholder: "Foto · conservas" },
    seo: {
      title: "Conservas navarras: piquillo, espárragos y verduras",
      description:
        "Conservas y verduras de la huerta navarra: pimientos del piquillo, espárragos y más, de pequeños productores. Envío en 24–48 h o recogida en Pamplona.",
      heading: "Conservas y verduras navarras, online y en Pamplona",
      text: [
        "Conservas de la huerta navarra elaboradas por pequeños productores. Pídelas online con envío a toda la península en 24–48 h o pasa a recogerlas por la calle Estafeta.",
      ],
    },
    filters: [],
  },
  {
    slug: "aceites",
    name: "Aceites",
    title: "Aceites de Navarra",
    intro: "Aceite de oliva virgen extra de almazaras navarras.",
    image: { alt: "Aceites de oliva de Navarra", placeholder: "Foto · aceites" },
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
  {
    slug: "dulces-y-licores",
    name: "Dulces y licores",
    title: "Dulces y licores navarros",
    intro: "Pacharán, dulces tradicionales y licores de Navarra.",
    image: { alt: "Dulces y pacharán navarro", placeholder: "Foto · dulces y pacharán" },
    seo: {
      title: "Dulces y licores navarros: pacharán y repostería",
      description:
        "Pacharán navarro, dulces tradicionales y licores de pequeños productores. Compra online con envío en 24–48 h o recoge en la calle Estafeta de Pamplona.",
      heading: "Dulces y licores navarros, online y en Pamplona",
      text: [
        "Pacharán y dulces tradicionales de Navarra. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos por la calle Estafeta.",
      ],
    },
    filters: [],
  },
];
