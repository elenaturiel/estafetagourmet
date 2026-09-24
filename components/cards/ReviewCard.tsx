import type { Review } from "@/lib/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col border border-linea bg-papel p-6 lg:p-8">
      <blockquote className="flex-1 font-serif text-[18px] leading-snug lg:text-[20px]">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="mt-8 text-[13px] text-secundario">
        {review.author} · {review.date}
      </figcaption>
    </figure>
  );
}
