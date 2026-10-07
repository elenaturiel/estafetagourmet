import type { NextConfig } from "next";

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
    return [
      // Atún y bonito dejó de ser categoría: sus productos están en Conservas.
      { source: "/tienda/atun-y-bonito", destination: "/tienda/conservas", permanent: true },
      { source: "/tienda/atun-y-bonito/:producto", destination: "/tienda/conservas/:producto", permanent: true },
      // El blog se sustituye por la newsletter (el código del blog sigue en app/(site)/blog).
      { source: "/blog", destination: "/newsletter", permanent: false },
      { source: "/blog/:slug", destination: "/newsletter", permanent: false },
      // Los lotes de El Navarrico ya no se venden.
      { source: "/tienda/lotes/navarrico-lote-:lote", destination: "/tienda/lotes", permanent: true },
      // "Chocolate sabor nº1…6" tienen ya nombre propio.
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-1", destination: "/tienda/dulces/chocolate-negro-72-vino-tinto", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-2", destination: "/tienda/dulces/chocolate-negro-85-arandanos", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-3", destination: "/tienda/dulces/chocolate-negro-62-puro-sin-azucar-anadido", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-4", destination: "/tienda/dulces/chocolate-con-leche-cafe-bombon-sin-azucar-anadido", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-5", destination: "/tienda/dulces/chocolate-negro-72-piparras", permanent: true },
      { source: "/tienda/dulces/navarra-chocolate-sabor-n-6", destination: "/tienda/dulces/chocolate-con-leche-manzana-a-la-sidra", permanent: true },
      ...canonicalHostRedirects(),
    ];
  },
};

export default nextConfig;
