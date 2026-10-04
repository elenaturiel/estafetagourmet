import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { balanceSections, type CategoryGroup, type CategorySection } from "@/lib/category-tree";

type LinkOpts = { current?: string; onNavigate?: () => void; showCounts?: boolean };

/** Un subgrupo: su título pequeño y debajo sus categorías. */
function SectionBlock({
  section,
  current,
  onNavigate,
  showCounts,
  style,
}: { section: CategorySection; style?: CSSProperties } & LinkOpts) {
  return (
    <div style={style}>
      {section.name ? (
        <p className="mb-1.5 text-[12px] font-bold tracking-[0.1em] text-vino uppercase">
          {section.name}
        </p>
      ) : null}
      <ul>
        {section.items.map((item) => {
          const isCurrent = item.slug === current;
          return (
            <li key={item.slug}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "group/link inline-flex min-h-[40px] items-center gap-2 text-[16px] transition-[color,transform] duration-200 ease-out hover:translate-x-1 hover:text-vino focus-visible:translate-x-1 focus-visible:text-vino lg:min-h-[34px] lg:text-[15px]",
                  isCurrent ? "font-semibold text-vino" : item.count === 0 && showCounts ? "text-secundario" : "text-tinta",
                )}
              >
                {item.name}
                {showCounts ? (
                  <span className="text-[12px] font-normal text-secundario">
                    {item.count > 0 ? `(${item.count})` : "· pronto"}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Enlaces de un grupo (Comida, Bebida…): subgrupos con su título y debajo la
 * lista de categorías, solo texto. Se usa en el menú del móvil y en Bebida/Lotes.
 */
export function CategoryLinks({
  group,
  className,
  ...opts
}: { group: CategoryGroup; className?: string } & LinkOpts) {
  return (
    <div className={cn("space-y-5", className)}>
      {group.sections.map((section, i) => (
        <SectionBlock key={section.name ?? i} section={section} {...opts} />
      ))}
    </div>
  );
}

const COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Subgrupos en columnas equilibradas en escritorio. En móvil se apilan en
 * una sola columna respetando el orden original (con `order` en cada bloque).
 */
export function CategoryColumns({
  group,
  columns = 3,
  ...opts
}: { group: CategoryGroup; columns?: number } & LinkOpts) {
  const cols = balanceSections(group.sections, columns);
  return (
    <div className={cn("flex flex-col gap-y-5 lg:grid lg:gap-x-8", COLS[cols.length] ?? COLS[3])}>
      {cols.map((sections, i) => (
        <div key={i} className="contents lg:flex lg:flex-col lg:gap-y-5">
          {sections.map((section) => (
            <SectionBlock
              key={section.name ?? i}
              section={section}
              style={{ order: group.sections.indexOf(section) }}
              {...opts}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
