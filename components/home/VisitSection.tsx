import { ContactForm } from "@/components/forms/ContactForm";
import { DirectionsButton, GoogleMap } from "@/components/home/GoogleMap";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/ui/Section";
import { isPlaceholder, site } from "@/data/site";
import { getLocale, getT } from "@/lib/i18n/server";
import { hoursLabel } from "@/lib/site-text";

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow text-[12px] text-secundario">{title}</dt>
      <dd className="mt-1 text-[16px]">{children}</dd>
    </div>
  );
}

export async function VisitSection({
  headingLevel = "h2",
}: {
  /** En /visitanos el título de la sección es el H1 de la página. */
  headingLevel?: "h1" | "h2";
}) {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const v = t.home.visit;
  const Heading = headingLevel;
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <Section aria-labelledby="visitanos-title" id="contacto">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>{v.eyebrow}</Eyebrow>
          <Heading
            id="visitanos-title"
            className="mt-2 text-[28px] leading-[1.1] tracking-[-0.02em] lg:mt-4 lg:text-[44px]"
          >
            {v.title}
          </Heading>
          <dl className="mt-6 space-y-5 lg:mt-8 lg:space-y-6">
            <InfoBlock title={v.address}>
              <address className="not-italic">
                {site.address.street} · {site.address.postalCode} {site.address.city}
              </address>
            </InfoBlock>
            <InfoBlock title={v.hours}>
              {[t.common.site.hoursDays, hoursLabel(locale)].filter(Boolean).join(" · ")}
            </InfoBlock>
            <InfoBlock title={v.phoneEmail}>
              <a href={site.phone.href} className="font-semibold text-vino underline-offset-4 hover:underline">
                {site.phone.display}
              </a>{" "}
              ·{" "}
              {isPlaceholder(site.email) ? (
                site.email
              ) : (
                <a href={`mailto:${site.email}`} className="text-vino hover:underline">
                  {site.email}
                </a>
              )}
            </InfoBlock>
          </dl>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-row lg:mt-8">
            <DirectionsButton className="w-full sm:w-auto" />
            <ButtonLink
              href={`${site.whatsappHref}?text=${encodeURIComponent(t.common.whatsapp.message)}`}
              target="_blank"
              rel="noopener"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {v.whatsapp}
              <span className="sr-only">{v.newTab}</span>
            </ButtonLink>
          </div>
        </div>

        <div>
          <GoogleMap className="h-[240px] lg:h-[360px]" />
          <SubHeading className="sr-only">{v.writeUs}</SubHeading>
          <div className="mt-6 lg:mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
