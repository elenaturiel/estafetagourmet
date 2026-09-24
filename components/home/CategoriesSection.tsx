import { CategoryCard } from "@/components/cards/CategoryCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getCategories } from "@/lib/catalog";

export async function CategoriesSection() {
  const categories = await getCategories();
  return (
    <Section aria-labelledby="categorias-title">
      <SectionHeader
        id="categorias-title"
        title="Compra por categoría"
        action={<ArrowLink href="/tienda">Ver toda la tienda</ArrowLink>}
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
        {categories.map((c) => (
          <li key={c.slug}>
            <CategoryCard category={c} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
