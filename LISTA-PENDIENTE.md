# Lo que falta en la web de Estafeta Gourmet

Lista completa para la tienda, en lenguaje llano. Los detalles técnicos (qué archivo tocar) están en `TODO.md`.
Marcado con 🔴 lo que impide vender o publicar, 🟠 lo importante, 🟢 lo que mejora la web.

> Hecho el 11-oct: chocolates en su categoría, maridaje en cada ficha, textos legales redactados, ortografía de títulos,
> párrafo de historia en la portada y envío de entradas/avisos por correo (falta configurar Sanity y Brevo; ver README).

## 1. Para poder vender 🔴
- [ ] **Pago.** "Finalizar pedido" está desactivado y pide llamar. Decidir pasarela (Shopify u otra) y activar tarjeta y Bizum.
- [ ] **Envío gratis:** importe mínimo (hoy sale `[importe]` en la barra superior, la cesta y las fichas).
- [ ] **Tarifas de envío:** por zona, islas, extranjero y productos refrigerados.
- [ ] **Textos legales** (aviso legal, privacidad, cookies, condiciones de venta, envíos y devoluciones): provisionales, revisar con un profesional.
- [ ] **Datos del titular:** razón social, NIF/CIF, registro y plazo de devolución.
- [ ] **Venta de alcohol:** cómo se comprueba la mayoría de edad.
- [ ] **Dirección web definitiva** (dominio) y dejar la rama de producción de Vercel en `main`.

## 2. Funcionamiento de la web 🟠
- [ ] **Blog:** ahora mismo está sustituido por la **Newsletter** (`/blog` redirige a `/newsletter`) y el panel de escritura de entradas (Sanity, `/admin`) no se está usando. Decidir: o se deja así y se quita el panel, o se recupera el blog (hay que acabar la configuración de Sanity: variables, aviso automático al publicar e invitar a la dueña).
- [ ] **Newsletter, parte de envío:** la web ya muestra el archivo con 8 boletines (`/newsletter`). Falta confirmar que el popup guarda el correo en Brevo, verificar el dominio como remitente, preparar el correo de confirmación y el de bienvenida, enviar cada boletín por correo y decidir el incentivo ("10 % en tu primer pedido"…).
- [ ] **Formulario de contacto:** hoy solo simula el envío. Conectarlo a estafetagourmet@gmail.com y probarlo.
- [ ] **Analítica:** elegir herramienta, dar de alta Google Search Console y enviar el mapa del sitio.

## 3. Catálogo 🟠
- [ ] **Confirmar precios calculados** de Chivite (Las Fincas, Legardeta, Moscatel), Monjardín (vinos y brut) y los 2 estuches de Inurrieta: se han puesto con precio de la lista × 1,13 (Chivite y Monjardín) o × 1,089 (Inurrieta). El estuche Orchidea Mediodía sale igual que el blanco Orchidea (7,88 €): revisar.
- [ ] **Precios que faltan** ("Precio a consultar"): los 12 lotes especiales (Amigos, Cumpleaños, Empresas, Navidad, Pareja y San Fermín; A y B) y los 2 lotes de Katealde.
- [ ] **Fotos de producto que faltan (12):** espárragos aliñados, espárragos a la brasa y piquillo en tiras de Navarrico; las 2 latas de pimiento artesano de La Catedral; los chocolates "sabor nº7" al "nº13" de Navarra en Dulce.
- [ ] **Fotos mejores:** las de lotes, maridajes y algunas de producto salen de PDF o miden ~800 px; si hay originales, cambiarlas.
- [ ] **Fotos en los menús:**
  - en el desplegable de **Lotes** las miniaturas son montajes con varios productos y a ese tamaño no se distinguen; mejor una foto clara por lote (la caja);
  - el **lote destacado** de los menús sale recortado;
  - las miniaturas de categoría miden ~150 px y se ven borrosas (sustituir por originales, mín. 600 px).
- [ ] **Fichas de producto:** localidad del productor (hoy `[Localidad]`). Peso, ingredientes y alérgenos ya salen del Excel (`python3 scripts/importar-fichas.py <excel>`); para unos 130 productos "No publicado": pedir la ficha técnica al proveedor. Los datos que no son del mismo formato se muestran como "información de referencia".
- [ ] **Descripciones:** son un borrador (datos del producto y de 6 productores). Revisar ingredientes, alérgenos y denominaciones; escribir las de los productores.
- [ ] **Portada:** elegir los favoritos y los más vendidos reales (hoy 4 de ejemplo) y los productores destacados.
- [ ] **Etiquetas** ("Favorito", DOP…) y "combina con" propio de cada producto.
- [ ] **Categorías vacías** (Conservas, Cremas, Salsas, Mermeladas, Chocolates, Espumosos…): rellenar o quitar.
- [ ] **Ortografía de proveedores** ("Monjardin" → "Monjardín") y títulos más cuidados (vienen en mayúsculas de la hoja).

## 4. Contenido: lo que cuenta la tienda 🟠
- [ ] **"Quiénes somos" en la portada:** el apartado existe pero con un texto genérico y fotos de relleno. Escribir la historia real de la tienda (quién la fundó, desde cuándo, por qué la calle Estafeta, cómo se elige cada producto) y poner fotos del local y del equipo.
- [ ] **Página "Nuestra historia"** completa (hoy el enlace va a Visítanos).
- [ ] **Maridajes** (`/maridajes`, ya hecha con 18 carteles):
  - revisar textos y fotos (salen del PDF y no son de máxima resolución);
  - añadir más maridajes y enlazar cada uno con sus productos concretos (hoy enlaza a categorías);
  - mostrar "combina con" en cada ficha de producto.
- [ ] **Newsletter:** seguir escribiendo boletines (hay 8: vinos D.O., aceite, patxarán, txistorra…) y ponerles calendario.
- [ ] **Reseñas reales de Google** (nombre y fecha) y la valoración. No se inventan.
- [ ] **Horario:** días de apertura y festivos.
- [ ] **Instagram:** comprobar que la URL de @estafetagourmet es correcta.

## 5. Imagen y marca 🟢
- [ ] Imagen para compartir en redes (Open Graph, 1200×630).
- [ ] Favicon con la marca.
- [ ] Fotos de portada, de la tienda, del equipo y la del popup de la newsletter.
- [ ] Retratos de productores (hoy salen sus logos).
- [ ] Traducción al inglés (hoy "EN" está desactivado).

## 6. Revisar lo que he creado yo 🟢
- [ ] **Ideas de regalo** (`/regalos`): a quién va cada lote y producto, y las 10 parejas de productos (elegidas por mí).
- [ ] **Menús:** desplegable de Lotes ("¿Buscando un regalo?") y de Tienda, y la animación de las tarjetas de lotes.
- [ ] **Lotes especiales:** nombres ("Lote Amigos · Opción A") y qué diferencia A de B.
