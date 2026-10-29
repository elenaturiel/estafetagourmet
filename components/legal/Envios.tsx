/* eslint-disable react/no-unescaped-entities -- textos legales con apóstrofos */
import { Link } from "@/components/ui/Link";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";
import { hoursLabel } from "@/lib/site-text";
import { legalContext } from "./shared";

export function Envios({ locale }: { locale: Locale }) {
  const { e, site } = legalContext(locale);
  const mail = <a href={`mailto:${e.email}`}>{e.email}</a>;
  const ship = site.shipping;
  const cost = formatPrice(ship.cost, locale);
  const days = { es: site.hours.daysLabel.toLowerCase(), en: "tuesday to saturday", fr: "du mardi au samedi" }[locale];
  const hours = [{ es: days, en: "Tuesday to Saturday", fr: "du mardi au samedi" }[locale], hoursLabel(locale)].join(", ");

  if (locale === "en")
    return (
      <>
        <h2>Shipping</h2>
        <ul>
          <li>
            <strong>Mainland Spain:</strong> delivery in {ship.leadTime} working days from when the order is prepared and paid.
          </li>
          <li>
            <strong>Shipping costs:</strong> {cost} for orders up to {ship.maxWeightKg} kg. Shipping is{" "}
            <strong>free on orders over €{ship.freeShippingFrom}</strong>; for orders of €{ship.freeShippingFrom} or less it costs {cost}.
          </li>
          <li>
            <strong>Orders over {ship.maxWeightKg} kg:</strong> the shipping price is on request. We confirm it before charging you; if you
            prefer, write or call us before buying.
          </li>
          <li>
            <strong>Canary and Balearic Islands:</strong> we do not ship there.
          </li>
          <li>
            <strong>Ceuta, Melilla and abroad:</strong> write or call us before buying and we will tell you the time and cost, as they depend on
            the destination and on customs.
          </li>
          <li>
            <strong>Tracking:</strong> we send you an email with the tracking link when the parcel leaves.
          </li>
        </ul>
        <p>
          If you are not at home, the courier will try again or leave it at a pickup point, depending on their service. Check the parcel when
          you receive it: if it arrives open, dented or broken, note it on the delivery note and tell us the same day.
        </p>

        <h2>Fresh and fragile products</h2>
        <p>
          Cheeses, cured meats, foie gras and other products that need cold are shipped with suitable packaging and, when necessary, by express
          service; in hot weather we may delay them to a safe delivery day and let you know. Wine and liqueurs go in protected boxes. Store
          each product as indicated on its label.
        </p>

        <h2>Alcoholic drinks</h2>
        <p>
          We only deliver alcoholic drinks to people aged 18 or over. The courier may ask for ID from whoever receives the order and, if age
          cannot be proven, will not hand it over. More information in the <Link href="/condiciones-de-venta">terms of sale</Link>.
        </p>

        <h2>In-store pickup</h2>
        <p>
          You can collect your order at {site.address.street}, {site.address.cityShort}, during opening hours ({hours}). We let you know when it
          is ready; bring the confirmation email and your ID if the order includes alcohol.
        </p>

        <h2>Returns</h2>
        <p>
          You have {e.returnDays} from receiving the order to withdraw from the purchase, without having to justify it. Products that spoil or
          expire quickly cannot be returned, nor can sealed products that you have unsealed and that are not suitable for return for health or
          hygiene reasons.
        </p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>
            Tell us before the period ends by writing to {mail} or calling {site.phone.display}, with your order number.
          </li>
          <li>We tell you how to send the product back: in its original packaging and in good condition.</li>
          <li>
            The cost of returning the product is yours, unless the product is defective or is not the one you ordered, in which case we cover it.
          </li>
          <li>
            We refund the amount (and the standard shipping costs of the purchase) by the same payment method, within 14 days at most from when
            you tell us of your withdrawal; we may wait until we receive the product.
          </li>
        </ol>

        <h2>Damaged or wrong product</h2>
        <p>Write to us with a photo of the product and the packaging. We will replace it or refund it at no cost to you.</p>
      </>
    );

  if (locale === "fr")
    return (
      <>
        <h2>Livraison</h2>
        <ul>
          <li>
            <strong>Espagne péninsulaire :</strong> livraison en {ship.leadTime} jours ouvrés à partir du moment où la commande est préparée et
            payée.
          </li>
          <li>
            <strong>Frais de livraison :</strong> {cost} pour les commandes jusqu'à {ship.maxWeightKg} kg. La livraison est{" "}
            <strong>offerte au-delà de {ship.freeShippingFrom} €</strong> d'achat ; jusqu'à {ship.freeShippingFrom} €, elle coûte {cost}.
          </li>
          <li>
            <strong>Commandes de plus de {ship.maxWeightKg} kg :</strong> le prix de la livraison est sur demande. Nous vous le confirmons avant
            de vous débiter ; si vous préférez, écrivez-nous ou appelez-nous avant d'acheter.
          </li>
          <li>
            <strong>Îles Canaries et Baléares :</strong> nous ne livrons pas.
          </li>
          <li>
            <strong>Ceuta, Melilla et étranger :</strong> écrivez-nous ou appelez-nous avant d'acheter et nous vous indiquerons le délai et le
            coût, car ils dépendent de la destination et des douanes.
          </li>
          <li>
            <strong>Suivi :</strong> nous vous envoyons un e-mail avec le lien de suivi lorsque le colis part.
          </li>
        </ul>
        <p>
          Si vous n'êtes pas chez vous, le transporteur repassera ou le déposera dans un point de retrait, selon son service. Vérifiez le colis à
          la réception : s'il arrive ouvert, cabossé ou cassé, notez-le sur le bon de livraison et prévenez-nous le jour même.
        </p>

        <h2>Produits frais et fragiles</h2>
        <p>
          Les fromages, charcuteries, foie gras et autres produits nécessitant du froid sont expédiés avec un emballage adapté et, si besoin,
          par service express ; en période de chaleur, nous pouvons les retarder jusqu'à un jour de livraison sûr et nous vous prévenons. Le vin
          et les liqueurs voyagent dans des boîtes protégées. Conservez chaque produit comme indiqué sur son étiquette.
        </p>

        <h2>Boissons alcoolisées</h2>
        <p>
          Nous ne livrons les boissons alcoolisées qu'aux personnes de 18 ans ou plus. Le transporteur peut demander une pièce d'identité à la
          personne qui reçoit la commande et, si la majorité ne peut être prouvée, ne la remet pas. Plus d'informations dans les{" "}
          <Link href="/condiciones-de-venta">conditions de vente</Link>.
        </p>

        <h2>Retrait en boutique</h2>
        <p>
          Vous pouvez retirer votre commande au {site.address.street}, {site.address.cityShort}, pendant les horaires d'ouverture ({hours}). Nous
          vous prévenons lorsqu'elle est prête ; apportez l'e-mail de confirmation et votre pièce d'identité si la commande contient de
          l'alcool.
        </p>

        <h2>Retours</h2>
        <p>
          Vous disposez de {e.returnDays} à compter de la réception de la commande pour vous rétracter, sans avoir à le justifier. Ne peuvent
          être retournés les produits qui se détériorent ou se périment rapidement, ni les produits scellés que vous avez descellés et qui ne
          peuvent être retournés pour des raisons de santé ou d'hygiène.
        </p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>
            Prévenez-nous avant la fin du délai en écrivant à {mail} ou en appelant le {site.phone.display}, avec votre numéro de commande.
          </li>
          <li>Nous vous indiquons comment nous renvoyer le produit : dans son emballage d'origine et en bon état.</li>
          <li>
            Les frais de retour du produit sont à votre charge, sauf si le produit est défectueux ou n'est pas celui que vous avez commandé, auquel
            cas nous les prenons en charge.
          </li>
          <li>
            Nous vous remboursons le montant (et les frais de livraison standard de l'achat) par le même moyen de paiement, dans un délai maximum
            de 14 jours à compter du moment où vous nous communiquez votre rétractation ; nous pouvons attendre de recevoir le produit.
          </li>
        </ol>

        <h2>Produit endommagé ou erroné</h2>
        <p>Écrivez-nous avec une photo du produit et de l'emballage. Nous le remplaçons ou le remboursons sans frais pour vous.</p>
      </>
    );

  return (
    <>
      <h2>Envíos</h2>
      <ul>
        <li>
          <strong>Península:</strong> entrega en {ship.leadTime} laborables desde que el pedido está preparado y pagado.
        </li>
        <li>
          <strong>Gastos de envío:</strong> {cost} para pedidos de hasta {ship.maxWeightKg} kg. El envío es{" "}
          <strong>gratis en compras de más de {ship.freeShippingFrom} €</strong>; en compras de {ship.freeShippingFrom} € o menos cuesta {cost}.
        </li>
        <li>
          <strong>Pedidos de más de {ship.maxWeightKg} kg:</strong> el precio del envío es a consultar. Te lo confirmamos antes de cobrarlo; si
          lo prefieres, escríbenos o llámanos antes de comprar.
        </li>
        <li>
          <strong>Canarias y Baleares:</strong> no hacemos envíos.
        </li>
        <li>
          <strong>Ceuta, Melilla y extranjero:</strong> escríbenos o llámanos antes de comprar y te decimos plazo y coste, porque dependen del
          destino y de la aduana.
        </li>
        <li>
          <strong>Seguimiento:</strong> te enviamos un correo con el enlace de seguimiento cuando sale el paquete.
        </li>
      </ul>
      <p>
        Si no estás en casa, el transportista lo intentará de nuevo o lo dejará en un punto de recogida, según su servicio. Revisa el paquete
        al recibirlo: si llega abierto, golpeado o con roturas, anótalo en el albarán y avísanos el mismo día.
      </p>

      <h2>Productos frescos y frágiles</h2>
      <p>
        Los quesos, embutidos, foie y otros productos que necesitan frío se envían con embalaje adecuado y, cuando haga falta, por servicio
        urgente; en épocas de calor podemos retrasarlos a un día de entrega seguro y te avisamos. El vino y los licores van en cajas
        protegidas. Guarda cada producto según indica su etiqueta.
      </p>

      <h2>Bebidas alcohólicas</h2>
      <p>
        Solo entregamos bebidas alcohólicas a mayores de 18 años. El transportista puede pedir un documento de identidad a quien recibe el
        pedido y, si no se puede acreditar la mayoría de edad, no lo entrega. Más información en las{" "}
        <Link href="/condiciones-de-venta">condiciones de venta</Link>.
      </p>

      <h2>Recogida en tienda</h2>
      <p>
        Puedes recoger tu pedido en {site.address.street}, {site.address.cityShort}, en horario de tienda ({hours}). Te avisamos cuando esté
        listo; trae el correo de confirmación y tu DNI si el pedido incluye alcohol.
      </p>

      <h2>Devoluciones</h2>
      <p>
        Tienes {e.returnDays} desde que recibes el pedido para desistir de la compra, sin tener que justificarlo. No se pueden devolver los
        productos que se deterioran o caducan con rapidez, ni los precintados que hayas desprecintado y no sean aptos para devolverse por
        razones de salud o higiene.
      </p>
      <ol className="ml-5 list-decimal space-y-1">
        <li>
          Avísanos antes de que pase el plazo escribiendo a {mail} o llamando al {site.phone.display}, con tu número de pedido.
        </li>
        <li>Te decimos cómo devolvernos el producto: en su envase original y en buen estado.</li>
        <li>
          Los gastos de devolver el producto corren por tu cuenta, salvo que el producto sea defectuoso o no sea el que pediste, en cuyo caso
          los asumimos nosotros.
        </li>
        <li>
          Te reembolsamos el importe (y los gastos de envío estándar de la compra) por el mismo medio de pago, en un máximo de 14 días desde
          que nos comunicas el desistimiento; podemos esperar a recibir el producto.
        </li>
      </ol>

      <h2>Producto dañado o equivocado</h2>
      <p>Escríbenos con una foto del producto y del embalaje. Lo reponemos o reembolsamos sin coste para ti.</p>
    </>
  );
}
