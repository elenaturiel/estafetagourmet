import type { Metadata } from "next";
import { getLocale, getT } from "@/lib/i18n/server";
import { Link } from "@/components/ui/Link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { pairingGroups } from "@/data/pairings";
import { localizePairingGroup } from "@/data/i18n/pairings";
import { fmt } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.pages.pairings.metaTitle, description: t.pages.pairings.metaDescription, path: "/maridajes" });
}

export default async function PairingsPage() {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const p = t.pages.pairings;
  const groups = pairingGroups.map((g) => localizePairingGroup(g, locale));
  return (
    <>
      <PageHeader
        eyebrow={p.eyebrow}
        title={p.title}
        intro={p.intro}
      />
      <div className="container-site pb-12 lg:pb-24">
        <nav aria-label={p.navAria}>
          <ul className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.slug}>
                <a
                  href={`#${g.slug}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-tinta px-5 text-[14px] font-semibold transition-colors hover:bg-tinta hover:text-crema"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {groups.map((g) => (
          <section key={g.slug} id={g.slug} aria-labelledby={`${g.slug}-t`} className="mt-10 scroll-mt-40 lg:mt-20">
            <p className="eyebrow text-vino">{g.subtitle}</p>
            <h2 id={`${g.slug}-t`} className="mt-2 text-[28px] leading-tight tracking-[-0.02em] lg:text-[44px]">
              {g.title}
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3 lg:mt-8 lg:gap-6">
              {g.items.map((it) => (
                <li key={it.n}>
                  <article className="group/card flex h-full flex-col border border-linea bg-papel transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transform-none">
                    <div className="overflow-hidden">
                      <ImagePlaceholder
                        label={p.photo}
                        src={`/images/maridajes/maridaje-${it.n}.webp`}
                        alt={fmt(p.alt, { title: it.title, drink: it.with })}
                        ratio="4 / 3"
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="bg-arena transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 lg:p-5">
                      <p className="eyebrow text-[12px] text-secundario">{it.kicker}</p>
                      <h3 className="mt-2 text-[22px] leading-snug tracking-[-0.015em]">{it.title}</h3>
                      <p className="mt-1 font-serif text-[17px] text-vino italic">{fmt(p.with, { drink: it.with })}</p>
                      <p className="mt-3 text-[15px] leading-[1.6] text-secundario">{it.text}</p>
                      <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-[14px] font-semibold text-vino">
                        {it.shop.map((l) => (
                          <Link key={l.href} href={l.href} className="underline-offset-4 hover:underline">
                            {l.label} →
                          </Link>
                        ))}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
