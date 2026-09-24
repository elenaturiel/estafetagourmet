import { site } from "@/data/site";
import { t } from "@/lib/i18n";

export function TopBar() {
  const items = [
    t.topBar.shipping,
    t.topBar.pickup,
    t.topBar.freeShipping(site.shipping.freeShippingFrom),
  ];
  return (
    <aside aria-label="Información de envíos" className="on-dark bg-tinta text-crema">
      <div className="container-site flex min-h-10 items-center justify-center py-2 text-[13px] leading-tight sm:text-[14px]">
        {/* En móvil solo cabe un mensaje; en escritorio se muestran los tres. */}
        <p className="text-center md:hidden">{items[0]}</p>
        <ul className="hidden items-center gap-12 md:flex">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
