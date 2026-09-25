import { Marquee } from "@/components/ui/Marquee";

const words = [
  "Queso Roncal",
  "Chistorra",
  "Vino D.O. Navarra",
  "Pimientos del piquillo",
  "Pacharán",
  "Espárragos",
  "Idiazábal",
  "Aceite de oliva",
];

/** Cinta vino con los productos de la tierra, en Fraunces cursiva. */
export function ProductMarquee() {
  return (
    <Marquee
      items={words}
      className="border-y border-vino-oscuro bg-vino py-4 font-serif text-[26px] text-crema italic lg:py-5 lg:text-[36px]"
    />
  );
}
