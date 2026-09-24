import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-crema">
      <div className="mx-auto grid max-w-[1920px] lg:min-h-[680px] lg:grid-cols-2">
        {/* El padding izquierdo alinea el texto con el contenedor de 1440px. */}
        <div className="flex flex-col justify-center px-6 pt-12 pb-10 lg:py-20 lg:pr-16 lg:pl-[max(64px,calc((100vw-1440px)/2+64px))]">
          <p className="eyebrow text-vino">Pamplona · Calle Estafeta</p>
          <h1
            id="hero-title"
            className="mt-5 max-w-[620px] text-[44px] leading-[1.04] tracking-[-0.02em] sm:text-[56px] lg:text-[64px] xl:text-[76px] xl:leading-[1.02]"
          >
            La mejor gastronomía navarra, <em className="text-vino italic">directa</em> a tu mesa
          </h1>
          <p className="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-secundario lg:text-[19px]">
            Vinos, quesos, embutidos y verduras de pequeños productores navarros, seleccionados
            desde nuestra tienda en el casco viejo de Pamplona.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tienda" className="w-full sm:w-auto">
              Comprar ahora
            </ButtonLink>
            <ButtonLink href="/regalos" variant="secondary" className="w-full sm:w-auto">
              Ver cestas de regalo
            </ButtonLink>
          </div>
          <p className="mt-6 text-[15px] text-secundario">
            <Link
              href="/visitanos"
              className="inline-flex min-h-[44px] items-center gap-1 underline-offset-4 hover:text-vino hover:underline"
            >
              ¿Vienes de visita? Estamos en Estafeta, 70{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
        <ImagePlaceholder
          label="Foto de portada · tabla de quesos, embutidos y vino navarro"
          alt={`Tabla de quesos, embutidos y vino navarro de ${site.name}`}
          className="aspect-[4/3] lg:aspect-auto lg:h-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
    </section>
  );
}
