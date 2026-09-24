import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";

/**
 * Logotipo (sello circular) con el nombre al lado en pantallas anchas.
 * Centrado en móvil y alineado a la izquierda en escritorio.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={t.header.homeLink}
      className={cn("inline-flex min-h-[44px] items-center gap-3 whitespace-nowrap", className)}
    >
      <Image
        src="/logo-estafeta-gourmet.webp"
        width={72}
        height={72}
        alt=""
        preload
        sizes="(min-width: 1024px) 72px, 56px"
        className="h-14 w-14 lg:h-[72px] lg:w-[72px]"
      />
      <span className="hidden flex-col text-left xl:flex">
        <span className="font-serif text-[28px] leading-none font-medium tracking-[-0.015em]">
          {site.name}
        </span>
        <span className="mt-1.5 text-[12px] leading-none tracking-[0.16em] text-secundario uppercase">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
