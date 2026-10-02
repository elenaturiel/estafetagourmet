"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { CategoryCard } from "@/components/cards/CategoryCard";
import type { CategoryGroup } from "@/lib/category-tree";
import { cn } from "@/lib/cn";

/**
 * Categorías de la portada ordenadas en pestañas (Comida / Bebida) con los
 * subgrupos como títulos pequeños: así no se ven las 24 fotos de golpe.
 * Patrón accesible de pestañas: flechas para moverse y Tab para entrar.
 */
export function CategoryTabs({ groups }: { groups: CategoryGroup[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + groups.length) % groups.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const group = groups[active];

  return (
    <div>
      <div role="tablist" aria-label="Tipo de producto" onKeyDown={onKey} className="mb-8 flex gap-2">
        {groups.map((g, i) => (
          <button
            key={g.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "min-h-[48px] rounded-full border px-7 text-[15px] font-semibold transition-colors",
              i === active ? "border-tinta bg-tinta text-crema" : "border-linea hover:border-tinta",
            )}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} className="space-y-8">
        {group.sections.map((section, i) => (
          <div key={`${group.slug}-${section.name ?? i}`} className="animate-rise">
            {section.name ? (
              <p className="mb-4 text-[13px] font-semibold tracking-[0.1em] text-secundario uppercase">
                {section.name}
              </p>
            ) : null}
            <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5 lg:grid-cols-9 lg:gap-x-5">
              {section.items.map((c) => (
                <li key={c.slug}>
                  <CategoryCard category={c} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
