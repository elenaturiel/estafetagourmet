import { ArrowLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Producer } from "@/lib/types";

export function ProducerCard({ producer }: { producer: Producer }) {
  return (
    <article>
      <ImagePlaceholder
        label={producer.image.placeholder}
        src={producer.image.src}
        alt={producer.image.src ? producer.image.alt : undefined}
        ratio="1 / 1"
        sizes="(min-width: 1024px) 25vw, 50vw"
      />
      <h3 className="mt-4 text-[18px] leading-snug lg:text-[22px]">{producer.name}</h3>
      <p className="mt-1 text-[13px] text-secundario">
        {producer.locality} · {producer.specialty}
      </p>
      <ArrowLink href={`/tienda/${producer.categorySlug}?productor=${producer.slug}`} className="mt-1">
        Ver sus productos<span className="sr-only"> de {producer.name}</span>
      </ArrowLink>
    </article>
  );
}
