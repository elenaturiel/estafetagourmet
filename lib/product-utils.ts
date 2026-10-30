import type { Product, Producer } from "@/lib/types";

/** Línea "Productor · Localidad" o el subtítulo propio del producto. */
export function productByline(product: Product, producer?: Producer): string {
  if (product.subtitle) return product.subtitle;
  if (!producer) return "";
  // Mientras la localidad sea un [marcador], se muestra solo el nombre del productor.
  return /^\[.*\]$/.test(producer.locality.trim())
    ? producer.name
    : `${producer.name} · ${producer.locality}`;
}

export function productHref(product: Pick<Product, "categorySlug" | "slug">): string {
  return `/tienda/${product.categorySlug}/${product.slug}`;
}

/** Enlace de una categoría: su página de tienda o, si tiene `href`, ese destino. */
export function categoryHref(category: { slug: string; href?: string }): string {
  return category.href ?? `/tienda/${category.slug}`;
}

/** Lote de la categoría "Lotes": una idea de lote, sin precio (sus productos se compran uno a uno). */
export function isLotIdea(p: Pick<Product, "categorySlug">): boolean {
  return p.categorySlug === "lotes";
}
