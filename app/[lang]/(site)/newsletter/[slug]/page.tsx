import type { Metadata } from "next";
import { Link } from "@/components/ui/Link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/ProductCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { RichText } from "@/components/newsletter/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { NEWSLETTER_SOURCE } from "@/data/newsletters";
import { NEWSLETTER_SOURCE_TEXT } from "@/data/i18n/newsletters";
import { newsletterIncentive } from "@/lib/site-text";
import { SITE_URL, site } from "@/data/site";
import { getProducerMap, getProductsByNames } from "@/lib/catalog";
import { getNewsletterBySlug, getNewsletters } from "@/lib/newsletters";
import { fmt, localePath } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

// Los boletines nuevos del panel se generan al visitarlos y se refrescan cada 5 minutos.
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getNewsletters()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const issue = await getNewsletterBySlug((await params).slug);
  if (!issue) return {};
  return pageMetadata({
    locale: await getLocale(),
    title: `${issue.title}: ${issue.subtitle.toLowerCase()}`,
    description: issue.excerpt,
    path: `/newsletter/${issue.slug}`,
    image: issue.image.src,
    type: "article",
  });
}

export default async function NewsletterIssuePage({ params }: Params) {
  const issue = await getNewsletterBySlug((await params).slug);
  if (!issue) notFound();
  const [products, producers, t, locale] = await Promise.all([getProductsByNames(issue.shop.products), getProducerMap(), getT(), getLocale()]);
  const n = t.pages.newsletter;
  const [before, after] = fmt(n.text, { incentive: "\u0000" }).split("\u0000");
  const path = `/newsletter/${issue.slug}`;
  const sorted = await getNewsletters();
  const i = sorted.findIndex((n) => n.slug === issue.slug);
  const prev = sorted[i - 1];
  const next = sorted[i + 1];

  return (
    <article className="pb-12 lg:pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: issue.title,
          description: issue.excerpt,
          image: absoluteUrl(issue.image.src),
          url: absoluteUrl(localePath(locale, path)),
          publisher: { "@id": `${SITE_URL}/#tienda`, name: site.name },
        }}
      />
      <header className="container-site pt-5 lg:pt-10">
        <Breadcrumbs
          items={[
            { name: t.shop.breadcrumb.home, path: "/" },
            { name: t.common.nav.blog, path: "/blog" },
            { name: issue.title, path },
          ]}
        />
        <div className="mx-auto mt-6 max-w-3xl text-center lg:mt-10">
          <p className="eyebrow text-vino">
            {fmt(n.issueLabel, { n: issue.number, theme: issue.theme })}
          </p>
          <h1 className="mt-3 text-[30px] leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:mt-4 lg:text-[60px] lg:leading-[1.04]">{issue.title}</h1>
          <p className="mt-3 font-serif text-[20px] text-vino italic lg:text-[24px]">{issue.subtitle}</p>
        </div>
      </header>

      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          {n.spanishOnly ? <p className="mt-6 text-[13px] text-secundario">{n.spanishOnly}</p> : null}
          <p className="mt-8 font-serif text-[19px] leading-[1.5] text-tinta italic lg:mt-12 lg:text-[26px]">{issue.lead}</p>

          <dl className="mt-8 grid grid-cols-2 gap-3 lg:mt-10 lg:gap-4">
            {issue.stats.map((s) => (
              <div key={s.value} className="flex flex-col-reverse border border-linea bg-papel px-4 py-5 text-center">
                <dt className="mt-2 text-[13px] leading-[1.4] text-secundario">{s.label}</dt>
                <dd className="font-serif text-[26px] leading-tight text-vino lg:text-[32px]">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="text-[16px] leading-[1.7] text-secundario lg:text-[17px]">
            {issue.sections.map((sec) => (
              <section key={sec.title} className="mt-9 lg:mt-12">
                <h2 className="text-[22px] leading-tight tracking-[-0.015em] text-tinta lg:text-[32px]">{sec.title}</h2>
                {sec.paragraphs?.map((p) => (
                  <p key={p} className="mt-4">
                    <RichText text={p} />
                  </p>
                ))}
                {sec.list ? (
                  <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-vino">
                    {sec.list.map((li) => (
                      <li key={li}>
                        <RichText text={li} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {sec.tip ? (
                  <aside className="mt-6 border-l-4 border-dorado bg-tinta px-6 py-5 text-[16px] leading-[1.6] text-crema">
                    <p className="eyebrow text-[12px] text-dorado">{n.tip}</p>
                    <p className="mt-2">{sec.tip}</p>
                  </aside>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        {products.length > 0 ? (
          <section aria-labelledby="en-la-tienda" className="mx-auto mt-12 max-w-5xl border-t border-linea pt-9 lg:mt-20 lg:pt-12">
            <p className="eyebrow text-vino">{n.inShop}</p>
            <h2 id="en-la-tienda" className="mt-2 text-[28px] leading-tight tracking-[-0.02em] lg:text-[36px]">
              {issue.shop.title}
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:mt-8 lg:gap-x-6 lg:gap-y-10">
              {products.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} />
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <ButtonLink href={issue.shop.cta.href}>{issue.shop.cta.label}</ButtonLink>
            </div>
          </section>
        ) : null}

        <p className="mx-auto mt-12 max-w-3xl text-center text-[13px] text-secundario">{locale === "es" ? NEWSLETTER_SOURCE : NEWSLETTER_SOURCE_TEXT[locale]}</p>

        <nav aria-label={n.others} className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-between gap-4 border-t border-linea pt-8">
          {prev ? (
            <Link href={`/newsletter/${prev.slug}`} className="min-h-[44px] text-[15px] font-semibold text-vino hover:underline">
              <span aria-hidden="true">←</span> {fmt(n.issueShort, { n: prev.number, title: prev.title })}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/newsletter/${next.slug}`} className="min-h-[44px] text-right text-[15px] font-semibold text-vino hover:underline">
              {fmt(n.issueShort, { n: next.number, title: next.title })} <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link href="/blog#boletines" className="min-h-[44px] text-[15px] font-semibold text-vino hover:underline">
              {n.all} <span aria-hidden="true">→</span>
            </Link>
          )}
        </nav>
      </div>

      <section aria-labelledby="suscribete" className="mt-12 bg-crema-oscuro py-10 lg:mt-16 lg:py-20">
        <div className="container-site text-center">
          <h2 id="suscribete" className="mx-auto max-w-2xl text-[26px] leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
            {n.liked} <em className="font-normal text-vino italic">{n.inbox}</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-secundario">
            {before}
            <strong className="font-semibold text-tinta">{newsletterIncentive(locale)}</strong>
            {after}
          </p>
          <NewsletterForm source="web" />
        </div>
      </section>
    </article>
  );
}
