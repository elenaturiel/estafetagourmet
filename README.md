# Estafeta Gourmet · web y tienda online

Web de **Estafeta Gourmet**, tienda de productos gourmet navarros en la calle Estafeta, 70 (Pamplona).

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Fuentes: Fraunces (títulos) y DM Sans (texto), con `next/font/google`
- Catálogo en archivos locales (`/data`), preparado para pasar a Shopify
- Cesta en cliente (localStorage). El pago está pendiente (ver [TODO.md](./TODO.md))

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Necesitas Node.js 20 o superior.

### Dirección web (dominio)

La dirección pública se configura con una variable de entorno. Copia `.env.example` a `.env.local` o configúrala en tu proveedor de alojamiento:

```bash
NEXT_PUBLIC_SITE_URL=https://www.tudominio.com
```

Se usa para las URL canónicas, Open Graph, `sitemap.xml`, `robots.txt` y los datos estructurados.

Si el dominio empieza por `www.`, la versión sin `www` redirige automáticamente y de forma permanente a la versión con `www` (`next.config.ts`). En los dominios `localhost` y `*.vercel.app` no hay redirección.

Sin la variable, la web funciona en local con `http://localhost:3000` y el pie muestra el marcador `[dirección web]`.

## Estructura

```
app/                    Rutas (una carpeta por página)
  page.tsx              Inicio
  tienda/[categoria]/   Categoría (filtros y orden) y ficha de producto
  cesta/, buscar/       Cesta y búsqueda
  sitemap.ts, robots.ts
components/
  layout/               Barra superior, cabecera, pie, banner de cookies
  home/                 Secciones de la página de inicio
  shop/                 Migas de pan y listado con filtros
  cards/                Tarjetas (producto, categoría, cesta, productor…)
  cart/                 Estado de la cesta y botón "Añadir a la cesta"
  forms/                Newsletter y contacto
  ui/                   Botones, secciones, ImagePlaceholder, iconos
data/                   ⟵ TODO el contenido editable
lib/
  catalog.ts            Capa de acceso a datos (la única que lee /data)
  filters.ts            Filtros y orden de la categoría
  i18n/                 Textos de interfaz (es / en)
  seo.ts, structured-data.ts
```

Los colores y las fuentes son tokens de Tailwind definidos en `app/globals.css` (`bg-crema`, `text-vino`, `border-linea`…).

## Cómo cambiar el catálogo

Todo el contenido está en `/data`:

| Archivo | Contenido |
|---|---|
| `site.ts` | Dirección, horario, teléfono, correo, WhatsApp, envío gratis, valoración de Google, incentivo de la newsletter |
| `categories.ts` | Categorías: nombre, H1, textos SEO y filtros propios (p. ej. Denominación, Tipo de leche) |
| `products.ts` | Productos |
| `producers.ts` | Productores (`featured: true` para que salgan en el inicio) |
| `gifts.ts` | Cestas y regalos |
| `posts.ts` | Entradas del blog |
| `reviews.ts` | Reseñas de Google (solo reales) |
| `legal.ts` | Datos del titular para las páginas legales |
| `navigation.ts` | Menús de cabecera y pie |

### Añadir un producto

```ts
// data/products.ts
{
  slug: "queso-roncal-dop",            // URL: /tienda/quesos/queso-roncal-dop
  name: "Queso Roncal DOP",
  categorySlug: "quesos",              // slug de data/categories.ts
  producerSlug: "productor-queso-1",   // slug de data/producers.ts (o null)
  price: 18.5,                         // euros con IVA; null muestra "[precio] €"
  description: "…",
  image: { src: "/images/productos/roncal.jpg", alt: "Cuña de queso Roncal", placeholder: "Foto · queso" },
  attributes: { denominacion: "dop-roncal", leche: "oveja" },  // valores de los filtros
  featured: true,                      // sale en "Los favoritos de la casa"
  rank: 1,                             // orden en "Destacados"
}
```

