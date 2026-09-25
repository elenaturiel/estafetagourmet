"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cartUi } from "@/components/cart/cart-ui";
import { useCart } from "@/components/cart/useCart";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import {
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { Logo } from "./Logo";

export type HeaderCategory = { slug: string; name: string; placeholder: string; src?: string };
export type HeaderOccasion = { slug: string; name: string; href: string };

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const iconButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-eg text-tinta hover:text-vino";

export function Header({
  categories,
  occasions,
}: {
  categories: HeaderCategory[];
  occasions: HeaderOccasion[];
}) {
  const pathname = usePathname();
  const { count } = useCart();
  const menuRef = useRef<HTMLDialogElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  // Al navegar se cierra el menú móvil (el mega menú se cierra en cada enlace).
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

  // Cabecera compacta al hacer scroll.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc y clic fuera cierran el mega menú.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const hoverOpenedAt = useRef(0);
  const hoverOpen = () => {
    window.clearTimeout(closeTimer.current);
    if (!megaOpen) hoverOpenedAt.current = Date.now();
    setMegaOpen(true);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 150);
  };

  const cartButton = (
    <button
      type="button"
      onClick={() => cartUi.setOpen(true)}
      aria-label={t.header.cartAria(count)}
      aria-haspopup="dialog"
      className="relative inline-flex h-11 items-center gap-2 rounded-eg px-2 text-[15px] font-medium hover:text-vino lg:border lg:border-tinta lg:px-4 lg:hover:border-vino"
    >
      <CartIcon size={22} />
      <span className="hidden lg:inline">{t.header.cart(count)}</span>
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
    <header className="sticky top-0 z-40 border-b border-linea bg-crema/95 backdrop-blur supports-[backdrop-filter]:bg-crema/85">
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
            aria-label={t.header.openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => {
              menuRef.current?.showModal();
              setMenuOpen(true);
            }}
          >
            <MenuIcon size={24} />
          </button>
          <form action="/buscar" role="search" className="hidden w-full max-w-[300px] lg:block">
            <label htmlFor="header-search" className="sr-only">
              {t.header.search}
            </label>
            <div className="relative">
              <SearchIcon
                size={18}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-secundario"
              />
              <input
                id="header-search"
                name="q"
                type="search"
                placeholder={t.header.searchPlaceholder}
                className="h-11 w-full rounded-full border border-linea bg-papel pr-4 pl-10 text-[14px] placeholder:text-secundario focus:border-borde-input"
              />
            </div>
          </form>
        </div>

        <Logo compact={compact} />

        <div className="flex items-center justify-self-end gap-1 lg:gap-4">
          <LanguageSwitcher className="hidden lg:flex" />
          <Link href="/buscar" className={cn(iconButton, "lg:hidden")} aria-label={t.header.search}>
            <SearchIcon size={22} />
          </Link>
          {cartButton}
        </div>
      </div>

      {/* Fila de navegación (escritorio) */}
      <nav aria-label={t.nav.label} className="relative hidden border-t border-linea lg:block">
        <ul className="container-site flex h-12 items-center justify-center gap-2 xl:gap-8">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            const linkClass = cn(
              "relative inline-flex h-12 items-center gap-1 px-3 text-[14px] font-semibold tracking-[0.06em] uppercase hover:text-vino",
              active &&
                "text-vino after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-vino",
            );
            if (item.key !== "shop") {
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass}>
                    {t.nav[item.key]}
                  </Link>
                </li>
              );
            }
            return (
              <li
                key={item.href}
                ref={megaRef as React.Ref<HTMLLIElement>}
                onMouseEnter={hoverOpen}
                onMouseLeave={hoverClose}
                className="flex items-center"
              >
                <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass}>
                  {t.nav[item.key]}
                </Link>
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="mega-tienda"
                  aria-label="Ver categorías de la tienda"
                  onClick={() => {
                    // Si el ratón acaba de abrirlo al pasar por encima, el clic no lo cierra.
                    if (Date.now() - hoverOpenedAt.current < 400) return setMegaOpen(true);
                    setMegaOpen((o) => !o);
                  }}
                  className="-ml-2 inline-flex h-11 w-8 items-center justify-center hover:text-vino"
                >
                  <ChevronDownIcon
                    size={14}
                    className={cn("transition-transform", megaOpen && "rotate-180")}
                  />
                </button>
                <MegaMenu
                  open={megaOpen}
                  categories={categories}
                  occasions={occasions}
                  onNavigate={() => setMegaOpen(false)}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Menú móvil */}
      <dialog
        ref={menuRef}
        aria-label={t.nav.label}
        onClose={() => setMenuOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-sm bg-crema text-tinta backdrop:bg-tinta/50"
      >
        <div className="flex h-[72px] items-center justify-between border-b border-linea px-6">
          <span className="font-serif text-[22px]">{site.name}</span>
          <button
            type="button"
            className={cn(iconButton, "-mr-2.5")}
            aria-label={t.header.closeMenu}
            onClick={() => menuRef.current?.close()}
          >
            <CloseIcon size={24} />
          </button>
        </div>
        <nav aria-label={t.nav.label} className="px-6 pt-2 pb-8">
          <p className="eyebrow mt-4 mb-3 text-[12px] text-vino">Compra por categoría</p>
          <ul className="grid grid-cols-3 gap-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/tienda/${c.slug}`}
                  onClick={() => menuRef.current?.close()}
                  className="block text-center text-[13px] leading-tight font-medium"
                >
                  <ImagePlaceholder label="" src={c.src} ratio="3 / 4" className="arch mb-2" />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 border-t border-linea">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-linea">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => menuRef.current?.close()}
                    className={cn(
                      "flex min-h-[56px] items-center font-serif text-[22px]",
                      active && "text-vino",
                    )}
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="eyebrow mt-8 mb-2 text-[12px] text-vino">Regalos por ocasión</p>
          <ul className="flex flex-wrap gap-2">
            {occasions.map((o) => (
              <li key={o.slug}>
                <Link
                  href={o.href}
                  onClick={() => menuRef.current?.close()}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-linea bg-papel px-4 text-[14px]"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-1 text-[14px] text-secundario">
            <p>
              <a href={site.phone.href} className="font-semibold text-vino">
                {site.phone.display}
              </a>{" "}
              · {site.address.street}
            </p>
          </div>
          <LanguageSwitcher className="mt-6 flex" />
        </nav>
      </dialog>
    </header>
  );
}

function MegaMenu({
  open,
  categories,
  occasions,
  onNavigate,
}: {
  open: boolean;
  categories: HeaderCategory[];
  occasions: HeaderOccasion[];
  onNavigate: () => void;
}) {
  return (
    <div
      id="mega-tienda"
      hidden={!open}
      className="absolute inset-x-0 top-full border-y border-linea bg-crema shadow-[0_24px_40px_-24px_rgba(42,31,26,0.25)]"
    >
      <div className="container-site grid grid-cols-[minmax(0,1fr)_220px_300px] gap-10 py-8">
        <div>
          <p className="eyebrow mb-4 text-[12px] text-vino">Compra por categoría</p>
          <ul className="grid grid-cols-6 gap-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/tienda/${c.slug}`}
                  onClick={onNavigate}
                  className="group block text-center"
                >
                  <div className="arch overflow-hidden">
                    <ImagePlaceholder
                      label=""
                      src={c.src}
                      ratio="3 / 4"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <span className="mt-2 block font-serif text-[16px] leading-tight group-hover:text-vino">
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-[12px] text-vino">Regalos por ocasión</p>
          <ul className="space-y-1">
            {occasions.map((o) => (
              <li key={o.slug}>
                <Link
                  href={o.href}
                  onClick={onNavigate}
                  className="inline-flex min-h-[36px] items-center text-[15px] hover:text-vino hover:underline"
                >
                  {o.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/tienda"
                onClick={onNavigate}
                className="mt-3 inline-flex min-h-[36px] items-center text-[15px] font-semibold text-vino"
              >
                Ver toda la tienda →
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href="/regalos#cesta-estafeta"
          onClick={onNavigate}
          className="group relative block overflow-hidden bg-vino text-crema"
        >
          <ImagePlaceholder label="Foto · Cesta Estafeta" ratio="16 / 9" />
          <div className="p-5">
            <p className="eyebrow text-[11px] text-dorado">Cesta de la casa</p>
            <p className="mt-1 font-serif text-[22px] leading-tight">Cesta Estafeta</p>
            <p className="mt-2 text-[14px] font-semibold underline-offset-4 group-hover:underline">
              Descúbrela →
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

/**
 * Selector de idioma. De momento solo está publicado el español; "EN" se
 * muestra desactivado hasta activar la versión inglesa (ver lib/i18n).
 */
function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <div
      role="group"
      aria-label={t.header.languageLabel}
      className={cn("items-center gap-1 text-[13px] font-semibold tracking-[0.04em]", className)}
    >
      <span aria-current="true" lang="es" className="text-vino">
        ES
      </span>
      <span aria-hidden="true" className="text-secundario">
        ·
      </span>
      <span
        lang="en"
        aria-disabled="true"
        title={t.header.languageSoon}
        className="cursor-not-allowed text-secundario"
      >
        EN<span className="sr-only"> ({t.header.languageSoon})</span>
      </span>
    </div>
  );
}
