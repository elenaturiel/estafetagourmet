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
  async redirects() {
    return canonicalHostRedirects();
  },
};

export default nextConfig;
