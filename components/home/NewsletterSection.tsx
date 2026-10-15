import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ArrowLink } from "@/components/ui/Button";
import { Stamp } from "@/components/ui/Stamp";
import { fmt } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { newsletterIncentive } from "@/lib/site-text";

export async function NewsletterSection() {
  const t = (await getT()).home.newsletter;
  const [before, after] = fmt(t.text, { incentive: "\u0000" }).split("\u0000");
  return (
    <section aria-labelledby="newsletter-title" className="relative overflow-hidden bg-crema-oscuro py-10 lg:py-24">
      <Stamp text={t.stamp} className="absolute -top-10 -right-10 hidden w-[180px] opacity-90 lg:block" />
      <div data-reveal className="container-site relative text-center">
        <p className="eyebrow text-vino">{t.eyebrow}</p>
        <h2
          id="newsletter-title"
          className="mx-auto mt-2 max-w-3xl text-[30px] leading-[1.06] tracking-[-0.02em] lg:mt-4 lg:text-[56px] lg:leading-[1.05]"
        >
          {t.title} <em className="font-normal text-vino italic">{t.em}</em>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[16px] text-secundario lg:mt-4 lg:text-[17px]">
          {before}
          <strong className="font-semibold text-tinta">{newsletterIncentive(await getLocale())}</strong>
          {after}
        </p>
        <NewsletterForm />
        <ArrowLink href="/newsletter" className="mt-4 lg:mt-6">
          {t.link}
        </ArrowLink>
      </div>
    </section>
  );
}
