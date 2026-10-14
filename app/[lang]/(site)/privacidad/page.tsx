import type { Metadata } from "next";
import { Privacidad } from "@/components/legal/Privacidad";
import { LegalPage } from "@/components/ui/LegalPage";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const m = t.legal.privacy;
  return pageMetadata({ locale, title: m.title, description: m.metaDescription, path: "/privacidad" });
}

export default async function Page() {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return (
    <LegalPage title={t.legal.privacy.title}>
      <Privacidad locale={locale} />
    </LegalPage>
  );
}
