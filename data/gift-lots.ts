import type { Product } from "@/lib/types";

/**
 * Lotes de regalo de las fichas "fichas-lotes-regalo.pdf": Navarra en una caja,
 * Sobremesa Navarra y Lote Gourmet. Las fotos salen del PDF con
 * `python3 scripts/importar-maridajes.py` (public/images/lotes/<slug>/).
 * El precio no viene en las fichas ("€" en blanco): se escribe en PRICES.
 */

const PRICES: Record<string, number> = {
  // "navarra-en-una-caja": 59,
};

type Spec = {
  slug: string;
  name: string;
  subtitle: string;
  kicker: string;
  intro: string;
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
    subtitle: "Lo esencial de la despensa navarra",
    kicker: "Regalo · Clásico",
    intro: "Una selección de los productos más reconocidos de Navarra, pensada para descubrir la región en una sola mesa.",
    photos: ["Espárragos blancos de Navarra extra", "Pimientos del piquillo y espárragos", "Queso madurado de oveja", "Txistorra y paté de campaña", "Vinos tinto, blanco y rosado"],
    contents: [
      { name: "Espárragos blancos de Navarra extra", by: "Dantza, El Navarrico o La Catedral de Navarra" },
      { name: "Pimientos del piquillo enteros extra", by: "El Navarrico" },
      { name: "Queso madurado de oveja", by: "La Vasco Navarra" },
      { name: "Txistorra", by: "Arbizu, embutidos de Navarra" },
      { name: "Vino tinto crianza o rosado", by: "Irache · Bodegas Navarra" },
      { name: "Aceite de oliva virgen extra", by: "Hacienda Queiles o La Maja (opcional)" },
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
    subtitle: "Patxarán, chocolate y pastas",
    kicker: "Regalo · Premium",
    intro: "El final perfecto de cualquier comida en Navarra: patxarán bien frío, chocolate artesano y unas pastas para compartir.",
    photos: ["Patxarán premium Belasco", "Chocolate artesano negro 72 % al patxarán", "Pastas de patxarán Sanfermines", "Chocolate negro con frambuesa", "Crema de naranja con patxarán"],
    contents: [
      { name: "Patxarán premium Belasco", by: "Licores La Navarra · botella dorada" },
      { name: "Chocolate artesano negro 72 % al patxarán", by: "Navarra en Dulce" },
      { name: "Pastas de patxarán Sanfermines", by: "Navarra en Dulce" },
      { name: "Chocolate negro con frambuesa", by: "Chocolates Leyre" },
      { name: "Opción suave: Baines Cream o Bianca Villa", by: "crema de patxarán · crema de naranja con patxarán" },
    ],
    why: [
      "El patxarán es el licor de Navarra por excelencia, y aquí aparece también en el chocolate y las pastas: un lote con hilo conductor.",
      "La botella dorada de Belasco convierte el lote en un regalo de presentación muy cuidada.",
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
    subtitle: "Foie, vino dulce y mermelada artesana",
    kicker: "Regalo · Gourmet",
    intro: "Un lote para quien disfruta de los pequeños lujos: foie artesano de pato, vino dulce navarro y los detalles que lo hacen especial.",
    photos: ["Bloc de foie de pato mi-cuit", "Bloc de foie de pato con trufa", "Moscatel Vendimia Tardía", "Mermelada de castaña con patxarán", "Sal ecológica de manantial en escamas"],
    contents: [
      { name: "Bloc de pato o mi-cuit", by: "Katealde · productos artesanos del pato" },
      { name: "Mermelada de castaña con patxarán", by: "Aidin · mermeladas artesanas" },
      { name: "Moscatel Vendimia Tardía", by: "Bodegas Ochoa · Navarra" },
      { name: "Sal ecológica de manantial en escamas", by: "Sal d'Oro Flor" },
      { name: "Opcional: mermelada de higo con pimentón de Espelette", by: "Irular" },
    ],
    why: [
      "Foie y vino dulce es uno de los maridajes clásicos de la alta cocina: el dulzor y la acidez del moscatel contrastan con la grasa del pato.",
      "La mermelada de castaña con patxarán y la sal en escamas añaden un acento navarro y un acabado de restaurante.",
    ],
    serve: [
      "Sacar el foie del frío 10 minutos antes. Cortar con cuchillo caliente y servir sobre pan tostado.",
      "Unas escamas de sal y una cucharadita de mermelada por tostada. Moscatel a 6–8 ºC.",
    ],
    storage: "Foie en frío una vez abierto, consumir en pocos días. Mermelada en nevera tras abrir. Vino en lugar fresco.",
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
    price: PRICES[l.slug] ?? null,
    subtitle: l.kicker,
    description: `${l.intro}`,
    image: gallery[0],
    gallery,
    attributes: { ocasion: "regalo" },
    details: { contents: l.contents, why: l.why, serve: l.serve, storage: l.storage },
  };
});
