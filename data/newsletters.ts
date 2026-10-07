/**
 * Boletines de la newsletter (página /newsletter y /newsletter/<slug>).
 *
 * Cada boletín es el mismo texto que se envía por correo, pasado a la web.
 * - `**texto**` sale en negrita.
 * - `products` son títulos exactos de la hoja (data/products.generated.ts):
 *   la foto y el precio salen del catálogo, así que siempre están al día.
 *   Si un título deja de existir, ese producto simplemente no se muestra.
 * - Para añadir un boletín: copia uno, cambia `slug` y súmale 1 a `number`.
 */

export type NewsletterSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  /** Recuadro "Consejo Estafeta". */
  tip?: string;
};

export type Newsletter = {
  slug: string;
  number: number;
  /** Tema, en la etiqueta superior: Vinos, Huerta, Quesos… */
  theme: string;
  title: string;
  subtitle: string;
  /** Resumen para la tarjeta del archivo y para buscadores. */
  excerpt: string;
  /** Foto de la tarjeta y de la cabecera. */
  image: { src: string; alt: string };
  lead: string;
  stats: { value: string; label: string }[];
  sections: NewsletterSection[];
  shop: {
    title: string;
    products: string[];
    cta: { label: string; href: string };
  };
};

export const NEWSLETTER_SOURCE =
  "Información de origen basada en los datos oficiales publicados por Reyno Gourmet (Gobierno de Navarra).";

