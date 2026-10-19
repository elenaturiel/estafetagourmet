import type { Metadata } from "next";
import { getLocale, getT } from "@/lib/i18n/server";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { PostCard } from "@/components/cards/PostCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPosts } from "@/lib/catalog";
import { fmt } from "@/lib/i18n/config";
import { getNewsletters } from "@/lib/newsletters";
import { pageMetadata } from "@/lib/seo";
import { newsletterIncentive } from "@/lib/site-text";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.pages.blog.metaTitle, description: t.pages.blog.metaDescription, path: "/blog" });
}

/** Las entradas y boletines nuevos del panel aparecen sin volver a publicar la web. */
export const revalidate = 300;

/** Blog y newsletter en una sola página: artículos, boletines y suscripción. */
export default async function BlogPage() {
  const [posts, list, t, locale] = await Promise.all([getPosts(), getNewsletters(), getT(), getLocale()]);
  const b = t.pages.blog;
  const n = t.pages.newsletter;
  const issues = [...list].reverse();
  const [before, after] = fmt(n.text, { incentive: "\u0000" }).split("\u0000");
  const tab =
    "inline-flex min-h-[44px] items-center border-b-2 border-transparent px-1 text-[14px] font-semibold tracking-[0.06em] uppercase transition-colors hover:border-vino hover:text-vino";
  return (
    <>
      <PageHeader eyebrow={b.eyebrow} title={b.title} intro={b.intro} />
      <div className="container-site">
        <nav aria-label={b.eyebrow} className="flex gap-6 border-b border-linea">
          <a href="#articulos" className={tab}>
            {b.articles}
          </a>
          <a href="#boletines" className={tab}>
            {b.tabNewsletter}
          </a>
          <a href="#suscribete" className={tab}>
            {n.subscribe}
          </a>
        </nav>
      </div>

      <section id="articulos" aria-labelledby="articulos-title" className="container-site scroll-mt-32 pt-8 pb-10 lg:pt-12 lg:pb-16">
        {b.spanishOnly ? <p className="mb-6 text-[14px] text-secundario">{b.spanishOnly}</p> : null}
        <h2 id="articulos-title" className="mb-6 text-[26px] tracking-[-0.02em] lg:mb-8 lg:text-[36px]">
          {b.articles}
        </h2>
        <ul className="grid gap-7 md:grid-cols-3 md:gap-5">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </section>

      <section id="boletines" aria-labelledby="boletines-title" className="container-site scroll-mt-32 border-t border-linea pt-8 pb-12 lg:pt-14 lg:pb-24">
        {n.spanishOnly ? <p className="mb-6 text-[14px] text-secundario">{n.spanishOnly}</p> : null}
        <h2 id="boletines-title" className="text-[26px] tracking-[-0.02em] lg:text-[36px]">
          {n.title}
        </h2>
        <p className="mt-2 mb-6 max-w-2xl text-[16px] leading-[1.6] text-secundario lg:mb-8">{n.intro}</p>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {issues.map((issue) => (
            <li key={issue.slug}>
              <NewsletterCard issue={issue} />
            </li>
          ))}
        </ul>
      </section>

      <section id="suscribete" aria-labelledby="suscribete-title" className="scroll-mt-24 bg-crema-oscuro py-10 lg:py-20">
        <div className="container-site text-center">
          <p className="eyebrow text-vino">{n.subscribe}</p>
          <h2 id="suscribete-title" className="mx-auto mt-3 max-w-2xl text-[28px] leading-[1.1] tracking-[-0.02em] lg:mt-4 lg:text-[44px]">
            {n.next} <em className="font-normal text-vino italic">{n.inbox}</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-secundario">
            {before}
            <strong className="font-semibold text-tinta">{newsletterIncentive(locale)}</strong>
            {after}
          </p>
          <NewsletterForm source="web" />
        </div>
      </section>
    </>
  );
}
