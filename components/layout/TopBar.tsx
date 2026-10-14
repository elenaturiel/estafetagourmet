import { site } from "@/data/site";
import { fmt } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";

export async function TopBar() {
  const t = await getT();
  const items = [
    t.common.topBar.shipping,
    t.common.topBar.pickup,
    fmt(t.common.topBar.freeShipping, { amount: site.shipping.freeShippingFrom }),
  ];
  return (
    <aside aria-label={t.common.topBar.label} className="on-dark bg-tinta text-crema">
      <div className="container-site flex min-h-9 items-center justify-center py-1.5 text-[12px] leading-tight sm:text-[14px] lg:min-h-10 lg:py-2">
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
