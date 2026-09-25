import { LegalPage } from "@/components/ui/LegalPage";
import { legalEntity as e } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Condiciones generales de venta",
  description:
    "Condiciones generales de venta de la tienda online de Estafeta Gourmet: pedidos, precios, pago, envío, garantías y devoluciones.",
  path: "/condiciones-de-venta",
});

export default function Page() {
  return (
    <LegalPage title="Condiciones de venta">
      <h2>Vendedor</h2>
      <p>
        {e.name}, NIF {e.taxId}, {e.address}.
      </p>
      <h2>Pedidos</h2>
      <p>[Proceso de compra, confirmación del pedido y disponibilidad de productos.]</p>
      <h2>Precios e impuestos</h2>
      <p>Los precios incluyen IVA. [Gastos de envío y otros cargos.]</p>
      <h2>Formas de pago</h2>
      <p>[Métodos de pago disponibles.]</p>
      <h2>Venta de alcohol</h2>
      <p>
        No vendemos bebidas alcohólicas a menores de 18 años. [Cómo se verifica la edad.]
      </p>
      <h2>Garantías y devoluciones</h2>
      <p>Consulta la página de envíos y devoluciones.</p>
      <h2>Resolución de conflictos</h2>
      <p>[Legislación aplicable, jurisdicción y plataforma de resolución de litigios.]</p>
    </LegalPage>
  );
}
