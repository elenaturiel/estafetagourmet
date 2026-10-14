import type { Metadata } from "next";
import { AvisoLegal } from "@/components/legal/AvisoLegal";
import { LegalPage } from "@/components/ui/LegalPage";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const m = t.legal.notice;
  return pageMetadata({ locale, title: m.title, description: m.metaDescription, path: "/aviso-legal" });
}

export default async function Page() {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return (
    <LegalPage title={t.legal.notice.title}>
      <AvisoLegal locale={locale} />
    </LegalPage>
  );
}
