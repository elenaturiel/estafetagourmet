import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Newsletter } from "@/data/newsletters";

export function NewsletterCard({ issue }: { issue: Newsletter }) {
  return (
    <article className="group/card relative flex h-full flex-col border border-linea bg-papel transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transform-none">
      <div className="overflow-hidden">
        <ImagePlaceholder
          label="Foto · newsletter"
          src={issue.image.src}
          alt={issue.image.alt}
          ratio="4 / 3"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[12px] text-secundario">
          Nº {issue.number} · {issue.theme}
        </p>
        <h3 className="mt-2 text-[22px] leading-snug tracking-[-0.015em]">{issue.title}</h3>
        <p className="mt-1 font-serif text-[17px] text-vino italic">{issue.subtitle}</p>
        <p className="mt-3 text-[15px] leading-[1.6] text-secundario">{issue.excerpt}</p>
        <Link
          href={`/newsletter/${issue.slug}`}
          className="mt-auto inline-flex min-h-[44px] items-center gap-1 pt-4 text-[15px] font-semibold text-vino after:absolute after:inset-0 hover:underline"
        >
          Leer el boletín <span aria-hidden="true">→</span>
          <span className="sr-only">: {issue.title}</span>
        </Link>
      </div>
    </article>
  );
}
