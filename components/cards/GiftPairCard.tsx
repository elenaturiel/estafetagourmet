import Link from "next/link";
import { AddPairButton } from "@/components/cart/AddPairButton";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatPrice } from "@/lib/format";
import { productByline, productHref } from "@/lib/product-utils";
import type { Producer, Product } from "@/lib/types";

/** Pareja de productos que se regalan juntos: dos fotos, el motivo y un botón que añade los dos. */
export function GiftPairCard({
  name,
  blurb,
  products,
  producers,
}: {
  name: string;
  blurb: string;
  products: [Product, Product];
  producers: Record<string, Producer>;
}) {
  const prices = products.map((p) => p.price);
  const total = prices.every((p): p is number => p !== null) ? prices.reduce((a, b) => a + b, 0) : null;
  const byline = (p: Product) => productByline(p, p.producerSlug ? producers[p.producerSlug] : undefined);

  return (
    <article className="flex h-full flex-col border border-linea bg-papel p-3 lg:p-4">
      <div className="grid grid-cols-2 gap-2">
        {products.map((p) => (
          <Link key={p.slug} href={productHref(p)} className="block overflow-hidden rounded-eg" tabIndex={-1} aria-hidden="true">
            <ImagePlaceholder label={p.image.placeholder} src={p.image.src} alt="" ratio="4 / 5" blend sizes="(min-width: 1024px) 14vw, 40vw" />
          </Link>
        ))}
      </div>
      <h3 className="mt-4 text-[22px] leading-snug tracking-[-0.015em]">{name}</h3>
      <p className="mt-1 text-[15px] leading-[1.5] text-secundario">{blurb}</p>
      <ul className="mt-3 space-y-1 text-[14px]">
        {products.map((p) => (
          <li key={p.slug}>
            <Link href={productHref(p)} className="font-semibold underline-offset-4 hover:text-vino hover:underline">
              {p.name}
            </Link>
            <span className="text-secundario"> · {byline(p)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {total === null ? (
          <p className="text-[15px] font-semibold text-secundario">Precio a consultar</p>
        ) : (
          <p className="text-[18px] font-semibold tabular-nums">
            {formatPrice(total)} <span className="text-[13px] font-normal text-secundario">los dos</span>
          </p>
        )}
        <div className="sm:w-auto">
          {total === null ? (
            <ButtonLink href="/visitanos#contacto" variant="secondary" size="sm" className="w-full sm:w-auto sm:px-5">
              Consultar
            </ButtonLink>
          ) : (
            <AddPairButton
              name={name}
              className="sm:w-auto sm:px-5"
              items={products.map((p) => ({
                id: p.slug,
                name: p.name,
                href: productHref(p),
                price: p.price,
                byline: byline(p),
                imageLabel: p.image.placeholder,
              }))}
            />
          )}
        </div>
      </div>
    </article>
  );
}
