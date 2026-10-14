import type { Metadata } from "next";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { CategoryMenu } from "@/components/shop/CategoryMenu";
import { getAllProducts, getProducers } from "@/lib/catalog";
import { getCategoryTree } from "@/lib/category-tree";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.shop.page.metaTitle, description: t.shop.page.metaDescription, path: "/tienda" });
}

/**
 * Tienda: el desplegable de categorías (Comida / Bebida / Lotes) queda fijo
 * bajo la cabecera y los productos salen directamente, con sus filtros.
 */
export default async function ShopPage() {
  const [products, producers, tree, t] = await Promise.all([getAllProducts(), getProducers(), getCategoryTree(), getT()]);
  // Filtro de categorías: solo las que ya tienen productos.
  const filterGroups = tree.map((g) => ({
    name: g.name,
    items: g.sections.flatMap((s) => s.items).filter((c) => c.count > 0),
  }));

  return (
    <>
      <header className="container-site pt-6 pb-4 lg:pt-10 lg:pb-5">
        <h1 className="text-[32px] leading-[1.08] tracking-[-0.02em] lg:text-[56px] lg:leading-[1.05]">{t.shop.page.title}</h1>
        <p className="mt-1.5 max-w-2xl text-[15px] text-secundario lg:mt-2 lg:text-[16px]">{t.shop.page.intro}</p>
      </header>

      {/* Barra fija bajo la cabecera (en escritorio) con el desplegable de categorías.
          Sin backdrop-filter para no romper la hoja de categorías del móvil. */}
      <div className="z-30 border-y border-linea bg-crema py-2.5 lg:sticky lg:top-[var(--header-h,0px)] lg:py-3">
        <div className="container-site">
          <CategoryMenu tree={tree} />
        </div>
      </div>

      <div className="container-site pt-6 pb-12 lg:pt-10 lg:pb-24">
        <h2 className="sr-only">{t.shop.page.allProducts}</h2>
        <CategoryBrowser products={products} producers={producers} filters={[]} categoryGroups={filterGroups} />
      </div>
    </>
  );
}
