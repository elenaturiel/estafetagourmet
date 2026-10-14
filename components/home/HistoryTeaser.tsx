import { Eyebrow } from "@/components/ui/Section";
import { getT } from "@/lib/i18n/server";

/**
 * Un párrafo corto sobre la historia de la tienda, justo debajo de la
 * cabecera de la portada. Enlaza al apartado "Quiénes somos" más abajo.
 */
export async function HistoryTeaser() {
  const t = await getT();
  return (
    <section aria-label={t.home.history.label} className="border-b border-linea bg-papel">
      <div className="container-site py-6 text-center lg:py-10">
        <Eyebrow>{t.home.history.label}</Eyebrow>
        <p className="mx-auto mt-2 max-w-2xl font-serif text-[16px] leading-[1.55] text-tinta lg:mt-3 lg:text-[22px] lg:leading-[1.5]">
          {t.home.history.text}
        </p>
        <a
          href="#quienes-title"
          className="mt-2 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-vino underline-offset-4 hover:underline"
        >
          {t.home.history.link}
        </a>
      </div>
    </section>
  );
}
