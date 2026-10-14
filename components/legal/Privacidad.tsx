/* eslint-disable react/no-unescaped-entities -- textos legales con apóstrofos */
import { Link } from "@/components/ui/Link";
import type { Locale } from "@/lib/i18n/config";
import { legalContext } from "./shared";

export function Privacidad({ locale }: { locale: Locale }) {
  const { e, site } = legalContext(locale);
  const mail = <a href={`mailto:${e.email}`}>{e.email}</a>;

  if (locale === "en")
    return (
      <>
        <p>
          This policy explains what personal data we collect at {site.name}, what we use it for and what rights you have, in accordance with
          Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).
        </p>

        <h2>1. Data controller</h2>
        <p>
          {e.name}, tax ID {e.taxId}, {e.address}. Contact for privacy matters: {mail}.
        </p>

        <h2>2. What data we process, why and on what legal basis</h2>
        <h3>Purchases (orders)</h3>
        <ul>
          <li>
            <strong>Data:</strong> name, shipping and billing address, email, telephone, the content of the order and, for alcoholic drinks,
            the declaration of being of legal age.
          </li>
          <li>
            <strong>Purpose:</strong> to manage, charge, ship and invoice your order and to handle guarantees and returns.
          </li>
          <li>
            <strong>Legal basis:</strong> performance of the purchase contract and compliance with legal obligations (tax and accounting).
          </li>
        </ul>
        <h3>Contact form, WhatsApp and telephone</h3>
        <ul>
          <li>
            <strong>Data:</strong> name, email or telephone and the message you send us.
          </li>
          <li>
            <strong>Purpose:</strong> to answer your enquiry.
          </li>
          <li>
            <strong>Legal basis:</strong> your consent (by writing to us) or the application of pre-contractual measures at your request.
          </li>
        </ul>
        <h3>Newsletter (Estafeta Club)</h3>
        <ul>
          <li>
            <strong>Data:</strong> your email address (and your name, if you give it).
          </li>
          <li>
            <strong>Purpose:</strong> to send you news, launches, blog posts, reminders and other notices from the shop, only if you subscribe.
            The subscription is confirmed with an email (double opt-in).
          </li>
          <li>
            <strong>Legal basis:</strong> your consent, which you can withdraw at any time with the “unsubscribe” link in any email.
          </li>
        </ul>
        <h3>Browsing</h3>
        <p>
          Website usage data is only measured with your permission (see the <Link href="/cookies">cookie policy</Link>). Our servers keep
          technical logs (IP address, date and page) for security and so that the website works.
        </p>

        <h2>3. How long we keep it</h2>
        <ul>
          <li>
            Orders and invoices: the time required by tax and commercial law (generally 6 years) and afterwards, blocked while liabilities may
            arise.
          </li>
          <li>Enquiries: the time needed to deal with them and, afterwards, the limitation period for possible claims.</li>
          <li>Newsletter: until you unsubscribe or ask us to remove you.</li>
        </ul>

        <h2>4. Recipients and providers</h2>
        <p>We do not sell your data. We share it only with providers that process it on our behalf, under a data processing agreement:</p>
        <ul>
          <li>
            <strong>Brevo</strong> (Sendinblue SAS, France): sending the newsletter and managing the subscriber list.
          </li>
          <li>
            <strong>Vercel</strong>: website hosting.
          </li>
          <li>
            <strong>Sanity</strong>: management of the blog content (it does not store customer data).
          </li>
          <li>
            <strong>E-commerce platform, payment gateway and carrier</strong>: to charge and deliver your order (to be specified when online
            sales are switched on).
          </li>
          <li>
            <strong>Google Maps</strong>: the map in the “Visit us” section.
          </li>
          <li>Public authorities, when required by law.</li>
        </ul>
        <p>
          Some providers (for example, Vercel) may process data outside the European Economic Area; in that case they rely on safeguards such
          as the European Commission's standard contractual clauses.
        </p>

        <h2>5. Your rights</h2>
        <p>
          You can <strong>access</strong> your data, <strong>rectify</strong> it, <strong>erase</strong> it, <strong>object</strong> to its
          processing, <strong>restrict</strong> it and ask for its <strong>portability</strong>, as well as withdraw your consent when it is the
          basis for processing. Write to {mail} stating the right you want to exercise and attaching a copy of a document proving your
          identity. We reply within one month. If you think we have not handled your request properly, you can lodge a complaint with the
          Spanish Data Protection Agency (<a href="https://www.aepd.es" rel="noopener">aepd.es</a>).
        </p>

        <h2>6. Minors</h2>
        <p>
          The website is not aimed at children under 14 and we do not knowingly collect their data. Alcoholic drinks are only sold to people
          aged 18 or over (see the <Link href="/condiciones-de-venta">terms of sale</Link>).
        </p>

        <h2>7. Security</h2>
        <p>
          We apply reasonable technical and organisational measures to protect your data (encrypted connection, restricted access and providers
          with safeguards). No system is infallible: if there were a breach affecting you, we would notify you as the law requires.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>If we change it in a significant way, we will say so on the website. The date of the last review appears above.</p>
      </>
    );

  if (locale === "fr")
    return (
      <>
        <p>
          Cette politique explique quelles données personnelles nous collectons chez {site.name}, à quoi elles servent et quels droits vous avez,
          conformément au Règlement (UE) 2016/679 (RGPD) et à la loi organique espagnole 3/2018 (LOPDGDD).
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          {e.name}, numéro fiscal {e.taxId}, {e.address}. Contact pour les questions de confidentialité : {mail}.
        </p>

        <h2>2. Quelles données nous traitons, pourquoi et sur quelle base légale</h2>
        <h3>Achats (commandes)</h3>
        <ul>
          <li>
            <strong>Données :</strong> nom, adresse de livraison et de facturation, e-mail, téléphone, contenu de la commande et, pour les
            boissons alcoolisées, la déclaration de majorité.
          </li>
          <li>
            <strong>Finalité :</strong> gérer, encaisser, expédier et facturer votre commande et traiter les garanties et les retours.
          </li>
          <li>
            <strong>Base légale :</strong> exécution du contrat de vente et respect des obligations légales (fiscales et comptables).
          </li>
        </ul>
        <h3>Formulaire de contact, WhatsApp et téléphone</h3>
        <ul>
          <li>
            <strong>Données :</strong> nom, e-mail ou téléphone et le message que vous nous envoyez.
          </li>
          <li>
            <strong>Finalité :</strong> répondre à votre demande.
          </li>
          <li>
            <strong>Base légale :</strong> votre consentement (en nous écrivant) ou l'application de mesures précontractuelles à votre demande.
          </li>
        </ul>
        <h3>Newsletter (Club Estafeta)</h3>
        <ul>
          <li>
            <strong>Données :</strong> votre adresse e-mail (et votre nom, si vous le donnez).
          </li>
          <li>
            <strong>Finalité :</strong> vous envoyer des nouveautés, lancements, articles du blog, rappels et autres informations de la
            boutique, uniquement si vous vous abonnez. L'abonnement est confirmé par un e-mail (double confirmation).
          </li>
          <li>
            <strong>Base légale :</strong> votre consentement, que vous pouvez retirer à tout moment avec le lien « se désabonner » présent
            dans chaque e-mail.
          </li>
        </ul>
        <h3>Navigation</h3>
        <p>
          Les données d'utilisation du site ne sont mesurées qu'avec votre accord (voir la <Link href="/cookies">politique de cookies</Link>).
          Nos serveurs conservent des journaux techniques (adresse IP, date et page) pour des raisons de sécurité et de bon fonctionnement du
          site.
        </p>

        <h2>3. Combien de temps nous les conservons</h2>
        <ul>
          <li>
            Commandes et factures : la durée exigée par la réglementation fiscale et commerciale (en règle générale, 6 ans) puis, bloquées tant
            que des responsabilités peuvent apparaître.
          </li>
          <li>Demandes : le temps nécessaire pour les traiter puis le délai de prescription d'éventuelles réclamations.</li>
          <li>Newsletter : jusqu'à ce que vous vous désabonniez ou que vous nous le demandiez.</li>
        </ul>

        <h2>4. Destinataires et prestataires</h2>
        <p>
          Nous ne vendons pas vos données. Nous ne les partageons qu'avec des prestataires qui les traitent pour notre compte, avec un contrat
          de sous-traitance :
        </p>
        <ul>
          <li>
            <strong>Brevo</strong> (Sendinblue SAS, France) : envoi de la newsletter et gestion de la liste d'abonnés.
          </li>
          <li>
            <strong>Vercel</strong> : hébergement du site.
          </li>
          <li>
            <strong>Sanity</strong> : gestion du contenu du blog (ne stocke pas de données de clients).
          </li>
          <li>
            <strong>Plateforme de commerce électronique, passerelle de paiement et transporteur</strong> : pour encaisser et livrer votre
            commande (à préciser lors de l'activation de la vente en ligne).
          </li>
          <li>
            <strong>Google Maps</strong> : la carte de la section « Nous rendre visite ».
          </li>
          <li>Les administrations publiques, lorsque la loi l'exige.</li>
        </ul>
        <p>
          Certains prestataires (par exemple Vercel) peuvent traiter des données en dehors de l'Espace économique européen ; dans ce cas, ils
          s'appuient sur des garanties telles que les clauses contractuelles types de la Commission européenne.
        </p>

        <h2>5. Vos droits</h2>
        <p>
          Vous pouvez <strong>accéder</strong> à vos données, les <strong>rectifier</strong>, les <strong>supprimer</strong>, vous{" "}
          <strong>opposer</strong> à leur traitement, le <strong>limiter</strong> et demander leur <strong>portabilité</strong>, ainsi que
          retirer votre consentement lorsqu'il est la base du traitement. Écrivez à {mail} en indiquant le droit que vous souhaitez exercer et
          en joignant la copie d'un document justifiant votre identité. Nous répondons dans un délai d'un mois. Si vous estimez que nous n'avons
          pas bien traité votre demande, vous pouvez déposer une réclamation auprès de l'Agence espagnole de protection des données (
          <a href="https://www.aepd.es" rel="noopener">aepd.es</a>) ou de la CNIL.
        </p>

        <h2>6. Mineurs</h2>
        <p>
          Le site ne s'adresse pas aux moins de 14 ans et nous ne collectons pas sciemment leurs données. Les boissons alcoolisées ne sont
          vendues qu'aux personnes de 18 ans ou plus (voir les <Link href="/condiciones-de-venta">conditions de vente</Link>).
        </p>

        <h2>7. Sécurité</h2>
        <p>
          Nous appliquons des mesures techniques et organisationnelles raisonnables pour protéger vos données (connexion chiffrée, accès
          restreint et prestataires offrant des garanties). Aucun système n'est infaillible : en cas de violation vous concernant, nous vous en
          informerons comme l'exige la loi.
        </p>

        <h2>8. Modifications de cette politique</h2>
        <p>Si nous la modifions de manière significative, nous l'indiquerons sur le site. La date de la dernière révision figure ci-dessus.</p>
      </>
    );

  return (
    <>
      <p>
        Esta política explica qué datos personales recogemos en {site.name}, para qué los usamos y qué derechos tienes, conforme al Reglamento
        (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        {e.name}, NIF {e.taxId}, {e.address}. Contacto para temas de privacidad: {mail}.
      </p>

      <h2>2. Qué datos tratamos, para qué y con qué base legal</h2>
      <h3>Compras (pedidos)</h3>
      <ul>
        <li>
          <strong>Datos:</strong> nombre, dirección de envío y facturación, correo, teléfono, contenido del pedido y, en bebidas alcohólicas,
          la declaración de mayoría de edad.
        </li>
        <li>
          <strong>Finalidad:</strong> gestionar, cobrar, enviar y facturar tu pedido y atender garantías y devoluciones.
        </li>
        <li>
          <strong>Base legal:</strong> ejecución del contrato de compra y cumplimiento de obligaciones legales (fiscales y contables).
        </li>
      </ul>
      <h3>Formulario de contacto, WhatsApp y teléfono</h3>
      <ul>
        <li>
          <strong>Datos:</strong> nombre, correo o teléfono y el mensaje que nos envíes.
        </li>
        <li>
          <strong>Finalidad:</strong> responder a tu consulta.
        </li>
        <li>
          <strong>Base legal:</strong> tu consentimiento (al escribirnos) o la aplicación de medidas precontractuales a petición tuya.
        </li>
      </ul>
      <h3>Newsletter (Club Estafeta)</h3>
      <ul>
        <li>
          <strong>Datos:</strong> tu correo electrónico (y tu nombre, si lo das).
        </li>
        <li>
          <strong>Finalidad:</strong> enviarte novedades, lanzamientos, artículos del blog, recordatorios y otros avisos de la tienda, solo si
          te suscribes. La suscripción se confirma con un correo (doble confirmación).
        </li>
        <li>
          <strong>Base legal:</strong> tu consentimiento, que puedes retirar en cualquier momento con el enlace «darse de baja» de cualquier
          correo.
        </li>
      </ul>
      <h3>Navegación</h3>
      <p>
        Los datos de uso de la web solo se miden con tu permiso (ver la <Link href="/cookies">política de cookies</Link>). Los servidores
        guardan registros técnicos (dirección IP, fecha y página) por seguridad y para que la web funcione.
      </p>

      <h2>3. Cuánto tiempo los conservamos</h2>
      <ul>
        <li>
          Pedidos y facturas: el tiempo exigido por la normativa fiscal y mercantil (por regla general, 6 años) y después, bloqueados mientras
          puedan surgir responsabilidades.
        </li>
        <li>Consultas: el tiempo necesario para atenderlas y, después, el plazo de prescripción de posibles reclamaciones.</li>
        <li>Newsletter: hasta que te des de baja o nos lo pidas.</li>
      </ul>

      <h2>4. Destinatarios y proveedores</h2>
      <p>
        No vendemos tus datos. Los compartimos solo con proveedores que los tratan por nuestra cuenta, con contrato de encargado del
        tratamiento:
      </p>
      <ul>
        <li>
          <strong>Brevo</strong> (Sendinblue SAS, Francia): envío de la newsletter y gestión de la lista de suscriptores.
        </li>
        <li>
          <strong>Vercel</strong>: alojamiento de la web.
        </li>
        <li>
          <strong>Sanity</strong>: gestión del contenido del blog (no almacena datos de clientes).
        </li>
        <li>
          <strong>Plataforma de comercio electrónico, pasarela de pago y empresa de transporte</strong>: para cobrar y entregar tu pedido (se
          concretarán al activar la venta online).
        </li>
        <li>
          <strong>Google Maps</strong>: el mapa de la sección «Visítanos».
        </li>
        <li>Administraciones públicas, cuando una ley lo exija.</li>
      </ul>
      <p>
        Algunos proveedores (por ejemplo, Vercel) pueden tratar datos fuera del Espacio Económico Europeo; en ese caso se apoyan en garantías
        como las cláusulas contractuales tipo de la Comisión Europea.
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong>, <strong>suprimirlos</strong>, <strong>oponerte</strong>{" "}
        a su tratamiento, <strong>limitarlo</strong> y pedir su <strong>portabilidad</strong>, así como retirar tu consentimiento cuando sea la
        base del tratamiento. Escribe a {mail} indicando el derecho que quieres ejercer y acompañando una copia de un documento que acredite
        tu identidad. Respondemos en el plazo de un mes. Si crees que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia
        Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener">aepd.es</a>).
      </p>

      <h2>6. Menores</h2>
      <p>
        La web no está dirigida a menores de 14 años y no recogemos sus datos a sabiendas. Las bebidas alcohólicas solo se venden a mayores de
        18 años (ver <Link href="/condiciones-de-venta">condiciones de venta</Link>).
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos (conexión cifrada, acceso restringido y proveedores con
        garantías). Ningún sistema es infalible: si hubiera una brecha que te afectara, te lo comunicaremos como exige la ley.
      </p>

      <h2>8. Cambios en esta política</h2>
      <p>Si la modificamos de forma relevante, lo avisaremos en la web. La fecha de la última revisión aparece arriba.</p>
    </>
  );
}
