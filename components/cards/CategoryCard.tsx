import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Category } from "@/lib/types";

/** Tarjeta de categoría con foto en arco y zoom suave al pasar el ratón. */
export function CategoryCard({ category, count }: { category: Category; count?: number }) {
  return (
    <Link href={`/tienda/${category.slug}`} className="group block text-center">
      <div className="arch overflow-hidden bg-placeholder">
        <ImagePlaceholder
          label={category.image.placeholder}
          src={category.image.src}
          alt={category.image.src ? category.image.alt : undefined}
          ratio="3 / 4"
          sizes="(min-width: 1024px) 16vw, 45vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>
      <h3 className="mt-4 text-[19px] leading-snug group-hover:text-vino lg:text-[22px]">
        {category.name}
      </h3>
      {typeof count === "number" ? (
        <p className="mt-0.5 text-[13px] text-secundario">
          {count} {count === 1 ? "producto" : "productos"}
        </p>
      ) : null}
      <span
        aria-hidden="true"
        className="mt-1 inline-block text-[13px] font-semibold text-vino opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        Ver →
      </span>
    </Link>
  );
}
