import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { fmt, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

const { cost, freeShippingThreshold, maxWeightKg, freeShippingFrom, leadTime } = site.shipping;

/** Precio del envío (hasta `maxWeightKg`): gratis si la compra supera el umbral. */
export function shippingCost(subtotal: number): number {
  return freeShippingThreshold !== null && subtotal > freeShippingThreshold ? 0 : cost;
}

type Msgs = Pick<Dictionary["cart"], "shippingSummary" | "shippingArea">;

/** "5,95 € hasta 5 kg; gratis en compras de más de 70 €. Más de 5 kg: precio a consultar." */
export function shippingSummary(t: Msgs, locale: Locale): string {
  return fmt(t.shippingSummary, { cost: formatPrice(cost, locale), kg: maxWeightKg, from: freeShippingFrom });
}

/** "Envío a toda la península en 24–48 h (no enviamos a Canarias ni Baleares)." */
export function shippingArea(t: Msgs, noDelivery: string): string {
  return fmt(t.shippingArea, { lead: leadTime, noDelivery });
}
