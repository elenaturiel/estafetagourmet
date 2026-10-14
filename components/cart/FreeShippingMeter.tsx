"use client";

import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useT } from "@/lib/i18n/client";

/**
 * Barra "Te faltan X € para el envío gratis". Mientras el umbral no esté
 * definido en data/site.ts muestra solo el mensaje con el marcador.
 */
export function FreeShippingMeter({ subtotal }: { subtotal: number | null }) {
  const t = useT().cart;
  const locale = useLocale();
  const threshold = site.shipping.freeShippingThreshold;
  if (threshold === null || subtotal === null) {
    return (
      <p className="text-[14px]">
        <span className="font-semibold">{t.freeShippingLabel}</span>{" "}
        {fmt(t.freeShippingFrom, { from: site.shipping.freeShippingFrom, lead: site.shipping.leadTime })}
      </p>
    );
  }
  const left = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
  const [before, after] = fmt(t.missing, { amount: "\u0000" }).split("\u0000");
  return (
    <div>
      <p className="text-[14px]" aria-live="polite">
        {left > 0 ? (
          <>
            {before}
            <strong>{formatPrice(left, locale)}</strong>
            {after}
          </>
        ) : (
          <strong>{t.gotFree}</strong>
        )}
      </p>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-linea"
        role="progressbar"
        aria-label={t.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="h-full bg-vino transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
