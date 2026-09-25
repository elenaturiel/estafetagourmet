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

### Diseño

- **Cabecera fija** con el sello centrado, buscador y mega menú de la tienda (categorías, regalos por ocasión y una cesta destacada).
- **Cajón de la cesta**: se abre al añadir un producto, con la barra de envío gratis.
- **Recursos de marca**: fotos en **arco** (utilidad `arch`, un guiño a los soportales del casco viejo), **sello giratorio** (`components/ui/Stamp.tsx`), **cinta** de productos (`Marquee`), **etiquetas** tipo pegatina (`sticker`) y **carruseles** táctiles en móvil (`rail`).
- **Movimiento al hacer scroll** (portada): las secciones aparecen con un escalonado suave, las fotos se deslizan dentro de su marco (parallax), la foto de la tienda se descubre como una persiana, el sello y la tarjeta del hero se mueven a otra velocidad, y en los carruseles del móvil la tarjeta centrada se ve plena y las de los bordes algo más pequeñas.
  - Uso: `data-reveal` en un elemento, `data-reveal-stagger` en una lista, `data-reveal="clip"` para la persiana y `parallax` en `ImagePlaceholder`.
  - CSS nativo ligado al scroll (`animation-timeline`), sin librerías. En navegadores sin soporte simplemente no hay parallax.
  - Si el sistema pide reducir el movimiento, solo quedan fundidos suaves.

Los colores y las fuentes son tokens de Tailwind definidos en `app/globals.css` (`bg-crema`, `text-vino`, `border-linea`…).

## Cómo cambiar el catálogo

Todo el contenido está en `/data`:

| Archivo | Contenido |
|---|---|
| `site.ts` | Dirección, horario, teléfono, correo, WhatsApp, envío gratis, valoración de Google, incentivo de la newsletter |
| `categories.ts` | Categorías: nombre, H1, textos SEO y filtros propios (p. ej. Denominación, Tipo de leche) |
| `products.ts` | Productos |
| `producers.ts` | Productores (`featured: true` para que salgan en el inicio) |
| `gifts.ts` | Cestas y regalos (con etiqueta opcional, p. ej. "Edición San Fermín") |
| `occasions.ts` | Regalos por ocasión (inicio, mega menú y menú móvil) |
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
  tags: ["DOP", "Favorito de la casa"], // etiquetas sobre la foto (máx. 2)
  pairsWith: ["vino-tinto-do-navarra"], // "Combina con" en la ficha
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

## Blog: panel para escribir entradas

La dueña de la tienda escribe las entradas desde **`/admin`** (p. ej. `www.tudominio.com/admin`) con **Sanity**, un editor visual que se abre desde la propia web y funciona en ordenador y en móvil. Puede poner título, categoría, foto principal, texto con subtítulos, citas y más fotos. Al pulsar **Publish** la entrada aparece en el blog y en la portada.

**Solo entra quien está invitado al proyecto.** `/admin` pide iniciar sesión con Google, GitHub o correo y contraseña, y únicamente acepta a los miembros del proyecto de Sanity. Cualquier otra persona ve la pantalla de acceso y no puede entrar. Además, `/admin` no aparece en Google.

### Puesta en marcha (una vez, unos 10 minutos)

1. Entra en **sanity.io** y crea una cuenta gratuita (el plan gratis sobra para un blog).
2. Crea un proyecto nuevo (**Create new project**), p. ej. "Estafeta Gourmet", con el dataset **production**. Copia el **Project ID**.
3. En Vercel → tu proyecto → **Settings → Environment Variables**, añade:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = el Project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
4. En **sanity.io/manage** → tu proyecto → **API → CORS origins**, añade la dirección de la web (p. ej. `https://www.tudominio.com`) marcando **Allow credentials**. Añade también `http://localhost:3000` si vas a probar en local.
5. En **Members**, invita a la dueña con su correo y rol **Editor** (o **Administrator** si también gestionará el proyecto). Nadie más necesita acceso.
6. Vuelve a publicar la web en Vercel. Ya puede entrar en `/admin`.

**Publicación al momento (recomendado).** Sin este paso, las entradas nuevas tardan hasta 5 minutos en aparecer.

1. Inventa una clave larga y añádela en Vercel como `SANITY_REVALIDATE_SECRET`.
2. En sanity.io/manage → **API → Webhooks → Create webhook**:
   - **URL:** `https://www.tudominio.com/api/revalidate`
   - **Dataset:** production
   - **Trigger on:** Create, Update y Delete
   - **Filter:** `_type == "post"`
   - **Projection:** `{_type, slug}`
   - **Secret:** la misma clave.

Mientras Sanity no esté configurado, el blog muestra las entradas de ejemplo de `data/posts.ts` y `/admin` explica qué falta.

## Newsletter y popup de bienvenida

Al entrar en la web aparece un popup del **Club Estafeta** que invita a dejar el correo para enterarse antes que nadie de lanzamientos, cestas de temporada y recetas:

- **Cuándo sale.** 5 segundos después de que la persona decida sobre las cookies, para no tapar un aviso con otro. No sale en la cesta ni en la búsqueda.
- **Cuántas veces.** Si lo cierra, no vuelve a salir en 30 días. Si se suscribe, no vuelve a salir.
- **En móvil** es una hoja inferior que no tapa toda la pantalla (Google penaliza los popups que ocultan el contenido al entrar).

Los correos se guardan en **Brevo** (brevo.com), un servicio europeo con plan gratuito. Desde Brevo se envían las campañas (lanzamientos, novedades) y los correos automáticos (bienvenida, recordatorios). El formulario de la portada usa el mismo sistema.

### Puesta en marcha

1. Crea una cuenta en **brevo.com**.
2. **Contactos → Listas → Crear lista**, p. ej. "Club Estafeta". Anota su número (ID).
3. **Contactos → Ajustes → Atributos de contacto**: crea el atributo de texto `ORIGEN` para saber si cada persona se apuntó desde el popup o la portada. Es opcional.
4. **Doble confirmación (recomendado):** en **Plantillas**, crea una plantilla de tipo "Double opt-in" ("Confirma tu suscripción"). Anota su ID. Así solo entran correos reales y la lista cumple mejor el RGPD.
5. **Ajustes → SMTP y API → Claves API → Generar**.
6. En Vercel añade `BREVO_API_KEY`, `BREVO_LIST_ID` y, si lo hiciste, `BREVO_DOI_TEMPLATE_ID`. Vuelve a publicar.
7. **Automatizaciones:** en Brevo → **Automations**, crea p. ej. "Bienvenida" (se envía al entrar en la lista) y los recordatorios que quieras.

**Si Brevo no está configurado, el popup no aparece en la web publicada**, para no pedir correos que no se guardarían. En local (`npm run dev`) sí aparece, para poder verlo, y los correos solo se escriben en la consola.

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
