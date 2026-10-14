import type { Review } from "@/lib/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="relative flex h-full flex-col rounded-eg border border-linea bg-papel p-5 lg:p-9">
      <span aria-hidden="true" className="font-serif text-[56px] leading-[0.6] text-vino lg:text-[72px]">
        “
      </span>
      <blockquote className="mt-3 flex-1 font-serif text-[18px] leading-snug lg:mt-4 lg:text-[21px]">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-linea pt-4 text-[14px] lg:mt-8 lg:pt-5">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-crema-oscuro font-serif text-vino"
        >
          {review.author.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, "").charAt(0) || "·"}
        </span>
        <span>
          <span className="block font-semibold">{review.author}</span>
          <span className="block text-secundario">{review.date} · Google</span>
        </span>
      </figcaption>
    </figure>
  );
}
