import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatPrice } from "@/lib/format";
import type { GiftBox } from "@/lib/types";
import { tagClass } from "./ProductCard";

export function GiftCard({ gift }: { gift: GiftBox }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-eg bg-papel text-tinta">
      <div className="relative overflow-hidden">
        <ImagePlaceholder
          label={gift.image.placeholder}
          src={gift.image.src}
          alt={gift.image.src ? gift.image.alt : undefined}
          ratio="4 / 3"
          sizes="(min-width: 1024px) 20vw, 80vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {gift.tag ? <span className={`${tagClass(gift.tag)} absolute top-3 left-3`}>{gift.tag}</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[21px] leading-snug lg:text-[23px]">
          <Link href={`/regalos#${gift.slug}`} className="after:absolute after:inset-0 group-hover:text-vino">
            {gift.name}
          </Link>
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-secundario">{gift.description}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="text-[17px] font-semibold">{gift.priceLabel ?? formatPrice(gift.price)}</p>
          <span aria-hidden="true" className="text-[14px] font-semibold text-vino">
            Ver cesta →
          </span>
        </div>
      </div>
    </article>
  );
}
