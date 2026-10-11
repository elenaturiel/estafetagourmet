import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/ProductCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { RichText } from "@/components/newsletter/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { NEWSLETTER_SOURCE, getNewsletter, newsletters } from "@/data/newsletters";
import { SITE_URL, site } from "@/data/site";
import { getProducerMap, getProductsByNames } from "@/lib/catalog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsletters.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const issue = getNewsletter((await params).slug);
  if (!issue) return {};
  return pageMetadata({
    title: `${issue.title}: ${issue.subtitle.toLowerCase()}`,
    description: issue.excerpt,
    path: `/newsletter/${issue.slug}`,
    image: issue.image.src,
    type: "article",
  });
}

export default async function NewsletterIssuePage({ params }: Params) {
  const issue = getNewsletter((await params).slug);
  if (!issue) notFound();
  const [products, producers] = await Promise.all([getProductsByNames(issue.shop.products), getProducerMap()]);
  const path = `/newsletter/${issue.slug}`;
  const sorted = [...newsletters].sort((a, b) => a.number - b.number);
  const i = sorted.findIndex((n) => n.slug === issue.slug);
  const prev = sorted[i - 1];
  const next = sorted[i + 1];

  return (
    <article className="pb-16 lg:pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: issue.title,
          description: issue.excerpt,
          image: absoluteUrl(issue.image.src),
          url: absoluteUrl(path),
          publisher: { "@id": `${SITE_URL}/#tienda`, name: site.name },
        }}
      />
      <header className="container-site pt-8 lg:pt-10">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Newsletter", path: "/newsletter" },
            { name: issue.title, path },
          ]}
        />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="eyebrow text-vino">
            Newsletter nº {issue.number} · {issue.theme}
          </p>
          <h1 className="mt-4 text-[38px] leading-[1.04] tracking-[-0.02em] lg:text-[60px]">{issue.title}</h1>
          <p className="mt-3 font-serif text-[20px] text-vino italic lg:text-[24px]">{issue.subtitle}</p>
        </div>
      </header>

      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <p className="mt-12 font-serif text-[22px] leading-[1.5] text-tinta italic lg:text-[26px]">{issue.lead}</p>

          <dl className="mt-10 grid grid-cols-2 gap-3 lg:gap-4">
            {issue.stats.map((s) => (
              <div key={s.value} className="flex flex-col-reverse border border-linea bg-papel px-4 py-5 text-center">
                <dt className="mt-2 text-[13px] leading-[1.4] text-secundario">{s.label}</dt>
                <dd className="font-serif text-[26px] leading-tight text-vino lg:text-[32px]">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="text-[17px] leading-[1.7] text-secundario">
            {issue.sections.map((sec) => (
              <section key={sec.title} className="mt-12">
                <h2 className="text-[26px] leading-tight tracking-[-0.015em] text-tinta lg:text-[32px]">{sec.title}</h2>
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
                    <p className="eyebrow text-[12px] text-dorado">Consejo Estafeta</p>
                    <p className="mt-2">{sec.tip}</p>
                  </aside>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        {products.length > 0 ? (
          <section aria-labelledby="en-la-tienda" className="mx-auto mt-16 max-w-5xl border-t border-linea pt-12 lg:mt-20">
            <p className="eyebrow text-vino">En Estafeta Gourmet</p>
            <h2 id="en-la-tienda" className="mt-2 text-[28px] leading-tight tracking-[-0.02em] lg:text-[36px]">
              {issue.shop.title}
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6">
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

        <p className="mx-auto mt-12 max-w-3xl text-center text-[13px] text-secundario">{NEWSLETTER_SOURCE}</p>

        <nav aria-label="Otros boletines" className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-between gap-4 border-t border-linea pt-8">
          {prev ? (
            <Link href={`/newsletter/${prev.slug}`} className="min-h-[44px] text-[15px] font-semibold text-vino hover:underline">
              <span aria-hidden="true">←</span> Nº {prev.number} · {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/newsletter/${next.slug}`} className="min-h-[44px] text-right text-[15px] font-semibold text-vino hover:underline">
              Nº {next.number} · {next.title} <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link href="/newsletter" className="min-h-[44px] text-[15px] font-semibold text-vino hover:underline">
              Todos los boletines <span aria-hidden="true">→</span>
            </Link>
          )}
        </nav>
      </div>

      <section aria-labelledby="suscribete" className="mt-16 bg-crema-oscuro py-14 lg:py-20">
        <div className="container-site text-center">
          <h2 id="suscribete" className="mx-auto max-w-2xl text-[30px] leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
            ¿Te ha gustado? Recibe el próximo <em className="font-normal text-vino italic">en tu correo</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-secundario">
            Productos nuevos, maridajes y{" "}
            <strong className="font-semibold text-tinta">{site.newsletterIncentive}</strong>.
          </p>
          <NewsletterForm source="web" />
        </div>
      </section>
    </article>
  );
}
