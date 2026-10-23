"use client";

import { Link } from "@/components/ui/Link";
import { useEffect, useRef, useState } from "react";
import { cartUi } from "@/components/cart/cart-ui";
import { useCart } from "@/components/cart/useCart";
import { SiteNav } from "./SiteNav";
import { Seek } from "@/components/ui/Search";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  CartIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/ui/icons";
import type { CategoryGroup } from "@/lib/category-tree-utils";
import { RECIPIENTS, giftsHref } from "@/data/gifts";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { fmt, localePath, locales, localeNames, type Locale } from "@/lib/i18n/config";
import { useLocale, usePath, useT } from "@/lib/i18n/client";
import { Logo } from "./Logo";
import { TIENDA_ONLINE } from "@/data/tienda-online";

export type HeaderCategory = {
  slug: string;
  name: string;
  placeholder: string;
  src?: string;
  /** Destino del enlace (normalmente /tienda/<slug>). */
  href: string;
};
/** Lote que se destaca en el menú de la tienda. */
export type HeaderLot = {
  name: string;
  href: string;
  price: number | null;
  src?: string;
};

function isActive(pathname: string, href: string) {
  // Los boletines viven dentro de la página del blog.
  if (href === "/blog" && (pathname === "/newsletter" || pathname.startsWith("/newsletter/"))) return true;
  return pathname === href || pathname.startsWith(`${href}/`);
}

const iconButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-eg text-tinta hover:text-vino";

