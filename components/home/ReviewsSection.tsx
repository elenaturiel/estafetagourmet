import { ReviewCard } from "@/components/cards/ReviewCard";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/data/site";
import { getReviews } from "@/lib/catalog";

export async function ReviewsSection() {
  const reviews = await getReviews();
  return (
    <Section aria-labelledby="resenas-title">
      <SectionHeader
        id="resenas-title"
        eyebrow="Opiniones"
        title="Lo que dicen nuestros clientes"
        action={
          <p className="inline-flex items-center gap-3 rounded-full border border-linea bg-papel px-5 py-2.5 text-[15px]">
            <span className="font-serif text-[22px] leading-none text-vino">{site.googleRating.rating}</span>
            <span className="text-secundario">en Google · {site.googleRating.count} reseñas</span>
          </p>
        }
      />
      <ul tabIndex={0} aria-label="Reseñas de clientes" className="rail -mx-6 auto-cols-[85%] gap-4 px-6 md:mx-0 md:grid-flow-row md:grid-cols-3 md:overflow-visible md:px-0 lg:gap-6">
        {reviews.map((r) => (
          <li key={r.id}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
