import type { MetadataRoute } from "next";
import { getNewsletters } from "@/lib/newsletters";
import { SITE_URL } from "@/data/site";
import { getAllProducts, getCategories, getPosts } from "@/lib/catalog";
import { productHref } from "@/lib/product-utils";

const staticPaths = [
  "/",
  "/tienda",
  "/regalos",
  "/maridajes",
  "/productores",
  "/newsletter",
  "/blog",
  "/visitanos",
  "/envios-y-devoluciones",
  "/condiciones-de-venta",
  "/aviso-legal",
  "/privacidad",
  "/cookies",
];

/** Se regenera cada 5 minutos. */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, newsletters, posts] = await Promise.all([
    getCategories(),
    getAllProducts(),
    getNewsletters(),
    getPosts(),
  ]);
  const paths = [
    ...staticPaths,
    ...categories.filter((c) => !c.href).map((c) => `/tienda/${c.slug}`),
    ...products.map(productHref),
    ...newsletters.map((n) => `/newsletter/${n.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: path.startsWith("/tienda") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/tienda") ? 0.8 : 0.5,
  }));
}
