import { ArrowLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Stamp } from "@/components/ui/Stamp";

export function AboutSection() {
  return (
    <Section tone="papel" aria-labelledby="quienes-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <div className="relative">
          <div data-reveal="clip">
          <ImagePlaceholder
            label="Foto de la tienda · interior, calle Estafeta 70"
            alt="Interior de la tienda Estafeta Gourmet en la calle Estafeta, 70"
            ratio="640 / 440"
            sizes="(min-width: 1024px) 640px, 100vw"
            className="rounded-eg"
            parallax
          />
          </div>
          <div className="arch absolute -right-3 -bottom-10 hidden w-[180px] overflow-hidden border-[6px] border-papel sm:block lg:-right-10">
            <ImagePlaceholder label="Detalle · estantería" ratio="3 / 4" />
          </div>
          <Stamp
            text="Calle Estafeta, 70 · Casco viejo · Iruña · "
            className="absolute -top-8 -left-4 w-[110px] lg:w-[130px]"
          />
        </div>
        <div data-reveal className="max-w-xl">
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2
            id="quienes-title"
            className="mt-4 text-[34px] leading-[1.05] tracking-[-0.02em] lg:text-[48px]"
          >
            Una tienda con alma, en pleno casco viejo
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-secundario">
            Estafeta Gourmet es una tienda de productos gourmet de Navarra en la calle Estafeta de
            Pamplona. Seleccionamos, catamos y cuidamos lo mejor que producen los pequeños
            productores navarros.
          </p>
          <p className="mt-4 text-[17px] leading-[1.6] text-secundario">
            Respetamos las recetas de siempre y las presentamos con una mirada actual, para que
            cada visita sea un pequeño viaje por los sabores de nuestra tierra.
          </p>
          <ArrowLink href="/visitanos" className="mt-4">
            Conoce nuestra historia
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
