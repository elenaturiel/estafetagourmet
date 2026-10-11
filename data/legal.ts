import { site } from "./site";

/**
 * Datos del titular de la web para las páginas legales.
 * Faltan los que solo conoce la tienda (razón social, NIF/CIF y, si aplica,
 * el registro): al rellenarlos desaparece el aviso de "texto provisional".
 */
export const legalEntity = {
  name: "[Razón social o nombre del titular]",
  taxId: "[NIF/CIF]",
  address: "Calle Estafeta, 70 · 31001 Pamplona / Iruña (Navarra)",
  registry: "[Datos del Registro Mercantil, si aplica]",
  email: site.email,
  /** Plazo legal de desistimiento en compras a distancia. */
  returnDays: "14 días naturales",
  /** Última revisión de los textos legales. */
  updated: "octubre de 2026",
};

/** Mientras falte algún dato del titular, las páginas legales muestran el aviso de texto provisional. */
export const legalIsComplete = !/^\[.*\]$/.test(legalEntity.name) && !/^\[.*\]$/.test(legalEntity.taxId);
