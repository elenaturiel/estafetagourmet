"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { inputClasses } from "@/components/forms/Field";
import { buttonClasses } from "@/components/ui/Button";
import { ChevronDownIcon, CloseIcon, FilterIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  countActiveFilters,
  emptyFilters,
  filterProducts,
  parseSort,
  sortProducts,
  type FilterState,
  type SortKey,
} from "@/lib/filters";
import type { AttributeFilter, Producer, Product } from "@/lib/types";

/** Categorías del filtro, agrupadas (Comida, Bebida…). */
export type CategoryFilterGroup = { name: string; items: { slug: string; name: string }[] };

/** Productos que se cargan de golpe; el resto, con "Ver más productos". */
const PAGE_SIZE = 24;

type Props = {
  products: Product[];
  producers: Producer[];
  filters: AttributeFilter[];
  /** Si se pasa, aparece el filtro "Categoría" (tienda completa). */
  categoryGroups?: CategoryFilterGroup[];
};

/**
 * Listado de productos con filtros y orden en cliente (categoría o tienda
 * completa). Carga 24 y el resto con "Ver más productos". Al cargar aplica
 * ?productor=, ?categoria= y ?orden= si vienen en la URL (p. ej. desde /productores).
 * El orden elegido se guarda en ?orden= para compartirlo o volver atrás sin perderlo.
 */
export function CategoryBrowser(props: Props) {
  return (
    <Suspense fallback={<Browser {...props} initial={emptyFilters} initialSort={DEFAULT_SORT} />}>
      <BrowserFromUrl {...props} />
    </Suspense>
  );
}

