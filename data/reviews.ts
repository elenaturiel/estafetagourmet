import type { Review } from "@/lib/types";

/**
 * Reseñas de clientes. Sustituye los marcadores por reseñas REALES copiadas
 * de Google (con permiso), nunca inventadas. La valoración media y el número
 * de reseñas están en data/site.ts → googleRating.
 */
export const reviews: Review[] = [
  { id: "r1", text: "[Reseña real de un cliente, copiada de Google]", author: "[Nombre]", date: "[fecha]" },
  { id: "r2", text: "[Reseña real de un cliente, copiada de Google]", author: "[Nombre]", date: "[fecha]" },
  { id: "r3", text: "[Reseña real de un cliente, copiada de Google]", author: "[Nombre]", date: "[fecha]" },
];
