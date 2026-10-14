import { SiteChrome } from "@/components/layout/SiteChrome";
import { ButtonLink } from "@/components/ui/Button";
import { getT } from "@/lib/i18n/server";

export default async function NotFound() {
  const t = await getT();
  return (
    <SiteChrome>
      <div className="container-site py-16 lg:py-32">
        <p className="eyebrow text-vino">404</p>
        <h1 className="mt-3 text-[32px] leading-tight tracking-[-0.02em] lg:text-[60px]">{t.common.notFound.title}</h1>
        <p className="mt-4 max-w-xl text-[16px] text-secundario lg:text-[17px]">{t.common.notFound.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">{t.common.notFound.home}</ButtonLink>
          <ButtonLink href="/tienda" variant="secondary">
            {t.common.notFound.shop}
          </ButtonLink>
        </div>
      </div>
    </SiteChrome>
  );
}
