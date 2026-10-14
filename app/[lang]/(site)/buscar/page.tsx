import type { Metadata } from "next";
import { ProductCard } from "@/components/cards/ProductCard";
import { inputClasses } from "@/components/forms/Field";
import { buttonClasses } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllProducts, getAllProductsRaw, getCategories, getProducerMap } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { fmt, localePath } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return { ...pageMetadata({ locale, title: t.shop.search.metaTitle, description: t.shop.search.metaDescription, path: "/buscar" }) };
}

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q: raw } = await searchParams;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  const [t, locale, products, raws, categories, producers] = await Promise.all([
    getT(),
    getLocale(),
    getAllProducts(),
    getAllProductsRaw(),
    getCategories(),
    getProducerMap(),
  ]);
  const original = Object.fromEntries(raws.map((p) => [p.slug, p.name]));
  const categoryName = Object.fromEntries(categories.map((c) => [c.slug, c.name]));
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  // Se busca en el nombre del idioma actual y también en el original en español.
  const results = terms.length
    ? products.filter((p) => {
        const haystack = normalize(
          `${p.name} ${original[p.slug] ?? ""} ${categoryName[p.categorySlug] ?? ""} ${p.producerSlug ? (producers[p.producerSlug]?.name ?? "") : ""}`,
        );
        return terms.every((term) => haystack.includes(term));
      })
    : [];

  return (
    <>
      <PageHeader title={t.shop.search.title} />
      <div className="container-site pb-12 lg:pb-24">
        <form action={localePath(locale, "/buscar")} role="search" className="flex max-w-xl gap-2">
          <label htmlFor="search-page" className="sr-only">
            {t.shop.search.label}
          </label>
          <input
            id="search-page"
            name="q"
            type="search"
            defaultValue={q}
            placeholder={t.common.header.searchPlaceholder}
            className={cn(inputClasses, "min-h-[52px]")}
          />
          <button type="submit" className={buttonClasses("primary", "md")}>
            {t.shop.search.submit}
          </button>
        </form>
        {q ? (
          <p className="mt-6 text-[15px] text-secundario lg:mt-8" role="status">
            {results.length === 1 ? fmt(t.shop.search.resultOne, { q }) : fmt(t.shop.search.resultMany, { n: results.length, q })}
          </p>
        ) : null}
        {results.length ? (
          <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:mt-6 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
            {results.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
