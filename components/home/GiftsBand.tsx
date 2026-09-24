import { GiftCard } from "@/components/cards/GiftCard";
import { ButtonLink } from "@/components/ui/Button";
import { getGiftBoxes } from "@/lib/catalog";

export async function GiftsBand() {
  const gifts = await getGiftBoxes();
  return (
    <section aria-labelledby="regalos-title" className="on-dark bg-vino py-16 text-crema lg:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow text-dorado">Regalos y cestas</p>
          <h2
            id="regalos-title"
            className="mt-4 text-[36px] leading-[1.08] tracking-[-0.02em] lg:text-[52px]"
          >
            Un pedazo de Navarra para regalar
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-[1.6] text-crema-sobre-vino">
            Cestas listas para regalar y composiciones a medida. También para empresas y para
            Navidad.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/regalos" variant="cream" className="w-full sm:w-auto">
              Ver cestas
            </ButtonLink>
            <ButtonLink
              href="/regalos#regalo-de-empresa"
              variant="outline-cream"
              className="w-full sm:w-auto"
            >
              Regalo de empresa
            </ButtonLink>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 lg:gap-5">
          {gifts.map((g) => (
            <li key={g.slug}>
              <GiftCard gift={g} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
