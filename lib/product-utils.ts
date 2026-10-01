import type { Product, Producer } from "@/lib/types";

/** Línea "Productor · Localidad" o el subtítulo propio del producto. */
export function productByline(product: Product, producer?: Producer): string {
  if (product.subtitle) return product.subtitle;
  if (!producer) return "";
  return `${producer.name} · ${producer.locality}`;
}

export function productHref(product: Pick<Product, "categorySlug" | "slug">): string {
  return `/tienda/${product.categorySlug}/${product.slug}`;
}

/** Enlace de una categoría: su página de tienda o, si tiene `href`, ese destino. */
export function categoryHref(category: { slug: string; href?: string }): string {
  return category.href ?? `/tienda/${category.slug}`;
}
