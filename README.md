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

### Productos y precios: se cargan desde la hoja de cálculo

Los 333 productos salen de la hoja de productos (.ods) con las columnas **FAMILIA · SUBFAMILIA · ARTICULO · PVP final**:

- **Familia** → categoría de la tienda (Quesos, Vinos, Espárragos…).
- **Subfamilia** → productor / proveedor (Inurrieta, La Catedral, Anko…). Es lo que usa el filtro **Productor**: marcando uno salen todos sus productos juntos, y se pueden marcar varios a la vez.
- **Artículo** → título del producto, tal cual está en la hoja (solo se limpian los guiones bajos y los guiones que unen palabras).
- **PVP final** → precio con IVA. Vacío o 0 muestra **"Precio a consultar"** y, en vez de "Añadir", un botón "Consultar" que lleva al formulario de contacto.

Para actualizar precios o añadir productos, cambia la hoja y vuelve a importarla (necesita Python 3, que ya trae Mac y Linux):

```bash
python3 scripts/importar-productos.py ruta/a/productos.ods
```

Eso reescribe `data/products.generated.ts` (**no lo edites a mano**). Si la hoja trae una familia nueva, el script se detiene y te dice cuál: añádela en `FAMILIAS` (arriba del script) y créala en `data/categories.ts`.

### Lo demás está en `/data`

| Archivo | Contenido |
|---|---|
| `products.generated.ts` | Productos y proveedores, **generado** desde la hoja (ver arriba) |
| `products.ts` | Extras de los productos que no están en la hoja: **destacados** de la portada (`FEATURED`), **etiquetas** (`TAGS`) y **maridajes** "Combina con" (`PAIRS_WITH`) |
| `producers.ts` | Localidad (`LOCALITY`) y cuáles salen en la portada (`FEATURED`). Los nombres vienen de la hoja |
| `category-groups.ts` | Cómo se agrupan las categorías en los menús: **Comida** (con subgrupos: Quesos y embutidos, Conservas y verduras, Despensa, Dulces), **Bebida** y **Lotes**. Para mover una categoría de sitio, cambia su slug de lugar. Una categoría que no esté aquí se añade sola al final de Comida |
| `categories.ts` | Categorías (24): nombre, H1, foto, textos SEO y, si se quiere, filtros por atributos. Las fotos están en `public/images/categorias/<slug>.webp`. Las que no tienen productos muestran "muy pronto". `href` hace que una categoría enlace a otra página |
| `site.ts` | Dirección, horario, teléfono, correo, WhatsApp (y su mensaje), enlaces de Google Maps, envío gratis, valoración de Google, incentivo de la newsletter |
| `posts.ts` | Entradas del blog de ejemplo (el real se escribe en `/admin`) |
| `reviews.ts` | Reseñas de Google (solo reales) |
| `legal.ts` | Datos del titular para las páginas legales |
| `navigation.ts` | Menús de cabecera y pie |

### Filtros de la tienda

- **Tienda completa (`/tienda`)**: filtros por **Categoría**, **Productor** y **Precio**, con el número de productos de cada opción y orden "Agrupar por productor". Carga 24 productos y el resto con "Ver más productos".
- **Cada categoría**: filtros por **Productor** y **Precio**.
- **Enlaces directos**: `/tienda?productor=inurrieta` muestra todos los de un productor; `?productor=anko,la-catedral` varios; `?categoria=vinos` una categoría. Desde `/productores`, cada tarjeta enlaza así.
- Dentro de un mismo filtro las opciones se suman (Inurrieta **o** Pago de Cirsus); entre filtros distintos se cruzan (Vinos **y** Chivite).

### Navegación por categorías

- **Tienda (`/tienda`):** el desplegable **"Categoría"** (sin fotos, por Comida / Bebida / Lotes y sus subgrupos, con el nº de productos) queda **fijo bajo la cabecera** al bajar, y los **productos salen directamente**, con filtros por categoría, productor y precio. En móvil el desplegable no es fijo y se abre como una hoja desde abajo.
- **Cada categoría:** el mismo desplegable bajo el título, con la categoría actual marcada. Los títulos de subgrupo (Quesos y embutidos, Dulces…) van en vino.
- **Con fotos:** el menú que sale al pasar por "Tienda" y la sección "Compra por categoría" de la portada muestran las 24 categorías con su foto.

### Lotes, WhatsApp y mapa

