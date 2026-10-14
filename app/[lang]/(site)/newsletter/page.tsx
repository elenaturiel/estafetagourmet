import type { Metadata } from "next";
import { getLocale, getT } from "@/lib/i18n/server";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/data/site";
import { fmt } from "@/lib/i18n/config";
import { getNewsletters } from "@/lib/newsletters";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.pages.newsletter.metaTitle, description: t.pages.newsletter.metaDescription, path: "/newsletter" });
}

/** Los boletines nuevos del panel aparecen en unos minutos. */
export const revalidate = 300;

export default async function NewsletterArchivePage() {
  const [list, t] = await Promise.all([getNewsletters(), getT()]);
  const issues = list.reverse();
  const n = t.pages.newsletter;
  const [before, after] = fmt(n.text, { incentive: "\u0000" }).split("\u0000");
  return (
    <>
      <PageHeader
        eyebrow={n.eyebrow}
        title={n.title}
        intro={n.intro}
      />
      <div className="container-site pb-12 lg:pb-24">
        {n.spanishOnly ? <p className="mb-6 text-[14px] text-secundario">{n.spanishOnly}</p> : null}
        <h2 className="sr-only">{n.all}</h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {issues.map((issue) => (
            <li key={issue.slug}>
              <NewsletterCard issue={issue} />
            </li>
          ))}
        </ul>
      </div>
      <section aria-labelledby="suscribete" className="bg-crema-oscuro py-10 lg:py-20">
        <div className="container-site text-center">
          <p className="eyebrow text-vino">{n.subscribe}</p>
          <h2 id="suscribete" className="mx-auto mt-3 max-w-2xl text-[28px] leading-[1.1] tracking-[-0.02em] lg:mt-4 lg:text-[44px]">
            {n.next} <em className="font-normal text-vino italic">{n.inbox}</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-secundario">
            {before}
            <strong className="font-semibold text-tinta">{site.newsletterIncentive}</strong>
            {after}
          </p>
          <NewsletterForm source="web" />
        </div>
      </section>
    </>
  );
}
