import { CategoryCard } from "@/components/cards/CategoryCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getAllProducts, getCategories } from "@/lib/catalog";

export async function CategoriesSection() {
  const [categories, products] = await Promise.all([getCategories(), getAllProducts()]);
  const count = (slug: string) => products.filter((p) => p.categorySlug === slug).length;
  return (
    <Section aria-labelledby="categorias-title">
      <SectionHeader
        id="categorias-title"
        eyebrow="La despensa navarra"
        title="Compra por categoría"
        action={<ArrowLink href="/tienda">Ver toda la tienda</ArrowLink>}
      />
      <ul data-reveal-stagger className="rail rail-focus -mx-6 auto-cols-[44%] gap-4 px-6 sm:auto-cols-[30%] lg:mx-0 lg:grid-flow-row lg:grid-cols-6 lg:gap-6 lg:overflow-visible lg:px-0">
        {categories.map((c) => (
          <li key={c.slug}>
            <CategoryCard category={c} count={count(c.slug)} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
