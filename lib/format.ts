const euro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

/** "12,50 €" o el marcador "[precio] €" si el precio no está definido. */
export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return "[precio] €";
  return euro.format(price);
}
