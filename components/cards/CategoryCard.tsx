import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";
import { categoryHref } from "@/lib/product-utils";
import type { Category } from "@/lib/types";

/** Tarjeta de categoría: foto en arco con zoom suave al pasar el ratón y nombre debajo. */
export function CategoryCard({
  category,
  size = "md",
}: {
  category: Category;
  /** "sm" para cuadrículas densas (muchas categorías por fila). */
  size?: "sm" | "md";
}) {
  return (
    <Link href={categoryHref(category)} className="group block text-center">
      <div className="arch overflow-hidden bg-placeholder">
        <ImagePlaceholder
          label={category.image.placeholder}
          src={category.image.src}
          alt={category.image.src ? category.image.alt : undefined}
          ratio="1 / 1"
          sizes={size === "sm" ? "(min-width: 1024px) 140px, 38vw" : "(min-width: 1024px) 16vw, 45vw"}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          parallax
        />
      </div>
      <h3
        className={cn(
          "mt-3 leading-tight group-hover:text-vino",
          size === "sm" ? "text-[16px] xl:text-[15px]" : "text-[19px] lg:text-[22px]",
        )}
      >
        {category.name}
      </h3>
    </Link>
  );
}
