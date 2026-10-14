import { CheckCircleIcon, PinIcon, TruckIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { fmt } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";

/** "Por qué comprar aquí": tres promesas con número grande. */
export async function PromiseSection() {
  const t = (await getT()).home.promise;
  const promises = [
    { Icon: CheckCircleIcon, title: t.tasted, text: t.tastedText },
    {
      Icon: TruckIcon,
      title: fmt(t.home, { lead: site.shipping.leadTime }),
      text: fmt(t.homeText, { noDelivery: (await getT()).common.site.noDelivery, from: site.shipping.freeShippingFrom }),
    },
    { Icon: PinIcon, title: t.pickup, text: fmt(t.pickupText, { street: site.address.street }) },
  ];
  return (
    <section aria-labelledby="promesa-title" className="border-y border-linea bg-crema-oscuro py-10 lg:py-20">
      <div className="container-site">
        <h2 id="promesa-title" className="sr-only">
          {t.title}
        </h2>
        <ol data-reveal-stagger className="grid gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
          {promises.map(({ Icon, title, text }, i) => (
            <li key={title} className="relative flex gap-4 md:block">
              <span
                aria-hidden="true"
                className="font-serif text-[40px] leading-none text-vino italic md:text-[56px] lg:text-[72px]"
              >
                0{i + 1}
              </span>
              <div className="flex items-start gap-3 md:mt-3 md:border-t md:border-vino/20 md:pt-5">
                <Icon size={24} className="mt-1 hidden shrink-0 text-vino md:block" />
                <div>
                  <h3 className="text-[19px] leading-tight lg:text-[24px]">{title}</h3>
                  <p className="mt-1 text-[15px] text-secundario lg:mt-2 lg:text-[16px]">{text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
