import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/** La tienda es indexable. Se excluyen la cesta, la búsqueda, el panel del blog y la API. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cesta", "/buscar", "/admin", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
