import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { getAllProducts, getCategories, getPosts } from "@/lib/catalog";
import { productHref } from "@/lib/product-utils";

const staticPaths = [
  "/",
  "/tienda",
  "/regalos",
  "/productores",
  "/blog",
  "/visitanos",
  "/envios-y-devoluciones",
  "/condiciones-de-venta",
  "/aviso-legal",
  "/privacidad",
  "/cookies",
];

/** Incluye las entradas nuevas del blog sin volver a publicar la web. */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, posts] = await Promise.all([
    getCategories(),
    getAllProducts(),
    getPosts(),
  ]);
  const paths = [
    ...staticPaths,
    ...categories.map((c) => `/tienda/${c.slug}`),
    ...products.map(productHref),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: path.startsWith("/tienda") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/tienda") ? 0.8 : 0.5,
  }));
}
