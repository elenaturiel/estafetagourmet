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
  // Con muchas categorías, solo las 5 con más productos tienen pestaña.
  const byCount = new Map(categories.map((c) => [c.slug, all.filter((p) => p.categorySlug === c.slug).length]));
  const top = new Set(
    [...tabs.slice(1)].sort((a, b) => (byCount.get(b.key) ?? 0) - (byCount.get(a.key) ?? 0)).slice(0, 5).map((t) => t.key),
  );
  const shownTabs = [tabs[0], ...tabs.slice(1).filter((t) => top.has(t.key))];

  return (
    <Section tone="papel" aria-labelledby="favoritos-title">
      <SectionHeader
        id="favoritos-title"
        eyebrow="Nuestra selección"
        title="Los favoritos de la casa"
        subtitle="Selección de temporada, directa de los productores."
        action={<ArrowLink href="/tienda">Ver toda la tienda</ArrowLink>}
      />
      <FavoritesTabs tabs={shownTabs} producers={producers} />
    </Section>
  );
}
