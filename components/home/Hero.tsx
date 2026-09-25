import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CheckCircleIcon, PinIcon, TruckIcon } from "@/components/ui/icons";
import { Stamp } from "@/components/ui/Stamp";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import type { GiftBox } from "@/lib/types";

export function Hero({ featuredGift }: { featuredGift?: GiftBox }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-crema">
      <div className="container-site grid items-center gap-12 pt-10 pb-14 lg:min-h-[680px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:py-16">
        <div className="animate-rise">
          <p className="eyebrow inline-flex items-center gap-2 text-vino">
            <span className="h-px w-8 bg-vino" aria-hidden="true" />
            Pamplona · Calle Estafeta
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-[46px] leading-[1.02] tracking-[-0.025em] sm:text-[60px] lg:text-[68px] xl:text-[82px]"
          >
            La mejor gastronomía navarra,{" "}
            <em className="font-normal text-vino italic">directa</em> a tu mesa
          </h1>
          <p className="mt-6 max-w-[500px] text-[17px] leading-[1.6] text-secundario lg:text-[19px]">
            Vinos, quesos, embutidos y verduras de pequeños productores navarros, seleccionados
            desde nuestra tienda en el casco viejo de Pamplona.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tienda" className="w-full sm:w-auto sm:px-9">
              Comprar ahora
            </ButtonLink>
            <ButtonLink href="/regalos" variant="secondary" className="w-full sm:w-auto">
              Ver cestas de regalo
            </ButtonLink>
          </div>
          <ul className="mt-9 grid gap-3 border-t border-linea pt-6 text-[14px] sm:grid-cols-3 sm:gap-4">
            <li className="flex items-center gap-2.5">
              <TruckIcon className="shrink-0 text-vino" />
              Envío en {site.shipping.leadTime}
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircleIcon className="shrink-0 text-vino" />
              Selección y cata propia
            </li>
            <li className="flex items-center gap-2.5">
              <PinIcon className="shrink-0 text-vino" />
              <Link href="/visitanos" className="underline-offset-4 hover:text-vino hover:underline">
                Recogida en Estafeta, 70
              </Link>
            </li>
          </ul>
        </div>

        {/* Collage: foto principal en arco + tarjeta de cesta + sello */}
        <div className="relative mx-auto w-full max-w-[560px] pb-10 lg:pb-0">
          <div className="arch overflow-hidden">
            <ImagePlaceholder
              label="Foto de portada · tabla de quesos, embutidos y vino navarro"
              alt={`Tabla de quesos, embutidos y vino navarro de ${site.name}`}
              ratio="4 / 5"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
          </div>
          <Stamp className="absolute -top-4 -left-4 w-[112px] sm:w-[136px] lg:-left-12 lg:w-[150px]" />
          {featuredGift ? (
            <Link
              href={`/regalos#${featuredGift.slug}`}
              className="group absolute right-0 bottom-0 flex w-[250px] items-center gap-3 rounded-eg border border-linea bg-papel p-3 shadow-[0_20px_40px_-20px_rgba(42,31,26,0.35)] sm:-right-4 lg:-right-8 lg:bottom-12"
            >
              <ImagePlaceholder label="" src={featuredGift.image.src} ratio="1 / 1" className="w-16 shrink-0" />
              <span className="min-w-0">
                <span className="eyebrow block text-[10px] text-vino">Para regalar</span>
                <span className="block font-serif text-[18px] leading-tight group-hover:text-vino">
                  {featuredGift.name}
                </span>
                <span className="block text-[14px] font-semibold">
                  {featuredGift.priceLabel ?? formatPrice(featuredGift.price)}
                </span>
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
