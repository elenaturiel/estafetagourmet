# Lo que falta en la web de Estafeta Gourmet

Lista completa para la tienda, en lenguaje llano. Los detalles técnicos (qué archivo tocar) están en `TODO.md`.
Marcado con 🔴 lo que impide vender o publicar, 🟠 lo importante, 🟢 lo que mejora la web.

## 1. Para poder vender 🔴
- [ ] **Pago.** "Finalizar pedido" está desactivado y pide llamar. Decidir pasarela (Shopify u otra) y activar tarjeta y Bizum.
- [ ] **Envío gratis:** importe mínimo (hoy sale `[importe]` en la barra superior, la cesta y las fichas).
- [ ] **Tarifas de envío:** por zona, islas, extranjero y productos refrigerados.
- [ ] **Textos legales** (aviso legal, privacidad, cookies, condiciones de venta, envíos y devoluciones): provisionales, revisar con un profesional.
- [ ] **Datos del titular:** razón social, NIF/CIF, registro y plazo de devolución.
- [ ] **Venta de alcohol:** cómo se comprueba la mayoría de edad.
- [ ] **Dirección web definitiva** (dominio) y dejar la rama de producción de Vercel en `main`.

## 2. Funcionamiento de la web 🟠
- [ ] **Blog (aún no funciona):** comprobar que la entrada de prueba sale en `/blog` (variable `SANITY_REVALIDATE_SECRET` en Vercel + Redeploy + aviso automático en Sanity), invitar a la dueña como Editora y borrar las 3 entradas de ejemplo.
- [ ] **Newsletter:** confirmar que el popup guarda el correo en Brevo, verificar el dominio como remitente, preparar el correo de confirmación y el de bienvenida, y decidir el incentivo ("10 % en tu primer pedido"…).
- [ ] **Formulario de contacto:** hoy solo simula el envío. Conectarlo a estafetagourmet@gmail.com y probarlo.
- [ ] **Analítica:** elegir herramienta, dar de alta Google Search Console y enviar el mapa del sitio.

## 3. Catálogo 🟠
- [ ] **Precios que faltan** ("Precio a consultar"): 8 vinos de Chivite, 7 de Monjardín, 2 estuches de Inurrieta, los 12 lotes especiales (Amigos, Cumpleaños, Empresas, Navidad, Pareja, San Fermín; A y B) y los 2 lotes de Katealde.
- [ ] **Lotes de Navarrico:** confirmar qué caja es de cada lote (Gourmet y Capricho comparten foto) y qué llevan los 2 lotes de Katealde.
- [ ] **Fotos de producto que faltan (19):** los 13 chocolates "sabor nº" y el 85 % de Navarra en Dulce, 2 latas de La Catedral, espárragos aliñados y a la brasa y piquillos en tiras de Navarrico, entre otros.
- [ ] **Fotos mejores:** las de lotes, maridajes y algunas de producto salen de PDF o miden ~800 px; si hay originales, cambiarlas.
- [ ] **Fotos de las categorías:** "Atún y bonito" y "Setas y hongos" usan ahora la foto de un producto en el menú; falta la foto de estilo como el resto. Las demás miden ~150 px: sustituir por originales (mín. 600 px).
- [ ] **Fichas de producto:** formato (peso o volumen) y localidad del productor, hoy `[peso o volumen]` y `[Localidad]`.
- [ ] **Descripciones:** son un borrador (datos del producto y de 6 productores). Revisar ingredientes, alérgenos y denominaciones; escribir las de los productores.
- [ ] **Portada:** elegir los favoritos y los más vendidos reales (hoy 4 de ejemplo) y los productores destacados.
- [ ] **Etiquetas** ("Favorito", DOP…) y "combina con" propio de cada producto.
- [ ] **7 categorías vacías** (Conservas, Verduras, Cremas, Salsas, Mermeladas, Chocolates, Espumosos): rellenar o quitar.
- [ ] **Ortografía de proveedores** ("Monjardin" → "Monjardín") y títulos más cuidados (vienen en mayúsculas de la hoja).

## 4. Contenido: lo que cuenta la tienda 🟠
- [ ] **En la portada, un apartado "Quiénes somos" con la historia de la tienda** (quién la fundó, desde cuándo, por qué la calle Estafeta, cómo se elige cada producto), con foto del local y del equipo.
- [ ] **Página "Nuestra historia"** completa (hoy el enlace va a Visítanos).
- [ ] **Maridajes** (`/maridajes`, ya creada con 18 carteles):
  - revisar textos y fotos (salen del PDF y no son de máxima resolución);
  - añadir más maridajes y enlazar cada uno con sus productos concretos (hoy enlaza a las categorías);
  - mostrar "combina con" en cada ficha de producto.
- [ ] **Blog:** publicar las primeras entradas reales (temporada, maridajes, productores, recetas).
- [ ] **Reseñas reales de Google** (nombre y fecha) y la valoración. No se inventan.
- [ ] **Horario:** días de apertura y festivos.
- [ ] **Instagram:** comprobar que la URL de @estafetagourmet es correcta.

## 5. Imagen y marca 🟢
- [ ] Imagen para compartir en redes (Open Graph, 1200×630).
- [ ] Favicon con la marca.
- [ ] Fotos de portada, de la tienda, del equipo, del blog y la del popup de la newsletter.
- [ ] Retratos de productores (hoy salen sus logos).
- [ ] Traducción al inglés (hoy "EN" está desactivado).

## 6. Revisar lo que he creado yo 🟢
- [ ] **Ideas de regalo** (`/regalos`): a quién va cada lote y producto, y las 10 parejas de productos (elegidas por mí).
- [ ] **Menús:** desplegable de Lotes ("¿Buscando un regalo?") y de Tienda, y la animación de las tarjetas de lotes.
- [ ] **Lotes especiales:** nombres ("Lote Amigos · Opción A") y qué diferencia A de B.
