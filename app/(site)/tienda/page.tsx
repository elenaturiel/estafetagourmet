import { CategoryCard } from "@/components/cards/CategoryCard";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllProducts, getCategories, getProducers } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tienda online de productos gourmet navarros",
  description:
    "Quesos, embutidos, vinos D.O. Navarra, espárragos, conservas, aceites, dulces y más de pequeños productores navarros. Envío a toda la península en 24–48 h o recogida en Pamplona.",
  path: "/tienda",
});

export default async function ShopPage() {
  const [categories, products, producers] = await Promise.all([
    getCategories(),
    getAllProducts(),
    getProducers(),
  ]);
  // Solo categorías con productos en el filtro; las demás ("muy pronto") siguen en el muro de arriba.
  const withProducts = new Set(products.map((p) => p.categorySlug));
  return (
    <>
      <PageHeader
        eyebrow="Tienda online"
        title="Tienda"
        intro="Todo lo que tenemos en la estantería de la calle Estafeta, ahora también con envío a casa."
      />
      <div className="container-site pb-14 lg:pb-20">
        <h2 className="sr-only">Categorías</h2>
        <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-5 xl:grid-cols-12 xl:gap-x-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <CategoryCard category={c} size="sm" />
            </li>
          ))}
        </ul>
      </div>
      <section aria-labelledby="todos-title" className="border-t border-linea bg-papel py-14 lg:py-20">
        <div className="container-site">
          <h2 id="todos-title" className="mb-10 text-[34px] leading-[1.05] tracking-[-0.02em] lg:text-[48px]">
            Todos los productos
          </h2>
          <CategoryBrowser
            products={products}
            producers={producers}
            filters={[]}
            categories={categories.filter((c) => withProducts.has(c.slug) && !c.href)}
          />
        </div>
      </section>
    </>
  );
}
