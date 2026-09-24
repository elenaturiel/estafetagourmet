import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";

export function Logo({ className, centered }: { className?: string; centered?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={t.header.homeLink}
      className={cn(
        "inline-flex min-h-[44px] flex-col justify-center",
        centered && "items-center text-center",
        className,
      )}
    >
      <span className="font-serif text-[22px] leading-none font-medium tracking-[-0.015em] lg:text-[28px]">
        {site.name}
      </span>
      <span className="mt-1.5 text-[10px] leading-none tracking-[0.16em] text-secundario uppercase lg:text-[12px]">
        {site.tagline}
      </span>
    </Link>
  );
}
