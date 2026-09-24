import { CategoryCard } from "@/components/cards/CategoryCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCategories, getFeaturedProducts, getProducerMap } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tienda online de productos gourmet navarros",
  description:
    "Quesos, embutidos, vinos D.O. Navarra, conservas, aceites y pacharán de pequeños productores navarros. Envío a toda la península en 24–48 h o recogida en Pamplona.",
  path: "/tienda",
});

export default async function ShopPage() {
  const [categories, featured, producers] = await Promise.all([
    getCategories(),
    getFeaturedProducts(4),
    getProducerMap(),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="Tienda online"
        title="Tienda"
        intro="Todo lo que tenemos en la estantería de la calle Estafeta, ahora también con envío a casa."
      />
      <div className="container-site pb-16 lg:pb-24">
        <h2 className="sr-only">Categorías</h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
          {categories.map((c) => (
            <li key={c.slug}>
              <CategoryCard category={c} />
            </li>
          ))}
        </ul>
      </div>
      <Section tone="papel" aria-labelledby="tienda-favoritos">
        <SectionHeader id="tienda-favoritos" title="Los favoritos de la casa" />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          {featured.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
