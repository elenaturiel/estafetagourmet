import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export type Crumb = { name: string; path: string };

/** Migas de pan con datos estructurados BreadcrumbList. El último es la página actual. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Migas de pan" className="text-[13px] text-secundario">
      <ol className="flex flex-wrap items-center">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center">
              {last ? (
                <span aria-current="page" className="text-tinta">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="inline-flex min-h-[32px] items-center underline-offset-4 hover:text-vino hover:underline"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="mx-2">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </nav>
  );
}
