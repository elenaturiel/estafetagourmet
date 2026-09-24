/**
 * Textos de la interfaz en español (idioma principal).
 * Los datos variables (dirección, horario, importes…) viven en /data/site.ts.
 * Para traducir, completa lib/i18n/en.ts con las mismas claves.
 */
export const es = {
  locale: "es",
  skipToContent: "Saltar al contenido",
  topBar: {
    shipping: "Envíos a toda la península en 24–48 h",
    pickup: "Recogida en tienda · Calle Estafeta, 70",
    freeShipping: (amount: string) => `Envío gratis desde ${amount} €`,
  },
  nav: {
    label: "Navegación principal",
    shop: "Tienda",
    gifts: "Regalos y cestas",
    producers: "Productores",
    blog: "Blog",
    visit: "Visítanos",
  },
  header: {
    homeLink: "Estafeta Gourmet, ir al inicio",
    languageLabel: "Idioma",
    languageSoon: "English version coming soon",
    search: "Buscar",
    searchPlaceholder: "Buscar quesos, vinos, cestas…",
    searchClose: "Cerrar la búsqueda",
    cart: (n: number) => `Cesta (${n})`,
    cartAria: (n: number) => `Cesta, ${n} ${n === 1 ? "producto" : "productos"}`,
    openMenu: "Abrir el menú",
    closeMenu: "Cerrar el menú",
  },
  footer: {
    since: (year: number) => `Alimentación gourmet de Navarra, desde ${year}.`,
    shop: "Tienda",
    help: "Ayuda",
    legal: "Legal",
    shipping: "Envíos y devoluciones",
    terms: "Condiciones de venta",
    contact: "Contacto",
    legalNotice: "Aviso legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    cookieSettings: "Configurar cookies",
  },
  cart: {
    add: "Añadir a la cesta",
    added: "Añadido",
    addedLive: (name: string) => `${name} se ha añadido a la cesta`,
  },
  cookies: {
    title: "Cookies",
    text: "Usamos cookies técnicas necesarias para que la tienda funcione (por ejemplo, la cesta). Con tu permiso, usaríamos también cookies de analítica para entender cómo se usa la web.",
    more: "Más información",
    accept: "Aceptar analítica",
    reject: "Rechazar",
  },
};

export type Dictionary = typeof es;
