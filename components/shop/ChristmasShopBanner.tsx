"use client";

import { TIENDA_NAVIDAD_DULCES, TIENDA_NAVIDAD_LOTES } from "@/data/tienda-online";
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

/** Caja de regalo con lazo. */
function GiftIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-9 w-9 shrink-0">
      <rect x="6" y="17" width="28" height="18" rx="2" fill="#c8242f" />
      <rect x="4" y="11" width="32" height="8" rx="2" fill="#d93a3f" />
      <rect x="17.5" y="11" width="5" height="24" fill="#e2b872" />
      <path d="M20 11 C15 2 7 5 11 10 C13 12 17 11 20 11 Z" fill="#e2b872" />
      <path d="M20 11 C25 2 33 5 29 10 C27 12 23 11 20 11 Z" fill="#e2b872" />
    </svg>
  );
}

/** Tableta de turrón con almendras. */
function TurronIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-9 w-9 shrink-0">
      <path d="M4 16 L30 9 L37 14 L11 22 Z" fill="#f3e6c4" />
      <path d="M4 16 L11 22 L11 31 L4 25 Z" fill="#d9c294" />
      <path d="M11 22 L37 14 L37 23 L11 31 Z" fill="#ead7a8" />
      <ellipse cx="16" cy="24" rx="2.6" ry="1.6" fill="#a8743f" transform="rotate(-18 16 24)" />
      <ellipse cx="24" cy="21.5" rx="2.6" ry="1.6" fill="#a8743f" transform="rotate(-18 24 21.5)" />
      <ellipse cx="31" cy="19.5" rx="2.6" ry="1.6" fill="#a8743f" transform="rotate(-18 31 19.5)" />
      <ellipse cx="19" cy="27" rx="2.2" ry="1.4" fill="#8e5f31" transform="rotate(-18 19 27)" />
      <ellipse cx="28" cy="24.5" rx="2.2" ry="1.4" fill="#8e5f31" transform="rotate(-18 28 24.5)" />
    </svg>
  );
}

/**
 * «La tienda de la Navidad»: banner de temporada, en verde con ramitas de acebo,
 * con dos botones (Lotes y Dulces navideños) a la tienda online.
 */
export function ChristmasShopBanner({ className }: { className?: string }) {
  const t = useT().common.christmasShop;
  return (
    <aside
      className={cn(
        "relative flex flex-col gap-5 overflow-hidden rounded-[28px] border-2 border-dorado bg-[#1d4a32] px-6 pt-6 pb-20 text-white sm:flex-row sm:items-center sm:justify-between sm:pb-10 lg:rounded-[36px] lg:px-10 lg:py-12",
        className,
      )}
    >
      {/* Ramitas de acebo en las cuatro esquinas */}
      <Holly className="pointer-events-none absolute -top-2 -left-3 w-[130px] -rotate-6 lg:w-[180px]" />
      <Holly className="pointer-events-none absolute -top-3 -right-4 w-[110px] rotate-[200deg] -scale-y-100 lg:w-[150px]" />
      <Holly className="pointer-events-none absolute -bottom-3 -left-4 w-[110px] rotate-[20deg] -scale-y-100 lg:w-[150px]" />
      <Holly className="pointer-events-none absolute -right-3 -bottom-2 w-[130px] rotate-[174deg] lg:w-[180px]" />
      <div className="relative pt-14 sm:pt-0 sm:pl-32 lg:pl-44">
        <p className="eyebrow text-dorado">{t.eyebrow}</p>
        <p className="mt-1 font-serif text-[26px] leading-tight lg:text-[34px]">{t.title}</p>
        <p className="mt-1.5 max-w-xl text-[15px] leading-[1.5] text-white/90 lg:text-[16px]">{t.text}</p>
      </div>
      <div className="relative flex shrink-0 flex-col gap-3 sm:mr-28 lg:mr-40">
        {[
          { href: TIENDA_NAVIDAD_LOTES, label: t.lots, icon: <GiftIcon /> },
          { href: TIENDA_NAVIDAD_DULCES, label: t.sweets, icon: <TurronIcon /> },
        ].map((b) => (
          <a
            key={b.label}
            href={b.href}
            className="inline-flex min-h-[64px] items-center gap-3 rounded-full border-2 border-dorado bg-[#2e6b47] py-2 pr-7 pl-2.5 font-serif text-[22px] font-semibold text-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6)] hover:bg-[#3a7d54] lg:text-[24px]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-papel">{b.icon}</span>
            {b.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
