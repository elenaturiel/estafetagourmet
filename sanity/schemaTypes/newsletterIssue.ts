import { defineArrayMember, defineField, defineType } from "sanity";
import { newsletterFields } from "./newsletterFields";

/**
 * Boletín de la newsletter: un producto de Navarra contado con calma (origen,
 * cifras, secciones y consejo). Se publica en /newsletter y se puede enviar
 * también por correo desde el grupo «Correo a la newsletter».
 */
export const newsletterIssue = defineType({
  name: "newsletterIssue",
  title: "Boletín de la newsletter",
  type: "document",
  groups: [{ name: "correo", title: "Correo a la newsletter" }],
  fields: [
    defineField({ name: "title", title: "Título", description: "Corto: «Vinos D.O. Navarra», «Aceite de oliva»…", type: "string", validation: (r) => r.required().max(60) }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string", validation: (r) => r.required().max(110) }),
    defineField({
      name: "slug",
      title: "Dirección de la página",
      description: "Se genera a partir del título. Pulsa «Generate».",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "theme", title: "Tema", description: "La etiqueta de arriba: Vinos, Huerta, Quesos, Aceite…", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "number",
      title: "Número (opcional)",
      description: "Si lo dejas vacío, se numera solo por orden de fecha a continuación de los anteriores.",
      type: "number",
    }),
    defineField({ name: "publishedAt", title: "Fecha de publicación", type: "datetime", initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({
      name: "image",
      title: "Foto principal",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Descripción de la foto", type: "string", validation: (r) => r.required() })],
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", title: "Resumen", description: "Para la tarjeta del archivo y para Google (máx. 200 caracteres).", type: "text", rows: 3, validation: (r) => r.required().max(200) }),
    defineField({ name: "lead", title: "Introducción", description: "El primer párrafo, el que abre el boletín.", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "stats",
      title: "Cifras clave",
      description: "Hasta cuatro datos destacados, por ejemplo «10.200 ha» — «de viñedo».",
      type: "array",
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Cifra", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Qué es", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Secciones",
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título de la sección", type: "string", validation: (r) => r.required() }),
            defineField({ name: "paragraphs", title: "Párrafos", type: "array", of: [{ type: "text", rows: 4 }] }),
            defineField({ name: "list", title: "Lista (opcional)", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "tip", title: "Consejo Estafeta (opcional)", description: "Sale en un recuadro destacado.", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({ name: "shopTitle", title: "Título de «En nuestra tienda»", type: "string" }),
    defineField({
      name: "shopProducts",
      title: "Productos de la tienda que salen al final",
      description:
        "Escribe el título de cada producto TAL CUAL aparece en la tienda (mejor copiarlo). Salen con su foto y su precio.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "ctaLabel", title: "Texto del botón final", type: "string" }),
    defineField({ name: "ctaHref", title: "Enlace del botón final", description: "Por ejemplo /tienda/vinos", type: "string" }),
    ...newsletterFields,
  ],
  orderings: [{ title: "Más recientes", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "theme", media: "image" } },
});
