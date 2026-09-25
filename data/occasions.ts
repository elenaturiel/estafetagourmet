import type { Occasion } from "@/lib/types";

/** Regalos por ocasión (inicio y menú de la tienda). Textos y enlaces editables. */
export const occasions: Occasion[] = [
  {
    slug: "cumpleanos",
    name: "Cumpleaños",
    line: "Un brindis con sabor a Navarra",
    image: { alt: "Cesta de regalo de cumpleaños", placeholder: "Foto · cumpleaños" },
    href: "/regalos#cesta-estafeta",
  },
  {
    slug: "san-fermin",
    name: "San Fermín",
    line: "Las fiestas, dentro de una cesta",
    image: { alt: "Cesta de San Fermín", placeholder: "Foto · San Fermín" },
    href: "/regalos#cesta-san-fermin",
  },
  {
    slug: "navidad",
    name: "Navidad",
    line: "Lo mejor de la despensa para la mesa grande",
    image: { alt: "Cesta de Navidad", placeholder: "Foto · Navidad" },
    href: "/regalos",
  },
  {
    slug: "empresa",
    name: "Empresas",
    line: "Regalos a medida para equipos y clientes",
    image: { alt: "Regalo de empresa", placeholder: "Foto · empresa" },
    href: "/regalos#regalo-de-empresa",
  },
];
