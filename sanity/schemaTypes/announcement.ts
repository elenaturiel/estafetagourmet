import { defineArrayMember, defineField, defineType } from "sanity";
import { newsletterFields } from "./newsletterFields";

/**
 * Aviso por correo: para los mensajes importantes que no son una entrada del
 * blog (apertura de la tienda, lanzamiento, horario de fiestas, lote nuevo…).
 * No se publica en la web: solo sirve para escribir y enviar el correo.
 */
export const announcement = defineType({
  name: "announcement",
  title: "Aviso por correo",
  type: "document",
  groups: [{ name: "correo", title: "Envío" }],
  fields: [
    defineField({
      name: "title",
      title: "Asunto del correo",
      description: "Es lo que se ve en la bandeja de entrada y el título dentro del correo.",
      type: "string",
      validation: (r) => r.required().max(90),
    }),
    defineField({
      name: "preheader",
      title: "Resumen corto",
      description: "La frase gris que aparece junto al asunto en la bandeja de entrada.",
      type: "string",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "image",
      title: "Foto (opcional)",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Descripción de la foto", type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Texto",
      type: "array",
      validation: (r) => r.required(),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Subtítulo", value: "h2" },
          ],
          lists: [{ title: "Lista", value: "bullet" }],
        }),
      ],
    }),
    defineField({ name: "ctaLabel", title: "Texto del botón (opcional)", type: "string" }),
    defineField({
      name: "ctaHref",
      title: "Enlace del botón (opcional)",
      description: "Por ejemplo https://tu-web/tienda/lotes",
      type: "url",
      validation: (r) => r.uri({ scheme: ["https", "http"] }),
    }),
    ...newsletterFields,
  ],
  preview: { select: { title: "title", subtitle: "newsletter", media: "image" } },
});
