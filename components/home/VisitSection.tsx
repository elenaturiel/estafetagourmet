import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow, Section } from "@/components/ui/Section";
import { isPlaceholder, site } from "@/data/site";

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow text-[12px] text-secundario">{title}</dt>
      <dd className="mt-1.5 text-[16px]">{children}</dd>
    </div>
  );
}

export function VisitSection({
  headingLevel = "h2",
}: {
  /** En /visitanos el título de la sección es el H1 de la página. */
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <Section aria-labelledby="visitanos-title" id="contacto">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Visítanos</Eyebrow>
          <Heading
            id="visitanos-title"
            className="mt-4 text-[32px] leading-[1.1] tracking-[-0.02em] lg:text-[44px]"
          >
            En el corazón de la calle Estafeta
          </Heading>
          <dl className="mt-8 space-y-6">
            <InfoBlock title="Dirección">
              <address className="not-italic">
                {site.address.street} · {site.address.postalCode} {site.address.city}
              </address>
            </InfoBlock>
            <InfoBlock title="Horario">
              {site.hours.label} · {site.hours.daysLabel}
            </InfoBlock>
            <InfoBlock title="Teléfono y correo">
              <a
                href={site.phone.href}
                className="font-semibold text-vino underline-offset-4 hover:underline"
              >
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.mapsHref} target="_blank" rel="noopener" className="w-full sm:w-auto">
              Cómo llegar<span className="sr-only"> (abre Google Maps en otra pestaña)</span>
            </ButtonLink>
            <ButtonLink
              href={site.whatsappHref}
              target="_blank"
              rel="noopener"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Escribir por WhatsApp<span className="sr-only"> (abre en otra pestaña)</span>
            </ButtonLink>
          </div>
        </div>

        <div>
          {/*
            Mapa: se usa una imagen estática para no cargar Google Maps (que
            instala cookies de terceros) sin consentimiento. Ver TODO.md.
          */}
          <a
            href={site.mapsHref}
            target="_blank"
            rel="noopener"
            className="block"
            aria-label="Ver Calle Estafeta, 70 en Google Maps (abre en otra pestaña)"
          >
            <ImagePlaceholder label="Mapa · Calle Estafeta, 70" className="h-[200px] lg:h-[240px]" />
          </a>
          <h3 className="sr-only">Escríbenos</h3>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
