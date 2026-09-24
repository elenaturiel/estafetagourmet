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
        title="Lo que dicen nuestros clientes"
        action={
          <p className="text-[15px] text-secundario">
            {site.googleRating.rating} en Google · {site.googleRating.count} reseñas
          </p>
        }
      />
      <ul className="grid gap-4 md:grid-cols-3 lg:gap-5">
        {reviews.map((r) => (
          <li key={r.id}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
