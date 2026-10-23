/** Direcciones de la tienda online (ecommerce.estafetagourmet.com). */

/**
 * ¿Está ya operativa la tienda online? Mientras sea false, los enlaces a ella
 * no llevan a ningún sitio: muestran el aviso «Tienda online en construcción ·
 * pedidos por WhatsApp» (components/shop/ShopGate.tsx), y /tienda y
 * /tienda/aceites se quedan en esta web. Poner true cuando esté lista.
 */
export const TIENDA_ONLINE_ACTIVA = false;

/** Dirección de la tienda online (para reconocer sus enlaces). */
export const TIENDA_ONLINE_ORIGEN = "https://ecommerce.estafetagourmet.com";

/** Los enlaces a "toda la tienda" (sin elegir categoría) llevan aquí. */
export const TIENDA_ONLINE = "https://ecommerce.estafetagourmet.com/commerce/page/1500002";

/** La categoría Aceites lleva aquí. */
export const ACEITES_ONLINE = "https://ecommerce.estafetagourmet.com/commerce/page/1?l=1&d=1";
