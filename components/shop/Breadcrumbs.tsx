import { Link } from "@/components/ui/Link";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocale, getT } from "@/lib/i18n/server";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export type Crumb = { name: string; path: string };

/** Migas de pan con datos estructurados BreadcrumbList. El último es la página actual. */
export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return (
    <nav aria-label={t.shop.breadcrumb.aria} className="text-[13px] text-secundario">
      <ol className="flex flex-wrap items-center">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className={last ? "flex min-w-0 items-center" : "flex items-center"}>
              {last ? (
                <span aria-current="page" className="truncate text-tinta">
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
      <JsonLd data={breadcrumbJsonLd(items, locale)} />
    </nav>
  );
}
