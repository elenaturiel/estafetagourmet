/* eslint-disable react/no-unescaped-entities -- textos legales con apóstrofos */
import { Link } from "@/components/ui/Link";
import type { Locale } from "@/lib/i18n/config";
import { legalContext } from "./shared";

export function CondicionesVenta({ locale }: { locale: Locale }) {
  const { e, site } = legalContext(locale);
  const mail = <a href={`mailto:${e.email}`}>{e.email}</a>;

  if (locale === "en")
    return (
      <>
        <h2>1. Seller</h2>
        <p>
          {e.name}, trading as {site.name}, tax ID {e.taxId}, {e.address}. Contact: {mail} · {site.phone.display}.
        </p>

        <h2>2. Scope</h2>
        <p>
          These conditions govern the purchases you make on this website as a consumer or user. By placing an order you declare that you have
          read and accepted them. Purchases are governed by Spanish Royal Legislative Decree 1/2007 (General Law for the Protection of
          Consumers and Users) and by the LSSI-CE.
        </p>

        <h2>3. Products and availability</h2>
        <p>
          We show the products with their photo, description and price. Photos are for guidance (the packaging or vintage may vary). Products
          are subject to availability: if any cannot be supplied, we will tell you and you can choose an equivalent replacement or a refund.
        </p>

        <h2>4. Purchase process</h2>
        <ol className="ml-5 list-decimal space-y-1">
          <li>Add the products to the basket and check the order.</li>
          <li>Enter your details and delivery address, or choose in-store pickup.</li>
          <li>Choose the payment method and confirm. Before paying you will see the total including VAT and shipping costs.</li>
          <li>You will receive a confirmation email with the summary. The contract is formed when you receive it.</li>
        </ol>
        <p>You can correct mistakes in the data before confirming the order. The language of the contract is Spanish.</p>

        <h2>5. Prices and taxes</h2>
        <p>
          Prices are in euros and include VAT. Shipping costs are shown before you pay; shipping is free from the amount shown in the basket (€
          {site.shipping.freeShippingFrom}). Prices may change, but the price in force when you confirm your order is respected.
        </p>

        <h2>6. Payment methods</h2>
        <p>
          The available payment methods (card, Bizum or others) are shown at checkout. Payment is processed through a secure gateway: we do not
          store your card details. The order is prepared once payment is confirmed.
        </p>

        <h2>7. Sale of alcoholic drinks</h2>
        <p>
          <strong>We do not sell or deliver alcoholic drinks to anyone under 18.</strong> If your order includes wines, sparkling wines,
          liqueurs, patxaran or gift sets that contain them:
        </p>
        <ul>
          <li>By buying you declare that you are over 18 and, if you are buying a gift, that the person receiving it is too.</li>
          <li>
            Delivery is made to an adult. The courier or the shop may ask for a document proving it (national ID, passport or driving licence)
            and, if age cannot be proven, the order is not handed over.
          </li>
          <li>
            If the order cannot be delivered for this reason, we will contact you to send it again or refund the amount of the products.
          </li>
          <li>Orders collected in store require showing ID when collecting alcoholic drinks.</li>
        </ul>
        <p>Alcohol consumption is harmful to health. Drink in moderation.</p>

        <h2>8. Shipping and delivery</h2>
        <p>
          Delivery times, areas, fresh products and in-store pickup: see the <Link href="/envios-y-devoluciones">shipping and returns</Link>{" "}
          page. You must check the parcel when you receive it and tell us straight away if it arrives damaged or incomplete.
        </p>

        <h2>9. Right of withdrawal (returns)</h2>
        <p>
          You have {e.returnDays} from receiving the order to withdraw from the purchase without giving any reason. Some products are excluded
          by law: those that spoil or expire quickly (for example, fresh cheeses, cured meats or foie gras), sealed products that cannot be
          returned for health or hygiene reasons if they have been unsealed, and made-to-order goods. The procedure and return costs are in{" "}
          <Link href="/envios-y-devoluciones">shipping and returns</Link>. We will refund the amount within 14 days at most from when you tell us
          of your withdrawal (we may wait until we receive the product).
        </p>

        <h2>10. Guarantee and defective products</h2>
        <p>
          Products carry the legal guarantee of conformity. If a product arrives in poor condition, is not what you ordered or is not in
          conformity, write to us at {e.email} with a photo and we will replace it, correct the mistake or refund you. Perishable foods also
          show their best-before date on the packaging.
        </p>

        <h2>11. Food information</h2>
        <p>
          Allergen, ingredient and storage information is that shown on the manufacturer's labelling. If you have an allergy or intolerance,
          check the product label or ask us before buying.
        </p>

        <h2>12. Customer service, complaints and dispute resolution</h2>
        <p>
          For any question or complaint write to {mail} or call us on {site.phone.display}. We have complaint forms available. As a consumer you
          can also use the European online dispute resolution platform:{" "}
          <a href="https://ec.europa.eu/consumers/odr" rel="noopener">
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>

        <h2>13. Data protection</h2>
        <p>
          Your data is processed according to the <Link href="/privacidad">privacy policy</Link>.
        </p>

        <h2>14. Applicable law</h2>
        <p>
          These conditions are governed by Spanish law. If you are a consumer, you may go to the courts of your place of residence.
        </p>
      </>
    );

  if (locale === "fr")
    return (
      <>
        <h2>1. Vendeur</h2>
        <p>
          {e.name}, nom commercial {site.name}, numéro fiscal {e.taxId}, {e.address}. Contact : {mail} · {site.phone.display}.
        </p>

        <h2>2. Champ d'application</h2>
        <p>
          Ces conditions régissent les achats que vous effectuez sur ce site en tant que consommateur ou utilisateur. En passant commande, vous
          déclarez les avoir lues et acceptées. Les achats sont régis par le décret royal législatif espagnol 1/2007 (loi générale pour la
          défense des consommateurs et utilisateurs) et par la LSSI-CE.
        </p>

        <h2>3. Produits et disponibilité</h2>
        <p>
          Nous présentons les produits avec leur photo, leur description et leur prix. Les photos sont données à titre indicatif (l'emballage
          ou le millésime peuvent varier). Les produits sont soumis à disponibilité : si l'un d'eux ne pouvait être livré, nous vous le
          signalerions et vous pourriez choisir un produit équivalent ou le remboursement.
        </p>

        <h2>4. Processus d'achat</h2>
        <ol className="ml-5 list-decimal space-y-1">
          <li>Ajoutez les produits au panier et vérifiez la commande.</li>
          <li>Indiquez vos données et l'adresse de livraison, ou choisissez le retrait en boutique.</li>
          <li>Choisissez le mode de paiement et confirmez. Avant de payer, vous verrez le total TVA incluse et les frais de livraison.</li>
          <li>Vous recevrez un e-mail de confirmation avec le récapitulatif. Le contrat est conclu lorsque vous le recevez.</li>
        </ol>
        <p>Vous pourrez corriger les erreurs dans les données avant de confirmer la commande. La langue du contrat est l'espagnol.</p>

        <h2>5. Prix et taxes</h2>
        <p>
          Les prix sont en euros et incluent la TVA. Les frais de livraison sont indiqués avant le paiement ; la livraison est offerte à partir
          du montant affiché dans le panier ({site.shipping.freeShippingFrom} €). Les prix peuvent changer, mais le prix en vigueur au moment
          de la confirmation de votre commande est respecté.
        </p>

        <h2>6. Modes de paiement</h2>
        <p>
          Les modes de paiement disponibles (carte, Bizum ou autres) sont affichés à la fin de l'achat. Le paiement est traité via une
          passerelle sécurisée : nous ne conservons pas les données de votre carte. La commande est préparée une fois le paiement confirmé.
        </p>

        <h2>7. Vente de boissons alcoolisées</h2>
        <p>
          <strong>Nous ne vendons ni ne livrons de boissons alcoolisées aux mineurs de moins de 18 ans.</strong> Si votre commande comprend des
          vins, vins mousseux, liqueurs, patxaran ou des coffrets qui en contiennent :
        </p>
        <ul>
          <li>En achetant, vous déclarez avoir plus de 18 ans et, si vous achetez pour offrir, que la personne qui le reçoit les a aussi.</li>
          <li>
            La livraison est faite à une personne majeure. Le transporteur ou la boutique peuvent demander un document le prouvant (pièce
            d'identité, passeport ou permis de conduire) et, si la majorité ne peut être prouvée, la commande n'est pas remise.
          </li>
          <li>
            Si la commande ne peut être livrée pour ce motif, nous vous contacterons pour la renvoyer ou rembourser le montant des produits.
          </li>
          <li>Les commandes retirées en boutique exigent de présenter une pièce d'identité lors du retrait de boissons alcoolisées.</li>
        </ul>
        <p>La consommation d'alcool est dangereuse pour la santé. À consommer avec modération.</p>

        <h2>8. Livraison</h2>
        <p>
          Délais, zones, produits frais et retrait en boutique : consultez la page{" "}
          <Link href="/envios-y-devoluciones">livraison et retours</Link>. Vous devez vérifier le colis à la réception et nous prévenir
          immédiatement s'il arrive endommagé ou incomplet.
        </p>

        <h2>9. Droit de rétractation (retours)</h2>
        <p>
          Vous disposez de {e.returnDays} à compter de la réception de la commande pour vous rétracter sans donner de motif. Certains produits
          sont exclus par la loi : ceux qui se détériorent ou se périment rapidement (par exemple les fromages, charcuteries ou foie gras
          frais), les produits scellés qui ne peuvent être retournés pour des raisons de santé ou d'hygiène s'ils ont été descellés, et les
          produits personnalisés. La procédure et les frais de retour figurent dans{" "}
          <Link href="/envios-y-devoluciones">livraison et retours</Link>. Nous vous rembourserons le montant dans un délai maximum de 14 jours
          à compter du moment où vous nous communiquez votre rétractation (nous pouvons attendre de recevoir le produit).
        </p>

        <h2>10. Garantie et produit défectueux</h2>
        <p>
          Les produits bénéficient de la garantie légale de conformité. Si un produit arrive en mauvais état, n'est pas celui que vous avez
          commandé ou n'est pas conforme, écrivez-nous à {e.email} avec une photo et nous le remplacerons, corrigerons l'erreur ou vous
          rembourserons. Les denrées périssables indiquent en outre leur date de durabilité minimale sur l'emballage.
        </p>

        <h2>11. Information sur les aliments</h2>
        <p>
          Les informations sur les allergènes, les ingrédients et la conservation sont celles de l'étiquetage du fabricant. Si vous avez une
          allergie ou une intolérance, consultez l'étiquette du produit ou interrogez-nous avant d'acheter.
        </p>

        <h2>12. Service client, réclamations et règlement des litiges</h2>
        <p>
          Pour toute question ou réclamation, écrivez-nous à {mail} ou appelez-nous au {site.phone.display}. Nous disposons de feuilles de
          réclamation. En tant que consommateur, vous pouvez aussi recourir à la plateforme européenne de règlement en ligne des litiges :{" "}
          <a href="https://ec.europa.eu/consumers/odr" rel="noopener">
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>

        <h2>13. Protection des données</h2>
        <p>
          Vos données sont traitées conformément à la <Link href="/privacidad">politique de confidentialité</Link>.
        </p>

        <h2>14. Droit applicable</h2>
        <p>
          Ces conditions sont régies par le droit espagnol. Si vous êtes consommateur, vous pouvez saisir les tribunaux de votre domicile.
        </p>
      </>
    );

  return (
    <>
      <h2>1. Vendedor</h2>
      <p>
        {e.name}, nombre comercial {site.name}, NIF {e.taxId}, {e.address}. Contacto: {mail} · {site.phone.display}.
      </p>

      <h2>2. Ámbito</h2>
      <p>
        Estas condiciones regulan las compras que hagas en esta web como consumidor o usuario. Al hacer un pedido declaras haberlas leído y
        aceptado. Las compras se rigen por el Real Decreto Legislativo 1/2007 (Ley General para la Defensa de los Consumidores y Usuarios) y
        por la LSSI-CE.
      </p>

      <h2>3. Productos y disponibilidad</h2>
      <p>
        Mostramos los productos con su foto, descripción y precio. Las fotos son orientativas (el envase o la añada pueden variar). Los
        productos están sujetos a disponibilidad: si alguno no pudiera servirse, te lo comunicaremos y podrás elegir un sustituto equivalente
        o el reembolso.
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
        Los precios están en euros e incluyen el IVA. Los gastos de envío se indican antes de pagar; el envío es gratis a partir del importe
        que se muestra en la cesta ({site.shipping.freeShippingFrom} €). Los precios pueden cambiar, pero se respeta el precio vigente en el
        momento de confirmar tu pedido.
      </p>

      <h2>6. Formas de pago</h2>
      <p>
        Los métodos de pago disponibles (tarjeta, Bizum u otros) se muestran al finalizar la compra. El pago se procesa a través de una
        pasarela segura: no almacenamos los datos de tu tarjeta. El pedido se prepara una vez confirmado el pago.
      </p>

      <h2>7. Venta de bebidas alcohólicas</h2>
      <p>
        <strong>No vendemos ni entregamos bebidas alcohólicas a menores de 18 años.</strong> Si tu pedido incluye vinos, espumosos, licores,
        patxarán o lotes que los contengan:
      </p>
      <ul>
        <li>Al comprar declaras ser mayor de 18 años y, si compras como regalo, que la persona que lo recibe también lo es.</li>
        <li>
          La entrega se hace a una persona mayor de edad. El transportista o la tienda pueden pedir un documento que lo acredite (DNI,
          pasaporte o carné de conducir) y, si no se puede acreditar, no se entrega el pedido.
        </li>
        <li>
          Si el pedido no se puede entregar por este motivo, te contactaremos para reenviarlo o reembolsar el importe de los productos.
        </li>
        <li>Las compras con recogida en tienda requieren mostrar el DNI al recoger bebidas alcohólicas.</li>
      </ul>
      <p>El consumo de alcohol es perjudicial para la salud. Consúmelo con moderación.</p>

      <h2>8. Envío y entrega</h2>
      <p>
        Plazos, zonas, productos frescos y recogida en tienda: consulta la página de{" "}
        <Link href="/envios-y-devoluciones">envíos y devoluciones</Link>. Debes revisar el paquete al recibirlo y avisarnos enseguida si llega
        dañado o incompleto.
      </p>

      <h2>9. Derecho de desistimiento (devolución)</h2>
      <p>
        Tienes {e.returnDays} desde que recibes el pedido para desistir de la compra sin dar explicaciones. Hay productos excluidos por ley:
        los que se deterioran o caducan con rapidez (por ejemplo, quesos, embutidos o foie frescos), los precintados que no se pueden devolver
        por razones de salud o higiene si se han desprecintado, y los hechos a medida. El procedimiento y los gastos de devolución están en{" "}
        <Link href="/envios-y-devoluciones">envíos y devoluciones</Link>. Te devolveremos el importe en un máximo de 14 días desde que nos
        comunicas el desistimiento (podemos esperar a recibir el producto).
      </p>

      <h2>10. Garantía y producto defectuoso</h2>
      <p>
        Los productos tienen la garantía legal de conformidad. Si un producto llega en mal estado, no es lo que pediste o no es conforme,
        escríbenos a {e.email} con una foto y lo reponemos, reparamos el error o te reembolsamos. Los alimentos perecederos tienen, además, su
        fecha de consumo preferente indicada en el envase.
      </p>

      <h2>11. Información sobre alimentos</h2>
      <p>
        La información de alérgenos, ingredientes y conservación es la que figura en el etiquetado del fabricante. Si tienes alguna alergia o
        intolerancia, consulta la etiqueta del producto o pregúntanos antes de comprar.
      </p>

      <h2>12. Atención al cliente, reclamaciones y resolución de conflictos</h2>
      <p>
        Para cualquier duda o reclamación escríbenos a {mail} o llámanos al {site.phone.display}. Disponemos de hojas de reclamaciones. Como
        consumidor puedes acudir también a la plataforma europea de resolución de litigios en línea:{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noopener">
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>13. Protección de datos</h2>
      <p>
        Tus datos se tratan según la <Link href="/privacidad">política de privacidad</Link>.
      </p>

      <h2>14. Ley aplicable</h2>
      <p>Estas condiciones se rigen por la ley española. Si eres consumidor, podrás acudir a los juzgados y tribunales de tu domicilio.</p>
    </>
  );
}
