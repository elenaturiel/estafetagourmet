"use client";

import { useEffect, useState } from "react";
import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import type { CartItemInput } from "./cart-store";
import { useCart } from "./useCart";

export function AddToCartButton({
  item,
  variant = "secondary",
  size = "sm",
  className,
}: {
  item: CartItemInput;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  className?: string;
}) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const id = window.setTimeout(() => setJustAdded(false), 2000);
    return () => window.clearTimeout(id);
  }, [justAdded]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          add(item);
          setJustAdded(true);
        }}
        className={cn(buttonClasses(variant, size), "w-full", className)}
      >
        {justAdded ? t.cart.added : t.cart.add}
        <span className="sr-only"> {item.name}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {justAdded ? t.cart.addedLive(item.name) : ""}
      </span>
    </>
  );
}
