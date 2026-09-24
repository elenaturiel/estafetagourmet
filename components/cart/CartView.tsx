"use client";

import Link from "next/link";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { useCart } from "./useCart";

export function CartView() {
  const { lines, count, subtotal, setQuantity, remove } = useCart();

  if (!lines.length) {
    return (
      <div className="border border-linea bg-papel p-8 lg:p-12">
        <p className="font-serif text-[24px]">Tu cesta está vacía</p>
        <p className="mt-2 text-secundario">Date una vuelta por la tienda: seguro que algo te tienta.</p>
        <ButtonLink href="/tienda" className="mt-6">
          Ir a la tienda
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
      <section aria-labelledby="cart-lines">
        <h2 id="cart-lines" className="sr-only">
          Productos en la cesta
        </h2>
        <ul className="border-t border-linea">
          {lines.map((line) => (
            <li key={line.id} className="grid grid-cols-[88px_1fr] gap-4 border-b border-linea py-5 sm:grid-cols-[112px_1fr_auto]">
              <ImagePlaceholder label={line.imageLabel} ratio="1 / 1" />
              <div>
                <h3 className="font-serif text-[20px] leading-snug">
                  <Link href={line.href} className="hover:text-vino">
                    {line.name}
                  </Link>
                </h3>
                {line.byline ? <p className="text-[13px] text-secundario">{line.byline}</p> : null}
                <p className="mt-1 text-[15px] font-semibold">{formatPrice(line.price)}</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="inline-flex items-center rounded-eg border border-borde-input" role="group" aria-label={`Cantidad de ${line.name}`}>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.id, line.quantity - 1)}
                      aria-label={`Quitar una unidad de ${line.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center hover:text-vino"
                    >
                      <MinusIcon size={16} />
                    </button>
                    <label htmlFor={`qty-${line.id}`} className="sr-only">
                      Cantidad
                    </label>
                    <input
                      id={`qty-${line.id}`}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={99}
                      value={line.quantity}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (!Number.isNaN(n) && e.target.value !== "") setQuantity(line.id, n);
                      }}
                      className="h-11 w-12 appearance-none bg-transparent text-center text-[15px] tabular-nums [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(line.id, line.quantity + 1)}
                      aria-label={`Añadir una unidad de ${line.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center hover:text-vino"
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.id)}
                    className="min-h-[44px] text-[14px] text-secundario underline underline-offset-4 hover:text-vino"
                  >
                    Quitar<span className="sr-only"> {line.name}</span>
                  </button>
                </div>
              </div>
              <p className="hidden text-right text-[16px] font-semibold sm:block">
                {line.price === null ? "[precio] €" : formatPrice(line.price * line.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <aside aria-labelledby="cart-summary" className="h-fit border border-linea bg-papel p-6 lg:p-8">
        <h2 id="cart-summary" className="font-serif text-[24px]">
          Resumen
        </h2>
        <dl className="mt-5 space-y-2 text-[15px]">
          <div className="flex justify-between">
            <dt>Productos</dt>
            <dd className="tabular-nums">{count}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-secundario">
            <dt>Envío</dt>
            <dd>Se calcula al pagar</dd>
          </div>
        </dl>
        <p className="mt-4 text-[13px] text-secundario">
          Envío gratis desde {site.shipping.freeShippingFrom} €. Envío en {site.shipping.leadTime} a toda la
          península.
        </p>
        {/*
          TODO: pago. Al conectar Shopify, este botón redirige a cart.checkoutUrl
          (checkout alojado por Shopify). Ver README.md → "Conectar Shopify".
        */}
        <button
          type="button"
          disabled
          aria-describedby="checkout-note"
          className={cn(buttonClasses("primary", "md"), "mt-6 w-full")}
        >
          Finalizar pedido
        </button>
        <p id="checkout-note" className="mt-3 text-[13px] text-secundario">
          El pago online estará disponible muy pronto. Mientras tanto, llámanos al{" "}
          <a href={site.phone.href} className="font-semibold text-vino underline underline-offset-2">
            {site.phone.display}
          </a>{" "}
          o pasa por la tienda.
        </p>
      </aside>
    </div>
  );
}
