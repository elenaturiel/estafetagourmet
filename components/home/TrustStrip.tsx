import { CheckCircleIcon, PinIcon, TruckIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

const items = [
  { Icon: TruckIcon, title: `Envío en ${site.shipping.leadTime}`, text: "A toda la península" },
  {
    Icon: CheckCircleIcon,
    title: "Selección y cata propia",
    text: "Solo lo mejor llega a la estantería",
  },
  {
    Icon: PinIcon,
    title: "Recogida en tienda",
    text: `${site.address.street} · ${site.address.cityShort}`,
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Por qué comprar en Estafeta Gourmet" className="border-y border-linea bg-papel">
      <ul className="container-site grid gap-5 py-7 md:grid-cols-3 md:gap-8 lg:py-8">
        {items.map(({ Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4 md:justify-center">
            <Icon size={24} className="mt-0.5 shrink-0 text-vino" />
            <div>
              <p className="text-[15px] font-semibold">{title}</p>
              <p className="text-[14px] text-secundario">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