/** Valores válidos de un parámetro de la URL (puede venir "a,b,c"). */
function fromParam(value: string | null, valid: string[]): string[] {
  return (value ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter((v) => valid.includes(v));
}

function BrowserFromUrl(props: Props) {
  const params = useSearchParams();
  const producers = fromParam(params.get("productor"), props.producers.map((p) => p.slug));
  const categories = fromParam(params.get("categoria"), (props.categoryGroups ?? []).flatMap((g) => g.items.map((c) => c.slug)));
  const initial: FilterState = { ...emptyFilters, producers, categories };
  const initialSort = parseSort(params.get("orden"));
  return (
    <Browser
      key={`${producers}|${categories}`}
      {...props}
      initial={initial}
      initialSort={initialSort}
    />
  );
}

function Browser({
  products,
  producers,
  filters,
  categoryGroups,
  initial,
  initialSort,
}: Props & { initial: FilterState; initialSort: SortKey }) {
  const [state, setStateRaw] = useState<FilterState>(initial);
  const [sort, setSortRaw] = useState<SortKey>(initialSort);
  const [limit, setLimit] = useState(PAGE_SIZE);
  // Al cambiar un filtro o el orden se vuelve a empezar por los primeros 24.
  const setState = (next: FilterState) => {
    setStateRaw(next);
    setLimit(PAGE_SIZE);
  };
  const setSort = (next: SortKey) => {
    setSortRaw(next);
    setLimit(PAGE_SIZE);
    // Se refleja en la URL sin recargar ni añadir entradas al historial.
    const url = new URL(window.location.href);
    if (next === DEFAULT_SORT) url.searchParams.delete("orden");
    else url.searchParams.set("orden", next);
    window.history.replaceState(null, "", url);
  };
  const drawerRef = useRef<HTMLDialogElement>(null);
  const sortId = useId();

  const producerMap = useMemo(
    () => Object.fromEntries(producers.map((p) => [p.slug, p])),
    [producers],
  );
  const visible = useMemo(
    () => sortProducts(filterProducts(products, state), sort),
    [products, state, sort],
  );
  const shown = visible.slice(0, limit);
  const active = countActiveFilters(state);
  const countLabel = `${visible.length} ${visible.length === 1 ? "producto" : "productos"}`;

  const panel = (idPrefix: string) => (
    <FilterPanel
      idPrefix={idPrefix}
      state={state}
      onChange={setState}
      filters={filters}
      producers={producers}
      products={products}
      categoryGroups={categoryGroups}
    />
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
      {/* Filtros: barra lateral en escritorio */}
      <aside aria-label="Filtros" className="hidden lg:block">
        {panel("f-desktop")}
        {active > 0 ? (
          <button
            type="button"
            onClick={() => setState(emptyFilters)}
            className="mt-6 min-h-[44px] text-[14px] font-semibold text-vino underline underline-offset-4"
          >
            Borrar filtros
          </button>
        ) : null}
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[14px] text-secundario" role="status" aria-live="polite">
            {countLabel}
          </p>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => drawerRef.current?.showModal()}
              aria-haspopup="dialog"
              className={cn(buttonClasses("secondary", "sm"), "flex-1 lg:hidden")}
            >
              <FilterIcon size={18} />
              Filtros{active > 0 ? ` (${active})` : ""}
            </button>
            <div className="flex flex-1 items-center gap-3 sm:flex-none">
              <label htmlFor={sortId} className="hidden text-[14px] whitespace-nowrap sm:block">
                Ordenar por
              </label>
              <div className="relative w-full sm:w-[220px]">
                <select
                  id={sortId}
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  aria-label="Ordenar por"
                  className={cn(
                    inputClasses,
                    "min-h-[52px] appearance-none pr-10 text-[14px] lg:min-h-[44px]",
                  )}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  size={16}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="sr-only">Productos</h2>
        {visible.length ? (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-5">
            {shown.map((p) => (
              <li key={p.slug}>
                <ProductCard
                  product={p}
                  producer={p.producerSlug ? producerMap[p.producerSlug] : undefined}
                />
              </li>
            ))}
          </ul>
        ) : null}
        {visible.length > shown.length ? (
          <div className="mt-12 text-center">
            <p className="text-[14px] text-secundario" aria-live="polite">
              Mostrando {shown.length} de {visible.length} productos
            </p>
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
              className={cn(buttonClasses("secondary", "md"), "mt-4")}
            >
              Ver más productos
            </button>
          </div>
        ) : null}
        {visible.length === 0 ? (
          <div className="border border-linea bg-papel p-8 text-center">
            <p className="font-serif text-[22px]">Ningún producto coincide con estos filtros</p>
            <button
              type="button"
              onClick={() => setState(emptyFilters)}
              className={cn(buttonClasses("secondary", "sm"), "mt-5")}
            >
              Borrar filtros
            </button>
          </div>
        ) : null}
      </div>

      {/* Filtros: cajón en móvil */}
      <dialog
        ref={drawerRef}
        aria-labelledby="drawer-title"
        className="m-0 mt-auto h-[85dvh] max-h-none w-full max-w-none bg-crema text-tinta backdrop:bg-tinta/40 sm:mr-0 sm:ml-auto sm:h-dvh sm:max-w-sm lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-linea px-6 py-3">
            <h2 id="drawer-title" className="font-serif text-[22px]">
              Filtros
            </h2>
            <button
              type="button"
              aria-label="Cerrar los filtros"
              onClick={() => drawerRef.current?.close()}
              className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">{panel("f-mobile")}</div>
          <div className="grid grid-cols-2 gap-3 border-t border-linea px-6 py-4">
            <button
              type="button"
              onClick={() => setState(emptyFilters)}
              className={cn(buttonClasses("secondary", "md"), "px-3")}
            >
              Borrar
            </button>
            <button
              type="button"
              onClick={() => drawerRef.current?.close()}
              className={cn(buttonClasses("primary", "md"), "px-3 whitespace-nowrap")}
            >
              Ver {countLabel}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function FilterGroup({
  legend,
  children,
  scroll,
}: {
  legend: string;
  children: ReactNode;
  /** Listas largas (categorías, productores): altura limitada con scroll. */
  scroll?: boolean;
}) {
  return (
    <fieldset className="mb-7">
      <legend className="mb-2 font-serif text-[18px] font-medium">{legend}</legend>
      <div className={scroll ? "max-h-[300px] overflow-y-auto overscroll-contain pr-2" : undefined}>
        {children}
      </div>
    </fieldset>
  );
}

function Checkbox({
  id,
  label,
  count,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  /** Número de productos (se muestra entre paréntesis). */
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex min-h-[44px] items-center gap-3 lg:min-h-[36px]">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-[18px] w-[18px] shrink-0 accent-vino"
      />
      <label htmlFor={id} className="text-[15px]">
        {label}
        {count !== undefined ? <span className="ml-1.5 text-[13px] text-secundario">({count})</span> : null}
      </label>
    </div>
  );
}

function toggle(list: string[], value: string, on: boolean) {
  return on ? [...list, value] : list.filter((v) => v !== value);
}

/** Cuántos productos hay por clave (categoría o productor). */
function countBy(products: Product[], key: (p: Product) => string | null) {
  const out: Record<string, number> = {};
  for (const p of products) {
    const k = key(p);
    if (k) out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

function FilterPanel({
  idPrefix,
  state,
  onChange,
  filters,
  producers,
  products,
  categoryGroups,
}: {
  idPrefix: string;
  state: FilterState;
  onChange: (s: FilterState) => void;
  filters: AttributeFilter[];
  producers: Producer[];
  products: Product[];
  categoryGroups?: CategoryFilterGroup[];
}) {
  const prices = products.map((p) => p.price).filter((p): p is number => p !== null);
  const hasPrices = prices.length > 0;
  const perCategory = useMemo(() => countBy(products, (p) => p.categorySlug), [products]);
  const perProducer = useMemo(() => countBy(products, (p) => p.producerSlug), [products]);

  return (
    <div>
      {categoryGroups?.length ? (
        <FilterGroup legend="Categoría" scroll>
          {categoryGroups.map((g) => {
            const items = g.items.filter((c) => perCategory[c.slug]);
            if (!items.length) return null;
            return (
              <div key={g.name} className="mb-3">
                <p className="mt-2 mb-0.5 text-[12px] font-semibold tracking-[0.08em] text-secundario uppercase">
                  {g.name}
                </p>
                {items.map((c) => (
                  <Checkbox
                    key={c.slug}
                    id={`${idPrefix}-cat-${c.slug}`}
                    label={c.name}
                    count={perCategory[c.slug]}
                    checked={state.categories.includes(c.slug)}
                    onChange={(on) =>
                      onChange({ ...state, categories: toggle(state.categories, c.slug, on) })
                    }
                  />
                ))}
              </div>
            );
          })}
        </FilterGroup>
      ) : null}

      {producers.length > 1 ? (
        <FilterGroup legend="Productor" scroll>
          {[...producers].sort((a, b) => a.name.localeCompare(b.name, "es")).map((p) => (
            <Checkbox
              key={p.slug}
              id={`${idPrefix}-producer-${p.slug}`}
              label={p.name}
              count={perProducer[p.slug]}
              checked={state.producers.includes(p.slug)}
              onChange={(on) =>
                onChange({ ...state, producers: toggle(state.producers, p.slug, on) })
              }
            />
          ))}
        </FilterGroup>
      ) : null}

      {filters.map((f) => (
        <FilterGroup key={f.key} legend={f.label}>
          {f.options.map((o) => (
            <Checkbox
              key={o.value}
              id={`${idPrefix}-${f.key}-${o.value}`}
              label={o.label}
              checked={state.attributes[f.key]?.includes(o.value) ?? false}
              onChange={(on) =>
                onChange({
                  ...state,
                  attributes: {
                    ...state.attributes,
                    [f.key]: toggle(state.attributes[f.key] ?? [], o.value, on),
                  },
                })
              }
            />
          ))}
        </FilterGroup>
      ))}

      <FilterGroup legend="Precio">
        {hasPrices ? (
          <div className="grid grid-cols-2 gap-3">
            <PriceInput
              id={`${idPrefix}-min`}
              label="Desde (€)"
              placeholder={String(Math.floor(Math.min(...prices)))}
              value={state.minPrice}
              onChange={(v) => onChange({ ...state, minPrice: v })}
            />
            <PriceInput
              id={`${idPrefix}-max`}
              label="Hasta (€)"
              placeholder={String(Math.ceil(Math.max(...prices)))}
              value={state.maxPrice}
              onChange={(v) => onChange({ ...state, maxPrice: v })}
            />
          </div>
        ) : (
          // Sin precios definidos todavía, el filtro muestra el marcador.
          <p className="text-[14px] text-secundario">[mín.] € – [máx.] €</p>
        )}
      </FilterGroup>
    </div>
  );
}

function PriceInput({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px]">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step="1"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => {
          const n = e.target.value === "" ? null : Number(e.target.value);
          onChange(n === null || Number.isNaN(n) ? null : n);
        }}
        className={cn(inputClasses, "min-h-[44px] px-3")}
      />
    </div>
  );
}
