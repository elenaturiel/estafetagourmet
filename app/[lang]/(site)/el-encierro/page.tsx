import type { Metadata } from "next";
import { EncierroForm } from "@/components/forms/EncierroForm";
import { EncierroCalendar } from "@/components/shop/EncierroCalendar";
import { Eyebrow, Section } from "@/components/ui/Section";
import { ENCIERRO } from "@/data/encierro";
import { getEncierroSeats } from "@/lib/encierro";
import { fmt } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.pages.encierro.metaTitle, description: t.pages.encierro.metaDescription, path: "/el-encierro" });
}

/** Ver el encierro de San Fermín desde un balcón en la calle Estafeta: texto, calendario de plazas y formulario de solicitud. */
export default async function EncierroPage() {
  const [t, locale, seats] = await Promise.all([getT(), getLocale(), getEncierroSeats()]);
  const e = t.pages.encierro;
  return (
    <Section aria-labelledby="encierro-title">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <Eyebrow>{fmt(e.eyebrow, { year: ENCIERRO.year })}</Eyebrow>
          <h1 id="encierro-title" className="mt-2 text-[32px] leading-[1.06] tracking-[-0.025em] lg:mt-4 lg:text-[56px]">
            {e.title}
          </h1>
          <p className="mt-5 font-serif text-[22px] leading-[1.3] lg:mt-7 lg:text-[30px]">{e.question}</p>
          <p className="mt-3 font-serif text-[22px] leading-[1.3] text-vino italic lg:text-[30px]">{e.cta}</p>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-secundario lg:text-[17px]">{e.text}</p>
          <EncierroCalendar seats={seats} locale={locale} t={e} />
          <div className="mt-8 rounded-eg border border-linea bg-papel p-5 lg:mt-10 lg:p-8">
            <EncierroForm seats={seats} />
          </div>
        </div>
        <figure className="lg:pt-4">
          {/* Vídeo de la tienda grabado desde el balcón (sin sonido): se reproduce solo y en bucle. */}
          <video
            src="/images/encierro/encierro-desde-el-balcon.mp4"
            poster="/images/encierro/encierro-desde-el-balcon.webp"
            width={464}
            height={422}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={e.photoAlt}
            className="mx-auto h-auto w-full max-w-[464px] rounded-eg bg-tinta"
          />
          <figcaption className="mx-auto mt-3 max-w-[464px] text-center text-[14px] text-secundario">{e.photoCaption}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
