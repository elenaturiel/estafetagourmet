import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";

/** Logotipo de texto. Centrado en móvil y alineado a la izquierda en escritorio. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={t.header.homeLink}
      className={cn(
        "inline-flex min-h-[44px] flex-col items-center justify-center text-center whitespace-nowrap lg:items-start lg:text-left",
        className,
      )}
    >
      <span className="font-serif text-[22px] leading-none font-medium tracking-[-0.015em] lg:text-[28px]">
        {site.name}
      </span>
      <span className="mt-1.5 hidden text-[10px] leading-none tracking-[0.16em] text-secundario uppercase sm:block lg:text-[12px]">
        {site.tagline}
      </span>
    </Link>
  );
}