export const newsletters: Newsletter[] = [
  {
    slug: "vinos-do-navarra",
    number: 1,
    theme: "Vinos",
    title: "Vinos D.O. Navarra",
    subtitle: "Cinco zonas, tres climas y mucha garnacha",
    excerpt: "Descubre las cinco zonas del vino navarro y cómo elegir botella para cada momento.",
    image: { src: "/images/categorias/vinos.webp", alt: "Copas y botellas de vino navarro" },
    lead: "Navarra hace vino desde época romana y, siglos después, el Camino de Santiago y los monasterios lo llevaron por toda Europa. Hoy es una de las denominaciones más variadas de España.",
    stats: [
      { value: "10.200 ha", label: "de viñedo aproximadamente" },
      { value: "5 zonas", label: "Baja Montaña, Valdizarbe, Tierra Estella, Ribera Alta y Ribera Baja" },
      { value: "90 %", label: "de la producción es vino tinto" },
      { value: "+70 %", label: "de variedades autóctonas" },
    ],
    sections: [
      {
        title: "Un territorio, tres climas",
        paragraphs: [
          "En pocos kilómetros, Navarra pasa de la influencia atlántica del norte al clima continental del centro y al mediterráneo de la Ribera del Ebro. Esa diversidad explica por qué de aquí salen rosados frescos, blancos con barrica y tintos de guarda.",
        ],
        list: [
          "**Baja Montaña:** la más al norte, de clima subhúmedo.",
          "**Valdizarbe:** zona de transición, junto al Camino de Santiago.",
          "**Tierra Estella:** en el oeste, también en ruta jacobea.",
          "**Ribera Alta:** con Olite como capital del vino.",
          "**Ribera Baja:** la de mayor superficie de viñedo y más bodegas.",
        ],
      },
      {
        title: "Las uvas",
        paragraphs: [
          "Entre las tintas mandan la **garnacha** y el **tempranillo**, acompañadas de cabernet sauvignon, merlot, mazuelo, graciano, syrah y pinot noir. En blancas destacan la viura, la **chardonnay**, la garnacha blanca, la malvasía, la sauvignon blanc y el **moscatel de grano menudo**, base de los vinos dulces navarros.",
        ],
      },
      {
        title: "De la plaga a la reinvención",
        paragraphs: [
          "A finales del siglo XIX la filoxera arrasó el viñedo navarro: de unas 50.000 hectáreas quedaron apenas 1.500. La replantación con portainjertos resistentes fue el punto de partida del viñedo moderno que conocemos hoy.",
        ],
        tip: "¿No sabes qué llevar a una comida? Un rosado de garnacha navarro casi nunca falla: va bien con verduras, pescados, arroces y hasta con un buen almuerzo de txistorra.",
      },
      {
        title: "Cómo leer la etiqueta",
        list: [
          "**Joven:** fresco y frutal, para beber en el año.",
          "**Roble:** paso breve por barrica.",
          "**Crianza, Reserva y Gran Reserva:** de menos a más tiempo de envejecimiento en barrica y botella.",
          "**Dulce natural:** el terreno del moscatel.",
        ],
      },
    ],
    shop: {
      title: "Nuestra selección de vinos navarros",
      products: [
        "IRACHE TINTO 1891 CRIANZA",
        "PALACIO DE SADA ROSADO GARNACHA",
        "MONJARDIN Blanco chardonnay reserva",
        "CHIVITE Tinto colección 125",
        "PCIRSUS Tinto CUVEE ESPECIAL",
        "OCHOA Moscatel Vendimia Tardía",
      ],
      cta: { label: "Ver todos los vinos", href: "/tienda/vinos" },
    },
  },
  {
    slug: "esparrago-de-navarra",
    number: 2,
    theme: "Huerta",
    title: "Espárrago de Navarra",
    subtitle: "El oro blanco de la Ribera",
    excerpt: "Cómo reconocer un espárrago con IGP, cómo pelarlo y cocerlo, y nuestros favoritos.",
    image: { src: "/images/categorias/esparragos.webp", alt: "Espárragos blancos con aceite y perejil" },
    lead: "Blanco, tierno y con ese equilibrio perfecto entre amargor y suavidad. El Espárrago de Navarra fue uno de los primeros productos protegidos de la región y sigue siendo su embajador más reconocible.",
    stats: [
      { value: "1986", label: "año de creación de la Indicación Geográfica Protegida" },
      { value: "257", label: "municipios protegidos en Navarra, Aragón y La Rioja" },
      { value: "Abril–junio", label: "temporada del espárrago fresco" },
      { value: "6–8 años", label: "vida productiva de cada planta" },
    ],
    sections: [
      {
        title: "De la tierra a la lata",
        paragraphs: [
          "El espárrago se cultiva en el valle del Ebro, de clima mediterráneo templado. Se planta en febrero y, desde el segundo año, se aporca en marzo y se recoge a diario hasta junio. Después se deja crecer la planta para que acumule fuerzas para la siguiente cosecha.",
          "Navarra aporta la mayor parte de la zona protegida (176 municipios), junto a 43 de Aragón y 38 de La Rioja.",
        ],
      },
      {
        title: "Cómo reconocerlo",
        paragraphs: ["Un espárrago con IGP lleva siempre:"],
        list: [
          "La **contraetiqueta numerada** y el logotipo de la IGP Espárrago de Navarra.",
          "El sello europeo de Indicación Geográfica Protegida.",
          "Ingredientes sencillos: espárrago, agua y sal.",
          "El número de frutos (calibre), el peso neto y el escurrido.",
        ],
      },
      {
        title: "En la cocina",
        paragraphs: [
          "Si lo compras fresco: sujétalo por la yema y pélalo de arriba abajo con un pelador, girándolo para que quede uniforme. Corta la base y cuécelo unos 10 minutos en agua con sal. Sírvelo templado con un buen aceite de oliva virgen extra.",
        ],
        tip: "En conserva, sácalos del frasco 15 minutos antes y no tires el líquido: es perfecto para una crema de espárragos o para un arroz.",
      },
      {
        title: "Calibres: cuántos frutos",
        paragraphs: [
          "El número que verás en el bote (4-6, 6-8, 9-12...) indica cuántos espárragos caben en el envase: **cuantos menos, más gruesos**. Los extragruesos son los más tiernos y los más apreciados para comer tal cual.",
        ],
      },
    ],
    shop: {
      title: "Espárragos en nuestra tienda",
      products: [
        "DANTZA Espárrago DO Navarra Frasco R 370 (6-8)",
        "NAVARRICO ESPÁRRAGO FRASCO 580 ml 9/12 FR D.O",
        "LC ESPÁRRAGO 04-06 FRASCO",
      ],
      cta: { label: "Comprar espárragos", href: "/tienda/esparragos" },
    },
  },
  {
    slug: "pimiento-del-piquillo",
    number: 3,
    theme: "Huerta",
    title: "Pimiento del Piquillo",
    subtitle: "Asado a la llama, pelado a mano",
    excerpt: "Ocho pueblos, un asado a la llama y un pimiento único: todo sobre el piquillo de Lodosa.",
    image: { src: "/images/categorias/pimientos.webp", alt: "Pimientos del piquillo asados con ajo laminado" },
    lead: "Pequeño, rojo intenso y con forma de pico. El piquillo es uno de los grandes tesoros de la huerta navarra, y su versión con Denominación de Origen solo se cultiva y elabora en ocho localidades.",
    stats: [
      { value: "8", label: "municipios: Andosilla, Azagra, Cárcar, Lerín, Lodosa, Mendavia, San Adrián y Sartaguda" },
      { value: "1987", label: "año de la Denominación de Origen" },
      { value: "35–50 g", label: "peso de cada pimiento" },
      { value: "Sept.–nov.", label: "recolección manual, semana a semana" },
    ],
    sections: [
      {
        title: "Un proceso artesano",
        paragraphs: [
          "Tras la recogida, los pimientos se lavan y se **asan directamente a la llama**. Después se les quita el corazón, la piel y las pepitas, sin agua, para no perder sabor. Se seleccionan uno a uno, se envasan y se esterilizan. Así consiguen su textura carnosa y ese toque dulce y ahumado tan característico.",
        ],
      },
      {
        title: "¿Qué es ese líquido del bote?",
        paragraphs: [
          "Ese jugo denso que encuentras al abrir el frasco es el **propio jugo del pimiento**. No lo tires: úsalo para la salsa, para un sofrito o para guisar los pimientos rellenos.",
        ],
      },
      {
        title: "Cómo disfrutarlo",
        list: [
          "**En ensalada:** córtalo justo antes de servir para conservar sus vitaminas.",
          "**Con carne roja:** su vitamina C ayuda a absorber el hierro.",
          "**Confitado** a fuego lento con ajo y aceite, como guarnición.",
          "**Relleno** de bacalao, carne o hongos: un clásico navarro.",
        ],
        tip: "Calienta los piquillos en la sartén con un poco de aceite y láminas de ajo: en 5 minutos tienes una tapa perfecta para acompañar un rosado de garnacha.",
      },
      {
        title: "Cómo reconocer el auténtico",
        paragraphs: [
          "Solo los elaboradores de la D.O. pueden usar el nombre **«Pimientos del Piquillo de Lodosa»**. Busca el logotipo oficial y la contraetiqueta numerada del Consejo Regulador.",
        ],
      },
    ],
    shop: {
      title: "Piquillos en nuestra tienda",
      products: [
        "NAVARRICO PIQUILLO ENTERO FRASCO 350ml D.O",
        "LC PIMIENTO CONFITADO",
        "ANKO pimiento piquillo entero extra",
      ],
      cta: { label: "Comprar pimientos", href: "/tienda/pimientos" },
    },
  },
  {
    slug: "alcachofa-de-tudela",
    number: 4,
    theme: "Huerta",
    title: "Alcachofa de Tudela",
    subtitle: "La flor de la Ribera",
    excerpt: "La Blanca de Tudela: una variedad única, de otoño y primavera, también en conserva.",
    image: { src: "/images/categorias/alcachofas.webp", alt: "Corazones de alcachofa con perejil" },
    lead: "Redonda, compacta y con un pequeño hueco en la parte superior. La alcachofa Blanca de Tudela es fruto de generaciones de agricultores de la Ribera seleccionando sus mejores plantas.",
    stats: [
      { value: "2001", label: "año de la Indicación Geográfica Protegida" },
      { value: "33", label: "municipios de la Ribera de Navarra" },
      { value: "1 variedad", label: "solo la Blanca de Tudela" },
      { value: "~90 %", label: "de su composición es agua" },
    ],
    sections: [
      {
        title: "Dos temporadas",
        paragraphs: [
          "La alcachofa tiene una breve temporada en **otoño** y otra más larga en **primavera**. Su cultivo en la zona se remonta a época andalusí, y su fama se extendió por toda España en los años 80.",
        ],
      },
      {
        title: "En conserva, sin trampas",
        paragraphs: [
          "La alcachofa con IGP en conserva solo se envasa en **tarro de cristal** y sin acidulantes ni correctores de acidez, para mantener su sabor natural. La encontrarás en corazones enteros o en mitades.",
        ],
      },
      {
        title: "Buena para todo",
        paragraphs: [
          "Aporta fibra, fitoesteroles y flavonoides, ayuda a la digestión y es una gran aliada para una dieta ligera.",
        ],
        list: [
          "**Salteada** con jamón y un hilo de aceite.",
          "**Rebozada** o en tempura como aperitivo.",
          "**En menestra**, el gran plato de la Ribera.",
          "**Confitada** en aceite a baja temperatura.",
        ],
        tip: "Escurre bien los corazones y dóralos en la sartén boca abajo, sin moverlos: quedan crujientes por fuera y melosos por dentro. Termina con escamas de sal.",
      },
    ],
    shop: {
      title: "Alcachofas en conserva en nuestra tienda",
      products: ["LC CORAZON ALCACHOFA 10-12", "LC MITAD ALCACHOFA NATURAL", "D'ORO SAL ESCAMAS"],
      cta: { label: "Comprar alcachofas", href: "/tienda/alcachofas" },
    },
  },
  {
    slug: "quesos-idiazabal-y-roncal",
    number: 5,
    theme: "Quesos",
    title: "Quesos de oveja: Idiazabal y Roncal",
    subtitle: "Leche cruda, pastos de montaña y paciencia",
    excerpt: "Dos denominaciones históricas del queso de oveja navarro y cómo disfrutarlas.",
    image: { src: "/images/categorias/quesos.webp", alt: "Cuña de queso curado y dados de queso" },
    lead: "En el norte de Navarra, las ovejas latxas pastan en las montañas y su leche cruda se convierte en dos de los quesos más prestigiosos de España: Idiazabal y Roncal.",
    stats: [
      { value: "1981", label: "Roncal: el primer queso de España con Denominación de Origen" },
      { value: "1987", label: "año de la D.O. Idiazabal" },
      { value: "2 meses", label: "curación mínima del Idiazabal" },
      { value: "4 meses", label: "curación mínima del Roncal" },
    ],
    sections: [
      {
        title: "Idiazabal",
        paragraphs: [
          "Se elabora en el País Vasco y Navarra con **leche cruda de oveja latxa y carranzana**. Tiene una corteza dura y lisa, pasta de color marfil a amarillo pajizo y un sabor equilibrado, con salinidad media y un final largo. Existe en versión natural y **ahumada**, de corteza más oscura.",
          "Lo reconocerás por su banda roja, la contraetiqueta holográfica numerada y la placa de caseína grabada en la corteza.",
        ],
      },
      {
        title: "Roncal",
        paragraphs: [
          "Se elabora y madura únicamente en los siete pueblos del valle de Roncal, con leche cruda de oveja latxa y navarra. Su pasta es firme y algo quebradiza, de sabor pronunciado, ligeramente picante y mantecoso.",
        ],
      },
      {
        title: "Cómo servirlo",
        list: [
          "Sácalo de la nevera **una hora antes**: a temperatura ambiente gana en aroma y sabor.",
          "Córtalo en cuñas finas, retirando la corteza.",
          "Acompáñalo con membrillo, nueces o una mermelada de higo.",
        ],
        tip: "Prueba el Idiazabal ahumado con un tinto crianza navarro, y el queso de oveja más curado con un pacharán bien frío al final de la comida.",
      },
    ],
    shop: {
      title: "Quesos de oveja en nuestra tienda",
      products: [
        "LVN CUÑA DE QUESO D.O. IDIAZABAL NAT. 250 G.",
        "LVN CUÑA DE QUESO D.O. IDIAZABAL AHUM. 250 G.",
        "LVN QUESO OVEJA 1/2 PIEZAS 400 G.",
        "IRULAR Mermelada higo",
      ],
      cta: { label: "Comprar quesos", href: "/tienda/quesos" },
    },
  },
];

export function getNewsletter(slug: string): Newsletter | undefined {
  return newsletters.find((n) => n.slug === slug);
}
