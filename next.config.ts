import type { NextConfig } from "next";
import { removedProducts, renamedProducts } from "./data/removed-products";

/**
 * Dominio canónico.
 *
 * Se define con NEXT_PUBLIC_SITE_URL. Si el dominio canónico empieza por
 * "www.", las visitas al dominio sin www se redirigen de forma permanente (308) a la versión con
 * www, y viceversa. Sin variable definida (desarrollo) no hay redirección.
 */
function canonicalHostRedirects() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return [];
  const url = new URL(raw);
  const host = url.host;
  const alternate = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
  // Hosts de pruebas (localhost, *.vercel.app…) no tienen variante www.
  if (/^(localhost|127\.|.*\.vercel\.app$)/.test(host)) return [];
  return [
    {
      source: "/:path*",
      has: [{ type: "host" as const, value: alternate }],
      destination: `${url.protocol}//${host}/:path*`,
      permanent: true,
    },
  ];
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Fotos que la dueña sube al blog desde el panel (Sanity).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    // Las redirecciones de la tienda valen también con /en y /fr por delante.
    const inAllLanguages = <T extends { source: string; destination: string }>(list: T[]) =>
      list.flatMap((r) => [r, ...(["en", "fr"] as const).map((l) => ({ ...r, source: `/${l}${r.source}`, destination: `/${l}${r.destination}` }))]);
    return [
      ...inAllLanguages([
      // Atún y bonito dejó de ser categoría: sus productos están en Conservas.
      { source: "/tienda/atun-y-bonito", destination: "/tienda/conservas", permanent: true },
      { source: "/tienda/atun-y-bonito/:producto", destination: "/tienda/conservas/:producto", permanent: true },
      // Los lotes de El Navarrico ya no se venden.
      { source: "/tienda/lotes/navarrico-lote-:lote", destination: "/tienda/lotes", permanent: true },
      // "Chocolate sabor nº1…6" tienen ya nombre propio.
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-1", destination: "/tienda/chocolates/chocolate-negro-72-vino-tinto", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-2", destination: "/tienda/chocolates/chocolate-negro-85-arandanos", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-3", destination: "/tienda/chocolates/chocolate-negro-62-puro-sin-azucar-anadido", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-4", destination: "/tienda/chocolates/chocolate-con-leche-cafe-bombon-sin-azucar-anadido", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-5", destination: "/tienda/chocolates/chocolate-negro-72-piparras", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-6", destination: "/tienda/chocolates/chocolate-con-leche-manzana-a-la-sidra", permanent: true },
      // Productos retirados: su ficha lleva a la categoría.
      ...removedProducts.map(([categoria, slug]) => ({
        source: `/tienda/${categoria}/${slug}`,
        destination: `/tienda/${categoria}`,
        permanent: true,
      })),
      // Productos con nombre nuevo en la plantilla: la ficha antigua lleva a la nueva.
      ...renamedProducts.map(([categoria, viejo, nuevo]) => ({
        source: `/tienda/${categoria}/${viejo}`,
        destination: `/tienda/${categoria}/${nuevo}`,
        permanent: true,
      })),
      // Entradas de ejemplo del blog que ya no existen.
      ...["que-vino-elegir-para-cada-queso-navarro", "que-comprar-en-cada-epoca-del-ano-en-navarra", "el-productor-del-mes"].map(
        (slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: true }),
      ),
      ]),
      ...canonicalHostRedirects(),
    ];
  },
};

export default nextConfig;
