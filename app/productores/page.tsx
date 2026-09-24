import { ProducerCard } from "@/components/cards/ProducerCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProducers } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Productores navarros: quienes elaboran lo que vendemos",
  description:
    "Conoce a los pequeños productores navarros detrás de nuestros quesos, vinos, embutidos y conservas: queserías, bodegas, obradores y huertas de Navarra.",
  path: "/productores",
});

export default async function ProducersPage() {
  const producers = await getProducers();
  return (
    <>
      <PageHeader
        eyebrow="Productores"
        title="Conoce a quienes lo hacen"
        intro="Pequeños productores navarros, con nombre y apellidos."
      />
      <div className="container-site pb-16 lg:pb-24">
        <h2 className="sr-only">Todos los productores</h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          {producers.map((p) => (
            <li key={p.slug}>
              <ProducerCard producer={p} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
