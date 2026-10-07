import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { pairingGroups } from "@/data/pairings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Maridajes: qué vino o licor tomar con cada producto navarro",
  description:
    "18 maridajes con productos de Navarra: espárragos, piquillos, quesos, embutidos, foie, chocolate y patxarán con los vinos y licores que mejor los acompañan.",
  path: "/maridajes",
});

export default function PairingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Maridajes"
        title="Qué tomar con qué"
        intro="Productos de Navarra y la bebida que mejor los acompaña, elegidos en la tienda de la calle Estafeta. Del aperitivo a la sobremesa."
      />
      <div className="container-site pb-16 lg:pb-24">
        <nav aria-label="Secciones de maridajes">
          <ul className="flex flex-wrap gap-2">
            {pairingGroups.map((g) => (
              <li key={g.slug}>
                <a
                  href={`#${g.slug}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-tinta px-5 text-[14px] font-semibold transition-colors hover:bg-tinta hover:text-crema"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {pairingGroups.map((g) => (
          <section key={g.slug} id={g.slug} aria-labelledby={`${g.slug}-t`} className="mt-14 scroll-mt-40 lg:mt-20">
            <p className="eyebrow text-vino">{g.subtitle}</p>
            <h2 id={`${g.slug}-t`} className="mt-2 text-[32px] leading-tight tracking-[-0.02em] lg:text-[44px]">
              {g.title}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3 lg:gap-6">
              {g.items.map((p) => (
                <li key={p.n}>
                  <article className="group/card flex h-full flex-col border border-linea bg-papel transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transform-none">
                    <div className="overflow-hidden">
                      <ImagePlaceholder
                        label="Foto · maridaje"
                        src={`/images/maridajes/${p.n}.webp`}
                        alt={`${p.title}, con ${p.with}`}
                        ratio="4 / 3"
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="bg-arena transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="eyebrow text-[12px] text-secundario">{p.kicker}</p>
                      <h3 className="mt-2 text-[22px] leading-snug tracking-[-0.015em]">{p.title}</h3>
                      <p className="mt-1 font-serif text-[17px] text-vino italic">con {p.with}</p>
                      <p className="mt-3 text-[15px] leading-[1.6] text-secundario">{p.text}</p>
                      <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-[14px] font-semibold text-vino">
                        {p.shop.map((l) => (
                          <Link key={l.href} href={l.href} className="underline-offset-4 hover:underline">
                            {l.label} →
                          </Link>
                        ))}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
