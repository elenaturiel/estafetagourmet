type Shape<T> = { [K in keyof T]: T[K] extends string ? string : Shape<T[K]> };

/** Los textos de una zona de la web en los tres idiomas. En y fr deben tener las mismas claves que es. */
export function defineMessages<T>(m: { es: T; en: Shape<T>; fr: Shape<T> }) {
  return m as unknown as { es: T; en: T; fr: T };
}
