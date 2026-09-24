import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";
import { t } from "@/lib/i18n";
import { CookieSettingsButton } from "./CookieBanner";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="eyebrow mb-3 font-sans text-[12px] tracking-[0.16em] text-dorado">{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex min-h-[36px] items-center text-[15px] text-crema hover:underline lg:min-h-[32px]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="on-dark bg-pie text-pie-texto">
      <div className="container-site pt-14 pb-8 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 max-w-sm lg:col-span-1">
            <p className="font-serif text-[24px] leading-tight font-medium text-crema">{site.name}</p>
            <p className="mt-3 text-[15px] leading-relaxed">
              {t.footer.since(site.foundedYear)} {site.address.street} · {site.address.cityShort}.
            </p>
            <p className="mt-3 text-[15px]">
              <a
                href={site.instagram.href}
                className="inline-flex min-h-[44px] items-center font-semibold text-crema hover:underline"
                rel="noopener"
              >
                Instagram · {site.instagram.handle}
              </a>
            </p>
          </div>
          <FooterColumn title={t.footer.shop} links={footerNav.shop} />
          <FooterColumn title={t.footer.help} links={footerNav.help} />
          <FooterColumn title={t.footer.legal} links={footerNav.legal} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-pie-borde pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name} · {site.address.cityShort}, {site.address.region} · {site.domainLabel}
          </p>
          <CookieSettingsButton className="self-start text-pie-texto underline-offset-4 hover:underline sm:self-auto" />
        </div>
      </div>
    </footer>
  );
}
