import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { getDictionary } from "./index";
import { isLocale, type Locale } from "./config";

/** Idioma de la página actual (Server Components). */
export async function getLocale(): Promise<Locale> {
  const l = await lang();
  if (!l || !isLocale(l)) notFound();
  return l;
}

/** Textos de la página actual (Server Components). */
export async function getT() {
  return getDictionary(await getLocale());
}
