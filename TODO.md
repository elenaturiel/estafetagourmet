# Pendiente de rellenar

Todo lo que aparece en la web entre `[corchetes]` es un dato que falta. Esta es la lista completa y dónde se cambia cada cosa.

## Datos de la tienda (`data/site.ts`)

- [ ] **Dirección web definitiva.** Variable `NEXT_PUBLIC_SITE_URL`; ver README → "Dirección web". Hasta entonces el pie muestra `[dirección web]`.
- [ ] **Importe para envío gratis** (`shipping.freeShippingFrom`). Aparece en la barra superior, la cesta y la página de envíos. Escribe también el número en `shipping.freeShippingThreshold`: activa la barra "Te faltan X € para el envío gratis" del cajón de la cesta.
- [ ] **Días de apertura y festivos** (`hours.daysLabel`).
- [ ] **Horario estructurado para Google** (`hours.structured`). Rellénalo cuando se confirmen los días; mientras esté vacío no se publica el horario en los datos estructurados.
- [ ] **Correo de contacto** (`email`).
- [ ] **WhatsApp.** Confirmar que es el mismo número que el teléfono (`whatsappHref`).
- [ ] **Valoración y número de reseñas en Google** (`googleRating`).
- [ ] **Incentivo de la newsletter** (`newsletterIncentive`), p. ej. un descuento en el primer pedido.
- [ ] **Instagram.** Comprobar que la URL de @estafetagourmet es correcta.

## Catálogo (`data/`)

- [ ] **Precios que faltan en la hoja** (hoy salen como "Precio a consultar"): los 8 de **Chivite**, los 7 de **Monjardin** y 2 estuches de **Inurrieta** (tienen 0,00 €). Rellénalos en la hoja y vuelve a importar (ver README). Precios de las cestas en `gifts.ts`.
- [ ] **Títulos de los productos:** se muestran tal cual están en la hoja (formato de ticket: muchos en MAYÚSCULAS y con abreviaturas como LVN, LC o PCIRSUS). Si quieres títulos más cuidados para la web, se pueden mejorar en la hoja o con una limpieza automática.
- [ ] **Elegir los destacados de la portada** (`FEATURED` en `data/products.ts`): ahora son 4 productos de ejemplo. Y los productores de la portada (`FEATURED` en `data/producers.ts`).
- [ ] **Localidad de cada productor** (`LOCALITY` en `data/producers.ts`) y su foto.
- [ ] **Comprobar la ortografía de los proveedores**: p. ej. "Monjardin" probablemente es "Monjardín".
- [ ] **Fotos de las categorías nuevas:** "Atún y bonito" y "Setas y hongos" no tienen foto todavía (`public/images/categorias/atun-y-bonito.webp` y `setas-y-hongos.webp`, y enlazarlas en `data/categories.ts`).
- [ ] **Categorías sin productos** (Conservas, Verduras, Cremas, Salsas, Mermeladas, Chocolates, Espumosos): muestran "muy pronto". Decidir si se quedan, se rellenan o se quitan de `data/categories.ts`. Ojo: los 3 vinos "BRUT" de Monjardin están en Vinos porque así vienen en la hoja.
- [ ] **Filtros por atributo** (denominación, tipo de vino, tipo de leche…): no hay datos en la hoja. Si se añaden columnas, se pueden crear.
- [ ] **Descripciones** de producto (hoy son marcadores).
- [ ] **Ficha de producto:** formato (peso o volumen) y el texto "Conservación y maridaje" (hoy marcadores en `app/tienda/[categoria]/[producto]/page.tsx`; conviene pasarlos a `data/products.ts`).
- [ ] **Etiquetas y maridajes** de cada producto (`tags` y `pairsWith` en `products.ts`). Las etiquetas actuales ("Favorito de la casa", "DOP"…) son un punto de partida.
- [ ] **Regalos por ocasión** (`data/occasions.ts`): textos, fotos y a qué cesta lleva cada ocasión.
- [ ] **Revisar los nombres de ejemplo** de productos y cestas (son ilustrativos) y completar el catálogo real.
- [ ] **Productores:** nombre, localidad y retrato (`producers.ts`). Asignar cada producto a su productor real.
- [ ] **Contenido de las cestas** (`gifts.ts → description`) y cantidad mínima del regalo de empresa.
- [ ] **Fotos de categorías en alta resolución:** las actuales (`public/images/categorias/`) salen de una captura de pantalla y miden unos 150 px; se ven bien en tamaño pequeño, pero conviene sustituirlas por los originales (mín. 600×600 px) con el mismo nombre de archivo.
- [ ] **Textos de las categorías nuevas** (`data/categories.ts`): presentación y SEO son genéricos; revisarlos.
- [ ] **Fotos:** portada, productos, cestas, productores, tienda y blog. Van en `public/images/` y se enlazan con `image.src`.

## Contenido

- [ ] **Reseñas reales de Google** (`data/reviews.ts`), copiadas con nombre y fecha. No inventarlas.
- [ ] **Artículos del blog:** se escriben desde `/admin` cuando Sanity esté configurado. Las entradas de `data/posts.ts` son solo de ejemplo y dejan de mostrarse en cuanto Sanity está conectado.
- [ ] **Página "Nuestra historia".** Hoy "Conoce nuestra historia" enlaza a `/visitanos`.
- [ ] **Imagen para compartir en redes (Open Graph).** Añadir `app/opengraph-image.jpg` (1200×630).
- [ ] **Favicon** con la marca (`app/favicon.ico` e `app/icon.png`).
- [ ] **Mapa:** sustituir el marcador por una imagen estática del mapa (`VisitSection`).
- [ ] **Traducción al inglés** (`lib/i18n/en.ts`); ver README → "Idiomas".

## Legal: revisar con un profesional

- [ ] **Datos del titular** (`data/legal.ts`): razón social, NIF/CIF, registro y plazo de devolución.
- [ ] **Textos provisionales** de `/aviso-legal`, `/privacidad`, `/cookies`, `/condiciones-de-venta` y `/envios-y-devoluciones`. Cada página lo indica con un aviso **TODO**; quita ese aviso de `components/ui/LegalPage.tsx` cuando estén revisados.
- [ ] **Venta de alcohol:** cómo se verifica la mayoría de edad.
- [ ] **Envíos** a islas y extranjero, tarifas y productos refrigerados.

## Funcionalidad

- [ ] **Pago.** Conectar Shopify y el checkout; ver README → "Conectar Shopify". Hoy "Finalizar pedido" está desactivado e invita a llamar.
- [ ] **Formulario de contacto.** Hoy solo simula el envío (`lib/forms.ts → submitContact`). Conectarlo a un servicio de correo.
- [ ] **Newsletter y popup:** crear la cuenta de Brevo y añadir las variables. Ver README → "Newsletter y popup de bienvenida". Hasta entonces el popup no aparece en la web publicada.
- [ ] **Panel del blog:** crear el proyecto de Sanity, añadir las variables e invitar a la dueña. Ver README → "Blog: panel para escribir entradas".
- [ ] **Foto del popup** de la newsletter (`components/newsletter/NewsletterPopup.tsx`).
- [ ] **Analítica.** Elegir la herramienta y cargarla en `Analytics` (`components/layout/CookieBanner.tsx`), solo con consentimiento. Actualizar `/cookies` con las cookies reales.
