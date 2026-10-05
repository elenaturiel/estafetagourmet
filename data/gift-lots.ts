import type { Product } from "@/lib/types";

/**
 * Lotes de regalo del "catálogo de lotes de regalo" y sus fichas
 * (catalogo-lotes-regalo.pdf / fichas-lotes-regalo.pdf): 9 lotes con su precio,
 * lo que llevan y cómo disfrutarlos. Las fotos salen del PDF con
 * `python3 scripts/importar-maridajes.py <carteles.pdf> <fichas.pdf>`
 * (public/images/lotes/<slug>/: 0 = todos los productos, 1… = cada foto).
 * Si cambian los PDF: actualizar este archivo y volver a pasar el script.
 */

type Spec = {
  slug: string;
  name: string;
  /** "Regalo · Clásico", etc. (se ve en la tarjeta). */
  kicker: string;
  price: number;
  intro: string;
  /** Texto alternativo de cada foto (1…), en el orden del PDF. */
  photos: string[];
  contents: { name: string; by: string }[];
  why: string[];
  serve: string[];
  storage: string;
};

const SPECS: Spec[] = [
  {
    slug: "navarra-en-una-caja",
    name: "Navarra en una caja",
    kicker: "Regalo · Clásico",
    price: 64.5,
    intro: "Una selección de los productos más reconocidos de Navarra, pensada para descubrir la región en una sola mesa.",
    photos: ["Espárragos blancos D.O. Navarra (Dantza)", "Pimientos del piquillo y espárragos (El Navarrico)", "Queso de oveja Navarra natural (La Vasco Navarra)", "Txistorra y paté de campaña (Arbizu)", "Irache 1891 (Bodegas Irache)", "Aceite de oliva virgen extra Ánfora Arróniz (Hacienda Queiles)"],
    contents: [
      { name: "Espárragos blancos D.O. Navarra 6-8 frutos", by: "Dantza · frasco 370 g" },
      { name: "Pimientos del piquillo enteros D.O.", by: "El Navarrico · frasco 350 ml" },
      { name: "Queso de oveja Navarra natural", by: "La Vasco Navarra · cuña 250 g" },
      { name: "Txistorra", by: "Arbizu · embutidos de Navarra" },
      { name: "Irache 1891 Crianza", by: "Bodegas Irache · Navarra" },
      { name: "Aceite de oliva virgen extra Ánfora Arróniz", by: "Hacienda Queiles · 250 ml" },
    ],
    why: [
      "Reúne los grandes nombres de la huerta y la despensa navarra: espárrago, piquillo, queso de oveja y txistorra.",
      "El crianza acompaña el queso y la txistorra; el rosado, el piquillo y el espárrago.",
    ],
    serve: [
      "Espárragos fríos con un hilo de aceite. Piquillos templados en la sartén con ajo.",
      "Queso a temperatura ambiente. Txistorra a la plancha, sin aceite, con pan.",
    ],
    storage: "Conservas y vino en lugar fresco y seco, sin luz directa. Queso y txistorra en frío. Consultar fechas en cada envase.",
  },
  {
    slug: "sobremesa-navarra",
    name: "Sobremesa Navarra",
    kicker: "Regalo · Premium",
    price: 47.75,
    intro: "El final perfecto de cualquier comida en Navarra: patxarán bien frío, chocolate artesano y unas pastas para compartir.",
    photos: ["Patxarán Belasco Oro (Licores La Navarra)", "Chocolate artesano negro 72 % al patxarán (Navarra en Dulce)", "Pastas de patxarán Sanfermines (Navarra en Dulce)", "Chocolate artesano negro 85 % con naranja (Navarra en Dulce)"],
    contents: [
      { name: "Patxarán Belasco Oro", by: "Licores La Navarra · botella dorada" },
      { name: "Chocolate artesano negro 72 % al patxarán", by: "Navarra en Dulce" },
      { name: "Pastas de patxarán Sanfermines", by: "Navarra en Dulce" },
      { name: "Chocolate artesano negro 85 % con naranja", by: "Navarra en Dulce" },
    ],
    why: [
      "El patxarán es el licor de Navarra por excelencia, y aquí aparece también en el chocolate y las pastas: un lote con hilo conductor.",
      "La botella dorada de Belasco convierte el lote en un regalo de presentación muy cuidada, y el chocolate con naranja aporta un contrapunto cítrico.",
    ],
    serve: [
      "Patxarán muy frío, entre 0 y 4 ºC, solo o con un hielo grande.",
      "El chocolate, a temperatura ambiente, en onzas pequeñas junto al licor.",
    ],
    storage: "Licores en posición vertical, lejos de la luz y del calor. Chocolates entre 15 y 18 ºC, sin humedad.",
  },
  {
    slug: "regalo-gourmet",
    name: "Lote Gourmet",
    kicker: "Regalo · Gourmet",
    price: 64.75,
    intro: "Un lote para quien disfruta de los pequeños lujos: foie artesano de pato, vino dulce navarro y los detalles que lo hacen especial.",
    photos: ["Foie gras mi-cuit entero (Katealde)", "Moscatel Vendimia Tardía (Bodegas Ochoa)", "Mermelada de patxarán (Irular)", "Sal ecológica de manantial en escamas (Sal d'Oro)"],
    contents: [
      { name: "Foie gras mi-cuit entero", by: "Katealde · productos artesanos del pato" },
      { name: "Mermelada de patxarán", by: "Irular · mermeladas artesanas" },
      { name: "Moscatel Vendimia Tardía", by: "Bodegas Ochoa · Navarra" },
      { name: "Sal ecológica de manantial en escamas", by: "Sal d'Oro" },
    ],
    why: [
      "Foie y vino dulce es uno de los maridajes clásicos de la alta cocina: el dulzor y la acidez del moscatel contrastan con la grasa del pato.",
      "La mermelada de patxarán de Irular y la sal en escamas añaden un acento navarro y un acabado de restaurante.",
    ],
    serve: [
      "Sacar el foie del frío 10 minutos antes. Cortar con cuchillo caliente y servir sobre pan tostado.",
      "Unas escamas de sal y una cucharadita de mermelada por tostada. Moscatel a 6–8 ºC.",
    ],
    storage: "Foie en frío una vez abierto, consumir en pocos días. Mermelada en nevera tras abrir. Vino en lugar fresco.",
  },
  {
    slug: "txupinazo",
    name: "Txupinazo",
    kicker: "Regalo · Sanfermines",
    price: 64.75,
    intro: "Todo lo que no puede faltar del 6 al 14 de julio: almuerzo de txistorra, rosado bien frío y patxarán para la sobremesa.",
    photos: ["Pastas de patxarán Sanfermines (Navarra en Dulce)", "Patxarán La Navarra (Licores La Navarra)", "Txistorra y chorizo sarta picante (Arbizu)", "Chocolate artesano negro 72 % al patxarán (Navarra en Dulce)", "Rosado de garnacha (Palacio de Sada)"],
    contents: [
      { name: "Patxarán La Navarra", by: "Licores La Navarra · Viana" },
      { name: "Pastas de patxarán Sanfermines", by: "Navarra en Dulce" },
      { name: "Chocolate artesano negro 72 % al patxarán", by: "Navarra en Dulce" },
      { name: "Txistorra", by: "Arbizu · embutidos de Navarra" },
      { name: "Chorizo sarta picante", by: "Arbizu · embutidos de Navarra" },
      { name: "Rosado de garnacha", by: "Palacio de Sada · Navarra" },
    ],
    why: [
      "Reúne el almuerzo festivo de Pamplona (txistorra, chorizo y rosado) con el patxarán y los dulces de la sobremesa.",
      "Un recuerdo de Sanfermines con producto navarro de verdad, ideal para visitantes y para regalar a quien está lejos.",
    ],
    serve: [
      "Txistorra y chorizo a la plancha, con pan. Rosado a 8–10 ºC.",
      "Patxarán muy frío con las pastas y el chocolate.",
    ],
    storage: "Embutido en lugar fresco o en frío una vez abierto. Vino y licor en vertical, sin luz directa.",
  },
  {
    slug: "brisa-del-cantabrico",
    name: "Brisa del Cantábrico",
    kicker: "Regalo · Aperitivo",
    price: 61.5,
    intro: "Un aperitivo de mar para compartir: bonito del norte elaborado a mano, piparras, pimiento artesano y un espumoso para brindar.",
    photos: ["Bonito del norte en aceite de oliva (Olasagasti)", "Piparras (Ubidea)", "Pimiento artesano (La Catedral de Navarra)", "Brut Chardonnay Millésime (Castillo de Monjardín)"],
    contents: [
      { name: "Ventresca de bonito del norte en aceite de oliva", by: "Olasagasti · 110 g" },
      { name: "Bonito del norte en aceite de oliva", by: "Olasagasti · 200 g" },
      { name: "Piparras", by: "Ubidea" },
      { name: "Pimiento artesano", by: "La Catedral de Navarra · 314 g" },
      { name: "Brut Chardonnay Millésime", by: "Castillo de Monjardín" },
    ],
    why: [
      "Bonito, piparra y pimiento forman la gilda y la tosta más clásicas del norte.",
      "La burbuja fina del Millésime limpia la grasa del bonito y refresca cada bocado.",
    ],
    serve: [
      "Montar banderillas de ventresca, piparra y pimiento, o tostas con un hilo del aceite de la propia lata.",
      "Espumoso muy frío, a 6–8 ºC.",
    ],
    storage: "Conservas en lugar fresco y seco. Una vez abiertas, en nevera y cubiertas de aceite. Espumoso tumbado, sin luz.",
  },
  {
    slug: "dehesa",
    name: "Dehesa",
    kicker: "Regalo · Premium",
    price: 62.5,
    intro: "Para los amantes del ibérico: jamón, chorizo y salchichón de bellota 100 % con un tinto navarro de pago.",
    photos: ["Jamón ibérico de bellota 100 % loncheado (Salamanca Ibérica)", "Chorizo y salchichón ibérico de bellota 100 % (Salamanca Ibérica)", "Pago de Cirsus Cuvée Especial (Bodegas Pago de Cirsus)"],
    contents: [
      { name: "Jamón ibérico de bellota 100 % loncheado", by: "Salamanca Ibérica" },
      { name: "Chorizo ibérico de bellota 100 %", by: "Salamanca Ibérica" },
      { name: "Salchichón ibérico de bellota 100 %", by: "Salamanca Ibérica" },
      { name: "Pago de Cirsus Cuvée Especial", by: "Bodegas Pago de Cirsus · Navarra" },
    ],
    why: [
      "El ibérico de bellota tiene una grasa infiltrada que pide un tinto con crianza y taninos finos.",
      "Pago de Cirsus es vino de pago navarro: una pareja de categoría para un regalo de empresa o una celebración.",
    ],
    serve: [
      "Abrir los sobres 15 minutos antes y servir a temperatura ambiente.",
      "Tinto a 16–17 ºC, abierto unos minutos antes.",
    ],
    storage: "Embutido en lugar fresco y seco o en nevera. Vino tumbado, entre 12 y 16 ºC.",
  },
  {
    slug: "huerta-de-la-ribera",
    name: "Huerta de la Ribera",
    kicker: "Regalo · Saludable",
    price: 68.5,
    intro: "La huerta navarra en conserva: pochas, menestra y alcachofa listas para disfrutar, con un buen aceite y un blanco fresco.",
    photos: ["Pochas, menestra y alcachofa (La Catedral de Navarra)", "Cremas de verduras (Anko)", "Blanco de uva tinta (Palacio de Sada)", "Aceite de oliva virgen extra Arróniz (La Maja)"],
    contents: [
      { name: "Pochas con verduras", by: "La Catedral de Navarra" },
      { name: "Menestra al natural", by: "La Catedral de Navarra" },
      { name: "Corazones de alcachofa 10-12", by: "La Catedral de Navarra" },
      { name: "Crema de hongos", by: "Anko · conservas artesanas" },
      { name: "Aceite de oliva virgen extra Arróniz", by: "La Maja · Navarra" },
      { name: "Blanco de uva tinta", by: "Palacio de Sada · Navarra" },
    ],
    why: [
      "La Ribera de Navarra es una de las huertas más famosas de España: aquí está lo mejor de ella, listo para servir.",
      "Un blanco fresco y un aceite de arróniz, la variedad autóctona navarra, completan la mesa.",
    ],
    serve: [
      "Menestra y alcachofas salteadas con un poco de jamón. Pochas calientes, sin hervir fuerte.",
      "Blanco a 8–10 ºC.",
    ],
    storage: "Conservas en lugar fresco y seco. Una vez abiertas, en nevera y consumir en 2–3 días. Aceite lejos de la luz.",
  },
  {
    slug: "dulce-tentacion",
    name: "Dulce tentación",
    kicker: "Regalo · Chocolate",
    price: 69.75,
    intro: "Para quien no perdona el postre: chocolates artesanos de Navarra y un vino dulce de garnacha de montaña para acompañarlos.",
    photos: ["Cacao puro 100 % y chocolate sin azúcar con almendras (Pedro Mayo)", "Chocolate negro 85 % (Chocolates Leyre)", "Chocolate negro con cereza y miel (Navarra en Dulce)", "Dulce Garnacha (Unsi)"],
    contents: [
      { name: "Chocolate negro 85 %", by: "Chocolates Leyre · 125 g" },
      { name: "Cacao puro 100 %", by: "Pedro Mayo · fábrica familiar" },
      { name: "Chocolate sin azúcar con almendras", by: "Pedro Mayo" },
      { name: "Chocolate negro con cereza y miel", by: "Navarra en Dulce" },
      { name: "Dulce Garnacha", by: "Unsi · garnachas de montaña" },
    ],
    why: [
      "Cuatro chocolates de distinta intensidad para hacer una cata en casa, de más suave a más intenso.",
      "La garnacha dulce suaviza el amargor del cacao y alarga el final.",
    ],
    serve: [
      "Chocolate a temperatura ambiente, en onzas pequeñas. Empezar por el de cereza y miel y terminar con el 85 %.",
      "Vino dulce a 12–14 ºC.",
    ],
    storage: "Chocolates entre 15 y 18 ºC, sin humedad. Vino en lugar fresco; una vez abierto, en nevera.",
  },
  {
    slug: "oro-de-navarra",
    name: "Oro de Navarra",
    kicker: "Regalo · Cocina",
    price: 48.5,
    intro: "Una cata de aceites navarros para quien disfruta cocinando, con sal de manantial en escamas para terminar cada plato.",
    photos: ["Aceite de oliva virgen extra Abbae (Hacienda Queiles)", "Aceite de oliva virgen extra Arróniz (La Maja)", "Aceite de oliva virgen extra arbequina (Campos de Monjardín)", "Sal ecológica de manantial en escamas (Sal d'Oro)"],
    contents: [
      { name: "Aceite de oliva virgen extra Abbae", by: "Hacienda Queiles · 500 ml" },
      { name: "Aceite de oliva virgen extra Arróniz", by: "La Maja" },
      { name: "Aceite de oliva virgen extra arbequina", by: "Campos de Monjardín · 500 ml" },
      { name: "Sal ecológica de manantial en escamas", by: "Sal d'Oro" },
    ],
    why: [
      "Tres aceites con perfiles distintos, de la arbequina suave al arróniz más intenso, para comparar en crudo.",
      "La sal en escamas realza el aceite sobre pan, tomate o verduras a la brasa.",
    ],
    serve: [
      "Cata en crudo: un poco de cada aceite en pan blanco, de más suave a más intenso.",
      "Unas escamas de sal sobre tomate con aceite: el aperitivo más sencillo y redondo.",
    ],
    storage: "Aceite bien cerrado, lejos de la luz y el calor. Sal en lugar seco.",
  },
];

/** Los lotes de regalo, listos para añadir al catálogo (categoría "lotes"). `rank` lo pone products.ts. */
export const giftLots: Omit<Product, "rank">[] = SPECS.map((l) => {
  const gallery = [
    { src: `/images/lotes/${l.slug}/0.webp`, alt: `${l.name}: todos los productos`, placeholder: "Foto · lote" },
    ...l.photos.map((alt, i) => ({ src: `/images/lotes/${l.slug}/${i + 1}.webp`, alt, placeholder: "Foto · lote" })),
  ];
  return {
    slug: l.slug,
    name: l.name,
    categorySlug: "lotes",
    producerSlug: null,
    price: l.price,
    subtitle: l.kicker,
    description: l.intro,
    image: gallery[0],
    gallery,
    attributes: { ocasion: "regalo" },
    details: { contents: l.contents, why: l.why, serve: l.serve, storage: l.storage },
  };
});
