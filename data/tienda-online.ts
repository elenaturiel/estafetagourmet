/** Direcciones de la tienda online (ecommerce.estafetagourmet.com). */

/**
 * ¿Está operativa la tienda online? En false, sus enlaces no llevan a ningún
 * sitio: muestran el aviso «Tienda online en construcción · pedidos por
 * WhatsApp» (components/shop/ShopGate.tsx) y /tienda se queda en esta web.
 */
export const TIENDA_ONLINE_ACTIVA = true;

/** Dirección de la tienda online (para reconocer sus enlaces). */
export const TIENDA_ONLINE_ORIGEN = "https://ecommerce.estafetagourmet.com";

/** Los enlaces a "toda la tienda" (sin elegir categoría) llevan aquí. */
export const TIENDA_ONLINE = "https://ecommerce.estafetagourmet.com/commerce/page/1500002";

/**
 * Categorías que se compran en la tienda online: slug de la categoría
 * (data/categories.ts) → su página allí. Al pinchar la categoría (menú,
 * tarjetas, filtro) se va a esa dirección, y /tienda/<slug> redirige a ella.
 * Para añadir una categoría, añade una línea.
 */
export const CATEGORIAS_ONLINE: Record<string, string> = {
  aceites: "https://ecommerce.estafetagourmet.com/commerce/tienda-gourmet?l=1&d=1",
};
