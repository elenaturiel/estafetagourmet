/** Menús de la web. Cambia aquí los enlaces de cabecera y pie. */
export const mainNav = [
  { href: "/tienda", key: "shop" },
  { href: "/regalos", key: "gifts" },
  { href: "/productores", key: "producers" },
  { href: "/blog", key: "blog" },
  { href: "/visitanos", key: "visit" },
] as const;

export const footerNav = {
  shop: [
    { href: "/tienda/quesos", label: "Quesos" },
    { href: "/tienda/embutidos", label: "Embutidos" },
    { href: "/tienda/vinos", label: "Vinos" },
    { href: "/regalos", label: "Regalos y cestas" },
  ],
  help: [
    { href: "/envios-y-devoluciones", label: "Envíos y devoluciones" },
    { href: "/condiciones-de-venta", label: "Condiciones de venta" },
    { href: "/visitanos#contacto", label: "Contacto" },
  ],
  legal: [
    { href: "/aviso-legal", label: "Aviso legal" },
    { href: "/privacidad", label: "Privacidad" },
    { href: "/cookies", label: "Cookies" },
  ],
};
