import { ArrowLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow, Section } from "@/components/ui/Section";

export function AboutSection() {
  return (
    <Section tone="papel" aria-labelledby="quienes-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <ImagePlaceholder
          label="Foto de la tienda · interior, calle Estafeta 70"
          alt="Interior de la tienda Estafeta Gourmet en la calle Estafeta, 70"
          ratio="640 / 440"
          sizes="(min-width: 1024px) 640px, 100vw"
        />
        <div className="max-w-xl">
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2
            id="quienes-title"
            className="mt-4 text-[32px] leading-[1.1] tracking-[-0.02em] lg:text-[44px]"
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
