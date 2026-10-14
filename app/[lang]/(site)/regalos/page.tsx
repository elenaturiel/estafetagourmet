import { Link } from "@/components/ui/Link";
import { GiftPairCard } from "@/components/cards/GiftPairCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { GIFT_PAIRS, GIFT_PRODUCTS, LOT_RECIPIENTS, RECIPIENTS, giftsHref, isRecipient } from "@/data/gifts";
import { getAllProducts, getProducerMap } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { fmt } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { localizeGiftPair } from "@/data/i18n/gifts";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import type { Product } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.pages.gifts.metaTitle, description: t.pages.gifts.metaDescription, path: "/regalos" });
}

export default async function GiftsPage({ searchParams }: { searchParams: Promise<{ para?: string | string[] }> }) {
  const { para: raw } = await searchParams;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const para = isRecipient(value) ? value : undefined;
  const [all, producers, t, locale] = await Promise.all([getAllProducts(), getProducerMap(), getT(), getLocale()]);
  const g = t.pages.gifts;
  const recipient = para ? t.gifts.recipients[para] : undefined;
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const match = (list: string[]) => !para || (list as string[]).includes(para);

  const lots = Object.entries(LOT_RECIPIENTS)
    .filter(([, list]) => match(list))
    .map(([slug]) => bySlug.get(slug))
    .filter((p): p is Product => Boolean(p));
  const pairs = GIFT_PAIRS.map((p) => localizeGiftPair(p, locale)).filter((p) => match(p.para)).flatMap((p) => {
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
        eyebrow={g.eyebrow}
        title={recipient ? recipient.label : g.title}
        intro={
          recipient ? fmt(g.introRecipient, { blurb: recipient.blurb }) : g.intro
        }
      />
      <div className="container-site pb-12 lg:pb-24">
        <nav aria-label={g.navAria}>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href={giftsHref()} aria-current={!para ? "page" : undefined} className={chip(!para)}>
                {g.all}
              </Link>
            </li>
            {RECIPIENTS.map((r) => (
              <li key={r.slug}>
                <Link href={giftsHref(r.slug)} aria-current={para === r.slug ? "page" : undefined} className={chip(para === r.slug)}>
                  {t.gifts.recipients[r.slug].label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {lots.length ? (
          <section aria-labelledby="g-lotes" className="mt-9 lg:mt-12">
            <div className="flex items-end justify-between gap-4">
              <h2 id="g-lotes" className="text-[24px] tracking-[-0.015em] lg:text-[36px]">{g.lots}</h2>
              <Link href="/tienda/lotes" className="text-[15px] font-semibold text-vino hover:underline">
                {g.seeAllLots}
              </Link>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:mt-6 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
              {lots.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} headingLevel="h3" lift />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {pairs.length ? (
          <section aria-labelledby="g-parejas" className="mt-12 lg:mt-16">
            <h2 id="g-parejas" className="text-[24px] tracking-[-0.015em] lg:text-[36px]">{g.pairs}</h2>
            <p className="mt-2 max-w-2xl text-[16px] text-secundario">
              {g.pairsText}
            </p>
            <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:mt-6 lg:gap-5 xl:grid-cols-3">
              {pairs.map((p) => (
                <li key={p.slug}>
                  <GiftPairCard name={p.name} blurb={p.blurb} products={p.products} producers={producers} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {singles.length ? (
          <section aria-labelledby="g-productos" className="mt-12 lg:mt-16">
            <h2 id="g-productos" className="text-[24px] tracking-[-0.015em] lg:text-[36px]">{g.singles}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:mt-6 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
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
