import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/** La tienda es indexable. Solo se excluyen la cesta y los resultados de búsqueda. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cesta", "/buscar"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
