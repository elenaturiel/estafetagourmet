import type { GiftBox } from "@/lib/types";

/** Cestas y regalos. Nombres ilustrativos; contenidos y precios son marcadores. */
export const giftBoxes: GiftBox[] = [
  {
    slug: "cesta-estafeta",
    name: "Cesta Estafeta",
    description: "[Contenido de la cesta: quesos, embutido y vino]",
    price: null,
    image: { alt: "Cesta Estafeta", placeholder: "Foto · cesta" },
  },
  {
    slug: "cesta-san-fermin",
    name: "Cesta San Fermín",
    description: "[Contenido de la cesta: edición de fiestas]",
    tag: "Edición San Fermín",
    price: null,
    image: { alt: "Cesta San Fermín", placeholder: "Foto · cesta" },
  },
  {
    slug: "regalo-de-empresa",
    name: "Regalo de empresa",
    description: "[Composición a medida desde N unidades]",
    tag: "A medida",
    price: null,
    image: { alt: "Caja de regalo de empresa", placeholder: "Foto · caja regalo" },
  },
];
