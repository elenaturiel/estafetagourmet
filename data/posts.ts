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
 * (Sanity), de la más reciente a la más antigua. El primer párrafo va como
 * entradilla (`excerpt`) y el resto como cuerpo.
 */
export const posts: Post[] = [
  {
    slug: "bienvenidos-a-esta-aventura",
    category: "Nuestra historia",
    title: "Bienvenidos a esta aventura",
    excerpt:
      "Hay un momento en la vida en que uno se mira al espejo y dice: «esto necesita un cambio... o al menos un café más fuerte». Así empezó todo. Un día decidí que la rutina era una traidora silenciosa, y que reinventarse no es solo cosa de mariposas y famosos en crisis de los cuarenta, sino una obligación moral conmigo misma.",
    date: "2026-09-01",
    image: {
      src: "/images/blog/bienvenidos-a-esta-aventura.webp",
      alt: "Retrato en blanco y negro de la autora, sonriendo con la mano apoyada en la mejilla",
      placeholder: "Foto · blog",
    },
    body: paragraphs("bienvenidos-a-esta-aventura", [
      "Los nuevos proyectos llegaron envueltos en misterio, como si la vida me hubiera enviado un sobre cerrado con instrucciones poco claras y letra pequeña. Nadie te avisa cuándo empieza un nuevo capítulo: simplemente un día te despiertas pensando «voy a intentar algo distinto» y el universo responde mandándote retos que ni pediste, pero que tampoco rechazas, porque en el fondo sabes que ahí está la gracia.",
      "Cambiar de rumbo profesional asusta, sí, pero también tiene su lado cómico: aprender cosas nuevas a contrarreloj, fingir seguridad en reuniones donde no entiendes ni la mitad, y descubrir talentos ocultos que ni sabías que tenías (como sobrevivir al caos con una sonrisa).",
      "Reinventarse cada día no es un lujo, es supervivencia con estilo. Y si algo he aprendido es esto: la vida premia a quienes se atreven a empezar de nuevo, aunque sea con los nervios de punta y el café frío.",
      "Bienvenidos a esta apasionante aventura llena de gastronomía premium, productos elegidos con mimo y pasión por el trabajo.",
    ]),
  },
];
