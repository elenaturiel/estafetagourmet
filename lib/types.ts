/**
 * Modelo de datos de la tienda.
 *
 * Está pensado para parecerse a lo que devuelve la Storefront API de Shopify
 * (productos con handle/slug, colecciones, precio, imagen y metacampos), de
 * forma que al conectar Shopify solo cambie lib/catalog.ts.
 */

export type Image = {
  /** Ruta en /public o URL remota. Si no hay src se pinta un marcador. */
  src?: string;
  alt: string;
  /** Texto del marcador mientras no haya foto real (p. ej. "Foto · quesos"). */
  placeholder: string;
};

export type FilterOption = { value: string; label: string };

/** Filtro por atributo definido en la categoría (p. ej. Denominación). */
export type AttributeFilter = {
  key: string;
  label: string;
  options: FilterOption[];
};

export type Category = {
  slug: string;
  name: string;
  /** H1 de la página de categoría (p. ej. "Quesos navarros"). */
  title: string;
  intro: string;
  image: Image;
  seo: { title: string; description: string; heading: string; text: string[] };
  filters: AttributeFilter[];
};

export type Producer = {
  slug: string;
  name: string;
  locality: string;
  /** Producto principal que elabora (Queso, Vino…). */
  specialty: string;
  image: Image;
  /** Categoría donde están sus productos. */
  categorySlug: string;
  featured?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  /** Null cuando el producto es una selección de la casa. */
  producerSlug: string | null;
  /** Precio en euros (IVA incluido). Null mientras no esté definido. */
  price: number | null;
  description: string;
  image: Image;
  /** Valores de los filtros de la categoría: { denominacion: "dop-roncal" }. */
  attributes: Record<string, string>;
  /** Aparece en "Los favoritos de la casa". */
  featured?: boolean;
  /** Orden en "Destacados" (menor primero). */
  rank: number;
  /** Texto alternativo a "Productor · Localidad" (p. ej. "Selección de la casa"). */
  subtitle?: string;
  /** Etiquetas visibles en la tarjeta (máx. 2): "DOP", "Favorito de la casa"… */
  tags?: string[];
  /** Productos que se sugieren en su ficha ("Combina con"). Slugs. */
  pairsWith?: string[];
};

export type Occasion = {
  slug: string;
  name: string;
  /** Frase corta bajo el nombre. */
  line: string;
  image: Image;
  href: string;
};

export type GiftBox = {
  slug: string;
  name: string;
  description: string;
  price: number | null;
  /** Texto de precio alternativo (p. ej. "Desde [importe] €"). */
  priceLabel?: string;
  tag?: string;
  image: Image;
};

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  /** Fecha ISO de publicación. */
  date: string | null;
  image: Image;
  /** Cuerpo en Portable Text (Sanity). Vacío en las entradas de ejemplo. */
  body?: PortableBlock[];
};

/** Bloque de texto enriquecido de Sanity (Portable Text), sin tipar en detalle. */
export type PortableBlock = { _type: string; _key: string; [key: string]: unknown };

export type Review = {
  id: string;
  text: string;
  author: string;
  date: string;
};
