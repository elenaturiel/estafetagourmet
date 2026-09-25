/**
 * Conexión con Sanity (panel del blog en /admin).
 * Se configura con variables de entorno; ver README → "Blog: panel para escribir entradas".
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

/** Hay proyecto de Sanity configurado: el blog se lee de Sanity y /admin funciona. */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);
