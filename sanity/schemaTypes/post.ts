import { defineArrayMember, defineField, defineType } from "sanity";

/** Categorías del blog (se muestran como etiqueta sobre cada entrada). */
export const POST_CATEGORIES = ["Maridajes", "Temporada", "Productores", "Recetas", "Novedades"];

/** Entrada del blog, tal y como la ve la dueña en el panel /admin. */
export const post = defineType({
  name: "post",
  title: "Entrada del blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required().max(90).warning("Mejor un título corto: menos de 90 caracteres."),
    }),
    defineField({
      name: "slug",
      title: "Dirección de la página",
      description: "Se genera a partir del título. Pulsa «Generate».",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: { list: POST_CATEGORIES, layout: "radio" },
      initialValue: "Temporada",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Foto principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Descripción de la foto",
          description: "Qué se ve en la foto (para Google y para personas ciegas).",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Entradilla",
      description: "Una o dos frases que resumen la entrada. Sale en las tarjetas y en Google.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Texto",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Subtítulo", value: "h2" },
            { title: "Subtítulo pequeño", value: "h3" },
            { title: "Cita", value: "blockquote" },
          ],
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Descripción de la foto", type: "string" }),
            defineField({ name: "caption", title: "Pie de foto", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Más recientes",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
