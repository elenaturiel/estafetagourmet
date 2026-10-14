import { Marquee } from "@/components/ui/Marquee";
import { getT } from "@/lib/i18n/server";

/** Cinta vino con los productos de la tierra, en Fraunces cursiva. */
export async function ProductMarquee() {
  const t = await getT();
  return (
    <Marquee
      items={t.home.marquee}
      className="border-y border-vino-oscuro bg-vino py-3 font-serif text-[22px] text-crema italic lg:py-5 lg:text-[36px]"
    />
  );
}
