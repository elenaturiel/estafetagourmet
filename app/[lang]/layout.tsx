import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, site } from "@/data/site";
import { getClientDictionary, getDictionary } from "@/lib/i18n";
import { isLocale, locales, ogLocales } from "@/lib/i18n/config";
import { LocaleProvider } from "@/lib/i18n/client";
import { dmSans, fraunces } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.common.site.titleDefault,
      template: `%s | ${site.name}`,
    },
    description: t.common.site.description,
    applicationName: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocales[lang],
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#F6F0E4",
};

/**
 * Layout raíz: fuentes, metadatos, idioma y <html>/<body>.
 * La estructura de la web pública (cabecera, pie, cesta…) está en
 * app/[lang]/(site)/layout.tsx; el panel del blog (/admin) tiene su propio layout.
 */
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      // Next desactiva el scroll suave durante los cambios de página (ver globals.css).
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${dmSans.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <LocaleProvider locale={lang} t={getClientDictionary(lang)}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
