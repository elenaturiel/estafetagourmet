import { LegalPage } from "@/components/ui/LegalPage";
import { legalEntity as e } from "@/data/legal";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Envíos y devoluciones",
  description:
    "Envíos a toda la península en 24–48 h: 5,95 € hasta 5 kg y gratis desde 70 €. No enviamos a Canarias ni Baleares. Recogida en la calle Estafeta de Pamplona y devoluciones.",
  path: "/envios-y-devoluciones",
});

export default function Page() {
  return (
    <LegalPage title="Envíos y devoluciones">
      <h2>Envíos</h2>
      <ul>
        <li>
          <strong>Península:</strong> entrega en {site.shipping.leadTime} laborables desde que el pedido está preparado y
          pagado.
        </li>
        <li>
          <strong>Gastos de envío:</strong> {formatPrice(site.shipping.cost)} para pedidos de hasta{" "}
          {site.shipping.maxWeightKg} kg. El envío es <strong>gratis a partir de {site.shipping.freeShippingFrom} €</strong>{" "}
          de compra.
        </li>
        <li>
          <strong>Pedidos de más de {site.shipping.maxWeightKg} kg:</strong> el precio del envío es a consultar. Te lo
          confirmamos antes de cobrarlo; si lo prefieres, escríbenos o llámanos antes de comprar.
        </li>
        <li>
          <strong>Canarias y Baleares:</strong> no hacemos envíos.
        </li>
        <li>
          <strong>Ceuta, Melilla y extranjero:</strong> escríbenos o llámanos antes de comprar y te decimos plazo y coste,
          porque dependen del destino y de la aduana.
        </li>
        <li>
          <strong>Seguimiento:</strong> te enviamos un correo con el enlace de seguimiento cuando sale el paquete.
        </li>
      </ul>
      <p>
        Si no estás en casa, el transportista lo intentará de nuevo o lo dejará en un punto de recogida, según su
        servicio. Revisa el paquete al recibirlo: si llega abierto, golpeado o con roturas, anótalo en el albarán y avísanos
        el mismo día.
      </p>

      <h2>Productos frescos y frágiles</h2>
      <p>
        Los quesos, embutidos, foie y otros productos que necesitan frío se envían con embalaje adecuado y, cuando haga
        falta, por servicio urgente; en épocas de calor podemos retrasarlos a un día de entrega seguro y te avisamos. El
        vino y los licores van en cajas protegidas. Guarda cada producto según indica su etiqueta.
      </p>

      <h2>Bebidas alcohólicas</h2>
      <p>
        Solo entregamos bebidas alcohólicas a mayores de 18 años. El transportista puede pedir un documento de identidad
        a quien recibe el pedido y, si no se puede acreditar la mayoría de edad, no lo entrega. Más información en las{" "}
        <a href="/condiciones-de-venta">condiciones de venta</a>.
      </p>

      <h2>Recogida en tienda</h2>
      <p>
        Puedes recoger tu pedido en {site.address.street}, {site.address.cityShort}, en horario de tienda (
        {[site.hours.daysLabel.toLowerCase(), site.hours.label].filter(Boolean).join(", ")}). Te avisamos cuando esté listo; trae el correo de confirmación y
        tu DNI si el pedido incluye alcohol.
      </p>

      <h2>Devoluciones</h2>
      <p>
        Tienes {e.returnDays} desde que recibes el pedido para desistir de la compra, sin tener que justificarlo. No se
        pueden devolver los productos que se deterioran o caducan con rapidez, ni los precintados que hayas desprecintado
        y no sean aptos para devolverse por razones de salud o higiene.
      </p>
      <ol className="ml-5 list-decimal space-y-1">
        <li>
          Avísanos antes de que pase el plazo escribiendo a <a href={`mailto:${e.email}`}>{e.email}</a> o llamando al{" "}
          {site.phone.display}, con tu número de pedido.
        </li>
        <li>Te decimos cómo devolvernos el producto: en su envase original y en buen estado.</li>
        <li>
          Los gastos de devolver el producto corren por tu cuenta, salvo que el producto sea defectuoso o no sea el que
          pediste, en cuyo caso los asumimos nosotros.
        </li>
        <li>
          Te reembolsamos el importe (y los gastos de envío estándar de la compra) por el mismo medio de pago, en un
          máximo de 14 días desde que nos comunicas el desistimiento; podemos esperar a recibir el producto.
        </li>
      </ol>

      <h2>Producto dañado o equivocado</h2>
      <p>
        Escríbenos con una foto del producto y del embalaje. Lo reponemos o reembolsamos sin coste para ti.
      </p>
    </LegalPage>
  );
}
