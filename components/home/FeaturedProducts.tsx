import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getAllProducts, getCategories, getFeaturedProducts, getProducerMap } from "@/lib/catalog";
import { getT } from "@/lib/i18n/server";
import { FavoritesTabs } from "./FavoritesTabs";
import { TIENDA_ONLINE } from "@/data/tienda-online";

/** Productos que no salen en «Favoritos» (los packs de Pago de Cirsus, que parecen lotes). */
const NOT_IN_FAVORITES = new Set(["pcirsus-tinto-seleccion-de-familia", "pcirsus-tinto-cuvee-especial"]);

export async function FeaturedProducts() {
  const [featured, all, categories, producers, t] = await Promise.all([
    getFeaturedProducts(4),
    getAllProducts(),
    getCategories(),
    getProducerMap(),
    getT(),
  ]);
  // Una pestaña por categoría con productos, hasta 4 por pestaña.
  const tabs = [
    { key: "todo", label: t.home.favorites.tab, products: featured },
    ...categories
      .map((c) => ({
        key: c.slug,
        label: c.name,
        products: all
          .filter((p) => p.categorySlug === c.slug && !NOT_IN_FAVORITES.has(p.slug))
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 4),
      }))
      .filter((tab) => tab.products.length > 1),
  ];
  // Con muchas categorías, solo las 5 con más productos tienen pestaña.
  const byCount = new Map(categories.map((c) => [c.slug, all.filter((p) => p.categorySlug === c.slug).length]));
  const top = new Set(
    [...tabs.slice(1)].sort((a, b) => (byCount.get(b.key) ?? 0) - (byCount.get(a.key) ?? 0)).slice(0, 5).map((tab) => tab.key),
  );
  const shownTabs = [tabs[0], ...tabs.slice(1).filter((tab) => top.has(tab.key))];

  return (
    <Section tone="papel" aria-labelledby="favoritos-title">
      <SectionHeader
        id="favoritos-title"
        eyebrow={t.home.favorites.eyebrow}
        title={t.home.favorites.title}
        subtitle={t.home.favorites.subtitle}
        action={<ArrowLink href={TIENDA_ONLINE}>{t.home.favorites.link}</ArrowLink>}
      />
      <FavoritesTabs tabs={shownTabs} producers={producers} />
    </Section>
  );
}
