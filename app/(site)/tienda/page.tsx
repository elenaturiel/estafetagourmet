import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { CategoryMenu } from "@/components/shop/CategoryMenu";
import { getAllProducts, getProducers } from "@/lib/catalog";
import { getCategoryTree } from "@/lib/category-tree";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tienda online de productos gourmet navarros",
  description:
    "Quesos, embutidos, vinos D.O. Navarra, espárragos, conservas, aceites, dulces y más de pequeños productores navarros. Envío a toda la península en 24–48 h o recogida en Pamplona.",
  path: "/tienda",
});

/**
 * Tienda: el desplegable de categorías (Comida / Bebida / Lotes) queda fijo
 * bajo la cabecera y los productos salen directamente, con sus filtros.
 */
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
      <header className="container-site pt-8 pb-5 lg:pt-10">
        <h1 className="text-[40px] leading-[1.05] tracking-[-0.02em] lg:text-[56px]">Tienda</h1>
        <p className="mt-2 max-w-2xl text-[16px] text-secundario">
          Todo lo que tenemos en la estantería de la calle Estafeta, ahora también con envío a casa.
        </p>
      </header>

      {/* Barra fija bajo la cabecera (en escritorio) con el desplegable de categorías.
          Sin backdrop-filter para no romper la hoja de categorías del móvil. */}
      <div className="z-30 border-y border-linea bg-crema py-3 lg:sticky lg:top-[var(--header-h,0px)]">
        <div className="container-site">
          <CategoryMenu tree={tree} />
        </div>
      </div>

      <div className="container-site pt-8 pb-16 lg:pt-10 lg:pb-24">
        <h2 className="sr-only">Todos los productos</h2>
        <CategoryBrowser
          products={products}
          producers={producers}
          filters={[]}
          categoryGroups={filterGroups}
        />
      </div>
    </>
  );
}
