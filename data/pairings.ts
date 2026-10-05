/**
 * Maridajes (página /maridajes): los carteles "carteles-maridaje.pdf", en 6
 * secciones de 3. La foto de cada tarjeta (producto + vino) es
 * /images/maridajes/<n>.webp, hecha con `python3 scripts/importar-maridajes.py`,
 * y `n` sigue el orden de este archivo.
 */

export type Pairing = {
  /** Número de la foto (1–18). */
  n: number;
  kicker: string;
  title: string;
  /** "con …": el vino o licor que lo acompaña. */
  with: string;
  text: string;
  /** Dónde encontrar el producto y la bebida en la tienda. */
  shop: { label: string; href: string }[];
};

export type PairingGroup = { slug: string; title: string; subtitle: string; items: Pairing[] };

export const pairingGroups: PairingGroup[] = [
  {
    slug: "para-abrir",
    title: "Para abrir",
    subtitle: "Aperitivo navarro con buen vino",
    items: [
      {
        n: 1, kicker: "Espárrago · Chardonnay", title: "Espárragos de Navarra",
        with: "Castillo de Monjardín Chardonnay Reserva",
        text: "El espárrago es de los alimentos más difíciles de maridar. Un chardonnay con paso por barrica tiene la untuosidad y la acidez necesarias para acompañarlo sin amargar. También con El Navarrico o La Catedral de Navarra.",
        shop: [{ label: "Espárragos", href: "/tienda/esparragos" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
      {
        n: 2, kicker: "Bonito · Espumoso", title: "Ventresca de bonito Olasagasti con piparras Ubidea",
        with: "Castillo de Monjardín Brut Chardonnay Millésime",
        text: "La burbuja fina y la acidez del espumoso limpian la grasa de la ventresca, y el picor suave de la piparra lo aviva. Un aperitivo de barra elegante.",
        shop: [{ label: "Atún y bonito", href: "/tienda/atun-y-bonito" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
      {
        n: 3, kicker: "Piquillo · Rosado", title: "Pimientos del piquillo",
        with: "Palacio de Sada Rosado Garnacha o Irache Rosado 1891",
        text: "Rosado de garnacha y piquillo: dos clásicos de Navarra. La fruta roja del vino acompaña el dulzor asado del pimiento. Servir el rosado a 8–10 ºC.",
        shop: [{ label: "Pimientos", href: "/tienda/pimientos" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
    ],
  },
  {
    slug: "queso-y-embutidos",
    title: "Queso y embutidos",
    subtitle: "Para la tabla perfecta",
    items: [
      {
        n: 4, kicker: "Queso · Mermelada · Tinto", title: "Queso de oveja La Vasco Navarra con mermelada de higo de Irular",
        with: "Irache Crianza",
        text: "El queso curado de oveja pide un dulce con carácter: el higo lo equilibra, y el crianza aporta estructura sin tapar el queso.",
        shop: [{ label: "Quesos", href: "/tienda/quesos" }, { label: "Mermeladas y dulces", href: "/tienda/dulces" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
      {
        n: 5, kicker: "Ibérico · Tinto de pago", title: "Ibérico de bellota de Ibericomio o Salamanca Ibérica",
        with: "Pago de Cirsus Cuvée Especial",
        text: "Un tinto con crianza y taninos pulidos para la grasa infiltrada del ibérico. Si se prefiere algo más fresco, el Brut Millésime de Monjardín también funciona muy bien.",
        shop: [{ label: "Embutidos", href: "/tienda/embutidos" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
      {
        n: 6, kicker: "Txistorra · Garnacha", title: "Txistorra y chorizo de Arbizu",
        with: "Altos de Inurrieta o Unsi Terrazas Garnacha Tinta",
        text: "Tintos con fruta y frescura que aguantan el pimentón y la grasa del embutido navarro. Ideal para picar en la barra o en casa.",
        shop: [{ label: "Embutidos", href: "/tienda/embutidos" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
    ],
  },
  {
    slug: "de-cuchara",
    title: "De cuchara",
    subtitle: "Platos de siempre, vinos de aquí",
    items: [
      {
        n: 7, kicker: "Pochas · Tinto reserva", title: "Pochas a la navarra de La Catedral de Navarra",
        with: "Irache 1891 Colección Privada Garnacha Clásica",
        text: "La pocha es suave y cremosa: pide un tinto de cuerpo medio, con la fruta de la garnacha y sin exceso de madera, que no la tape.",
        shop: [{ label: "Legumbres", href: "/tienda/legumbres" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
      {
        n: 8, kicker: "Alubias · Gran vino", title: "Alubias rojas con costilla de cerdo de Beola",
        with: "Chivite Colección 125 Tinto",
        text: "Un plato contundente para un tinto con estructura. La costilla del guiso se entiende con la fruta madura y la crianza del vino.",
        shop: [{ label: "Preparados", href: "/tienda/preparados" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
      {
        n: 9, kicker: "Crema de hongos · Blanco de guarda", title: "Crema de hongos de Anko",
        with: "Castillo de Monjardín Chardonnay Gran Reserva",
        text: "Los aromas de sotobosque y la textura cremosa de los hongos casan con un blanco con crianza, de notas tostadas y volumen en boca.",
        shop: [{ label: "Preparados", href: "/tienda/preparados" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
    ],
  },
  {
    slug: "foie-y-pates",
    title: "Foie y patés",
    subtitle: "El capricho gourmet",
    items: [
      {
        n: 10, kicker: "Foie · Vino dulce", title: "Bloc de pato o mi-cuit de Katealde",
        with: "Moscatel Vendimia Tardía de Ochoa",
        text: "El maridaje clásico: el dulzor y la acidez del moscatel contrastan con la grasa del foie. Servir el vino frío, a 6–8 ºC.",
        shop: [{ label: "Patés y foie", href: "/tienda/pates" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
      {
        n: 11, kicker: "Foie · Mermelada navarra", title: "Foie de Katealde con mermelada de patxarán de Irular",
        with: "un toque de Sal d'Oro en escamas",
        text: "La mermelada de patxarán da un acento muy navarro. Unas escamas de sal ecológica sobre el foie realzan todo el conjunto.",
        shop: [{ label: "Patés y foie", href: "/tienda/pates" }, { label: "Mermeladas y dulces", href: "/tienda/dulces" }, { label: "Condimentos", href: "/tienda/condimentos" }],
      },
      {
        n: 12, kicker: "Paté · Mermelada · Tinto joven", title: "Paté de campaña de Arbizu o paté de hígado de Beola",
        with: "mermelada de tomate de Aidin y Unsi Terrazas Garnacha Tinta",
        text: "El tomate aporta dulzor y frescura al paté. Una garnacha joven y afrutada cierra un aperitivo sencillo y redondo.",
        shop: [{ label: "Patés y foie", href: "/tienda/pates" }, { label: "Mermeladas y dulces", href: "/tienda/dulces" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
    ],
  },
  {
    slug: "dulce-final",
    title: "Dulce final",
    subtitle: "Chocolate y licores de Navarra",
    items: [
      {
        n: 13, kicker: "Chocolate negro · Garnacha dulce", title: "Chocolate Pedro Mayo sin azúcar con almendras o Leyre 85 %",
        with: "Dulce Garnacha de Unsi",
        text: "El cacao intenso necesita un vino dulce con fruta y estructura. La garnacha dulce suaviza el amargor y alarga el final.",
        shop: [{ label: "Chocolates y dulces", href: "/tienda/dulces" }, { label: "Vinos", href: "/tienda/vinos" }],
      },
      {
        n: 14, kicker: "Chocolate al patxarán · Patxarán", title: "Chocolate negro 72 % al patxarán de Navarra en Dulce",
        with: "Patxarán Etxeko, Baines Etiqueta Oro o Belasco",
        text: "El chocolate repite los aromas de endrina del licor: una combinación muy navarra. Servir el patxarán muy frío.",
        shop: [{ label: "Chocolates y dulces", href: "/tienda/dulces" }, { label: "Patxarán y licores", href: "/tienda/bebidas" }],
      },
      {
        n: 15, kicker: "Naranja · Crema de patxarán", title: "Chocolate negro 85 % con naranja de Navarra en Dulce",
        with: "Bianca Villa, crema de naranja con patxarán",
        text: "Naranja con naranja: el cítrico del chocolate y de la crema se refuerzan, y el patxarán pone el toque local.",
        shop: [{ label: "Chocolates y dulces", href: "/tienda/dulces" }, { label: "Patxarán y licores", href: "/tienda/bebidas" }],
      },
    ],
  },
  {
    slug: "sobremesa",
    title: "Sobremesa",
    subtitle: "Para alargar la tertulia",
    items: [
      {
        n: 16, kicker: "Chocolate al café · Crema", title: "Chocolate Leyre al café",
        with: "Baines Cream",
        text: "La crema de patxarán, suave y dulce, envuelve las notas tostadas del café y el cacao. Servir con hielo.",
        shop: [{ label: "Chocolates y dulces", href: "/tienda/dulces" }, { label: "Patxarán y licores", href: "/tienda/bebidas" }],
      },
      {
        n: 17, kicker: "Pastas · Patxarán artesano", title: "Pastas de patxarán Sanfermines de Navarra en Dulce",
        with: "Patxarán artesano Laxoa",
        text: "Pastas y patxarán, la sobremesa de siempre en Navarra. Perfecto como detalle de regalo para fiestas.",
        shop: [{ label: "Chocolates y dulces", href: "/tienda/dulces" }, { label: "Patxarán y licores", href: "/tienda/bebidas" }],
      },
      {
        n: 18, kicker: "Queso · Mermelada · Patxarán", title: "Queso de oveja con mermelada de patxarán de Irular",
        with: "Patxarán La Navarra",
        text: "Un final salado-dulce: el queso curado, la mermelada y el patxarán comparten los mismos aromas de endrina.",
        shop: [{ label: "Quesos", href: "/tienda/quesos" }, { label: "Mermeladas y dulces", href: "/tienda/dulces" }, { label: "Patxarán y licores", href: "/tienda/bebidas" }],
      },
    ],
  },
];
