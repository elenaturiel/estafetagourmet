import type { MetadataRoute } from "next";
import { getNewsletters } from "@/lib/newsletters";
import { SITE_URL } from "@/data/site";
import { getAllProducts, getCategories, getPosts } from "@/lib/catalog";
import { productHref } from "@/lib/product-utils";
import { localePath, locales } from "@/lib/i18n/config";

const staticPaths = [
  "/",
  "/tienda",
  "/regalos",
  "/maridajes",
  "/productores",
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
  const paths: string[] = [
    ...staticPaths,
    ...categories.filter((c) => !c.href).map((c) => `/tienda/${c.slug}`),
    ...products.map(productHref),
    ...newsletters.map((n) => `/newsletter/${n.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  // Cada página, en los tres idiomas, con sus alternativas (hreflang).
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path) === "/" ? "" : localePath(locale, path)}`,
      changeFrequency: (path.startsWith("/tienda") ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/" ? 1 : path.startsWith("/tienda") ? 0.8 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}${localePath(l, path) === "/" ? "" : localePath(l, path)}`]),
        ),
      },
    })),
  );
}
