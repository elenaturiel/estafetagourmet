import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

const { cost, freeShippingThreshold, maxWeightKg, freeShippingFrom, noDelivery, leadTime } = site.shipping;

/** Precio del envío (hasta `maxWeightKg`): gratis a partir del umbral. */
export function shippingCost(subtotal: number): number {
  return freeShippingThreshold !== null && subtotal >= freeShippingThreshold ? 0 : cost;
}

/** "5,95 € hasta 5 kg; gratis desde 70 €. Más de 5 kg: precio a consultar." */
export const shippingSummary = `${formatPrice(cost)} hasta ${maxWeightKg} kg; gratis desde ${freeShippingFrom} €. Más de ${maxWeightKg} kg: precio a consultar.`;

/** "Envío a toda la península en 24–48 h (no enviamos a Canarias ni Baleares)." */
export const shippingArea = `Envío a toda la península en ${leadTime} (no enviamos a ${noDelivery}).`;
