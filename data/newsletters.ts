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
  /** Foto debajo del título de la sección (cuadrada si no se indica el tamaño). */
  image?: { src: string; alt: string; width?: number; height?: number };
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
  };  /** false en los boletines que no usan datos de Reyno Gourmet (novedades de la tienda). */
  source?: false;
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
        "DANTZA Espárrago DO Navarra Frasco R 370",
        "NAVARRICO ESPÁRRAGO FRASCO 580 ml 9/12 FR D.O",
        "LC ESPÁRRAGO 06-08 FRASCO",
      ],
      cta: { label: "Comprar espárragos", href: "/tienda/verduras" },
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
        "LC PIMIENTO CONFITADO",
        "ANKO pimiento piquillo entero extra",
      ],
      cta: { label: "Comprar pimientos", href: "/tienda/verduras" },
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
      cta: { label: "Comprar alcachofas", href: "/tienda/verduras" },
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
        "LVN CUÑA DE QUESO OVEJA V NAVARRA NAT. 250 G.",
        "IRULAR Mermelada higo",
      ],
      cta: { label: "Comprar quesos", href: "/tienda/quesos" },
    },
  },
  {
    slug: "aceite-de-navarra",
    number: 6,
    theme: "Aceite",
    title: "Aceite de Navarra",
    subtitle: "Arróniz, la variedad que da carácter",
    excerpt: "Amargo, picante y muy equilibrado: así es el aceite de oliva virgen extra navarro.",
    image: { src: "/images/categorias/aceites.webp", alt: "Aceite de oliva virgen extra navarro" },
    lead: "En el sur de Navarra, entre sierras, cierzo y mucho sol, crece un olivar de carácter único. Su joya es la arróniz, una variedad autóctona con mucha personalidad.",
    stats: [
      { value: "2007", label: "año de la D.O.P. Aceite de Navarra" },
      { value: "135", label: "municipios del sur de Navarra" },
      { value: "< 0,3°", label: "de acidez exigida" },
      { value: "3", label: "variedades: arróniz, empeltre y arbequina" },
    ],
    sections: [
      {
        title: "Solo virgen extra",
        paragraphs: [
          "La denominación protege exclusivamente aceite de oliva virgen extra. Exige una acidez inferior a 0,3°, un frutado mínimo de 4,5 y cero defectos. Los blends deben llevar al menos un 10 % de **arróniz**, la variedad autóctona.",
        ],
      },
      {
        title: "Cómo sabe",
        paragraphs: [
          "Frutado medio a intenso, con notas verdes y el **amargo y picante** característicos, muy equilibrados. La cosecha va de octubre a diciembre, cuando la aceituna está en su mejor momento.",
        ],
      },
      {
        title: "Cómo catarlo en casa",
        list: [
          "Sirve un poco en un vaso pequeño y caliéntalo con la mano.",
          "Huele: busca hierba recién cortada, tomatera, alcachofa.",
          "Prueba: el amargor en la lengua y el picor en la garganta son señal de un aceite fresco y rico en polifenoles.",
        ],
        tip: "Guarda el aceite bien cerrado, lejos de la luz y del calor (nunca junto a los fuegos). Así mantendrá sus aromas mucho más tiempo.",
      },
    ],
    shop: {
      title: "Aceites en nuestra tienda",
      products: [
        "HQ ANFORA ARRONIZ AOVE 250ml",
        "HQ ABBAE AOVE 500ml",
        "LA MAJA ACEITE ARRONIZ",
        "MONJARDIN AOVE arbequina 500ml",
      ],
      cta: { label: "Comprar aceites", href: "/tienda/aceites" },
    },
  },
  {
    slug: "pacharan-navarro",
    number: 7,
    theme: "Licores",
    title: "Pacharán Navarro",
    subtitle: "Endrinas, anís y paciencia",
    excerpt: "Del siglo XV a tu sobremesa: qué hace único al pacharán navarro y cómo servirlo.",
    image: { src: "/images/categorias/bebidas.webp", alt: "Pacharán navarro" },
    lead: "Ya en 1415 se servía en una boda noble de Navarra, y la reina Blanca lo tomaba como remedio en 1441. Seis siglos después, el pacharán sigue siendo el broche de cualquier comida navarra.",
    stats: [
      { value: "1988", label: "año de la Indicación Geográfica Pacharán Navarro" },
      { value: "125–300 g", label: "de endrinas por litro" },
      { value: "25–30°", label: "graduación del pacharán" },
      { value: "1–8 meses", label: "de maceración lenta" },
    ],
    sections: [
      {
        title: "Cómo se elabora",
        paragraphs: [
          "Las endrinas, fruto del endrino (Prunus spinosa), deben ser 100 % navarras, sanas y brillantes. Se maceran lentamente en un aguardiente anisado entre uno y ocho meses; después se trasiega y se filtra. El resultado tiene un color de rojo a rojo intenso, según la receta de cada casa.",
        ],
      },
      {
        title: "Cómo es",
        paragraphs: [
          "Suave e intenso, dulce y ácido, seco y afrutado a la vez. Un licor joven y fresco, sin más aditivos que el azúcar.",
        ],
      },
      {
        title: "Cómo servirlo",
        list: [
          "**Muy frío**, entre 0 y 4 ºC.",
          "En copa pequeña, solo o con un hielo grande.",
          "Con chocolate negro, pastas o un queso de oveja curado.",
        ],
        tip: "Cada botella con IG lleva una contraetiqueta numerada del Consejo Regulador. Fíjate en ella para asegurarte de que es auténtico pacharán navarro.",
      },
    ],
    shop: {
      title: "Pacharanes en nuestra tienda",
      products: [
        "LN Patxarán BASARANA ETIQUETA NEGRA",
        "LN Patxarán LA NAVARRA",
        "LN Patxarán BELASCO ORO",
        "BAINES Patxarán BAINES etiqueta oro",
        "LAXOA Patxarán",
      ],
      cta: { label: "Comprar pacharán", href: "/tienda/licores" },
    },
  },
  {
    slug: "txistorra-de-navarra",
    number: 8,
    theme: "Embutidos",
    title: "Txistorra de Navarra",
    subtitle: "La reina del almuerzo",
    excerpt: "Ya tiene IGP europea: así es la txistorra navarra y así se cocina bien.",
    image: { src: "/images/categorias/embutidos.webp", alt: "Chorizo, jamón y salchichón cortados en lonchas" },
    lead: "Fina, roja y con ese chisporroteo inconfundible en la plancha. La txistorra forma parte de la cocina navarra desde, al menos, principios del siglo XIX, y desde 2024 tiene Indicación Geográfica Protegida.",
    stats: [
      { value: "2024", label: "inscrita como IGP en el registro europeo" },
      { value: "17–25 mm", label: "de diámetro" },
      { value: "4", label: "ingredientes base: cerdo, sal, pimentón y ajo" },
      { value: "2 días", label: "de curación mínima" },
    ],
    sections: [
      {
        title: "Qué lleva",
        paragraphs: [
          "Carne y grasa de cerdo picadas y adobadas con **sal, pimentón y ajo**, embutidas en tripa natural de cordero o de colágeno. Al cortarla se distinguen bien la carne y la grasa, y su color rojizo viene del pimentón.",
        ],
      },
      {
        title: "Cómo cocinarla",
        list: [
          "**A la plancha o en sartén, sin aceite:** suelta su propia grasa.",
          "Fuego medio, girándola, hasta que esté dorada y crujiente.",
          "Con pan, con huevos fritos o envuelta en masa de hojaldre.",
        ],
        tip: "El almuerzo de Sanfermines por excelencia: txistorra recién hecha, pan y un rosado bien frío. Pruébalo también con un tinto joven de garnacha.",
      },
    ],
    shop: {
      title: "Txistorra en nuestra tienda",
      products: [
        "ARBIZU Txistorra individual",
        "ARBIZU Txistorra individual picante",
        "ARBIZU Txistorra individual eco",
      ],
      cta: { label: "Comprar embutidos", href: "/tienda/embutidos" },
    },
  },
  {
    slug: "ya-estamos-abiertos",
    number: 9,
    theme: "Novedades",
    title: "¡Ya estamos abiertos!",
    subtitle: "Bienvenidos a Estafeta Gourmet",
    excerpt: "Después de muchos meses de trabajo, Estafeta Gourmet abre sus puertas en plena Calle Estafeta de Pamplona.",
    image: { src: "/images/blog/ya-estamos-abiertos-4x3.webp", alt: "Fachada de Estafeta Gourmet en la calle Estafeta, 70 de Pamplona, con el rótulo iluminado y la puerta abierta" },
    lead: "Hay proyectos que se cocinan a fuego lento, y este ha sido uno de ellos. Después de muchos meses de trabajo, ilusión y algún que otro desvelo, por fin podemos decirlo: Estafeta Gourmet ya tiene sus puertas abiertas en plena Calle Estafeta, en el corazón de Pamplona.",
    stats: [
      { value: "Estafeta, 70", label: "en el casco viejo de Pamplona" },
      { value: "Mar. – Sáb.", label: "de 10:00 a 14:00 y de 17:00 a 20:00" },
    ],
    sections: [
      {
        title: "Producto con historia",
        paragraphs: ["Detrás de cada estantería hay mucho trabajo. Hemos recorrido bodegas, queserías, obradores y conserveras, y hemos probado y elegido cada producto uno a uno. Queríamos una tienda donde todo lo que encuentres tenga una historia y un sabor que merezca la pena. Por eso apostamos con orgullo por lo de aquí: productos de Navarra, de Km 0, hechos por gente que cuida lo que hace. Y junto a ellos, algunas joyas de fuera que nos han enamorado."],
      },
      {
        title: "Te esperamos",
        paragraphs: ["Estamos encantados de recibirte. Da igual que vivas a la vuelta de la esquina, que estés de paso por Pamplona o que vengas desde la otra punta del mundo. Aquí siempre vas a encontrar una sonrisa, un consejo y, si te apetece, algo rico que probar. Nos encanta charlar, contarte de dónde viene cada producto y ayudarte a encontrar justo lo que buscas."],
      },
      {
        title: "Lotes a tu medida",
        paragraphs: ["Y si estás pensando en sorprender a alguien, preparamos lotes personalizados a tu gusto y a tu presupuesto. Sirven para un cumpleaños, para dar las gracias, para un regalo de empresa o, simplemente, porque sí."],
      },
      {
        title: "Los pequeños placeres",
        paragraphs: [
          "Porque eso es lo que de verdad queremos: que nos elijas para hacer felices a los demás… y también a ti. Darse un capricho no necesita excusa. Un buen vino, un queso con carácter o un chocolate que te alegra la tarde: los pequeños placeres son los que hacen grandes los días.",
          "Gracias de corazón a todos los que nos habéis acompañado en este camino. Ahora empieza lo mejor, y queremos vivirlo contigo.",
          "**Te esperamos en la Calle Estafeta. ¡Pasa a vernos!**",
          "El equipo de Estafeta Gourmet",
        ],
      },
    ],
    shop: {
      title: "Para empezar, algunos de nuestros favoritos",
      products: [
        "LVN QUESO RESERVA 1/2 PIEZAS 250 G.",
        "IRACHE TINTO FUENTE DE IRACHE",
        "ARBIZU Txistorra individual",
        "Chocolate negro 72 % vino tinto",
      ],
      cta: { label: "Ver los lotes", href: "/tienda/lotes" },
    },
  },
  {
    slug: "novedad-vermut-artesano-oro-nomada",
    number: 10,
    theme: "Novedad",
    title: "Vermut artesano Oro Nómada",
    subtitle: "Oro Nómada, el vermut artesano de Navarra",
    excerpt: "Desde Cordovilla, a las puertas de Pamplona, llega Oro Nómada: el Original, Gran Medalla de Oro en el CWWSC 2024, y el fresco Wermujito.",
    image: { src: "/images/blog/vermut-oro-nomada-4x3.webp", alt: "Botellas de Oro Nómada Original y Wermujito, vermut artesano de Navarra, con dos vasos con hielo, naranja, lima y hierbabuena" },
    lead: "Desde Cordovilla, a las puertas de Pamplona, llega Oro Nómada, el vermut de Bodega Antonanza, una pequeña bodega familiar que nació entre padre e hijo.",
    stats: [
      { value: "Cordovilla", label: "a las puertas de Pamplona" },
      { value: "33 botánicos", label: "macerados en vino Chardonnay" },
      { value: "8 meses", label: "de reposo en roble francés" },
      { value: "4 premios", label: "internacionales entre 2023 y 2025" },
    ],
    sections: [
      {
        title: "Oro Nómada Original",
        image: { src: "/images/blog/vermut-oro-nomada-botellas.webp", alt: "Botellas de Oro Nómada Original y Wermujito, vermut artesano de Navarra, con dos vasos con hielo, naranja, lima y hierbabuena" },
        paragraphs: ["El Original parte de un vino Chardonnay, se macera con 33 botánicos y reposa ocho meses en roble francés. Es complejo y especiado, y ganó la **Gran Medalla de Oro** en el concurso internacional CWWSC 2024."],
      },
      {
        title: "Sus premios",
        image: {
          src: "/images/blog/vermut-oro-nomada-premios.webp",
          alt: "Medallas de Oro Nómada: Gran Arribe de Oro en Femenino 2023, Great Gold Catavinum 2024, Oro CINVE 2025 y Oro Bacchus 2025",
          width: 1091,
          height: 417,
        },
        list: [
          "**2023 · Gran Arribe de Oro en Femenino**, Premios Vinduero-Vindouro.",
          "**2024 · Great Gold**, Catavinum World Wine & Spirits Competition (CWWSC).",
          "**2025 · Oro**, concurso internacional CINVE.",
          "**2025 · Oro**, Concurso Internacional de Vinos Bacchus (Unión Española de Catadores).",
        ],
      },
      {
        title: "Wermujito",
        paragraphs: ["Su hermano pequeño, el Wermujito, es la versión más fresca: cítrico y herbal, con lima, menta y hierbabuena, perfecto para el aperitivo al sol."],
      },
      {
        title: "Dos maneras de brindar con Navarra",
        paragraphs: ["Solos, con hielo o en cóctel: dos maneras de brindar con Navarra.", "**Ven a probarlos a la Calle Estafeta, 70.**"],
      },
    ],
    shop: {
      title: "Oro Nómada",
      products: [],
      cta: { label: "Comprar en la tienda online", href: "/tienda/licores" },
    },
    source: false,
  },
];

export function getNewsletter(slug: string): Newsletter | undefined {
  return newsletters.find((n) => n.slug === slug);
}
