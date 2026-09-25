import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

/**
 * Barra "Te faltan X € para el envío gratis". Mientras el umbral no esté
 * definido en data/site.ts muestra solo el mensaje con el marcador.
 */
export function FreeShippingMeter({ subtotal }: { subtotal: number | null }) {
  const threshold = site.shipping.freeShippingThreshold;
  if (threshold === null || subtotal === null) {
    return (
      <p className="text-[14px]">
        <span className="font-semibold">Envío gratis</span> desde {site.shipping.freeShippingFrom} € ·
        península en {site.shipping.leadTime}
      </p>
    );
  }
  const left = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
  return (
    <div>
      <p className="text-[14px]" aria-live="polite">
        {left > 0 ? (
          <>
            Te faltan <strong>{formatPrice(left)}</strong> para el envío gratis
          </>
        ) : (
          <strong>¡Tienes el envío gratis!</strong>
        )}
      </p>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-linea"
        role="progressbar"
        aria-label="Progreso hacia el envío gratis"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="h-full bg-vino transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
