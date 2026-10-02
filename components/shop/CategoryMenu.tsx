"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons";
import type { CategoryGroup } from "@/lib/category-tree";
import { cn } from "@/lib/cn";
import { CategoryColumns, CategoryLinks } from "./CategoryLinks";

/**
 * Desplegable "Categoría" de la página de tienda: en vez de enseñar las 24
 * categorías a la vez, un botón con la categoría actual que abre la lista
 * ordenada por Comida / Bebida / Lotes y sus subgrupos.
 * En móvil se abre como una hoja desde abajo.
 */
export function CategoryMenu({
  tree,
  current,
  currentName,
}: {
  tree: CategoryGroup[];
  current?: string;
  currentName?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const food = tree.find((g) => g.slug === "comida");
  const rest = tree.filter((g) => g.slug !== "comida");

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-[52px] items-center gap-3 rounded-eg border border-tinta px-5 text-[15px] font-semibold transition-colors hover:bg-tinta hover:text-crema lg:min-h-[48px]"
      >
        <span className="font-normal opacity-70">Categoría:</span>
        {currentName ?? "Todas"}
        <ChevronDownIcon size={16} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open ? (
        <>
          {/* Fondo oscuro solo en móvil */}
          <div aria-hidden="true" className="fixed inset-0 z-40 bg-tinta/50 lg:hidden" onClick={() => setOpen(false)} />
          <nav
            id={panelId}
            aria-label="Categorías de la tienda"
            className={cn(
              "z-50 bg-crema text-tinta animate-rise",
              // Móvil: hoja inferior. Escritorio: desplegable bajo el botón.
              "fixed inset-x-0 bottom-0 max-h-[80dvh] overflow-y-auto rounded-t-[20px] px-6 pt-5 pb-8",
              "lg:absolute lg:inset-x-auto lg:top-full lg:bottom-auto lg:left-0 lg:mt-2 lg:max-h-none lg:w-[960px] lg:max-w-[calc(100vw-128px)] lg:overflow-visible lg:rounded-eg lg:border lg:border-linea lg:p-8 lg:shadow-[0_24px_40px_-24px_rgba(42,31,26,0.3)]",
            )}
          >
            <div className="mb-3 flex items-center justify-between lg:hidden">
              <p className="font-serif text-[22px]">Categorías</p>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setOpen(false)}
                className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-10">
              {food ? (
                <section aria-labelledby={`${panelId}-comida`}>
                  <h2 id={`${panelId}-comida`} className="mb-4 font-serif text-[22px]">
                    {food.name}
                  </h2>
                  <CategoryColumns group={food} columns={3} current={current} onNavigate={() => setOpen(false)} showCounts />
                </section>
              ) : null}
              <div className="space-y-8">
                {rest.map((g) => (
                  <section key={g.slug} aria-labelledby={`${panelId}-${g.slug}`}>
                    <h2 id={`${panelId}-${g.slug}`} className="mb-3 font-serif text-[22px]">
                      {g.name}
                    </h2>
                    <CategoryLinks group={g} current={current} onNavigate={() => setOpen(false)} showCounts />
                  </section>
                ))}
              </div>
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
