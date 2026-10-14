import type { Metadata } from "next";
import { Cookies } from "@/components/legal/Cookies";
import { LegalPage } from "@/components/ui/LegalPage";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const m = t.legal.cookies;
  return pageMetadata({ locale, title: m.title, description: m.metaDescription, path: "/cookies" });
}

export default async function Page() {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return (
    <LegalPage title={t.legal.cookies.title}>
      <Cookies locale={locale} />
    </LegalPage>
  );
}
