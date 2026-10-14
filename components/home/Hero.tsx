import { Link } from "@/components/ui/Link";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CheckCircleIcon, PinIcon, TruckIcon } from "@/components/ui/icons";
import { Stamp } from "@/components/ui/Stamp";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { fmt } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { productHref } from "@/lib/product-utils";
import type { Product } from "@/lib/types";

export async function Hero({ featuredLot }: { featuredLot?: Product }) {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const h = t.home.hero;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-crema">
      <div className="container-site grid items-center gap-7 pt-6 pb-8 lg:min-h-[680px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:py-16">
        <div className="animate-rise">
          <p className="eyebrow inline-flex items-center gap-2 text-[11px] text-vino lg:text-[12px]">
            <span className="h-px w-6 bg-vino lg:w-8" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-3 text-[35px] leading-[1.05] tracking-[-0.025em] sm:text-[60px] lg:mt-5 lg:text-[68px] xl:text-[82px]"
          >
            {h.title1} <em className="font-normal text-vino italic">{h.em}</em> {h.title2}
          </h1>
          <p className="mt-4 max-w-[500px] text-[16px] leading-[1.55] text-secundario lg:mt-6 lg:text-[19px] lg:leading-[1.6]">
            {h.text}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-row lg:mt-8">
            <ButtonLink href="/tienda" className="px-4 sm:px-9">
              {h.shopNow}
            </ButtonLink>
            <ButtonLink href="/tienda/lotes" variant="secondary" className="px-4">
              {h.seeLots}
            </ButtonLink>
          </div>
          <ul className="mt-6 hidden gap-3 border-t border-linea pt-6 text-[14px] sm:grid sm:grid-cols-3 sm:gap-4 lg:mt-9">
            <li className="flex items-center gap-2.5">
              <TruckIcon className="shrink-0 text-vino" />
              {fmt(h.shipping, { lead: site.shipping.leadTime })}
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircleIcon className="shrink-0 text-vino" />
              {h.selection}
            </li>
            <li className="flex items-center gap-2.5">
              <PinIcon className="shrink-0 text-vino" />
              <Link href="/visitanos" className="underline-offset-4 hover:text-vino hover:underline">
                {h.pickup}
              </Link>
            </li>
          </ul>
        </div>

        {/* Collage: foto principal en arco + tarjeta del lote + sello */}
        <div className="relative mx-auto w-full max-w-[560px] pb-6 lg:pb-0">
          <div className="overflow-hidden rounded-[24px] lg:arch lg:rounded-none">
            <ImagePlaceholder
              label={h.imageLabel}
              src="/images/portada/portada-chivite-pizarra.webp"
              alt={h.imageAlt}
              className="aspect-[5/4] lg:aspect-[4/5]"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
          </div>
          <Stamp className="drift-down absolute -top-3 -left-2 hidden w-[96px] sm:-left-4 sm:block sm:w-[136px] lg:-left-12 lg:w-[150px]" />
          {featuredLot ? (
            <Link
              href={productHref(featuredLot)}
              className="drift-up group absolute right-3 bottom-0 hidden w-[230px] sm:flex items-center gap-3 rounded-eg border border-linea bg-papel p-2.5 shadow-[0_20px_40px_-20px_rgba(42,31,26,0.35)] sm:-right-4 sm:w-[250px] sm:p-3 lg:-right-8 lg:bottom-12"
            >
              <ImagePlaceholder label="" src={featuredLot.image.src} ratio="1 / 1" blend className="w-14 shrink-0 rounded-eg sm:w-16" />
              <span className="min-w-0">
                <span className="eyebrow block text-[10px] text-vino">{t.common.header.featuredLot}</span>
                <span className="line-clamp-2 block font-serif text-[15px] leading-tight group-hover:text-vino sm:text-[16px]">
                  {featuredLot.name}
                </span>
                <span className="block text-[14px] font-semibold">
                  {featuredLot.price === null ? t.common.header.priceOnRequest : formatPrice(featuredLot.price, locale)}
                </span>
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
