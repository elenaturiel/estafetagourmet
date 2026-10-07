import Link from "next/link";
import { GiftPairCard } from "@/components/cards/GiftPairCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { GIFT_PAIRS, GIFT_PRODUCTS, LOT_RECIPIENTS, RECIPIENTS, giftsHref, isRecipient } from "@/data/gifts";
import { getAllProducts, getProducerMap } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";
import type { Product } from "@/lib/types";

export const metadata = pageMetadata({
  title: "Ideas de regalo: lotes, parejas y productos de Navarra",
  description:
    "Regalos con sabor a Navarra para padres, amigos, parejas, eventos y empresas: lotes, parejas de productos que combinan y productos sueltos.",
  path: "/regalos",
});

export default async function GiftsPage({ searchParams }: { searchParams: Promise<{ para?: string | string[] }> }) {
  const { para: raw } = await searchParams;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const para = isRecipient(value) ? value : undefined;
  const recipient = RECIPIENTS.find((r) => r.slug === para);

  const [all, producers] = await Promise.all([getAllProducts(), getProducerMap()]);
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const match = (list: string[]) => !para || (list as string[]).includes(para);

  const lots = Object.entries(LOT_RECIPIENTS)
    .filter(([, list]) => match(list))
    .map(([slug]) => bySlug.get(slug))
    .filter((p): p is Product => Boolean(p));
  const pairs = GIFT_PAIRS.filter((p) => match(p.para)).flatMap((p) => {
    const a = bySlug.get(p.products[0]);
    const b = bySlug.get(p.products[1]);
    return a && b ? [{ ...p, products: [a, b] as [Product, Product] }] : [];
  });
  const singles = GIFT_PRODUCTS.filter((g) => match(g.para))
    .map((g) => bySlug.get(g.slug))
    .filter((p): p is Product => Boolean(p));

  const chip = (active: boolean) =>
    cn(
      "inline-flex min-h-[44px] items-center rounded-full border px-5 text-[14px] font-semibold transition-colors",
      active ? "border-vino bg-vino text-crema" : "border-tinta text-tinta hover:bg-tinta hover:text-crema",
    );

  return (
    <>
      <PageHeader
        eyebrow="Ideas de regalo"
        title={recipient ? recipient.label : "Ideas de regalo"}
        intro={
          recipient
            ? `${recipient.blurb}. Lotes ya preparados, parejas de productos que combinan y productos sueltos.`
            : "Lotes ya preparados, parejas de productos que combinan bien y productos sueltos. Elige para quién es y te enseñamos lo que mejor funciona."
        }
      />
      <div className="container-site pb-16 lg:pb-24">
        <nav aria-label="Para quién es el regalo">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href={giftsHref()} aria-current={!para ? "page" : undefined} className={chip(!para)}>
                Todo
              </Link>
            </li>
            {RECIPIENTS.map((r) => (
              <li key={r.slug}>
                <Link href={giftsHref(r.slug)} aria-current={para === r.slug ? "page" : undefined} className={chip(para === r.slug)}>
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {lots.length ? (
          <section aria-labelledby="g-lotes" className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <h2 id="g-lotes" className="text-[28px] tracking-[-0.015em] lg:text-[36px]">Lotes</h2>
              <Link href="/tienda/lotes" className="text-[15px] font-semibold text-vino hover:underline">
                Ver todos los lotes →
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
              {lots.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} headingLevel="h3" lift />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {pairs.length ? (
          <section aria-labelledby="g-parejas" className="mt-16">
            <h2 id="g-parejas" className="text-[28px] tracking-[-0.015em] lg:text-[36px]">Parejas que funcionan</h2>
            <p className="mt-2 max-w-2xl text-[16px] text-secundario">
              Dos productos que se llevan bien, con un solo botón para añadir los dos.
            </p>
            <ul className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {pairs.map((p) => (
                <li key={p.slug}>
                  <GiftPairCard name={p.name} blurb={p.blurb} products={p.products} producers={producers} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {singles.length ? (
          <section aria-labelledby="g-productos" className="mt-16">
            <h2 id="g-productos" className="text-[28px] tracking-[-0.015em] lg:text-[36px]">Productos para regalar</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
              {singles.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
