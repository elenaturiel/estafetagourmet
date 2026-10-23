import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { CategoryMenu } from "@/components/shop/CategoryMenu";
import { getCategories, getCategory, getProducers, getProducts } from "@/lib/catalog";
import { getCategoryTree } from "@/lib/category-tree";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { fmt } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { TIENDA_ONLINE } from "@/data/tienda-online";
import { ShopNotice } from "@/components/shop/ShopNotice";

type Params = { params: Promise<{ categoria: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  // Las categorías con enlace propio (`href`) no tienen página.
  return categories.filter((c) => !c.href).map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categoria } = await params;
  const category = await getCategory(categoria);
  if (!category) return {};
  return pageMetadata({
    locale: await getLocale(),
    title: category.seo.title,
    description: category.seo.description,
    path: `/tienda/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { categoria } = await params;
  const category = await getCategory(categoria);
  if (!category || category.href) notFound();

  const [products, allProducers] = await Promise.all([
    getProducts({ category: category.slug }),
    getProducers(),
  ]);
  const [tree, t] = await Promise.all([getCategoryTree(), getT()]);
  // Solo los productores que tienen productos en esta categoría.
  const producerSlugs = new Set(products.map((p) => p.producerSlug).filter(Boolean));
  const producers = allProducers.filter((p) => producerSlugs.has(p.slug));

  return (
    <>
      <div className="container-site pt-5 pb-12 lg:pt-10 lg:pb-24">
        <Breadcrumbs
          items={[
            { name: t.shop.breadcrumb.home, path: "/" },
            { name: t.shop.breadcrumb.shop, path: "/tienda" },
            { name: category.name, path: `/tienda/${category.slug}` },
          ]}
        />
        <header className="mt-4 mb-5 lg:mt-6 lg:mb-8">
          <h1 className="text-[32px] leading-[1.06] tracking-[-0.025em] sm:text-[42px] lg:text-[68px] lg:leading-[1.02]">
            {category.title}
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] text-secundario lg:mt-3 lg:text-[18px]">{category.intro}</p>
        </header>
        <div className="mb-6 lg:mb-12">
          <CategoryMenu tree={tree} current={category.slug} currentName={category.name} />
        </div>
        <ShopNotice className="mb-6 lg:mb-10" />
        {products.length ? (
          <CategoryBrowser products={products} producers={producers} filters={category.filters} />
        ) : (
          <EmptyCategory name={category.name} t={t.shop.category} />
        )}
      </div>

      <section aria-labelledby="seo-title" className="border-t border-linea bg-papel py-10 lg:py-16">
        <div className="container-site">
          <h2 id="seo-title" className="text-[22px] leading-tight tracking-[-0.015em] lg:text-[32px]">
            {category.seo.heading}
          </h2>
          {category.seo.text.map((p) => (
            <p key={p} className="mt-3 max-w-3xl text-[16px] leading-[1.6] text-secundario">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}

/** Categoría que aún no tiene productos en la web. */
function EmptyCategory({ name, t }: { name: string; t: Awaited<ReturnType<typeof getT>>["shop"]["category"] }) {
  return (
    <div className="border border-linea bg-papel px-5 py-10 text-center lg:px-6 lg:py-16">
      <p className="eyebrow text-vino">{t.soon}</p>
      <p className="mx-auto mt-3 max-w-xl font-serif text-[24px] leading-tight lg:text-[32px]">
        {fmt(t.soonTitle, { name: name.toLowerCase() })}
      </p>
      <p className="mx-auto mt-3 max-w-lg text-[16px] text-secundario">{fmt(t.soonText, { street: site.address.street })}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={site.phone.href}>{fmt(t.call, { phone: site.phone.display })}</ButtonLink>
        <ButtonLink href={TIENDA_ONLINE} variant="secondary">
          {t.seeOthers}
        </ButtonLink>
      </div>
    </div>
  );
}
