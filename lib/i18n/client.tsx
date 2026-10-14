"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { splitLocale, type Locale } from "./config";
import type { ClientDictionary } from "./index";

const Ctx = createContext<{ locale: Locale; t: ClientDictionary } | null>(null);

/** Da el idioma y los textos a los componentes de cliente. Lo pone app/[lang]/layout.tsx. */
export function LocaleProvider({ locale, t, children }: { locale: Locale; t: ClientDictionary; children: ReactNode }) {
  return <Ctx.Provider value={{ locale, t }}>{children}</Ctx.Provider>;
}

function useCtx() {
  const v = useContext(Ctx);
  if (!v) throw new Error("Falta <LocaleProvider>");
  return v;
}

export const useLocale = () => useCtx().locale;
export const useT = () => useCtx().t;

/** Ruta actual sin el prefijo del idioma ("/en/tienda" → "/tienda"). */
export function usePath(): string {
  return splitLocale(usePathname()).path;
}
