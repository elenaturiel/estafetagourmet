import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { productByline, productHref } from "@/lib/product-utils";
import { formatPrice } from "@/lib/format";
import type { Producer, Product } from "@/lib/types";

export function ProductCard({
  product,
  producer,
  headingLevel = "h3",
}: {
  product: Product;
  producer?: Producer;
  headingLevel?: "h2" | "h3";
}) {
  const href = productHref(product);
  const byline = productByline(product, producer);
  const Heading = headingLevel;

  return (
    <article className="flex h-full flex-col">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <ImagePlaceholder
          label={product.image.placeholder}
          src={product.image.src}
          alt={product.image.src ? product.image.alt : undefined}
          ratio="1 / 1"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
      </Link>
      <Heading className="mt-4 text-[18px] leading-snug tracking-[-0.015em] lg:text-[22px]">
        <Link href={href} className="hover:text-vino">
          {product.name}
        </Link>
      </Heading>
      {byline ? <p className="mt-1 text-[13px] text-secundario">{byline}</p> : null}
      <p className="mt-3 mb-4 text-[16px] font-semibold">{formatPrice(product.price)}</p>
      <div className="mt-auto">
        <AddToCartButton
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
    </article>
  );
}
