import { Link } from "@/components/ui/Link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { fmt } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";
import type { Producer } from "@/lib/types";

export async function ProducerCard({ producer, count }: { producer: Producer; count?: number }) {
  const t = (await getT()).home.card;
  const hasLocality = !/^\[.*\]$/.test(producer.locality.trim());
  const countLabel = count === undefined ? "" : count === 1 ? t.productOne : fmt(t.productMany, { n: count });
  return (
    <article className="group relative text-center">
      <div className="arch overflow-hidden">
        <ImagePlaceholder
          label={producer.image.placeholder}
          src={producer.image.src}
          alt={producer.image.src ? producer.image.alt : undefined}
          ratio="3 / 4"
          sizes="(min-width: 1024px) 25vw, 45vw"
          parallax={!producer.image.src}
          fit="contain"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="sticker mt-3 bg-crema-oscuro text-vino lg:mt-4">{producer.specialty}</p>
      <h3 className="mt-2 text-[17px] leading-snug lg:mt-3 lg:text-[22px]">{producer.name}</h3>
      <p className="mt-1 text-[13px] text-secundario lg:text-[14px]">
        {[hasLocality ? producer.locality : "", countLabel].filter(Boolean).join(" · ")}
      </p>
      <Link
        href={`/tienda?productor=${producer.slug}`}
        className="mt-1 inline-flex min-h-[44px] items-center gap-1 text-[14px] font-semibold text-vino after:absolute after:inset-0 hover:underline lg:mt-2 lg:text-[15px]"
      >
        {t.viewProducts} <span aria-hidden="true">→</span>
        <span className="sr-only">{fmt(t.productsOf, { name: producer.name })}</span>
      </Link>
    </article>
  );
}
