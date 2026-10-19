import { site } from "./site";

/**
 * Datos del titular de la web para las páginas legales.
 * Si se vacía el nombre o el NIF (o se vuelve a poner un marcador entre
 * corchetes), las páginas legales muestran el aviso de "texto provisional".
 */
export const legalEntity = {
  name: "Cristina Lopez de Murillas",
  taxId: "44612030B",
  address: "Calle Estafeta, 70 · 31001 Pamplona / Iruña (Navarra)",
  /** Empresaria individual: no inscrita en el Registro Mercantil. */
  registry: "",
  email: site.email,
  /** Plazo legal de desistimiento en compras a distancia. */
  returnDays: "14 días naturales",
  /** Última revisión de los textos legales. */
  updated: "octubre de 2026",
};

/** Mientras falte algún dato del titular, las páginas legales muestran el aviso de texto provisional. */
export const legalIsComplete = !/^\[.*\]$/.test(legalEntity.name) && !/^\[.*\]$/.test(legalEntity.taxId);
