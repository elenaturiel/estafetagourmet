import { LegalPage } from "@/components/ui/LegalPage";
import { legalEntity as e } from "@/data/legal";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Envíos y devoluciones",
  description:
    "Envíos a toda la península en 24–48 h, recogida en la tienda de la calle Estafeta de Pamplona y cómo hacer una devolución.",
  path: "/envios-y-devoluciones",
});

export default function Page() {
  return (
    <LegalPage title="Envíos y devoluciones">
      <h2>Envíos</h2>
      <p>
        Enviamos a toda la península en {site.shipping.leadTime}. El envío es gratis desde{" "}
        {site.shipping.freeShippingFrom} €. [Tarifas de envío por debajo de ese importe.]
      </p>
      <p>[Envíos a Baleares, Canarias, Ceuta, Melilla y extranjero: por definir.]</p>
      <h2>Recogida en tienda</h2>
      <p>
        Puedes recoger tu pedido en {site.address.street}, {site.address.cityShort}, en horario de
        tienda ({site.hours.label} · {site.hours.daysLabel}).
      </p>
      <h2>Productos frescos</h2>
      <p>[Condiciones de envío de productos refrigerados y perecederos.]</p>
      <h2>Devoluciones</h2>
      <p>
        Tienes {e.returnDays} para desistir de la compra. Por su naturaleza, los productos
        perecederos o precintados que se hayan abierto pueden quedar excluidos del derecho de
        desistimiento. [Revisar con un profesional.]
      </p>
      <p>
        Para iniciar una devolución, escríbenos a {e.email} o llámanos al {site.phone.display}.
      </p>
    </LegalPage>
  );
}
