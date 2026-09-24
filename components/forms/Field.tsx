import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClasses =
  "w-full rounded-eg border border-borde-input bg-papel px-4 text-[16px] text-tinta placeholder:text-secundario/80 aria-[invalid=true]:border-vino";

export function Field({
  id,
  label,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: ReactNode;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-secundario">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={cn("mt-1.5 text-[13px] font-medium text-vino")}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
