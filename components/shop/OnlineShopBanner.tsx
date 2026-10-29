"use client";

import { TIENDA_ONLINE } from "@/data/tienda-online";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n/client";

/**
 * Aviso de la tienda online: se mete el pedido en el carrito y se envía por
 * WhatsApp; el pago con tarjeta llegará pronto.
 */
export function OnlineShopBanner({ className, compact = false }: { className?: string; compact?: boolean }) {
  const t = useT().common.onlineShop;
  return (
    <aside
      className={cn(
        "flex flex-col gap-3 rounded-eg bg-vino text-crema sm:flex-row sm:items-center sm:justify-between",
        compact ? "p-4" : "p-5 lg:px-7 lg:py-6",
        className,
      )}
    >
      <div>
        <p className={cn("font-serif leading-tight", compact ? "text-[19px]" : "text-[22px] lg:text-[26px]")}>{t.title}</p>
        <p className="mt-1 text-[15px] leading-[1.5] text-crema/85">{t.text}</p>
      </div>
      {compact ? null : (
        <a
          href={TIENDA_ONLINE}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-eg bg-crema px-5 text-[15px] font-semibold text-vino hover:bg-papel"
        >
          {t.button}
        </a>
      )}
    </aside>
  );
}
