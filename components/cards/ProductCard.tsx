import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { productByline, productHref } from "@/lib/product-utils";
import type { Producer, Product } from "@/lib/types";

/** Colores de las etiquetas: la de "Favorito" destaca en dorado. */
export function tagClass(tag: string) {
  return /favorit/i.test(tag)
    ? "sticker bg-dorado text-tinta"
    : /san ferm/i.test(tag)
      ? "sticker bg-vino text-crema"
      : "sticker bg-crema text-vino";
}

export function ProductCard({
  product,
  producer,
  headingLevel = "h3",
  className,
}: {
  product: Product;
  producer?: Producer;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const href = productHref(product);
  const byline = productByline(product, producer);
  const Heading = headingLevel;

  return (
    <article className={cn("group/card relative flex h-full flex-col", className)}>
      <div className="relative overflow-hidden rounded-eg">
        <ImagePlaceholder
          label={product.image.placeholder}
          src={product.image.src}
          alt={product.image.src ? product.image.alt : undefined}
          ratio="4 / 5"
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
        />
        {product.tags?.length ? (
          <ul className="absolute top-3 left-3 flex flex-col items-start gap-1.5" aria-label="Etiquetas">
            {product.tags.slice(0, 2).map((tag) => (
              <li key={tag} className={tagClass(tag)}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        {byline ? (
          <p className="text-[12px] font-semibold tracking-[0.08em] text-secundario uppercase">
            {byline}
          </p>
        ) : null}
        <Heading className="mt-1 text-[19px] leading-snug tracking-[-0.015em] lg:text-[22px]">
          {/* El enlace cubre toda la tarjeta; el botón queda por encima. */}
          <Link href={href} className="after:absolute after:inset-0 hover:text-vino">
            {product.name}
          </Link>
        </Heading>
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[18px] font-semibold tabular-nums">{formatPrice(product.price)}</p>
          <div className="relative z-10 sm:w-auto">
            <AddToCartButton
              variant="primary"
              label="Añadir"
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
          </div>
        </div>
      </div>
    </article>
  );
}
