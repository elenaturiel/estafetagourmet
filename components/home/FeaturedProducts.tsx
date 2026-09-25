import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getAllProducts, getCategories, getFeaturedProducts, getProducerMap } from "@/lib/catalog";
import { FavoritesTabs } from "./FavoritesTabs";

export async function FeaturedProducts() {
  const [featured, all, categories, producers] = await Promise.all([
    getFeaturedProducts(4),
    getAllProducts(),
    getCategories(),
    getProducerMap(),
  ]);
  // Una pestaña por categoría con productos, hasta 4 por pestaña.
  const tabs = [
    { key: "todo", label: "Favoritos", products: featured },
    ...categories
      .map((c) => ({
        key: c.slug,
        label: c.name,
        products: all.filter((p) => p.categorySlug === c.slug).sort((a, b) => a.rank - b.rank).slice(0, 4),
      }))
      .filter((t) => t.products.length > 1),
  ];

  return (
    <Section tone="papel" aria-labelledby="favoritos-title">
      <SectionHeader
        id="favoritos-title"
        eyebrow="Nuestra selección"
        title="Los favoritos de la casa"
        subtitle="Selección de temporada, directa de los productores."
        action={<ArrowLink href="/tienda">Ver toda la tienda</ArrowLink>}
      />
      <FavoritesTabs tabs={tabs} producers={producers} />
    </Section>
  );
}
