"use client";

import { Link } from "@/components/ui/Link";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { fmt } from "@/lib/i18n/config";
import { useLocale, useT } from "@/lib/i18n/client";
import { shippingArea, shippingCost } from "@/lib/shipping";
import { useCart } from "./useCart";
import { TIENDA_ONLINE } from "@/data/tienda-online";

export function CartView() {
  const t = useT();
  const c = t.cart;
  const locale = useLocale();
  const { lines, count, subtotal, setQuantity, remove } = useCart();
  const shipping = subtotal === null ? null : shippingCost(subtotal);

  if (!lines.length) {
    return (
      <div className="border border-linea bg-papel p-8 lg:p-12">
        <p className="font-serif text-[24px]">{c.empty}</p>
        <p className="mt-2 text-secundario">{c.emptyPage}</p>
        <ButtonLink href={TIENDA_ONLINE} className="mt-6">
          {c.goShop}
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
      <section aria-labelledby="cart-lines">
        <h2 id="cart-lines" className="sr-only">
          {c.products}
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
                <p className="mt-1 text-[15px] font-semibold">{formatPrice(line.price, locale)}</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="inline-flex items-center rounded-eg border border-borde-input" role="group" aria-label={fmt(c.quantityOf, { name: line.name })}>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.id, line.quantity - 1)}
                      aria-label={fmt(c.removeOne, { name: line.name })}
                      className="inline-flex h-11 w-11 items-center justify-center hover:text-vino"
                    >
                      <MinusIcon size={16} />
                    </button>
                    <label htmlFor={`qty-${line.id}`} className="sr-only">
                      {c.quantity}
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
                      aria-label={fmt(c.addOne, { name: line.name })}
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
                    {c.remove}<span className="sr-only"> {line.name}</span>
                  </button>
                </div>
              </div>
              <p className="hidden text-right text-[16px] font-semibold sm:block">
                {line.price === null ? c.pricePlaceholder : formatPrice(line.price * line.quantity, locale)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <aside aria-labelledby="cart-summary" className="h-fit border border-linea bg-papel p-6 lg:p-8">
        <h2 id="cart-summary" className="font-serif text-[24px]">
          {c.summary}
        </h2>
        <dl className="mt-5 space-y-2 text-[15px]">
          <div className="flex justify-between">
            <dt>{c.items}</dt>
            <dd className="tabular-nums">{count}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{c.subtotal}</dt>
            <dd className="font-semibold tabular-nums">{formatPrice(subtotal, locale)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{c.shipping}</dt>
            <dd className="tabular-nums">{shipping === null ? c.toConfirm : shipping === 0 ? c.free : formatPrice(shipping, locale)}</dd>
          </div>
          <div className="flex justify-between border-t border-linea pt-2 text-[17px]">
            <dt className="font-semibold">{c.total}</dt>
            <dd className="font-semibold tabular-nums">
              {subtotal === null || shipping === null ? c.toConfirm : formatPrice(subtotal + shipping, locale)}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-[13px] text-secundario">
          {fmt(c.shippingNote, {
            cost: formatPrice(site.shipping.cost, locale),
            kg: site.shipping.maxWeightKg,
            from: site.shipping.freeShippingFrom,
            area: shippingArea(c, t.common.site.noDelivery),
          })}
        </p>
        {lines.some((l) => /^\/tienda\/(vinos|espumosos|bebidas|lotes)\//.test(l.href)) ? (
          <p className="mt-4 border border-linea bg-crema p-3 text-[13px] leading-snug text-secundario">
            <strong className="text-tinta">{c.alcoholTitle}</strong> {c.alcoholText}{" "}
            <Link href="/condiciones-de-venta" className="font-semibold text-vino underline underline-offset-2">
              {c.moreInfo}
            </Link>
          </p>
        ) : null}
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
          {c.checkout}
        </button>
        <p id="checkout-note" className="mt-3 text-[13px] text-secundario">
          {c.checkoutNote.split("{phone}")[0]}
          <a href={site.phone.href} className="font-semibold text-vino underline underline-offset-2">
            {site.phone.display}
          </a>
          {c.checkoutNote.split("{phone}")[1]}
        </p>
      </aside>
    </div>
  );
}
