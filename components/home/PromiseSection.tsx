import { CheckCircleIcon, PinIcon, TruckIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

const promises = [
  {
    Icon: CheckCircleIcon,
    title: "Catado antes de venderlo",
    text: "Solo llega a la estantería lo que hemos probado y nos ha convencido.",
  },
  {
    Icon: TruckIcon,
    title: `En tu casa en ${site.shipping.leadTime}`,
    text: `Envíos a toda la península. Envío gratis desde ${site.shipping.freeShippingFrom} €.`,
  },
  {
    Icon: PinIcon,
    title: "Y si estás en Pamplona…",
    text: `Pide online y recógelo en ${site.address.street}, en pleno casco viejo.`,
  },
];

/** "Por qué comprar aquí": tres promesas con número grande. */
export function PromiseSection() {
  return (
    <section aria-labelledby="promesa-title" className="border-y border-linea bg-crema-oscuro py-16 lg:py-20">
      <div className="container-site">
        <h2 id="promesa-title" className="sr-only">
          Por qué comprar en Estafeta Gourmet
        </h2>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {promises.map(({ Icon, title, text }, i) => (
            <li key={title} className="relative">
              <span
                aria-hidden="true"
                className="font-serif text-[56px] leading-none text-vino italic lg:text-[72px]"
              >
                0{i + 1}
              </span>
              <div className="mt-3 flex items-start gap-3 border-t border-vino/20 pt-5">
                <Icon size={26} className="mt-1 shrink-0 text-vino" />
                <div>
                  <h3 className="text-[22px] leading-tight lg:text-[24px]">{title}</h3>
                  <p className="mt-2 text-[16px] text-secundario">{text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
