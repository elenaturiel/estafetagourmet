import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getCategoryTree } from "@/lib/category-tree";
import { CategoryTabs } from "./CategoryTabs";

/** Categorías de la portada: pestañas Comida / Bebida (los lotes tienen su propia banda). */
export function CategoriesSection() {
  const groups = getCategoryTree().filter((g) => g.slug !== "lotes");
  return (
    <Section aria-labelledby="categorias-title">
      <SectionHeader
        id="categorias-title"
        eyebrow="La despensa"
        title="Compra por categoría"
        action={<ArrowLink href="/tienda">Ver toda la tienda</ArrowLink>}
      />
      <CategoryTabs groups={groups} />
    </Section>
  );
}
