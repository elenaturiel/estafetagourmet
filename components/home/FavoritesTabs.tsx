"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { cn } from "@/lib/cn";
import type { Producer, Product } from "@/lib/types";

type Tab = { key: string; label: string; products: Product[] };

/**
 * Pestañas de "Los favoritos de la casa" (Todo, Quesos, Vinos…), con el
 * patrón accesible de tabs: flechas para moverse, Tab para entrar al panel.
 */
export function FavoritesTabs({
  tabs,
  producers,
}: {
  tabs: Tab[];
  producers: Record<string, Producer>;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const current = tabs[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filtrar favoritos por categoría"
        onKeyDown={onKey}
        className="rail -mx-6 mb-8 auto-cols-max gap-2 px-6 lg:mx-0 lg:flex lg:flex-wrap lg:px-0"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
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
              "min-h-[44px] rounded-full border px-5 text-[14px] font-semibold whitespace-nowrap transition-colors",
              i === active
                ? "border-tinta bg-tinta text-crema"
                : "border-linea bg-transparent text-tinta hover:border-tinta",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
        <ul
          key={current.key}
          className="rail -mx-6 auto-cols-[72%] gap-4 px-6 sm:auto-cols-[42%] lg:mx-0 lg:grid-flow-row lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0"
        >
          {current.products.map((p, i) => (
            <li key={p.slug} className="animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
              <ProductCard
                product={p}
                producer={p.producerSlug ? producers[p.producerSlug] : undefined}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