export function Header({
  categories,
  tree,
  featuredLot,
}: {
  categories: HeaderCategory[];
  tree: CategoryGroup[];
  featuredLot?: HeaderLot;
}) {
  const pathname = usePath();
  const t = useT();
  const locale = useLocale();
  const { count } = useCart();
  const menuRef = useRef<HTMLDialogElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  // Al navegar se cierra el menú móvil (el mega menú se cierra en cada enlace).
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

  // Publica la altura de la cabecera (--header-h) para fijar barras justo debajo.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const root = document.documentElement;
    const update = () =>
      root.style.setProperty("--header-h", `${el.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--header-h");
    };
  }, []);

  // Cabecera compacta al hacer scroll.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartButton = (
    <button
      type="button"
      onClick={() => cartUi.setOpen(true)}
      aria-label={count === 1 ? t.common.header.cartOne : fmt(t.common.header.cartMany, { n: count })}
      aria-haspopup="dialog"
      className="relative inline-flex h-11 items-center gap-2 rounded-eg px-2 text-[15px] font-medium hover:text-vino lg:border lg:border-tinta lg:px-4 lg:hover:border-vino"
    >
      <CartIcon size={22} />
      <span className="hidden lg:inline">{fmt(t.common.header.cart, { n: count })}</span>
      {count > 0 ? (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-vino px-1 text-[11px] font-bold text-crema lg:hidden"
        >
          {count}
        </span>
      ) : null}
    </button>
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-linea bg-crema/95 backdrop-blur supports-[backdrop-filter]:bg-crema/85"
    >
      {/* Fila superior: búsqueda · logotipo · idioma y cesta */}
      <div
        className={cn(
          "container-site grid grid-cols-[1fr_auto_1fr] items-center gap-4 transition-[height] duration-300",
          compact ? "h-[64px] lg:h-[72px]" : "h-[72px] lg:h-[104px]",
        )}
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn(iconButton, "-ml-2.5 lg:hidden")}
            aria-label={t.common.header.openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => {
              menuRef.current?.showModal();
              setMenuOpen(true);
            }}
          >
            <MenuIcon size={24} />
          </button>
          {/* Un contenedor aparte: el CSS de .sek fija display y taparía "hidden". */}
          <div className="hidden lg:block">
            <Seek
              shut={44}
              width={300}
              frameX={8}
              frameY={8}
              placeholder={t.common.header.searchPlaceholder}
              action={localePath(locale, "/buscar")}
              label={t.common.header.search}
            />
          </div>
        </div>

        <Logo compact={compact} />

        <div className="flex items-center justify-self-end gap-1 lg:gap-4">
          <LanguageSwitcher className="hidden lg:flex" />
          <Link
            href="/buscar"
            className={cn(iconButton, "lg:hidden")}
            aria-label={t.common.header.search}
          >
            <SearchIcon size={22} />
          </Link>
          {cartButton}
        </div>
      </div>

      {/* Fila de navegación (escritorio): ver SiteNav.tsx */}
      <SiteNav
        label={t.common.nav.label}
        items={mainNav.map((item) => ({
          value: item.key,
          label: t.common.nav[item.key],
          href: item.href,
          current: isActive(pathname, item.href),
          ...(item.key === "shop"
            ? {
                panelLabel: t.common.header.shopPanel,
                panel: (
                  <MegaMenu tree={tree} featuredLot={featuredLot} />
                ),
              }
            : {}),
        }))}
      />

      {/* Menú móvil: solo texto (sin fotos), a pantalla completa */}
      <dialog
        ref={menuRef}
        aria-label={t.common.nav.label}
        onClose={() => setMenuOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-crema text-tinta backdrop:bg-tinta/50"
      >
        <div className="flex h-[60px] items-center justify-between border-b border-linea px-4">
          <span className="font-serif text-[20px]">{site.name}</span>
          <button
            type="button"
            className={cn(iconButton, "-mr-2")}
            aria-label={t.common.header.closeMenu}
            onClick={() => menuRef.current?.close()}
          >
            <CloseIcon size={24} />
          </button>
        </div>
        <nav aria-label={t.common.nav.label} className="flex h-[calc(100dvh-60px)] flex-col overflow-y-auto px-4 pb-8">
          <ul>
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const link = cn(
                "flex min-h-[54px] items-center justify-between font-serif text-[21px]",
                active && "text-vino",
              );
              if (item.key === "shop") {
                return (
                  <li key={item.href} className="border-b border-linea">
                    <details className="group">
                      <summary className={cn(link, "cursor-pointer list-none [&::-webkit-details-marker]:hidden")}>
                        {t.common.nav[item.key]}
                        <span aria-hidden="true" className="text-vino transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <ul className="grid grid-cols-2 gap-x-4 pb-4">
                        <li className="col-span-2">
                          <Link
                            href={TIENDA_ONLINE}
                            onClick={() => menuRef.current?.close()}
                            className="inline-flex min-h-[44px] items-center text-[16px] font-semibold text-vino"
                          >
                            {t.common.header.allProducts} →
                          </Link>
                        </li>
                        {categories.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={c.href}
                              onClick={() => menuRef.current?.close()}
                              className="flex min-h-[44px] items-center text-[16px]"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              }
              return (
                <li key={item.href} className="border-b border-linea">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => menuRef.current?.close()}
                    className={link}
                  >
                    {t.common.nav[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="eyebrow mt-6 mb-2 text-[12px] text-vino">{t.common.header.giftIdeas}</p>
          <ul className="flex flex-wrap gap-2">
            {RECIPIENTS.map((r) => (
              <li key={r.slug}>
                <Link
                  href={giftsHref(r.slug)}
                  onClick={() => menuRef.current?.close()}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-tinta px-3.5 text-[14px] font-semibold"
                >
                  {t.gifts.recipients[r.slug].short}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <p className="text-[14px] text-secundario">
              <a href={site.phone.href} className="font-semibold text-vino">
                {site.phone.display}
              </a>{" "}
              · {site.address.street}
            </p>
            <LanguageSwitcher className="mt-4 flex" />
          </div>
        </nav>
      </dialog>
    </header>
  );
}

function MegaMenu({
  tree,
  featuredLot,
}: {
  tree: CategoryGroup[];
  featuredLot?: HeaderLot;
}) {
  const t = useT();
  return (
    <div id="mega-tienda">
      <div className="container-site grid grid-cols-[minmax(0,1fr)_280px] gap-10 py-8 xl:gap-16">
        <div>
          <p className="eyebrow mb-5 text-[12px] text-vino">{t.common.header.byCategory}</p>
          {/*
            Lista de texto por grupos. Al pasar el ratón (o con el teclado) la
            fila se rellena de vino desde la izquierda, el texto se desplaza y
            aparece una flecha; el resto de filas se atenúa.
          */}
          <div className="group/cats grid grid-cols-3 gap-x-8 gap-y-6">
            {tree.map((g) => (
              <section key={g.slug} className={g.slug === "comida" ? "col-span-2" : undefined}>
                <h3 className="mb-2 border-b border-linea pb-2 font-serif text-[18px]">{g.name}</h3>
                <ul className={cn("grid gap-x-6", g.slug === "comida" ? "grid-cols-2" : "grid-cols-1")}>
                  {g.sections
                    .flatMap((sec) => sec.items)
                    .map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={c.href}
                          className="group relative flex min-h-[42px] items-center justify-between overflow-hidden px-3 text-[15px] transition-[opacity,color] duration-200 ease-out group-hover/cats:opacity-45 hover:opacity-100! hover:text-crema focus-visible:text-crema focus-visible:opacity-100"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 origin-left scale-x-0 bg-vino transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                          />
                          <span className="relative transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5">
                            {c.name}
                          </span>
                          <span className="relative flex items-center gap-2 text-[12px]">
                            {c.count > 0 ? (
                              <span className="text-secundario transition-colors group-hover:text-crema/80 group-focus-visible:text-crema/80">
                                {c.count}
                              </span>
                            ) : null}
                            <span
                              aria-hidden="true"
                              className="-translate-x-2 text-[15px] opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                            >
                              →
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
          <Link
            href={TIENDA_ONLINE}
            className="mt-5 inline-flex min-h-[36px] items-center text-[15px] font-semibold text-vino hover:underline"
          >
            {t.common.header.seeShop}
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <GiftLinks />
          {featuredLot ? (
            <Link
              href={featuredLot.href}
              className="group relative block overflow-hidden bg-vino text-crema"
            >
              <div className="overflow-hidden">
                <ImagePlaceholder
                  label={t.common.header.lotPhoto}
                  src={featuredLot.src}
                  alt={featuredLot.src ? featuredLot.name : undefined}
                  ratio="16 / 9"
                  blend
                  sizes="280px"
                  className="transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow text-[11px] text-dorado">{t.common.header.featuredLot}</p>
                <p className="mt-1 font-serif text-[20px] leading-tight">{featuredLot.name}</p>
                <p className="mt-2 text-[14px] font-semibold underline-offset-4 group-hover:underline">
                  {t.common.header.discover}
                </p>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** "Ideas de regalo": a quién se lo regalas, para filtrar la página /regalos. */
function GiftLinks() {
  const t = useT();
  return (
    <div>
      <p className="eyebrow mb-3 text-[12px] text-vino">{t.common.header.giftIdeas}</p>
      <ul className="flex flex-wrap gap-2">
        {RECIPIENTS.map((r) => (
          <li key={r.slug}>
            <Link
              href={giftsHref(r.slug)}
              className="inline-flex min-h-[36px] items-center rounded-full border border-tinta px-3.5 text-[13px] font-semibold transition-colors hover:bg-tinta hover:text-crema"
            >
              {t.gifts.recipients[r.slug].short}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={giftsHref()}
        className="mt-2 inline-flex min-h-[36px] items-center text-[14px] font-semibold text-vino hover:underline"
      >
        {t.common.header.allGiftIdeas}
      </Link>
    </div>
  );
}

/** Selector de idioma: ES · EN · FR. Lleva a la misma página en el otro idioma. */
function LanguageSwitcher({ className }: { className?: string }) {
  const t = useT();
  const current = useLocale();
  const path = usePath();
  return (
    <div
      role="group"
      aria-label={t.common.header.languageLabel}
      className={cn("items-center gap-1 text-[13px] font-semibold tracking-[0.04em]", className)}
    >
      {locales.map((l: Locale, i) => (
        <span key={l} className="inline-flex items-center gap-1">
          {i > 0 ? (
            <span aria-hidden="true" className="text-secundario">
              ·
            </span>
          ) : null}
          {l === current ? (
            <span aria-current="true" lang={l} className="inline-flex min-h-[40px] items-center px-1.5 text-vino lg:min-h-0 lg:px-0">
              <span className="lg:hidden">{l.toUpperCase()}</span>
              <span className="hidden lg:inline">{localeNames[l]}</span>
            </span>
          ) : (
            <a
              href={localePath(l, path)}
              lang={l}
              hrefLang={l}
              aria-label={t.common.languageSwitch[l]}
              title={localeNames[l]}
              className="inline-flex min-h-[40px] items-center px-1.5 text-secundario hover:text-vino lg:min-h-0 lg:px-0"
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
              }}
            >
              <span className="lg:hidden">{l.toUpperCase()}</span>
              <span className="hidden lg:inline">{localeNames[l]}</span>
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
