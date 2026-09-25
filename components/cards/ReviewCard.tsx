import type { Review } from "@/lib/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="relative flex h-full flex-col rounded-eg border border-linea bg-papel p-7 lg:p-9">
      <span aria-hidden="true" className="font-serif text-[72px] leading-[0.6] text-vino">
        “
      </span>
      <blockquote className="mt-4 flex-1 font-serif text-[19px] leading-snug lg:text-[21px]">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-linea pt-5 text-[14px]">
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
