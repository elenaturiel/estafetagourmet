import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Idiomas: el español no lleva prefijo en la URL (se sirve desde /es por dentro);
 * /en y /fr se sirven tal cual. /es/... redirige a la versión sin prefijo.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const m = pathname.match(/^\/(es|en|fr)(\/.*)?$/);
  if (m) {
    if (m[1] !== "es") return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = m[2] || "/";
    return NextResponse.redirect(url, 308);
  }
  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // No toca la API, el panel del blog, los archivos internos ni los archivos con extensión (imágenes, sitemap.xml…).
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};
