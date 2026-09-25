"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { cartUi } from "./cart-ui";
import { FreeShippingMeter } from "./FreeShippingMeter";
import { useCart } from "./useCart";

/** Cajón lateral de la cesta. Se abre al añadir un producto o al pulsar "Cesta". */
export function CartDrawer() {
  const open = useSyncExternalStore(cartUi.subscribe, cartUi.isOpen, cartUi.isOpenServer);
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const { lines, count, subtotal, setQuantity, remove } = useCart();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => cartUi.setOpen(false), [pathname]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="drawer-cart-title"
      onClose={() => cartUi.setOpen(false)}
      onClick={(e) => {
        // Clic en el fondo oscuro: cerrar.
        if (e.target === e.currentTarget) cartUi.setOpen(false);
      }}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-[440px] bg-crema p-0 text-tinta backdrop:bg-tinta/50 open:animate-rise"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-linea px-6 py-4">
          <h2 id="drawer-cart-title" className="font-serif text-[24px]">
            Tu cesta <span className="text-secundario">({count})</span>
          </h2>
          <button
            type="button"
            aria-label="Cerrar la cesta"
            onClick={() => cartUi.setOpen(false)}
            className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center hover:text-vino"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="border-b border-linea bg-papel px-6 py-4">
          <FreeShippingMeter subtotal={subtotal} />
        </div>

        {lines.length ? (
          <ul className="flex-1 overflow-y-auto px-6">
            {lines.map((line) => (
              <li key={line.id} className="grid grid-cols-[72px_1fr] gap-4 border-b border-linea py-4">
                <ImagePlaceholder label="" ratio="1 / 1" className="arch" />
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <Link href={line.href} className="font-serif text-[18px] leading-snug hover:text-vino">
                      {line.name}
                    </Link>
                    <p className="shrink-0 text-[15px] font-semibold">
                      {line.price === null ? "[precio] €" : formatPrice(line.price * line.quantity)}
                    </p>
                  </div>
                  {line.byline ? <p className="text-[13px] text-secundario">{line.byline}</p> : null}
                  <div className="mt-2 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-eg border border-borde-input">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.id, line.quantity - 1)}
                        aria-label={`Quitar una unidad de ${line.name}`}
                        className="inline-flex h-11 w-10 items-center justify-center hover:text-vino"
                      >
                        <MinusIcon size={14} />
                      </button>
                      <span className="w-6 text-center text-[14px] tabular-nums" aria-label={`Cantidad: ${line.quantity}`}>
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.id, line.quantity + 1)}
                        aria-label={`Añadir una unidad de ${line.name}`}
                        className="inline-flex h-11 w-10 items-center justify-center hover:text-vino"
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.id)}
                      className="min-h-[44px] text-[13px] text-secundario underline underline-offset-4 hover:text-vino"
                    >
                      Quitar<span className="sr-only"> {line.name}</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="font-serif text-[24px]">Tu cesta está vacía</p>
            <p className="mt-2 text-secundario">Empieza por nuestros favoritos de la casa.</p>
            <Link href="/tienda" className={cn(buttonClasses("primary", "md"), "mt-6")}>
              Ir a la tienda
            </Link>
          </div>
        )}

        {lines.length ? (
          <div className="border-t border-linea px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px]">Subtotal</span>
              <span className="text-[20px] font-semibold tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-[13px] text-secundario">Envío e impuestos calculados al pagar.</p>
            <div className="mt-4 grid gap-2">
              <Link href="/cesta" className={buttonClasses("primary", "md")}>
                Ver la cesta y pagar
              </Link>
              <button
                type="button"
                onClick={() => cartUi.setOpen(false)}
                className={buttonClasses("secondary", "md")}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
