import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { getCategories, getCategory, getProducers, getProducts } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ categoria: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categoria } = await params;
  const category = await getCategory(categoria);
  if (!category) return {};
  return pageMetadata({
    title: category.seo.title,
    description: category.seo.description,
    path: `/tienda/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { categoria } = await params;
  const category = await getCategory(categoria);
  if (!category) notFound();

  const [products, allProducers] = await Promise.all([
    getProducts({ category: category.slug }),
    getProducers(),
  ]);
  // Solo los productores que tienen productos en esta categoría.
  const producerSlugs = new Set(products.map((p) => p.producerSlug).filter(Boolean));
  const producers = allProducers.filter((p) => producerSlugs.has(p.slug));

  return (
    <>
      <div className="container-site pt-8 pb-16 lg:pt-10 lg:pb-24">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Tienda", path: "/tienda" },
            { name: category.name, path: `/tienda/${category.slug}` },
          ]}
        />
        <header className="mt-6 mb-10 lg:mb-14">
          <h1 className="text-[40px] leading-[1.05] tracking-[-0.02em] lg:text-[60px]">
            {category.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[17px] text-secundario">{category.intro}</p>
        </header>
        <CategoryBrowser products={products} producers={producers} filters={category.filters} />
      </div>

      <section aria-labelledby="seo-title" className="border-t border-linea bg-papel py-14 lg:py-16">
        <div className="container-site">
          <h2 id="seo-title" className="text-[26px] leading-tight tracking-[-0.015em] lg:text-[32px]">
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
