/**
 * Balcón para ver el encierro (/el-encierro).
 *
 * Cada año: cambia `year` y, al guardar las plazas en el panel (/admin/encierro),
 * se crea la temporada nueva empezando con `defaultSeats` plazas cada día.
 */
export const ENCIERRO = {
  year: 2027,
  /** Días de encierro de julio (San Fermín). */
  days: [7, 8, 9, 10, 11, 12, 13, 14],
  /** Plazas de cada día mientras no se cambien en el panel. */
  defaultSeats: 8,
} as const;

/** Plazas libres por día de julio: { 7: 8, 8: 5, … }. */
export type EncierroSeats = Record<number, number>;

/** Documento de Sanity con las plazas de la temporada. */
export const encierroDocId = (year: number = ENCIERRO.year) => `encierro-plazas-${year}`;

export function defaultEncierroSeats(): EncierroSeats {
  return Object.fromEntries(ENCIERRO.days.map((d) => [d, ENCIERRO.defaultSeats]));
}

/** Combina lo guardado en Sanity con los valores por defecto (un día sin guardar tiene todas las plazas). */
export function mergeEncierroSeats(rows: { day?: number; seats?: number }[] | null | undefined): EncierroSeats {
  const seats = defaultEncierroSeats();
  for (const r of rows ?? []) {
    if (typeof r.day === "number" && r.day in seats && typeof r.seats === "number") seats[r.day] = Math.max(0, Math.floor(r.seats));
  }
  return seats;
}
