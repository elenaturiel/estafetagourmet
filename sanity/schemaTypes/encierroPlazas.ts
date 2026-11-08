import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Plazas libres del balcón para ver el encierro, día a día (/el-encierro).
 * Se cambia más cómodo desde el panel /admin/encierro.
 */
export const encierroPlazas = defineType({
  name: "encierroPlazas",
  title: "Plazas del encierro",
  type: "document",
  fields: [
    defineField({ name: "year", title: "Año", type: "number", validation: (r) => r.required().integer() }),
    defineField({
      name: "days",
      title: "Días",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "dia",
          fields: [
            defineField({ name: "day", title: "Día de julio", type: "number", validation: (r) => r.required().integer().min(1).max(31) }),
            defineField({ name: "seats", title: "Plazas libres", type: "number", validation: (r) => r.required().integer().min(0) }),
          ],
          preview: { select: { day: "day", seats: "seats" }, prepare: ({ day, seats }) => ({ title: `${day} de julio`, subtitle: `${seats} plazas` }) },
        }),
      ],
    }),
  ],
  preview: { select: { year: "year" }, prepare: ({ year }) => ({ title: `Plazas del encierro ${year ?? ""}` }) },
});
