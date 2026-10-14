/**
 * Ingredientes, alérgenos y otros datos de la ficha técnica en inglés y francés,
 * por dirección (slug) del producto. Los campos que falten se muestran en español.
 */
export type SpecText = { i?: string; a?: string; w?: string; ref?: string; p?: string; o?: string };
export const PRODUCT_SPECS: Record<string, [en: SpecText, fr: SpecText]> = {};