- **Filtros.** Denominación, Tipo de leche y demás se definen por categoría en `categories.ts → filters`. Los valores de `attributes` de cada producto deben coincidir con los `value` de esas opciones. El filtro de Productor se genera solo. El de Precio aparece cuando la categoría tiene al menos un producto con precio.
- **Fotos.** Ponlas en `public/images/…` e indica la ruta en `image.src`. `ImagePlaceholder` usa `next/image` con el mismo tamaño y recorte, así que el diseño no cambia. Mientras no haya `src`, se muestra el bloque de color con la etiqueta `placeholder`.
- **Marcadores.** Cualquier texto entre corchetes (`[precio]`, `[Localidad]`…) se muestra tal cual en la web para que se vea que falta. Consulta [TODO.md](./TODO.md).

## Conectar Shopify más adelante

Los componentes nunca leen `/data` directamente, siempre pasan por `lib/catalog.ts`. Para usar Shopify:

1. En Shopify, crea una app con acceso a la **Storefront API** y define `SHOPIFY_STORE_DOMAIN` y `SHOPIFY_STOREFRONT_TOKEN` como variables de entorno.
2. **Catálogo.** Reimplementa las funciones de `lib/catalog.ts` (`getCategories`, `getProducts`, `getProduct`…) con consultas GraphQL a la Storefront API. Deben devolver los mismos tipos de `lib/types.ts`:
   - Categoría → *collection* (`handle` = `slug`)
   - Producto → *product* (`handle` = `slug`, `priceRange.minVariantPrice` = `price`, `featuredImage` = `image`)
   - Productor, denominación, tipo de leche… → *metafields* del producto
   - Productores, cestas y posts → *metaobjects*, o se quedan en `/data`
3. **Cesta.** Sustituye las acciones de `components/cart/cart-store.ts` (`add`, `setQuantity`, `remove`) por las mutaciones `cartCreate`, `cartLinesAdd`, `cartLinesUpdate` y `cartLinesRemove`. Guarda el `cart.id` en localStorage. `useCart()` mantiene la misma interfaz, así que los componentes no cambian.
4. **Pago.** El botón "Finalizar pedido" de `components/cart/CartView.tsx` debe redirigir a `cart.checkoutUrl`, el checkout alojado por Shopify.
5. **Actualización.** Si los datos vienen de una API, añade revalidación (`revalidate` o webhooks de Shopify) para que las páginas estáticas se actualicen.

## Idiomas

Hoy solo se publica el español, sin prefijo en la URL. El selector "ES · EN" muestra EN desactivado. Para activar el inglés:

1. Completa `lib/i18n/en.ts` (mismas claves que `es.ts`) y añade `"en"` a `enabledLocales` en `lib/i18n/index.ts`.
2. Mueve las rutas bajo `app/[lang]/` y usa `getDictionary(lang)` en cada página.
3. Añade `alternates.languages` (hreflang) en `lib/seo.ts` y las URL en inglés al sitemap.

## Accesibilidad, SEO y legal

- Un solo `h1` por página, HTML semántico, labels en todos los campos, foco visible, áreas táctiles de 44px como mínimo y enlace "Saltar al contenido".
- Menú móvil, búsqueda y cajón de filtros con `<dialog>` nativo: se cierran con Esc y el foco no sale del diálogo.
- Metadatos y Open Graph por página, URL canónica, `sitemap.xml` y `robots.txt`. La tienda es indexable (sin `noindex`).
- JSON-LD: `LocalBusiness`/`Store` en todas las páginas, `Product` en cada ficha y `BreadcrumbList` en la tienda. La oferta con precio solo se publica cuando el precio es real.
- Banner de cookies: "Rechazar" y "Aceptar" tienen el mismo peso. La analítica solo se cargaría tras aceptar (`Analytics` en `components/layout/CookieBanner.tsx`, hoy vacío). Se puede cambiar la elección desde el pie o desde `/cookies`.
- El mapa es una imagen enlazada a Google Maps para no cargar cookies de terceros sin consentimiento.
