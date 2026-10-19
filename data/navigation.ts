/** Menús de la web. Cambia aquí los enlaces de cabecera y pie. */
export const mainNav = [
  // Los lotes están dentro de la tienda (categoría Lotes).
  { href: "/tienda", key: "shop" },
  { href: "/productores", key: "producers" },
  { href: "/maridajes", key: "pairings" },
  // Blog y newsletter comparten página (/blog); los boletines están en /blog#boletines.
  { href: "/blog", key: "blog" },
  { href: "/visitanos", key: "visit" },
] as const;

export const footerNav = {
  shop: [
    { href: "/tienda/quesos", key: "cheeses" },
    { href: "/tienda/embutidos", key: "cured" },
    { href: "/tienda/vinos", key: "wines" },
    { href: "/tienda/lotes", key: "lots" },
    { href: "/regalos", key: "gifts" },
    { href: "/maridajes", key: "pairings" },
    { href: "/blog", key: "blog" },
    { href: "/blog#boletines", key: "newsletter" },
  ],
  help: [
    { href: "/envios-y-devoluciones", key: "shipping" },
    { href: "/condiciones-de-venta", key: "terms" },
    { href: "/visitanos#contacto", key: "contact" },
  ],
  legal: [
    { href: "/aviso-legal", key: "legalNotice" },
    { href: "/privacidad", key: "privacy" },
    { href: "/cookies", key: "cookies" },
  ],
} as const;
