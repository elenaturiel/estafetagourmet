import { ArrowLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Stamp } from "@/components/ui/Stamp";
import { getT } from "@/lib/i18n/server";

export async function AboutSection() {
  const t = (await getT()).home.about;
  return (
    <Section tone="papel" aria-labelledby="quienes-title">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <div className="relative">
          <div data-reveal="clip">
            <ImagePlaceholder
              label={t.imageLabel}
              src="/images/tienda/fachada.webp"
              alt={t.imageAlt}
              ratio="640 / 440"
              sizes="(min-width: 1024px) 640px, 100vw"
              className="rounded-eg"
            />
          </div>
          <Stamp text={t.stamp} className="absolute -top-6 -left-2 hidden w-[110px] sm:block lg:-top-8 lg:-left-4 lg:w-[130px]" />
        </div>
        <div data-reveal className="max-w-xl">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2
            id="quienes-title"
            className="mt-2 text-[28px] leading-[1.08] tracking-[-0.02em] lg:mt-4 lg:text-[48px] lg:leading-[1.05]"
          >
            {t.title}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-secundario lg:mt-6 lg:text-[17px]">{t.p1}</p>
          <p className="mt-3 text-[16px] leading-[1.6] text-secundario lg:mt-4 lg:text-[17px]">{t.p2}</p>
          <ArrowLink href="/visitanos" className="mt-3 lg:mt-4">
            {t.link}
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
