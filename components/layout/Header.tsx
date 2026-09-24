"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/useCart";
import { CartIcon, CloseIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const iconButtonBase = "h-11 w-11 items-center justify-center rounded-eg text-tinta hover:text-vino";
const iconButton = `inline-flex ${iconButtonBase}`;

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const menuRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú móvil al navegar.
  useEffect(() => {
    menuRef.current?.close();
    searchRef.current?.close();
  }, [pathname]);

  const openMenu = () => {
    menuRef.current?.showModal();
    setMenuOpen(true);
  };

  return (
    <header className="border-b border-linea bg-crema">
      <div className="container-site grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[88px] lg:grid-cols-[auto_1fr_auto]">
        {/* Móvil: hamburguesa */}
        <div className="lg:hidden">
          <button
            type="button"
            className={cn(iconButton, "-ml-2.5")}
            aria-label={t.header.openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={openMenu}
          >
            <MenuIcon size={24} />
          </button>
        </div>

        <Logo className="justify-self-center lg:justify-self-start" />

        {/* Escritorio: navegación principal */}
        <nav aria-label={t.nav.label} className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-2 xl:gap-6">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center px-3 text-[15px] font-medium hover:text-vino",
                      active &&
                        "text-vino after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-vino",
                    )}
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-1 lg:gap-3">
          <LanguageSwitcher className="hidden lg:flex" />
          <button
            type="button"
            className={cn(iconButtonBase, "hidden lg:inline-flex")}
            aria-label={t.header.search}
            aria-haspopup="dialog"
            onClick={() => searchRef.current?.showModal()}
          >
            <SearchIcon />
          </button>
          <Link
            href="/cesta"
            aria-label={t.header.cartAria(count)}
            className="inline-flex h-11 items-center gap-2 rounded-eg border-tinta px-2 text-[15px] font-medium hover:border-vino hover:text-vino lg:border lg:px-4"
          >
            <CartIcon />
            <span className="hidden lg:inline">{t.header.cart(count)}</span>
            <span className="text-[14px] tabular-nums lg:hidden">{count}</span>
          </Link>
        </div>
      </div>

      {/* Menú móvil (dialog nativo: bloquea el fondo, Esc cierra, foco atrapado) */}
      <dialog
        ref={menuRef}
        aria-label={t.nav.label}
        onClose={() => setMenuOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-sm bg-crema text-tinta backdrop:bg-tinta/40"
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
        <nav aria-label={t.nav.label} className="px-6 py-4">
          <ul>
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
          <form action="/buscar" role="search" className="mt-6">
            <label htmlFor="mobile-search" className="mb-2 block text-[14px] font-medium">
              {t.header.search}
            </label>
            <div className="flex gap-2">
              <input
                id="mobile-search"
                name="q"
                type="search"
                placeholder={t.header.searchPlaceholder}
                className="min-h-[52px] w-full rounded-eg border border-borde-input bg-papel px-4 text-[16px]"
              />
              <button
                type="submit"
                aria-label={t.header.search}
                className="inline-flex min-h-[52px] min-w-[52px] items-center justify-center rounded-eg bg-vino text-crema"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
          <LanguageSwitcher className="mt-6 flex" />
        </nav>
      </dialog>

      {/* Búsqueda en escritorio */}
      <dialog
        ref={searchRef}
        aria-label={t.header.search}
        className="mx-auto mt-24 w-[min(640px,calc(100%-48px))] rounded-eg border border-linea bg-crema p-6 text-tinta backdrop:bg-tinta/40"
      >
        <form action="/buscar" role="search">
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor="desktop-search" className="font-serif text-[22px]">
              {t.header.search}
            </label>
            <button
              type="button"
              className={iconButton}
              aria-label={t.header.searchClose}
              onClick={() => searchRef.current?.close()}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex gap-2">
            <input
              id="desktop-search"
              name="q"
              type="search"
              autoFocus
              placeholder={t.header.searchPlaceholder}
              className="min-h-[52px] w-full rounded-eg border border-borde-input bg-papel px-4 text-[16px]"
            />
            <button
              type="submit"
              className="min-h-[52px] rounded-eg bg-vino px-6 font-semibold text-crema hover:bg-vino-oscuro"
            >
              {t.header.search}
            </button>
          </div>
        </form>
      </dialog>
    </header>
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
