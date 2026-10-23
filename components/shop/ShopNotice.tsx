"use client";

import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n/client";

/**
 * Aviso de la tienda mientras no hay venta online desde la web
 * (site.onlineSales = false): los pedidos se hacen por WhatsApp.
 */
export function ShopNotice({ className, compact = false }: { className?: string; compact?: boolean }) {
  const t = useT().common.shopNotice;
  if (site.onlineSales) return null;
  const href = `${site.whatsappHref}?text=${encodeURIComponent(t.message)}`;
  return (
    <aside
      className={cn(
        "flex flex-col gap-3 rounded-eg border border-vino/30 bg-vino text-crema sm:flex-row sm:items-center sm:justify-between",
        compact ? "p-4" : "p-5 lg:px-7 lg:py-6",
        className,
      )}
    >
      <div>
        <p className={cn("font-serif leading-tight", compact ? "text-[19px]" : "text-[22px] lg:text-[26px]")}>{t.title}</p>
        <p className="mt-1 text-[15px] text-crema/85">{t.text}</p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-eg bg-crema px-5 text-[15px] font-semibold text-vino hover:bg-papel"
      >
        <WhatsAppIcon size={20} />
        {t.button}
      </a>
    </aside>
  );
}
