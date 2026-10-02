import { ProductCard } from "@/components/cards/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { getProducers, getProducts } from "@/lib/catalog";

/**
 * Banda vino con la categoría Lotes. Los productos salen de la hoja de
 * productos (familia LOTES), igual que el resto de la tienda.
 */
export async function LotsBand() {
  const [lots, producers] = await Promise.all([getProducts({ category: "lotes" }), getProducers()]);
  if (!lots.length) return null;
  const producerMap = Object.fromEntries(producers.map((p) => [p.slug, p]));

  return (
    <section
      aria-labelledby="lotes-title"
      className="on-dark relative overflow-hidden bg-vino py-16 text-crema lg:py-24"
    >
      {/* Motivo decorativo: gran arco de fondo */}
      <div
        aria-hidden="true"
        className="arch pointer-events-none absolute -top-40 -right-40 h-[560px] w-[440px] border border-crema/15"
      />
      <div className="container-site relative grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-14">
        <div data-reveal>
          <p className="eyebrow text-dorado">Lotes</p>
          <h2
            id="lotes-title"
            className="mt-4 text-[40px] leading-[1.02] tracking-[-0.02em] lg:text-[56px]"
          >
            Lo mejor de Navarra, <em className="font-normal text-dorado italic">en un lote</em>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-[1.6] text-crema-sobre-vino">
            Selecciones de producto navarro ya preparadas, para disfrutar en casa o para regalar.
          </p>
          <div className="mt-8">
            <ButtonLink href="/tienda/lotes" variant="cream" className="w-full sm:w-auto">
              Ver todos los lotes
            </ButtonLink>
          </div>
        </div>
        <ul
          data-reveal-stagger
          className="rail rail-focus -mx-6 auto-cols-[72%] gap-4 px-6 sm:auto-cols-[44%] lg:mx-0 lg:grid-flow-row lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0"
        >
          {lots.slice(0, 6).map((lot) => (
            <li key={lot.slug}>
              <div className="h-full rounded-eg bg-papel p-3 text-tinta lg:p-4">
                <ProductCard
                  product={lot}
                  producer={lot.producerSlug ? producerMap[lot.producerSlug] : undefined}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
