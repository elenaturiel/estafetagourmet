import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";

/** Sello circular de la marca, centrado en la cabecera. Se reduce al hacer scroll. */
export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={t.header.homeLink}
      className={cn("inline-flex min-h-[44px] items-center justify-center", className)}
    >
      <Image
        src="/logo-estafeta-gourmet.webp"
        width={88}
        height={88}
        alt=""
        preload
        sizes="88px"
        className={cn(
          "transition-[width,height] duration-300",
          compact ? "h-12 w-12 lg:h-14 lg:w-14" : "h-14 w-14 lg:h-[84px] lg:w-[84px]",
        )}
      />
    </Link>
  );
}
