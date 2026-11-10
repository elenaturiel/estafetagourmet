"use client";

import { TIENDA_NAVIDAD } from "@/data/tienda-online";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n/client";

/** Ramita de acebo: dos hojas con pinchos y tres bayas rojas. */
function Holly({ className }: { className?: string }) {
  const leaf = "M0 12 L8 6 L10 0 L18 5 L24 0 L30 5 L38 1 L42 7 L52 5 L60 12 L52 19 L42 17 L38 23 L30 19 L24 24 L18 19 L10 24 L8 18 Z";
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" className={className}>
      <g transform="translate(58 40) rotate(-28) translate(0 -12)">
        <path d={leaf} fill="#3f8a4f" stroke="#2b6538" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 12 L56 12" stroke="#2b6538" strokeWidth="1.5" />
      </g>
      <g transform="translate(62 40) rotate(208) translate(0 -12)">
        <path d={leaf} fill="#4e9c5d" stroke="#2b6538" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 12 L56 12" stroke="#2b6538" strokeWidth="1.5" />
      </g>
      <circle cx="56" cy="44" r="7" fill="#c8242f" />
      <circle cx="68" cy="42" r="7" fill="#d93a3f" />
      <circle cx="62" cy="53" r="7" fill="#b51f2a" />
      <circle cx="54" cy="42" r="2" fill="#fff" opacity=".55" />
      <circle cx="66" cy="40" r="2" fill="#fff" opacity=".55" />
      <circle cx="60" cy="51" r="2" fill="#fff" opacity=".55" />
    </svg>
  );
}

/**
 * «La tienda de la Navidad»: banner de temporada, en verde con ramitas de acebo,
 * que lleva a las categorías de Navidad de la tienda online (TIENDA_NAVIDAD).
 */
export function ChristmasShopBanner({ className }: { className?: string }) {
  const t = useT().common.christmasShop;
  return (
    <aside
      className={cn(
        "relative flex flex-col gap-4 overflow-hidden rounded-eg border-2 border-dorado bg-[#1d4a32] px-6 pt-6 pb-16 text-crema sm:flex-row sm:items-center sm:justify-between sm:pb-6 lg:px-10 lg:py-9",
        className,
      )}
    >
      <Holly className="pointer-events-none absolute -top-2 -left-3 w-[140px] -rotate-6 lg:w-[190px]" />
      <Holly className="pointer-events-none absolute -right-3 -bottom-2 w-[140px] rotate-[174deg] lg:w-[190px]" />
      <div className="relative pt-14 sm:pt-0 sm:pl-32 lg:pl-44">
        <p className="eyebrow text-dorado">{t.eyebrow}</p>
        <p className="mt-1 font-serif text-[26px] leading-tight lg:text-[34px]">{t.title}</p>
        <p className="mt-1.5 max-w-xl text-[15px] leading-[1.5] text-crema/85 lg:text-[16px]">{t.text}</p>
      </div>
      <a
        href={TIENDA_NAVIDAD}
        className="relative inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-eg bg-dorado px-6 text-[15px] font-semibold text-tinta hover:bg-crema sm:mr-28 lg:mr-40"
      >
        {t.button}
      </a>
    </aside>
  );
}
