import { CategoryCard } from "@/components/cards/CategoryCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getCategories } from "@/lib/catalog";
import { getT } from "@/lib/i18n/server";

/**
 * Todas las categorías: en móvil, una cuadrícula de tres columnas; en
 * escritorio, un muro de fotos (8 o 12 por fila según el ancho).
 */
export async function CategoriesSection() {
  const [categories, t] = await Promise.all([getCategories(), getT()]);
  return (
    <Section aria-labelledby="categorias-title">
      <SectionHeader
        id="categorias-title"
        eyebrow={t.home.categories.eyebrow}
        title={t.home.categories.title}
        action={<ArrowLink href="/tienda">{t.home.categories.link}</ArrowLink>}
      />
      <ul
        data-reveal-stagger
        className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-5 lg:gap-y-8 xl:grid-cols-12 xl:gap-x-3"
      >
        {categories.map((c) => (
          <li key={c.slug}>
            <CategoryCard category={c} size="sm" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
