import { CategoryCard } from "@/components/cards/CategoryCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getCategories } from "@/lib/catalog";

/**
 * Todas las categorías: en móvil, carrusel de dos filas para deslizar; en
 * escritorio, un muro de fotos (8 u 11 por fila según el ancho).
 */
export async function CategoriesSection() {
  const categories = await getCategories();
  return (
    <Section aria-labelledby="categorias-title">
      <SectionHeader
        id="categorias-title"
        eyebrow="La despensa"
        title="Compra por categoría"
        action={<ArrowLink href="/tienda">Ver toda la tienda</ArrowLink>}
      />
      <ul
        data-reveal-stagger
        className="rail rail-focus -mx-6 grid-rows-2 auto-cols-[38%] gap-x-4 gap-y-6 px-6 sm:auto-cols-[24%] lg:mx-0 lg:grid-flow-row lg:grid-rows-none lg:grid-cols-8 lg:gap-x-5 lg:gap-y-8 lg:overflow-visible lg:px-0 xl:grid-cols-12 xl:gap-x-3"
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
