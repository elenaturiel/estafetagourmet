/**
 * Capa de acceso al catálogo.
 *
 * Los componentes y páginas SOLO obtienen datos a través de estas funciones.
 * Hoy leen los archivos locales de /data; para conectar Shopify basta con
 * reimplementarlas usando la Storefront API y devolver los mismos tipos
 * (ver README.md → "Conectar Shopify").
 *
 * Todas son asíncronas a propósito, aunque ahora no lo necesiten, para que
 * el cambio a una API remota no obligue a tocar quién las llama.
 */
import { categories } from "@/data/categories";
import { giftBoxes } from "@/data/gifts";
import { posts } from "@/data/posts";
import { producers } from "@/data/producers";
import { products } from "@/data/products";
import { occasions } from "@/data/occasions";
import { reviews } from "@/data/reviews";
import type { Category, GiftBox, Occasion, Post, Producer, Product, Review } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getProducts(options: {
  category?: string;
  featured?: boolean;
  producer?: string;
} = {}): Promise<Product[]> {
  return products
    .filter((p) => (options.category ? p.categorySlug === options.category : true))
    .filter((p) => (options.featured ? p.featured : true))
    .filter((p) => (options.producer ? p.producerSlug === options.producer : true))
    .sort((a, b) => a.rank - b.rank);
}

/** Productos destacados en el orden de las categorías. */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const order = categories.map((c) => c.slug);
  return products
    .filter((p) => p.featured)
    .sort((a, b) => order.indexOf(a.categorySlug) - order.indexOf(b.categorySlug))
    .slice(0, limit);
}

export async function getProduct(
  categorySlug: string,
  productSlug: string,
): Promise<Product | undefined> {
  return products.find((p) => p.categorySlug === categorySlug && p.slug === productSlug);
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProducers(options: { featured?: boolean } = {}): Promise<Producer[]> {
  return producers.filter((p) => (options.featured ? p.featured : true));
}

export async function getProducerMap(): Promise<Record<string, Producer>> {
  return Object.fromEntries(producers.map((p) => [p.slug, p]));
}

export async function getGiftBoxes(): Promise<GiftBox[]> {
  return giftBoxes;
}

export async function getPosts(limit?: number): Promise<Post[]> {
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

export async function getReviews(): Promise<Review[]> {
  return reviews;
}

export { productByline, productHref } from "@/lib/product-utils";

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  return slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

export async function getOccasions(): Promise<Occasion[]> {
  return occasions;
}
