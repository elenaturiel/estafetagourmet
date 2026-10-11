import { defineField } from "sanity";

/**
 * Campos para mandar una entrada o un aviso por correo a los suscriptores
 * de la newsletter. Se rellenan al escribir y el correo sale al PUBLICAR
 * (ver app/api/newsletter/send y README → "Enviar entradas y avisos por correo").
 */
export const newsletterFields = [
  defineField({
    name: "newsletter",
    title: "Enviar por correo a la newsletter",
    description:
      "«No enviar» es lo normal. «Enviar una prueba» manda el correo solo a la dirección de prueba de abajo. «Enviar a todos» lo manda a toda la lista UNA vez, al publicar.",
    type: "string",
    options: {
      list: [
        { title: "No enviar", value: "none" },
        { title: "Enviar una prueba", value: "test" },
        { title: "Enviar a todos", value: "all" },
      ],
      layout: "radio",
    },
    initialValue: "none",
    group: "correo",
  }),
  defineField({
    name: "testEmail",
    title: "Correo para la prueba",
    description: "A esta dirección llega el correo si eliges «Enviar una prueba».",
    type: "string",
    group: "correo",
    hidden: ({ document }) => document?.newsletter !== "test",
  }),
  defineField({
    name: "newsletterSentAt",
    title: "Enviado a la newsletter el",
    description: "Lo rellena la web cuando el correo sale. Si ya tiene fecha, no se vuelve a enviar.",
    type: "datetime",
    readOnly: true,
    group: "correo",
  }),
];
