import { LegalPage } from "@/components/ui/LegalPage";
import { legalEntity as e } from "@/data/legal";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Condiciones generales de venta",
  description:
    "Condiciones generales de venta de la tienda online de Estafeta Gourmet: pedidos, precios, pago, envío, venta de alcohol, garantías y devoluciones.",
  path: "/condiciones-de-venta",
});

export default function Page() {
  return (
    <LegalPage title="Condiciones de venta">
      <h2>1. Vendedor</h2>
      <p>
        {e.name}, nombre comercial {site.name}, NIF {e.taxId}, {e.address}. Contacto:{" "}
        <a href={`mailto:${e.email}`}>{e.email}</a> · {site.phone.display}.
      </p>

      <h2>2. Ámbito</h2>
      <p>
        Estas condiciones regulan las compras que hagas en esta web como consumidor o usuario. Al hacer un pedido
        declaras haberlas leído y aceptado. Las compras se rigen por el Real Decreto Legislativo 1/2007 (Ley General
        para la Defensa de los Consumidores y Usuarios) y por la LSSI-CE.
      </p>

      <h2>3. Productos y disponibilidad</h2>
      <p>
        Mostramos los productos con su foto, descripción y precio. Las fotos son orientativas (el envase o la añada
        pueden variar). Los productos están sujetos a disponibilidad: si alguno no pudiera servirse, te lo
        comunicaremos y podrás elegir un sustituto equivalente o el reembolso.
      </p>

      <h2>4. Proceso de compra</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Añade los productos a la cesta y revisa el pedido.</li>
        <li>Indica tus datos y la dirección de entrega, o elige recogida en tienda.</li>
        <li>Elige la forma de pago y confirma. Antes de pagar verás el total con IVA y los gastos de envío.</li>
        <li>Recibirás un correo de confirmación con el resumen. El contrato se perfecciona cuando lo recibes.</li>
      </ol>
      <p>Podrás corregir errores en los datos antes de confirmar el pedido. El idioma del contrato es el español.</p>

      <h2>5. Precios e impuestos</h2>
      <p>
        Los precios están en euros e incluyen el IVA. Los gastos de envío se indican antes de pagar; el envío es gratis
        a partir del importe que se muestra en la cesta ({site.shipping.freeShippingFrom} €). Los precios pueden
        cambiar, pero se respeta el precio vigente en el momento de confirmar tu pedido.
      </p>

      <h2>6. Formas de pago</h2>
      <p>
        Los métodos de pago disponibles (tarjeta, Bizum u otros) se muestran al finalizar la compra. El pago se procesa
        a través de una pasarela segura: no almacenamos los datos de tu tarjeta. El pedido se prepara una vez
        confirmado el pago.
      </p>

      <h2>7. Venta de bebidas alcohólicas</h2>
      <p>
        <strong>No vendemos ni entregamos bebidas alcohólicas a menores de 18 años.</strong> Si tu pedido incluye vinos,
        espumosos, licores, patxarán o lotes que los contengan:
      </p>
      <ul>
        <li>Al comprar declaras ser mayor de 18 años y, si compras como regalo, que la persona que lo recibe también lo es.</li>
        <li>
          La entrega se hace a una persona mayor de edad. El transportista o la tienda pueden pedir un documento que lo
          acredite (DNI, pasaporte o carné de conducir) y, si no se puede acreditar, no se entrega el pedido.
        </li>
        <li>
          Si el pedido no se puede entregar por este motivo, te contactaremos para reenviarlo o reembolsar el importe de
          los productos.
        </li>
        <li>Las compras con recogida en tienda requieren mostrar el DNI al recoger bebidas alcohólicas.</li>
      </ul>
      <p>El consumo de alcohol es perjudicial para la salud. Consúmelo con moderación.</p>

      <h2>8. Envío y entrega</h2>
      <p>
        Plazos, zonas, productos frescos y recogida en tienda: consulta la página de{" "}
        <a href="/envios-y-devoluciones">envíos y devoluciones</a>. Debes revisar el paquete al recibirlo y avisarnos
        enseguida si llega dañado o incompleto.
      </p>

      <h2>9. Derecho de desistimiento (devolución)</h2>
      <p>
        Tienes {e.returnDays} desde que recibes el pedido para desistir de la compra sin dar explicaciones. Hay
        productos excluidos por ley: los que se deterioran o caducan con rapidez (por ejemplo, quesos, embutidos o foie
        frescos), los precintados que no se pueden devolver por razones de salud o higiene si se han desprecintado, y
        los hechos a medida. El procedimiento y los gastos de devolución están en{" "}
        <a href="/envios-y-devoluciones">envíos y devoluciones</a>. Te devolveremos el importe en un máximo de 14
        días desde que nos comunicas el desistimiento (podemos esperar a recibir el producto).
      </p>

      <h2>10. Garantía y producto defectuoso</h2>
      <p>
        Los productos tienen la garantía legal de conformidad. Si un producto llega en mal estado, no es lo que pediste
        o no es conforme, escríbenos a {e.email} con una foto y lo reponemos, reparamos el error o te reembolsamos.
        Los alimentos perecederos tienen, además, su fecha de consumo preferente indicada en el envase.
      </p>

      <h2>11. Información sobre alimentos</h2>
      <p>
        La información de alérgenos, ingredientes y conservación es la que figura en el etiquetado del fabricante. Si
        tienes alguna alergia o intolerancia, consulta la etiqueta del producto o pregúntanos antes de comprar.
      </p>

      <h2>12. Atención al cliente, reclamaciones y resolución de conflictos</h2>
      <p>
        Para cualquier duda o reclamación escríbenos a <a href={`mailto:${e.email}`}>{e.email}</a> o llámanos al{" "}
        {site.phone.display}. Disponemos de hojas de reclamaciones. Como consumidor puedes acudir también a la
        plataforma europea de resolución de litigios en línea:{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noopener">ec.europa.eu/consumers/odr</a>.
      </p>

      <h2>13. Protección de datos</h2>
      <p>Tus datos se tratan según la <a href="/privacidad">política de privacidad</a>.</p>

      <h2>14. Ley aplicable</h2>
      <p>
        Estas condiciones se rigen por la ley española. Si eres consumidor, podrás acudir a los juzgados y tribunales
        de tu domicilio.
      </p>
    </LegalPage>
  );
}
