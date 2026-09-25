import type { Metadata } from "next";
import { ProductCard } from "@/components/cards/ProductCard";
import { inputClasses } from "@/components/forms/Field";
import { buttonClasses } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllProducts, getCategories, getProducerMap } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Buscar productos",
  description: "Busca quesos, vinos, embutidos, conservas y cestas de regalo en Estafeta Gourmet.",
  alternates: { canonical: "/buscar" },
};

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q: raw } = await searchParams;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  const [products, categories, producers] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getProducerMap(),
  ]);
  const categoryName = Object.fromEntries(categories.map((c) => [c.slug, c.name]));
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  const results = terms.length
    ? products.filter((p) => {
        const haystack = normalize(`${p.name} ${categoryName[p.categorySlug] ?? ""}`);
        return terms.every((t) => haystack.includes(t));
      })
    : [];

  return (
    <>
      <PageHeader title="Buscar" />
      <div className="container-site pb-16 lg:pb-24">
        <form action="/buscar" role="search" className="flex max-w-xl gap-2">
          <label htmlFor="search-page" className="sr-only">
            Buscar productos
          </label>
          <input
            id="search-page"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Buscar quesos, vinos, cestas…"
            className={cn(inputClasses, "min-h-[52px]")}
          />
          <button type="submit" className={buttonClasses("primary", "md")}>
            Buscar
          </button>
        </form>
        {q ? (
          <p className="mt-8 text-[15px] text-secundario" role="status">
            {results.length} {results.length === 1 ? "resultado" : "resultados"} para «{q}»
          </p>
        ) : null}
        {results.length ? (
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
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
