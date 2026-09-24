"use client";

import { useSyncExternalStore } from "react";
import { cartStore } from "./cart-store";

export function useCart() {
  const lines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const hasUnknownPrice = lines.some((l) => l.price === null);
  const subtotal = lines.reduce((sum, l) => sum + (l.price ?? 0) * l.quantity, 0);

  return {
    lines,
    count,
    subtotal: hasUnknownPrice ? null : subtotal,
    add: cartStore.add,
    setQuantity: cartStore.setQuantity,
    remove: cartStore.remove,
    clear: cartStore.clear,
  };
}
