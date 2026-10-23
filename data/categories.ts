import type { Category } from "@/lib/types";
import { ACEITES_ONLINE } from "./tienda-online";

/**
 * Categorías de la tienda, en el orden en que aparecen en la web (alfabético).
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
  {
    slug: "aceites",
    name: "Aceites",
    // Los aceites se venden en la tienda online (ecommerce.estafetagourmet.com).
    href: ACEITES_ONLINE,
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
    "condimentos",
    "Condimentos",
    "Condimentos",
    "Sales, especias y condimentos para cocinar.",
    "Escamas de sal sobre un plato",
  ),
  simple(
    "conservas",
    "Conservas",
    "Conservas",
    "Bonito, ventresca, piparras y otras conservas seleccionadas en nuestra tienda de la calle Estafeta.",
    "Lata de conserva de pescado con un tenedor",
  ),
  simple(
    "dulces",
    "Dulces",
    "Dulces",
    "Chocolates, mermeladas, miel, pastas y otros dulces para el café y la sobremesa.",
    "Pastas y dulces tradicionales",
  ),
  {
    slug: "embutidos",
    name: "Embutidos",
    title: "Embutidos navarros",
    intro: "Txistorra, chorizo y embutidos curados de obradores navarros.",
    image: { src: img("embutidos"), alt: "Chorizo, jamón y salchichón cortados en lonchas", placeholder: "Foto · embutidos" },
    seo: {
      title: "Embutidos navarros artesanos: txistorra y chorizo",
      description:
        "Txistorra (chistorra), chorizo y embutidos artesanos de obradores navarros. Compra online con envío en 24–48 h o recoge tu pedido en la calle Estafeta de Pamplona.",
      heading: "Embutidos navarros artesanos, online y en Pamplona",
      text: [
        "Embutidos de pequeños obradores navarros, seleccionados en nuestra tienda de la calle Estafeta. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos.",
      ],
    },
    filters: [],
  },
  simple(
    "legumbres",
    "Legumbres",
    "Legumbres",
    "Alubias, lentejas y otras legumbres seleccionadas en nuestra tienda.",
    "Alubias blancas, alubias rojas y lentejas",
  ),
  simple(
    "lotes",
    "Lotes",
    "Lotes",
    "Lotes con lo mejor de la tienda, ya preparados para disfrutar o regalar.",
    "Lote con txistorra, espárragos, pimientos y vino",
    {
      filters: [
        {
          key: "ocasion",
          label: "Ocasión",
          options: [
            { value: "regalo", label: "Lotes de regalo" },
            { value: "amigos", label: "Amigos" },
            { value: "cumpleanos", label: "Cumpleaños" },
            { value: "empresas", label: "Empresas" },
            { value: "navidad", label: "Navidad" },
            { value: "pareja", label: "Pareja" },
            { value: "sanfermin", label: "San Fermín" },
          ],
        },
      ],
    },
  ),
  simple(
    "pates",
    "Patés",
    "Patés",
    "Patés para untar, ideales para el aperitivo.",
    "Paté en terrina y sobre una tostada",
  ),
  simple(
    "preparados",
    "Preparados",
    "Platos preparados",
    "Platos preparados listos para calentar y servir.",
    "Cazuela de alubias guisadas",
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
  simple(
    "verduras",
    "Verduras",
    "Verduras de Navarra",
    "Espárragos, pimientos del piquillo, alcachofas, setas y otras verduras en conserva de la huerta navarra, seleccionadas en nuestra tienda.",
    "Menestra de verduras, borraja y cardo",
  ),
  {
    slug: "vinos",
    name: "Vinos y licores",
    title: "Vinos y licores de Navarra",
    intro: "Tintos, rosados y blancos de bodegas pequeñas de Navarra, patxarán, licores y sidras.",
    image: { src: img("vinos"), alt: "Copas de vino tinto, rosado y blanco", placeholder: "Foto · vinos" },
    seo: {
      title: "Vinos D.O. Navarra, patxarán y licores",
      description:
        "Vinos de la D.O. Navarra de bodegas pequeñas, patxarán, licores y sidras seleccionados en nuestra tienda de Pamplona. Envío a toda la península en 24–48 h.",
      heading: "Vinos y licores de Navarra, online y en Pamplona",
      text: [
        "Vinos de bodegas pequeñas de la D.O. Navarra, catados en nuestra tienda de la calle Estafeta. Pídelos online con envío a toda la península en 24–48 h o pasa a recogerlos.",
      ],
    },
    filters: [],
  },
];
