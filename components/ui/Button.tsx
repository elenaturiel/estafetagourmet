import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "cream" | "outline-cream";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-eg border text-center font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "border-vino bg-vino text-crema hover:bg-vino-oscuro hover:border-vino-oscuro",
  secondary: "border-tinta bg-transparent text-tinta hover:bg-tinta hover:text-crema",
  cream: "border-crema bg-crema text-vino hover:bg-papel",
  "outline-cream":
    "border-crema-sobre-vino bg-transparent text-crema hover:bg-crema hover:text-vino",
};

const sizes: Record<Size, string> = {
  md: "min-h-[52px] px-7 text-[15px] lg:min-h-[56px]",
  sm: "min-h-[44px] px-5 text-[14px]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: Size = "md") {
  return cn(base, variants[variant], sizes[size]);
}

type LinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: LinkProps) {
  return <Link className={cn(buttonClasses(variant, size), className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant; size?: Size };

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={cn(buttonClasses(variant, size), className)} {...props} />;
}

/** Enlace de texto con flecha: "Ver toda la tienda →". */
export function ArrowLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-1 text-[15px] font-semibold text-vino underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
