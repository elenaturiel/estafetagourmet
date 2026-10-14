"use client";

import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { fmt } from "@/lib/i18n/config";
import { useT } from "@/lib/i18n/client";
import type { CartItemInput } from "./cart-store";
import { cartUi } from "./cart-ui";
import { useCart } from "./useCart";

/** Añade a la cesta los dos productos de una pareja con un solo botón. */
export function AddPairButton({ items, name, className }: { items: CartItemInput[]; name: string; className?: string }) {
  const t = useT().cart;
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
          items.forEach((item) => add(item));
          setJustAdded(true);
          cartUi.setOpen(true);
        }}
        className={cn(buttonClasses("primary", "sm"), "w-full", className)}
      >
        {justAdded ? t.addedPair : t.addPair}
        <span className="sr-only"> ({name})</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {justAdded ? fmt(t.addedPairLive, { name }) : ""}
      </span>
    </>
  );
}
