# Pendiente de rellenar

Todo lo que aparece en la web entre `[corchetes]` es un dato que falta. Esta es la lista completa y dónde se cambia cada cosa.

## Datos de la tienda (`data/site.ts`)

- [ ] **Dirección web definitiva.** Variable `NEXT_PUBLIC_SITE_URL`; ver README → "Dirección web". Hasta entonces el pie muestra `[dirección web]`.
- [ ] **Importe para envío gratis** (`shipping.freeShippingFrom`). Aparece en la barra superior, la cesta y la página de envíos.
- [ ] **Días de apertura y festivos** (`hours.daysLabel`).
- [ ] **Horario estructurado para Google** (`hours.structured`). Rellénalo cuando se confirmen los días; mientras esté vacío no se publica el horario en los datos estructurados.
- [ ] **Correo de contacto** (`email`).
- [ ] **WhatsApp.** Confirmar que es el mismo número que el teléfono (`whatsappHref`).
- [ ] **Valoración y número de reseñas en Google** (`googleRating`).
- [ ] **Incentivo de la newsletter** (`newsletterIncentive`), p. ej. un descuento en el primer pedido.
- [ ] **Instagram.** Comprobar que la URL de @estafetagourmet es correcta.

## Catálogo (`data/`)

- [ ] **Precios** de todos los productos (`products.ts → price`) y de las cestas (`gifts.ts`).
- [ ] **Descripciones** de producto (hoy son marcadores).
- [ ] **Revisar los nombres de ejemplo** de productos y cestas (son ilustrativos) y completar el catálogo real.
- [ ] **Productores:** nombre, localidad y retrato (`producers.ts`). Asignar cada producto a su productor real.
- [ ] **Contenido de las cestas** (`gifts.ts → description`) y cantidad mínima del regalo de empresa.
- [ ] **Filtros de cada categoría** (`categories.ts → filters`) y sus valores en cada producto (`attributes`).
- [ ] **Fotos:** portada, categorías, productos, cestas, productores, tienda y blog. Van en `public/images/` y se enlazan con `image.src`.

## Contenido

- [ ] **Reseñas reales de Google** (`data/reviews.ts`), copiadas con nombre y fecha. No inventarlas.
- [ ] **Artículos del blog** (`data/posts.ts`): textos, fechas, el nombre del "productor del mes" y las páginas individuales `/blog/[slug]`.
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
- [ ] **Newsletter.** Hoy solo simula la suscripción (`lib/forms.ts → submitNewsletter`). Conectarla a Shopify, Mailchimp, Brevo…
- [ ] **Analítica.** Elegir la herramienta y cargarla en `Analytics` (`components/layout/CookieBanner.tsx`), solo con consentimiento. Actualizar `/cookies` con las cookies reales.
