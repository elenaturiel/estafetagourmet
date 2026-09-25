import Link from "next/link";
import { GiftCard } from "@/components/cards/GiftCard";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getGiftBoxes, getOccasions } from "@/lib/catalog";

export async function GiftsBand() {
  const [gifts, occasions] = await Promise.all([getGiftBoxes(), getOccasions()]);
  return (
    <section aria-labelledby="regalos-title" className="on-dark relative overflow-hidden bg-vino py-16 text-crema lg:py-24">
      {/* Motivo decorativo: gran arco de fondo */}
      <div
        aria-hidden="true"
        className="arch pointer-events-none absolute -top-40 -right-40 h-[560px] w-[440px] border border-crema/15"
      />
      <div className="container-site relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-14">
          <div data-reveal>
            <p className="eyebrow text-dorado">Regalos y cestas</p>
            <h2
              id="regalos-title"
              className="mt-4 text-[40px] leading-[1.02] tracking-[-0.02em] lg:text-[56px]"
            >
              Un pedazo de Navarra <em className="font-normal text-dorado italic">para regalar</em>
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
          <ul data-reveal-stagger className="rail rail-focus -mx-6 auto-cols-[78%] gap-4 px-6 sm:auto-cols-[46%] lg:mx-0 lg:grid-flow-row lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
            {gifts.map((g) => (
              <li key={g.slug}>
                <GiftCard gift={g} />
              </li>
            ))}
          </ul>
        </div>

        {/* Regalos por ocasión */}
        <div className="mt-16 border-t border-crema/20 pt-10 lg:mt-20">
          <h3 className="font-serif text-[24px] lg:text-[28px]">¿Qué celebras?</h3>
          <ul data-reveal-stagger className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {occasions.map((o) => (
              <li key={o.slug}>
                <Link href={o.href} className="group flex items-center gap-4">
                  <div className="arch w-20 shrink-0 overflow-hidden lg:w-24">
                    <ImagePlaceholder
                      label=""
                      src={o.image.src}
                      alt={o.image.src ? o.image.alt : undefined}
                      ratio="3 / 4"
                      className="transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>
                  <span>
                    <span className="block font-serif text-[20px] leading-tight group-hover:text-dorado lg:text-[22px]">
                      {o.name}
                    </span>
                    <span className="mt-1 hidden text-[14px] text-crema-sobre-vino sm:block">{o.line}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
