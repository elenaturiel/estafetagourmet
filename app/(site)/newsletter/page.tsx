import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { newsletters } from "@/data/newsletters";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Newsletter: boletines de producto navarro",
  description:
    "Los boletines de Estafeta Gourmet: vinos D.O. Navarra, espárrago, piquillo, alcachofa, quesos Idiazabal y Roncal, aceite, pacharán y txistorra. Origen, cocina y consejos de la tienda.",
  path: "/newsletter",
});

export default function NewsletterArchivePage() {
  const issues = [...newsletters].sort((a, b) => b.number - a.number);
  return (
    <>
      <PageHeader
        eyebrow="Newsletter"
        title="Boletines de la tienda"
        intro="Cada boletín cuenta un producto de Navarra: de dónde viene, cómo reconocerlo y cómo disfrutarlo, con nuestra selección de la calle Estafeta."
      />
      <div className="container-site pb-16 lg:pb-24">
        <h2 className="sr-only">Todos los boletines</h2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {issues.map((issue) => (
            <li key={issue.slug}>
              <NewsletterCard issue={issue} />
            </li>
          ))}
        </ul>
      </div>
      <section aria-labelledby="suscribete" className="bg-crema-oscuro py-16 lg:py-20">
        <div className="container-site text-center">
          <p className="eyebrow text-vino">Suscríbete</p>
          <h2 id="suscribete" className="mx-auto mt-4 max-w-2xl text-[32px] leading-[1.1] tracking-[-0.02em] lg:text-[44px]">
            Recibe el próximo <em className="font-normal text-vino italic">en tu correo</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-secundario">
            Productos nuevos, maridajes y{" "}
            <strong className="font-semibold text-tinta">{site.newsletterIncentive}</strong>.
          </p>
          <NewsletterForm source="web" />
        </div>
      </section>
    </>
  );
}