- **Lotes.** No hay cestas por ahora. "Lotes" es una categoría más (familia LOTES de la hoja): tiene su entrada en el menú, su banda en la portada con sus productos y su página en `/tienda/lotes`. La dirección antigua `/regalos` redirige ahí.
- **Botón de WhatsApp.** Flotante abajo a la derecha en toda la web (`components/layout/WhatsAppButton.tsx`). Al pasar el ratón se despliega con el texto; en una ficha de producto el mensaje ya lleva el nombre del producto. El número y el mensaje inicial están en `data/site.ts` (`whatsappHref`, `whatsappMessage`).
- **Mapa.** Google Maps interactivo en "Visítanos" (`components/home/GoogleMap.tsx`), sin clave de API. Como Google instala cookies, el mapa se carga cuando la persona pulsa "Ver mapa interactivo" y se recuerda su elección; mientras tanto se ve un plano con la dirección y un enlace directo a Google Maps. El botón "Cómo llegar" abre la ruta.

### Fotos y marcadores

- **Fotos.** Ponlas en `public/images/…` e indica la ruta en `image.src`. `ImagePlaceholder` usa `next/image` con el mismo tamaño y recorte, así que el diseño no cambia. Mientras no haya `src`, se muestra el bloque de color con la etiqueta `placeholder`.
- **Marcadores.** Cualquier texto entre corchetes (`[Localidad]`, `[Descripción del producto…]`…) se muestra tal cual en la web para que se vea que falta. Consulta [TODO.md](./TODO.md).

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

- **Cuándo sale.** Nada más entrar en la web (en menos de un segundo). No sale en la cesta ni en la búsqueda. La barra de cookies sigue visible y usable abajo, con el popup justo encima.
- **Cuántas veces.** Si lo cierra, no vuelve a salir en 30 días. Si se suscribe, no vuelve a salir.
- **En móvil** sale como una hoja desde abajo. Ojo: Google puede posicionar algo peor en móvil las páginas cuyo popup tapa el contenido nada más entrar. Si lo notas, sube `DELAY_MS` en `components/newsletter/NewsletterPopup.tsx`.

Los correos se guardan en **Brevo** (brevo.com), un servicio europeo con plan gratuito. Desde Brevo se envían las campañas (lanzamientos, novedades) y los correos automáticos (bienvenida, recordatorios). El formulario de la portada usa el mismo sistema.

### Puesta en marcha

1. Crea una cuenta en **brevo.com**.
2. **Contactos → Listas → Crear lista**, p. ej. "Club Estafeta". Anota su número (ID).
3. **Contactos → Ajustes → Atributos de contacto**: crea el atributo de texto `ORIGEN` para saber si cada persona se apuntó desde el popup o la portada. Es opcional.
4. **Doble confirmación (recomendado):** en **Plantillas**, crea una plantilla de tipo "Double opt-in" ("Confirma tu suscripción"). Anota su ID. Así solo entran correos reales y la lista cumple mejor el RGPD.
5. **Ajustes → SMTP y API → Claves API → Generar**.
6. En Vercel añade `BREVO_API_KEY`, `BREVO_LIST_ID` y, si lo hiciste, `BREVO_DOI_TEMPLATE_ID`. Vuelve a publicar.
7. **Automatizaciones:** en Brevo → **Automations**, crea p. ej. "Bienvenida" (se envía al entrar en la lista) y los recordatorios que quieras.

**Si al apuntarse sale "No hemos podido apuntarte (código: …)"**, el código indica qué ajustar:

| Código | Qué hacer |
|---|---|
| `clave_api_incorrecta` | La clave no es válida. Genera una **clave API** (empieza por `xkeysib-`, no `xsmtpsib-`) y pégala sin espacios en `BREVO_API_KEY` |
| `ip_no_autorizada` | Brevo → Seguridad → IP autorizadas → desactiva el bloqueo |
| `cuenta_sin_permiso` | La cuenta de Brevo aún no está validada, o la clave no tiene permiso para contactos |
| `lista_no_encontrada` | Revisa el número de lista en `BREVO_LIST_ID` |
| `plantilla_doi_no_valida` | La plantilla de `BREVO_DOI_TEMPLATE_ID` no está activa o no tiene el enlace `{{ doubleoptin }}` |

Después de cambiar una variable en Vercel hay que volver a publicar (Redeploy). El detalle completo del error aparece en Vercel → el proyecto → **Logs**.

**Para probarlo**, añade `?popup=1` a la dirección (p. ej. `tuweb.com/?popup=1`): se abre siempre, aunque ya lo hayas cerrado antes.

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
