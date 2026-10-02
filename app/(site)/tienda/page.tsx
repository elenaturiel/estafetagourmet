import { CategoryCard } from "@/components/cards/CategoryCard";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllProducts, getProducers } from "@/lib/catalog";
import { getCategoryTree } from "@/lib/category-tree";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tienda online de productos gourmet navarros",
  description:
    "Quesos, embutidos, vinos D.O. Navarra, espárragos, conservas, aceites, dulces y más de pequeños productores navarros. Envío a toda la península en 24–48 h o recogida en Pamplona.",
  path: "/tienda",
});

export default async function ShopPage() {
  const [products, producers] = await Promise.all([getAllProducts(), getProducers()]);
  const tree = getCategoryTree();
  // Filtro de categorías: solo las que ya tienen productos.
  const filterGroups = tree.map((g) => ({
    name: g.name,
    items: g.sections.flatMap((s) => s.items).filter((c) => c.count > 0),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Tienda online"
        title="Tienda"
        intro="Todo lo que tenemos en la estantería de la calle Estafeta, ahora también con envío a casa."
      />
      <div className="container-site space-y-12 pb-14 lg:space-y-14 lg:pb-20">
        <h2 className="sr-only">Categorías</h2>
        {tree
          .filter((g) => g.slug !== "lotes")
          .map((g) => (
            <section key={g.slug} aria-labelledby={`tienda-${g.slug}`}>
              <h3 id={`tienda-${g.slug}`} className="mb-6 border-b border-linea pb-3 text-[28px] leading-none lg:text-[34px]">
                {g.name}
              </h3>
              <div className="space-y-8">
                {g.sections.map((section, i) => (
                  <div key={section.name ?? i}>
                    {section.name ? (
                      <p className="mb-4 text-[13px] font-semibold tracking-[0.1em] text-secundario uppercase">
                        {section.name}
                      </p>
                    ) : null}
                    <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5 lg:grid-cols-9 lg:gap-x-5">
                      {section.items.map((c) => (
                        <li key={c.slug}>
                          <CategoryCard category={c} size="sm" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
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
            categoryGroups={filterGroups}
          />
        </div>
      </section>
    </>
  );
}
