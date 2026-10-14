import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ProductCard, tagClass } from "@/components/cards/ProductCard";
import { FreeShippingMeter } from "@/components/cart/FreeShippingMeter";
import { ButtonLink } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { CheckCircleIcon, PinIcon, TruckIcon } from "@/components/ui/icons";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { localizePairing } from "@/data/i18n/pairings";
import { isPlaceholder, site } from "@/data/site";
import {
  getAllProductsRaw,
  getCategory,
  getProducerMap,
  getProduct,
  getProducts,
  getProductsBySlugs,
  localize,
  productByline,
  productHref,
} from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { fmt } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { pairingsFor } from "@/lib/pairings";
import { shippingArea, shippingSummary } from "@/lib/shipping";
import { productJsonLd } from "@/lib/structured-data";

type Params = { params: Promise<{ categoria: string; producto: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getAllProductsRaw();
  return products.map((p) => ({ categoria: p.categorySlug, producto: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categoria, producto } = await params;
  const [product, category, t, locale] = await Promise.all([
    getProduct(categoria, producto),
    getCategory(categoria),
    getT(),
    getLocale(),
  ]);
  if (!product || !category) return {};
  const description = isPlaceholder(product.description)
    ? fmt(t.shop.product.metaDescription, { name: product.name, site: site.name })
    : product.description;
  return pageMetadata({
    locale,
    title: `${product.name} · ${category.name}`,
    description,
    path: productHref(product),
    image: product.image.src,
  });
}

const summaryClass =
  "flex min-h-[52px] cursor-pointer list-none items-center justify-between font-serif text-[19px] lg:min-h-[56px] lg:text-[20px] [&::-webkit-details-marker]:hidden";
const plus = <span aria-hidden="true" className="text-vino transition-transform group-open:rotate-45">+</span>;

export default async function ProductPage({ params }: Params) {
  const { categoria, producto } = await params;
  const [product, category, producers, t, locale] = await Promise.all([
    getProduct(categoria, producto),
    getCategory(categoria),
    getProducerMap(),
    getT(),
    getLocale(),
  ]);
  if (!product || !category) notFound();
  const s = t.shop.product;

  const producer = product.producerSlug ? producers[product.producerSlug] : undefined;
  // "Combina con": maridajes definidos en los datos o, si no hay, otros de la categoría.
  const pairs = product.pairsWith?.length
    ? await getProductsBySlugs(product.pairsWith)
    : (await getProducts({ category: product.categorySlug })).filter((p) => p.slug !== product.slug);
  // Los maridajes se emparejan con los nombres originales (en español) y se traducen después.
  const raws = await getAllProductsRaw();
  const raw = raws.find((p) => p.slug === product.slug)!;
  const pairings = await Promise.all(
    pairingsFor(raw, raws)
      .slice(0, 2)
      .map(async (x) => ({ ...x, pairing: localizePairing(x.pairing, locale), partners: await Promise.all(x.partners.map(localize)) })),
  );
  const href = productHref(product);
  const byline = productByline(product, producer);
  const cartItem = {
    id: product.slug,
    name: product.name,
    href,
    price: product.price,
    byline,
    imageLabel: product.image.placeholder,
  };
  const spec = product.specs;

  return (
    <div className="container-site pt-5 pb-0 lg:pt-10 lg:pb-24">
      <JsonLd data={productJsonLd(product, href, producer, locale)} />
      <Breadcrumbs
        items={[
          { name: t.shop.breadcrumb.home, path: "/" },
          { name: t.shop.breadcrumb.shop, path: "/tienda" },
          { name: category.name, path: `/tienda/${category.slug}` },
          { name: product.name, path: href },
        ]}
      />
      <div className="mt-4 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="relative lg:sticky lg:top-40 lg:self-start">
          <ProductGallery images={product.gallery ?? [product.image]}>
            {product.tags?.length ? (
              <ul className="absolute top-4 left-4 flex flex-col items-start gap-1.5" aria-label={s.tags}>
                {product.tags.map((tag) => (
                  <li key={tag} className={tagClass(tag)}>
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </ProductGallery>
        </div>
        <div className="max-w-xl">
          {byline ? (
            <p className="text-[12px] font-semibold tracking-[0.1em] text-secundario uppercase lg:text-[13px]">{byline}</p>
          ) : null}
          <h1 className="mt-1.5 text-[30px] leading-[1.06] tracking-[-0.02em] lg:mt-2 lg:text-[56px] lg:leading-[1.03]">
            {product.name}
          </h1>
          {product.price === null ? (
            <p className="mt-4 text-[22px] font-semibold text-secundario lg:mt-5 lg:text-[24px]">{s.priceOnRequest}</p>
          ) : (
            <>
              <p className="mt-4 text-[26px] font-semibold tabular-nums lg:mt-5 lg:text-[28px]">{formatPrice(product.price, locale)}</p>
              <p className="mt-0.5 text-[13px] text-secundario">{s.vat}</p>
            </>
          )}
          <p className="mt-4 text-[16px] leading-[1.6] text-secundario lg:mt-6 lg:text-[17px]">{product.description}</p>

          <div id="comprar" className="mt-6 hidden lg:mt-8 lg:block">
            {product.price === null ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <ButtonLink href="/visitanos#contacto">{s.askPrice}</ButtonLink>
                <ButtonLink href={site.phone.href} variant="secondary">
                  {fmt(s.call, { phone: site.phone.display })}
                </ButtonLink>
              </div>
            ) : (
              <AddToCartButton variant="primary" size="md" item={cartItem} />
            )}
          </div>
          <div className="mt-5 rounded-eg border border-linea bg-papel p-4">
            <FreeShippingMeter subtotal={null} />
          </div>

          <ul className="mt-5 grid gap-2.5 text-[14px] lg:mt-6 lg:gap-3 lg:text-[15px]">
            <li className="flex items-start gap-3">
              <TruckIcon className="mt-0.5 shrink-0 text-vino" />
              {fmt(s.shipLine, { cost: formatPrice(site.shipping.cost, locale), lead: site.shipping.leadTime, noDelivery: t.common.site.noDelivery })}
            </li>
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-vino" /> {fmt(s.pickupLine, { street: site.address.street })}
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="mt-0.5 shrink-0 text-vino" /> {s.selectedLine}
            </li>
          </ul>

          <div className="mt-6 border-t border-linea lg:mt-8">
            {product.details ? (
              <details className="group border-b border-linea" open>
                <summary className={summaryClass}>
                  {s.lotContents}
                  {plus}
                </summary>
                <ul className="pb-5">
                  {product.details.contents.map((c) => (
                    <li key={c.name} className="border-b border-linea py-2.5 last:border-b-0">
                      <p className="text-[16px] font-semibold">{c.name}</p>
                      <p className="text-[14px] text-secundario">{c.by}</p>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
            <details className="group border-b border-linea" open={!product.details}>
              <summary className={summaryClass}>
                {s.details}
                {plus}
              </summary>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 pb-5 text-[15px]">
                <dt className="text-secundario">{s.category}</dt>
                <dd>{category.name}</dd>
                {producer ? (
                  <>
                    <dt className="text-secundario">{s.producer}</dt>
                    <dd>{producer.name}</dd>
                    <dt className="text-secundario">{s.origin}</dt>
                    <dd>{fmt(s.originValue, { locality: producer.locality })}</dd>
                  </>
                ) : null}
                {spec?.weight ? (
                  <>
                    <dt className="text-secundario">{s.weight}</dt>
                    <dd>{spec.weight}</dd>
                  </>
                ) : null}
                {spec?.packaging ? (
                  <>
                    <dt className="text-secundario">{s.packaging}</dt>
                    <dd>{spec.packaging}</dd>
                  </>
                ) : null}
                {spec?.other ? (
                  <>
                    <dt className="text-secundario">{s.more}</dt>
                    <dd>{spec.other}</dd>
                  </>
                ) : null}
                {spec?.reference ? (
                  <>
                    <dt className="text-secundario">{s.refWeight}</dt>
                    <dd>{spec.reference.replace(/^Ref\.:?\s*/, "")}</dd>
                  </>
                ) : null}
              </dl>
            </details>
            {spec?.ingredients || spec?.allergens ? (
              <details className="group border-b border-linea">
                <summary className={summaryClass}>
                  {s.ingredientsAllergens}
                  {plus}
                </summary>
                <div className="space-y-4 pb-5 text-[15px] leading-[1.6]">
                  {spec.ingredients ? (
                    <div>
                      <p className="eyebrow mb-1 text-[12px] text-vino">{s.ingredients}</p>
                      <p className="text-secundario">{spec.ingredients}</p>
                    </div>
                  ) : null}
                  {spec.allergens ? (
                    <div>
                      <p className="eyebrow mb-1 text-[12px] text-vino">{s.allergens}</p>
                      <p className="text-secundario">{spec.allergens}</p>
                    </div>
                  ) : null}
                  <p className="text-[13px] text-secundario">{spec.exact ? s.exactNote : s.refNote}</p>
                </div>
              </details>
            ) : null}
            <details className="group border-b border-linea" open={Boolean(product.details)}>
              <summary className={summaryClass}>
                {s.storagePairing}
                {plus}
              </summary>
              {product.details ? (
                <div className="space-y-4 pb-5 text-[15px] leading-[1.6] text-secundario">
                  <div>
                    <p className="eyebrow mb-1 text-[12px] text-vino">{s.why}</p>
                    {product.details.why.map((x) => (
                      <p key={x}>{x}</p>
                    ))}
                  </div>
                  <div>
                    <p className="eyebrow mb-1 text-[12px] text-vino">{s.serve}</p>
                    {product.details.serve.map((x) => (
                      <p key={x}>{x}</p>
                    ))}
                  </div>
                  <div>
                    <p className="eyebrow mb-1 text-[12px] text-vino">{s.storage}</p>
                    <p>{product.details.storage}</p>
                  </div>
                </div>
              ) : (
                <p className="pb-5 text-[15px] text-secundario">{s.storagePlaceholder}</p>
              )}
            </details>
            <details className="group border-b border-linea">
              <summary className={summaryClass}>
                {s.shipReturns}
                {plus}
              </summary>
              <p className="pb-5 text-[15px] text-secundario">
                {fmt(s.shipText, { area: shippingArea(t.cart, t.common.site.noDelivery), summary: shippingSummary(t.cart, locale) })}{" "}
                <Link href="/envios-y-devoluciones" className="text-vino underline underline-offset-2">
                  {s.shipLink}
                </Link>
                .
              </p>
            </details>
          </div>
        </div>
      </div>

      {pairings.length ? (
        <section aria-labelledby="maridaje-title" className="mt-12 border-t border-linea pt-10 lg:mt-28 lg:pt-14">
          <p className="eyebrow text-vino">{s.pairing}</p>
          <h2 id="maridaje-title" className="mt-2 text-[26px] leading-tight tracking-[-0.02em] lg:mt-3 lg:text-[44px]">
            {s.pairWhat}
          </h2>
          <ul className="mt-6 grid gap-6 lg:mt-8 lg:gap-8">
            {pairings.map(({ group, pairing, partners }) => (
              <li key={pairing.n} className="grid gap-5 border border-linea bg-papel p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-6 lg:p-8">
                <div>
                  <p className="eyebrow text-[12px] text-secundario">{pairing.kicker}</p>
                  <h3 className="mt-2 text-[21px] leading-snug tracking-[-0.015em] lg:text-[24px]">{pairing.title}</h3>
                  <p className="mt-1 font-serif text-[17px] text-vino italic lg:text-[18px]">{fmt(s.pairWith, { drink: pairing.with })}</p>
                  <p className="mt-3 text-[15px] leading-[1.6] text-secundario">{pairing.text}</p>
                  <Link href={`/maridajes#${group}`} className="mt-3 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-vino hover:underline">
                    {s.pairAll}
                  </Link>
                </div>
                {partners.length ? (
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
                    {partners.map((p) => (
                      <li key={p.slug}>
                        <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {pairs.length ? (
        <section aria-labelledby="combina-title" className="mt-12 border-t border-linea pt-10 lg:mt-28 lg:pt-14">
          <p className="eyebrow text-vino">{s.pairing}</p>
          <h2 id="combina-title" className="mt-2 text-[26px] leading-tight tracking-[-0.02em] lg:mt-3 lg:text-[44px]">
            {s.combines}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-4 lg:mt-8 lg:gap-x-6">
            {pairs.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Barra de compra en móvil: se queda abajo mientras se ve la ficha y deja libre el pie */}
      <div className="sticky bottom-0 z-30 -mx-4 mt-10 flex items-center gap-3 border-t border-linea bg-crema/95 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-[15px] leading-tight">{product.name}</p>
          <p className="text-[15px] font-semibold">
            {product.price === null ? s.priceOnRequest : formatPrice(product.price, locale)}
          </p>
        </div>
        <div className="w-[150px] shrink-0">
          {product.price === null ? (
            <ButtonLink href="/visitanos#contacto" size="sm" className="w-full">
              {s.consult}
            </ButtonLink>
          ) : (
            <AddToCartButton variant="primary" label={s.add} item={cartItem} />
          )}
        </div>
      </div>
    </div>
  );
}
