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
  // Primera visita sin idioma elegido: si el navegador está en inglés o francés, se lleva a esa versión.
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  if (!saved && request.method === "GET") {
    const pref = (request.headers.get("accept-language") ?? "")
      .split(",")
      .map((part) => part.trim().slice(0, 2).toLowerCase())
      .find((code) => code === "es" || code === "en" || code === "fr");
    if (pref === "en" || pref === "fr") {
      const to = request.nextUrl.clone();
      to.pathname = `/${pref}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(to, 307);
    }
  }
  if (saved === "en" || saved === "fr") {
    const to = request.nextUrl.clone();
    to.pathname = `/${saved}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(to, 307);
  }
  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // No toca la API, el panel del blog, los archivos internos ni los archivos con extensión (imágenes, sitemap.xml…).
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};
