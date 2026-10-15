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
import { posts } from "@/data/posts";
import { producers } from "@/data/producers";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { localizeCategory } from "@/data/i18n/categories";
import { localizeProducer } from "@/data/i18n/producers";
import { localizePost } from "@/data/i18n/posts";
import { localizeProduct } from "@/data/i18n/products";
import type { Locale } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { getSanityPosts } from "@/lib/sanity/posts";
import type { Category, Post, Producer, Product, Review } from "@/lib/types";

/**
 * Idioma de la página que se está generando. Fuera de una página (sitemap,
 * generateStaticParams…) no hay idioma y se usa el español.
 */
async function currentLocale(): Promise<Locale> {
  try {
    return await getLocale();
  } catch {
    return "es";
  }
}

export async function getCategories(): Promise<Category[]> {
  const locale = await currentLocale();
  return categories.map((c) => localizeCategory(c, locale));
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const locale = await currentLocale();
  const c = categories.find((c) => c.slug === slug);
  return c ? localizeCategory(c, locale) : undefined;
}

export async function getProducts(options: {
  category?: string;
  featured?: boolean;
  producer?: string;
} = {}): Promise<Product[]> {
  const locale = await currentLocale();
  return products
    .filter((p) => (options.category ? p.categorySlug === options.category : true))
    .filter((p) => (options.featured ? p.featured : true))
    .filter((p) => (options.producer ? p.producerSlug === options.producer : true))
    .sort((a, b) => a.rank - b.rank)
    .map((p) => localizeProduct(p, locale));
}

/** Productos destacados en el orden de las categorías. */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const locale = await currentLocale();
  const order = categories.map((c) => c.slug);
  return products
    .filter((p) => p.featured)
    .sort((a, b) => order.indexOf(a.categorySlug) - order.indexOf(b.categorySlug))
    .slice(0, limit)
    .map((p) => localizeProduct(p, locale));
}

export async function getProduct(
  categorySlug: string,
  productSlug: string,
): Promise<Product | undefined> {
  const locale = await currentLocale();
  const p = products.find((p) => p.categorySlug === categorySlug && p.slug === productSlug);
  return p ? localizeProduct(p, locale) : undefined;
}

/** Todos los productos en el idioma de la página. */
export async function getAllProducts(): Promise<Product[]> {
  const locale = await currentLocale();
  return products.map((p) => localizeProduct(p, locale));
}

/** Todos los productos tal como vienen de la hoja (en español): para emparejar por nombre y para el buscador. */
export async function getAllProductsRaw(): Promise<Product[]> {
  return products;
}

/** Un producto de la hoja traducido (para los que se obtienen en bruto). */
export async function localize(product: Product): Promise<Product> {
  return localizeProduct(product, await currentLocale());
}

export async function getProducers(options: { featured?: boolean } = {}): Promise<Producer[]> {
  const locale = await currentLocale();
  return producers.filter((p) => (options.featured ? p.featured : true)).map((p) => localizeProducer(p, locale));
}

export async function getProducerMap(): Promise<Record<string, Producer>> {
  const locale = await currentLocale();
  return Object.fromEntries(producers.map((p) => [p.slug, localizeProducer(p, locale)]));
}

/**
 * Entradas del blog: las del panel /admin (Sanity, lo que escribe la dueña de
 * la tienda) más las escritas en data/posts.ts.
 */
export async function getPosts(limit?: number): Promise<Post[]> {
  const locale = await currentLocale();
  const list = (await allPosts()).map((p) => localizePost(p, locale));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const locale = await currentLocale();
  const post = (await allPosts()).find((p) => p.slug === slug);
  return post ? localizePost(post, locale) : undefined;
}

/**
 * Entradas de prueba escritas en el panel que no deben salir en la web, como
 * "categoría título" o solo "título" (sin distinguir mayúsculas). Mejor borrarlas en /admin.
 */
const HIDDEN_POSTS = new Set(["novedades prueba 1", "prueba 1"]);
const isHidden = (p: Post) =>
  HIDDEN_POSTS.has(p.title.trim().toLowerCase()) ||
  HIDDEN_POSTS.has(`${p.category} ${p.title}`.trim().toLowerCase());

/** Las del panel y las de data/posts.ts juntas (si un slug se repite, gana el panel), de la más reciente a la más antigua. */
async function allPosts(): Promise<Post[]> {
  const fromPanel = ((await getSanityPosts()) ?? []).filter(
    (p) => !isHidden(p),
  );
  const taken = new Set(fromPanel.map((p) => p.slug));
  return [...fromPanel, ...posts.filter((p) => !taken.has(p.slug))].sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? ""),
  );
}

export async function getReviews(): Promise<Review[]> {
  return reviews;
}

export { productByline, productHref } from "@/lib/product-utils";

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const locale = await currentLocale();
  return slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p))
    .map((p) => localizeProduct(p, locale));
}

/** Productos por su título exacto de la hoja, en ese orden (los que no existan se omiten). */
export async function getProductsByNames(names: string[]): Promise<Product[]> {
  const locale = await currentLocale();
  return names
    .map((name) => products.find((p) => p.name === name))
    .filter((p): p is Product => Boolean(p))
    .map((p) => localizeProduct(p, locale));
}

/** Número de productos de cada productor, por slug. */
export async function getProducerCounts(): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  for (const p of products) if (p.producerSlug) out[p.producerSlug] = (out[p.producerSlug] ?? 0) + 1;
  return out;
}
