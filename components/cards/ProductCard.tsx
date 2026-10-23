"use client";

import { Link } from "@/components/ui/Link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { useLocale, useT } from "@/lib/i18n/client";
import { productByline, productHref } from "@/lib/product-utils";
import type { Producer, Product } from "@/lib/types";

/** Colores de las etiquetas: la de "Favorito" destaca en dorado. */
export function tagClass(tag: string) {
  return /favorit/i.test(tag)
    ? "sticker bg-dorado text-tinta"
    : "sticker bg-crema text-vino";
}

export function ProductCard({
  product,
  producer,
  headingLevel = "h3",
  lift,
  className,
}: {
  product: Product;
  producer?: Producer;
  headingLevel?: "h2" | "h3";
  /** Animación al pasar el ratón (lotes): la tarjeta se levanta, la foto crece y aparece "Ver lote". */
  lift?: boolean;
  className?: string;
}) {
  const t = useT().home.card;
  const locale = useLocale();
  const href = productHref(product);
  const byline = productByline(product, producer);
  const Heading = headingLevel;

  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col",
        lift &&
          "transition-transform duration-300 ease-out hover:-translate-y-2 focus-within:-translate-y-2 motion-reduce:transform-none",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-eg",
          lift &&
            "transition-shadow duration-300 ease-out group-hover/card:shadow-[0_24px_36px_-16px_rgba(42,31,26,0.45)] group-focus-within/card:shadow-[0_24px_36px_-16px_rgba(42,31,26,0.45)]",
        )}
      >
        <ImagePlaceholder
          label={product.image.placeholder}
          src={product.image.src}
          alt={product.image.src ? product.image.alt : undefined}
          ratio="4 / 5"
          blend
          sizes="(min-width: 1024px) 25vw, 50vw"
          className={cn(
            "transition-transform duration-700 ease-out",
            lift
              ? "group-hover/card:scale-[1.08]"
              : "group-hover/card:scale-[1.04]",
          )}
        />
        {lift ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-3 flex translate-y-2 justify-center opacity-0 transition duration-300 ease-out group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 motion-reduce:translate-y-0"
          >
            <span className="sticker bg-vino text-crema shadow-md">
              {t.viewLot}
            </span>
          </span>
        ) : null}
        {product.tags?.length ? (
          <ul
            className="absolute top-3 left-3 flex flex-col items-start gap-1.5"
            aria-label={t.tags}
          >
            {product.tags.slice(0, 2).map((tag) => (
              <li key={tag} className={tagClass(tag)}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col pt-3 lg:pt-4">
        {byline ? (
          <p className="line-clamp-1 text-[11px] font-semibold tracking-[0.06em] text-secundario uppercase lg:text-[12px] lg:tracking-[0.08em]">
            {byline}
          </p>
        ) : null}
        <Heading className="mt-1 line-clamp-3 text-[16px] leading-[1.25] tracking-[-0.01em] lg:line-clamp-none lg:text-[22px] lg:leading-snug lg:tracking-[-0.015em]">
          {/* El enlace cubre toda la tarjeta; el botón queda por encima. */}
          <Link
            href={href}
            className="after:absolute after:inset-0 hover:text-vino group-hover/card:text-vino"
          >
            {product.name}
          </Link>
        </Heading>
        <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 lg:pt-4">
          {product.price === null ? (
            <p className="text-[14px] font-semibold text-secundario lg:text-[15px]">
              {t.priceOnRequest}
            </p>
          ) : (
            <p className="text-[17px] font-semibold tabular-nums lg:text-[18px]">
              {formatPrice(product.price, locale)}
            </p>
          )}
          <div className="relative z-10 sm:w-auto">
            {product.price === null ? (
              <ButtonLink
                href="/visitanos#contacto"
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto sm:px-5"
              >
                {t.consult}<span className="sr-only"> {product.name}</span>
              </ButtonLink>
            ) : site.onlineSales ? (
              <AddToCartButton
                variant="primary"
                label={t.add}
                className="sm:w-auto sm:px-5"
                item={{
                  id: product.slug,
                  name: product.name,
                  href,
                  price: product.price,
                  byline,
                  imageLabel: product.image.placeholder,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
