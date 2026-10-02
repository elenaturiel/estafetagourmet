import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { CategoryMenu } from "@/components/shop/CategoryMenu";
import { getCategories, getCategory, getProducers, getProducts } from "@/lib/catalog";
import { getCategoryTree } from "@/lib/category-tree";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

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
  const tree = getCategoryTree();
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
        <header className="mt-6 mb-7 lg:mb-8">
          <h1 className="text-[42px] leading-[1.02] tracking-[-0.025em] lg:text-[68px]">
            {category.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[17px] text-secundario lg:text-[18px]">{category.intro}</p>
        </header>
        <div className="mb-10 lg:mb-12">
          <CategoryMenu tree={tree} current={category.slug} currentName={category.name} />
        </div>
        {products.length ? (
          <CategoryBrowser products={products} producers={producers} filters={category.filters} />
        ) : (
          <EmptyCategory name={category.name} />
        )}
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

/** Categoría que aún no tiene productos en la web. */
function EmptyCategory({ name }: { name: string }) {
  return (
    <div className="border border-linea bg-papel px-6 py-12 text-center lg:py-16">
      <p className="eyebrow text-vino">Muy pronto</p>
      <p className="mx-auto mt-3 max-w-xl font-serif text-[26px] leading-tight lg:text-[32px]">
        Estamos preparando nuestra selección de {name.toLowerCase()} para la tienda online
      </p>
      <p className="mx-auto mt-3 max-w-lg text-[16px] text-secundario">
        Mientras tanto, pásate por la tienda en {site.address.street} o llámanos y te
        contamos qué tenemos.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={site.phone.href}>Llamar al {site.phone.display}</ButtonLink>
        <ButtonLink href="/tienda" variant="secondary">
          Ver otras categorías
        </ButtonLink>
      </div>
    </div>
  );
}
