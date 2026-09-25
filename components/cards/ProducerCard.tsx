import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Producer } from "@/lib/types";

export function ProducerCard({ producer }: { producer: Producer }) {
  return (
    <article className="group relative text-center">
      <div className="arch overflow-hidden">
        <ImagePlaceholder
          label={producer.image.placeholder}
          src={producer.image.src}
          alt={producer.image.src ? producer.image.alt : undefined}
          ratio="3 / 4"
          sizes="(min-width: 1024px) 25vw, 60vw"
          parallax
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="sticker mt-4 bg-crema-oscuro text-vino">{producer.specialty}</p>
      <h3 className="mt-3 text-[20px] leading-snug lg:text-[22px]">{producer.name}</h3>
      <p className="mt-1 text-[14px] text-secundario">{producer.locality}</p>
      <Link
        href={`/tienda/${producer.categorySlug}?productor=${producer.slug}`}
        className="mt-2 inline-flex min-h-[44px] items-center gap-1 text-[15px] font-semibold text-vino after:absolute after:inset-0 hover:underline"
      >
        Ver sus productos <span aria-hidden="true">→</span>
        <span className="sr-only"> de {producer.name}</span>
      </Link>
    </article>
  );
}
