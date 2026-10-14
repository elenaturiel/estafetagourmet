import { ProductCard } from "@/components/cards/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { getProducers, getProducts } from "@/lib/catalog";
import { getT } from "@/lib/i18n/server";

/**
 * Banda vino con la categoría Lotes. Los productos salen de la hoja de
 * productos (familia LOTES), igual que el resto de la tienda.
 */
export async function LotsBand() {
  const [lots, producers, t] = await Promise.all([getProducts({ category: "lotes" }), getProducers(), getT()]);
  if (!lots.length) return null;
  const producerMap = Object.fromEntries(producers.map((p) => [p.slug, p]));

  return (
    <section
      aria-labelledby="lotes-title"
      className="on-dark relative overflow-hidden bg-vino py-10 text-crema lg:py-24"
    >
      {/* Motivo decorativo: gran arco de fondo */}
      <div
        aria-hidden="true"
        className="arch pointer-events-none absolute -top-40 -right-40 hidden h-[560px] w-[440px] border border-crema/15 lg:block"
      />
      <div className="container-site relative grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-14">
        <div data-reveal>
          <p className="eyebrow text-dorado">{t.home.lots.eyebrow}</p>
          <h2
            id="lotes-title"
            className="mt-2 text-[30px] leading-[1.05] tracking-[-0.02em] lg:mt-4 lg:text-[56px]"
          >
            {t.home.lots.title} <em className="font-normal text-dorado italic">{t.home.lots.em}</em>
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-[1.55] text-crema-sobre-vino lg:mt-5 lg:text-[17px] lg:leading-[1.6]">
            {t.home.lots.text}
          </p>
          <div className="mt-6 hidden lg:mt-8 lg:block">
            <ButtonLink href="/tienda/lotes" variant="cream" className="w-full sm:w-auto">
              {t.home.lots.button}
            </ButtonLink>
          </div>
        </div>
        <ul
          data-reveal-stagger
          className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5"
        >
          {lots.slice(0, 6).map((lot, i) => (
            <li key={lot.slug} className={i >= 4 ? "max-lg:hidden" : undefined}>
              <div className="h-full rounded-eg bg-papel p-2.5 text-tinta lg:p-4">
                <ProductCard
                  product={lot}
                  producer={lot.producerSlug ? producerMap[lot.producerSlug] : undefined}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="lg:hidden">
          <ButtonLink href="/tienda/lotes" variant="cream" className="w-full">
            {t.home.lots.button}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
