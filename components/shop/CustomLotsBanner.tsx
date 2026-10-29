"use client";

import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n/client";

/**
 * «Hacemos lotes personalizados»: banner con botones de WhatsApp y email.
 * `dark` es para ponerlo sobre la banda vino de la portada.
 */
export function CustomLotsBanner({ className, dark = false }: { className?: string; dark?: boolean }) {
  const t = useT().common.customLots;
  const whatsapp = `${site.whatsappHref}?text=${encodeURIComponent(t.message)}`;
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.message)}`;
  return (
    <aside
      className={cn(
        "flex flex-col gap-4 rounded-eg p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8 lg:py-7",
        dark ? "border border-crema/25 bg-crema/10 text-crema" : "border border-dorado/50 bg-papel text-tinta",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className={cn("eyebrow", dark ? "text-dorado" : "text-vino")}>{t.eyebrow}</p>
        <p className="mt-1.5 font-serif text-[24px] leading-tight lg:text-[30px]">{t.title}</p>
        <p className={cn("mt-2 text-[15px] leading-[1.55] lg:text-[16px]", dark ? "text-crema-sobre-vino" : "text-secundario")}>
          {t.text}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-eg px-5 text-[15px] font-semibold",
            dark ? "bg-crema text-vino hover:bg-papel" : "bg-vino text-crema hover:bg-vino/90",
          )}
        >
          <WhatsAppIcon size={20} />
          {t.whatsapp}
        </a>
        <a
          href={mail}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center rounded-eg border px-5 text-[15px] font-semibold",
            dark ? "border-crema text-crema hover:bg-crema/10" : "border-tinta hover:border-vino hover:text-vino",
          )}
        >
          {t.email}
        </a>
      </div>
    </aside>
  );
}
