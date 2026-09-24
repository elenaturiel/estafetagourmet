import { ProductCard } from "@/components/cards/ProductCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getFeaturedProducts, getProducerMap } from "@/lib/catalog";

export async function FeaturedProducts() {
  const [products, producers] = await Promise.all([getFeaturedProducts(4), getProducerMap()]);
  return (
    <Section tone="papel" aria-labelledby="favoritos-title">
      <SectionHeader
        id="favoritos-title"
        title="Los favoritos de la casa"
        subtitle="Selección de temporada, directa de los productores."
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
        {products.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
