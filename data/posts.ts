import type { PortableBlock, Post } from "@/lib/types";

/** Párrafos → cuerpo en Portable Text (el mismo formato que las entradas del panel). */
function paragraphs(slug: string, texts: string[]): PortableBlock[] {
  return texts.map((text, i) => ({
    _type: "block",
    _key: `${slug}-${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${slug}-${i}-0`, text, marks: [] }],
  }));
}

/**
 * Entradas del blog escritas aquí. Se muestran junto a las del panel /admin
 * (Sanity), de la más reciente a la más antigua. `excerpt` es el resumen de
 * las tarjetas y buscadores; el texto completo va en `body`.
 */
export const posts: Post[] = [
  {
    slug: "novedad-vermut-artesano-oro-nomada",
    category: "Novedades",
    title: "Novedad: Oro Nómada, el vermut artesano de Navarra",
    excerpt:
      "Desde Cordovilla, a las puertas de Pamplona, llega Oro Nómada, el vermut de Bodega Antonanza: el Original, con Gran Medalla de Oro en el CWWSC 2024, y su hermano pequeño, el Wermujito.",
    date: "2026-10-31",
    image: {
      src: "/images/blog/vermut-oro-nomada.webp",
      alt: "Botellas de Oro Nómada Original y Wermujito, vermut artesano de Navarra, con dos vasos con hielo, naranja, lima y hierbabuena",
      placeholder: "Foto · blog",
    },
    cover: {
      src: "/images/blog/vermut-oro-nomada-botellas.webp",
      alt: "Botellas de Oro Nómada Original y Wermujito, vermut artesano de Navarra, con dos vasos con hielo, naranja, lima y hierbabuena",
      width: 900,
      height: 900,
    },
    body: paragraphs("novedad-vermut-artesano-oro-nomada", [
      "Desde Cordovilla, a las puertas de Pamplona, llega Oro Nómada, el vermut de Bodega Antonanza, una pequeña bodega familiar que nació entre padre e hijo.",
      "El Original parte de un vino Chardonnay, se macera con 33 botánicos y reposa ocho meses en roble francés. Es complejo y especiado, y ganó la Gran Medalla de Oro en el concurso internacional CWWSC 2024.",
      "Sus premios: Gran Arribe de Oro en Femenino en los Premios Vinduero-Vindouro (2023), Great Gold en el Catavinum World Wine & Spirits Competition (2024), Oro en el concurso internacional CINVE (2025) y Oro en el Concurso Internacional de Vinos Bacchus (2025).",
      "Su hermano pequeño, el Wermujito, es la versión más fresca: cítrico y herbal, con lima, menta y hierbabuena, perfecto para el aperitivo al sol.",
      "Solos, con hielo o en cóctel: dos maneras de brindar con Navarra.",
    ]),
  },
  {
    slug: "ya-estamos-abiertos",
    category: "Novedades",
    title: "¡Ya estamos abiertos! Bienvenidos a Estafeta Gourmet",
    excerpt:
      "Hay proyectos que se cocinan a fuego lento, y este ha sido uno de ellos. Después de muchos meses de trabajo, ilusión y algún que otro desvelo, por fin podemos decirlo: Estafeta Gourmet ya tiene sus puertas abiertas en plena Calle Estafeta, en el corazón de Pamplona.",
    date: "2026-10-29",
    image: {
      src: "/images/blog/ya-estamos-abiertos.webp",
      alt: "Fachada de Estafeta Gourmet en la calle Estafeta, 70 de Pamplona, con el rótulo iluminado y la puerta abierta",
      placeholder: "Foto · blog",
    },
    cover: {
      src: "/images/blog/ya-estamos-abiertos-fachada.webp",
      alt: "Fachada de Estafeta Gourmet en la calle Estafeta, 70 de Pamplona, con el rótulo iluminado y la puerta abierta",
      width: 600,
      height: 1067,
    },
    body: paragraphs("ya-estamos-abiertos", [
      "Hay proyectos que se cocinan a fuego lento, y este ha sido uno de ellos. Después de muchos meses de trabajo, ilusión y algún que otro desvelo, por fin podemos decirlo: Estafeta Gourmet ya tiene sus puertas abiertas en plena Calle Estafeta, en el corazón de Pamplona.",
      "Detrás de cada estantería hay mucho trabajo. Hemos recorrido bodegas, queserías, obradores y conserveras, y hemos probado y elegido cada producto uno a uno. Queríamos una tienda donde todo lo que encuentres tenga una historia y un sabor que merezca la pena. Por eso apostamos con orgullo por lo de aquí: productos de Navarra, de Km 0, hechos por gente que cuida lo que hace. Y junto a ellos, algunas joyas de fuera que nos han enamorado.",
      "Estamos encantados de recibirte. Da igual que vivas a la vuelta de la esquina, que estés de paso por Pamplona o que vengas desde la otra punta del mundo. Aquí siempre vas a encontrar una sonrisa, un consejo y, si te apetece, algo rico que probar. Nos encanta charlar, contarte de dónde viene cada producto y ayudarte a encontrar justo lo que buscas.",
      "Y si estás pensando en sorprender a alguien, preparamos lotes personalizados a tu gusto y a tu presupuesto. Sirven para un cumpleaños, para dar las gracias, para un regalo de empresa o, simplemente, porque sí.",
      "Porque eso es lo que de verdad queremos: que nos elijas para hacer felices a los demás… y también a ti. Darse un capricho no necesita excusa. Un buen vino, un queso con carácter o un chocolate que te alegra la tarde: los pequeños placeres son los que hacen grandes los días.",
      "Gracias de corazón a todos los que nos habéis acompañado en este camino. Ahora empieza lo mejor, y queremos vivirlo contigo.",
      "Te esperamos en la Calle Estafeta. ¡Pasa a vernos!",
      "El equipo de Estafeta Gourmet",
    ]),
  },
  {
    slug: "bienvenidos-a-esta-aventura",
    category: "Nuestra historia",
    title: "Bienvenidos",
    titleStyle: "rotulo",
    excerpt:
      "Hay un momento en la vida en que uno se mira al espejo y dice: «esto necesita un cambio... o al menos un café más fuerte». Así empezó todo. Un día decidí que la rutina era una traidora silenciosa, y que reinventarse no es solo cosa de mariposas y famosos en crisis de los cuarenta, sino una obligación moral conmigo misma.",
    date: "2026-09-01",
    image: {
      src: "/images/blog/bienvenidos-a-esta-aventura.webp",
      alt: "Retrato en blanco y negro de la autora, sonriendo con la mano apoyada en la mejilla",
      placeholder: "Foto · blog",
    },
    cover: {
      src: "/images/blog/bienvenidos-retrato.webp",
      alt: "Retrato en blanco y negro de la autora, sonriendo con la mano apoyada en la mejilla",
      width: 520,
      height: 639,
    },
    body: paragraphs("bienvenidos-a-esta-aventura", [
      "Hay un momento en la vida en que uno se mira al espejo y dice: «esto necesita un cambio... o al menos un café más fuerte». Así empezó todo. Un día decidí que la rutina era una traidora silenciosa, y que reinventarse no es solo cosa de mariposas y famosos en crisis de los cuarenta, sino una obligación moral conmigo misma.",
      "Los nuevos proyectos llegaron envueltos en misterio, como si la vida me hubiera enviado un sobre cerrado con instrucciones poco claras y letra pequeña. Nadie te avisa cuándo empieza un nuevo capítulo: simplemente un día te despiertas pensando «voy a intentar algo distinto» y el universo responde mandándote retos que ni pediste, pero que tampoco rechazas, porque en el fondo sabes que ahí está la gracia.",
      "Cambiar de rumbo profesional asusta, sí, pero también tiene su lado cómico: aprender cosas nuevas a contrarreloj, fingir seguridad en reuniones donde no entiendes ni la mitad, y descubrir talentos ocultos que ni sabías que tenías (como sobrevivir al caos con una sonrisa).",
      "Reinventarse cada día no es un lujo, es supervivencia con estilo. Y si algo he aprendido es esto: la vida premia a quienes se atreven a empezar de nuevo, aunque sea con los nervios de punta y el café frío.",
      "Bienvenidos a esta apasionante aventura llena de gastronomía premium, productos elegidos con mimo y pasión por el trabajo.",
    ]),
  },
];
