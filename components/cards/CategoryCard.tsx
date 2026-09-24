import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/tienda/${category.slug}`} className="group block">
      <ImagePlaceholder
        label={category.image.placeholder}
        src={category.image.src}
        alt={category.image.src ? category.image.alt : undefined}
        className="h-[180px] lg:h-[232px]"
        sizes="(min-width: 1024px) 16vw, 50vw"
      />
      <h3 className="mt-3 text-[18px] leading-snug group-hover:text-vino lg:text-[22px]">
        {category.name}
      </h3>
    </Link>
  );
}
