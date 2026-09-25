import { GiftCard } from "@/components/cards/GiftCard";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { getGiftBoxes } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cestas de regalo y regalos de empresa navarros",
  description:
    "Cestas gourmet con quesos, embutidos y vinos de Navarra, listas para regalar o compuestas a medida. También regalos de empresa y cestas de Navidad.",
  path: "/regalos",
});

export default async function GiftsPage() {
  const gifts = await getGiftBoxes();
  return (
    <>
      <PageHeader
        eyebrow="Regalos y cestas"
        title="Un pedazo de Navarra para regalar"
        intro="Cestas listas para regalar y composiciones a medida. También para empresas y para Navidad."
      />
      <div className="container-site pb-16 lg:pb-24">
        <h2 className="sr-only">Nuestras cestas</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gifts.map((g) => (
            <li key={g.slug} id={g.slug} className="scroll-mt-8">
              <GiftCard gift={g} />
            </li>
          ))}
        </ul>
      </div>
      <Section tone="papel" aria-labelledby="a-medida">
        <div className="max-w-2xl">
          <h2 id="a-medida" className="text-[32px] leading-tight tracking-[-0.02em] lg:text-[44px]">
            ¿Buscas algo a medida?
          </h2>
          <p className="mt-4 text-[17px] text-secundario">
            Cuéntanos para quién es, cuántas unidades necesitas y tu presupuesto, y te preparamos una
            propuesta.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/visitanos#contacto">Escríbenos</ButtonLink>
            <ButtonLink href={site.phone.href} variant="secondary">
              Llamar al {site.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
