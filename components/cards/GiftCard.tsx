import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatPrice } from "@/lib/format";
import type { GiftBox } from "@/lib/types";

export function GiftCard({ gift }: { gift: GiftBox }) {
  return (
    <article className="flex h-full flex-col border border-linea bg-papel text-tinta">
      <ImagePlaceholder
        label={gift.image.placeholder}
        src={gift.image.src}
        alt={gift.image.src ? gift.image.alt : undefined}
        ratio="4 / 3"
        sizes="(min-width: 1024px) 20vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[20px] leading-snug lg:text-[22px]">
          <Link href={`/regalos#${gift.slug}`} className="hover:text-vino">
            {gift.name}
          </Link>
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-secundario">{gift.description}</p>
        <p className="mt-4 text-[16px] font-semibold">{gift.priceLabel ?? formatPrice(gift.price)}</p>
      </div>
    </article>
  );
}
