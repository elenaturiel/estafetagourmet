/* eslint-disable react/no-unescaped-entities -- textos legales con apóstrofos */
import { CookieSettingsButton } from "@/components/layout/CookieBanner";
import { Link } from "@/components/ui/Link";
import type { Locale } from "@/lib/i18n/config";

const btn = "rounded-eg border border-tinta px-5 font-semibold text-tinta hover:bg-tinta hover:text-crema";

export function Cookies({ locale }: { locale: Locale }) {
  if (locale === "en")
    return (
      <>
        <h2>1. What cookies are</h2>
        <p>
          They are small files that a website stores in your browser or device. This website also uses the browser's local storage
          (localStorage), which works in a similar way and is treated the same for the purposes of this policy. Some are necessary for the shop
          to work and others, optional, are used to measure how the website is used or to load third-party content.
        </p>

        <h2>2. What we use</h2>
        <h3>Necessary (no consent required)</h3>
        <ul>
          <li>
            <strong>Shopping basket</strong> (<code>eg-cart-v1</code>, localStorage): remembers the products you have added. It is kept until
            you empty it or clear your browser data.
          </li>
          <li>
            <strong>Your cookie choice</strong> (<code>eg-cookie-consent-v1</code>, localStorage): so that we do not ask you again.
          </li>
          <li>
            <strong>Newsletter window</strong> (localStorage): remembers whether you have already seen or closed it, so that it is not shown
            again.
          </li>
        </ul>
        <h3>Third-party</h3>
        <ul>
          <li>
            <strong>Google Maps map</strong> (Google LLC): the “Visit us” section shows a Google Maps map. When it loads, Google may install its
            own cookies and receives data such as your IP address. More information in{" "}
            <a href="https://policies.google.com/technologies/cookies" rel="noopener">
              Google's cookie policy
            </a>
            .
          </li>
        </ul>
        <h3>Optional (only with your permission)</h3>
        <ul>
          <li>
            <strong>Usage analytics</strong>: measures which pages are visited in order to improve the website, in aggregate form. It is only
            switched on if you press “Accept analytics” and it is not loaded if you reject it. [Tool to be decided: it will be named here with
            its cookies and duration when switched on.]
          </li>
        </ul>

        <h2>3. How to accept, reject or change your choice</h2>
        <p>
          The first time you visit we show you a notice with the “Reject” and “Accept analytics” buttons, given equal weight: rejecting is as
          easy as accepting. Until you choose, nothing optional is loaded. You can change your mind at any time here:
        </p>
        <CookieSettingsButton className={btn} />
        <p>
          You can also clear the site data from your browser settings (Chrome, Safari, Firefox, Edge…). If you block local storage, the basket
          may not work.
        </p>

        <h2>4. More information</h2>
        <p>
          How we handle your data is described in the <Link href="/privacidad">privacy policy</Link>. You can write to the shop's contact email
          with any question about cookies.
        </p>
      </>
    );

  if (locale === "fr")
    return (
      <>
        <h2>1. Que sont les cookies</h2>
        <p>
          Ce sont de petits fichiers qu'un site enregistre dans votre navigateur ou votre appareil. Ce site utilise aussi le stockage local du
          navigateur (localStorage), qui fonctionne de manière semblable et est traité de la même façon pour cette politique. Certains sont
          nécessaires au fonctionnement de la boutique et d'autres, facultatifs, servent à mesurer l'utilisation du site ou à charger des
          contenus de tiers.
        </p>

        <h2>2. Ce que nous utilisons</h2>
        <h3>Nécessaires (sans consentement)</h3>
        <ul>
          <li>
            <strong>Panier d'achat</strong> (<code>eg-cart-v1</code>, localStorage) : mémorise les produits que vous avez ajoutés. Il est
            conservé jusqu'à ce que vous le vidiez ou effaciez les données du navigateur.
          </li>
          <li>
            <strong>Votre choix sur les cookies</strong> (<code>eg-cookie-consent-v1</code>, localStorage) : pour ne plus vous le demander.
          </li>
          <li>
            <strong>Fenêtre de la newsletter</strong> (localStorage) : mémorise si vous l'avez déjà vue ou fermée, pour ne pas vous la
            montrer de nouveau.
          </li>
        </ul>
        <h3>De tiers</h3>
        <ul>
          <li>
            <strong>Carte Google Maps</strong> (Google LLC) : la section « Nous rendre visite » affiche une carte Google Maps. Lors de son
            chargement, Google peut installer ses propres cookies et reçoit des données comme votre adresse IP. Plus d'informations dans la{" "}
            <a href="https://policies.google.com/technologies/cookies" rel="noopener">
              politique de cookies de Google
            </a>
            .
          </li>
        </ul>
        <h3>Facultatifs (uniquement avec votre accord)</h3>
        <ul>
          <li>
            <strong>Mesure d'audience</strong> : mesure les pages consultées pour améliorer le site, de manière agrégée. Elle ne s'active que
            si vous cliquez sur « Accepter l'analyse » et n'est pas chargée si vous la refusez. [Outil à définir : il sera indiqué ici avec ses
            cookies et leur durée lors de son activation.]
          </li>
        </ul>

        <h2>3. Comment accepter, refuser ou modifier votre choix</h2>
        <p>
          La première fois que vous venez, nous affichons un avis avec les boutons « Refuser » et « Accepter l'analyse », de même poids : refuser
          est aussi simple qu'accepter. Tant que vous n'avez pas choisi, rien de facultatif n'est chargé. Vous pouvez changer d'avis à tout
          moment ici :
        </p>
        <CookieSettingsButton className={btn} />
        <p>
          Vous pouvez aussi effacer les données du site depuis les paramètres de votre navigateur (Chrome, Safari, Firefox, Edge…). Si vous
          bloquez le stockage local, le panier pourrait ne pas fonctionner.
        </p>

        <h2>4. Plus d'informations</h2>
        <p>
          La manière dont nous traitons vos données figure dans la <Link href="/privacidad">politique de confidentialité</Link>. Vous pouvez
          écrire à l'adresse e-mail de contact de la boutique pour toute question sur les cookies.
        </p>
      </>
    );

  return (
    <>
      <h2>1. Qué son las cookies</h2>
      <p>
        Son pequeños archivos que una web guarda en tu navegador o dispositivo. Esta web usa también el almacenamiento local del navegador
        (localStorage), que funciona de forma parecida y se trata igual a efectos de esta política. Algunas son necesarias para que la tienda
        funcione y otras, opcionales, sirven para medir cómo se usa la web o para cargar contenidos de terceros.
      </p>

      <h2>2. Qué usamos</h2>
      <h3>Necesarias (no requieren consentimiento)</h3>
      <ul>
        <li>
          <strong>Cesta de la compra</strong> (<code>eg-cart-v1</code>, localStorage): recuerda los productos que has añadido. Se conserva
          hasta que la vacíes o borres los datos del navegador.
        </li>
        <li>
          <strong>Tu elección sobre las cookies</strong> (<code>eg-cookie-consent-v1</code>, localStorage): para no volver a preguntarte.
        </li>
        <li>
          <strong>Ventana de la newsletter</strong> (localStorage): recuerda si ya la has visto o cerrado, para no mostrártela de nuevo.
        </li>
      </ul>
      <h3>De terceros</h3>
      <ul>
        <li>
          <strong>Mapa de Google Maps</strong> (Google LLC): la sección «Visítanos» muestra un mapa de Google Maps. Al cargarlo, Google puede
          instalar sus propias cookies y recibe datos como tu dirección IP. Más información en la{" "}
          <a href="https://policies.google.com/technologies/cookies" rel="noopener">
            política de cookies de Google
          </a>
          .
        </li>
      </ul>
      <h3>Opcionales (solo con tu permiso)</h3>
      <ul>
        <li>
          <strong>Analítica de uso</strong>: mide qué páginas se visitan para mejorar la web, de forma agregada. Solo se activa si pulsas
          «Aceptar analítica» y no se carga si la rechazas. [Herramienta por definir: se indicará aquí con sus cookies y su duración cuando se
          active.]
        </li>
      </ul>

      <h2>3. Cómo aceptar, rechazar o cambiar tu elección</h2>
      <p>
        La primera vez que entras te mostramos un aviso con los botones «Rechazar» y «Aceptar analítica», con el mismo peso: rechazar es tan
        sencillo como aceptar. Mientras no elijas, no se carga nada opcional. Puedes cambiar tu decisión en cualquier momento aquí:
      </p>
      <CookieSettingsButton className={btn} />
      <p>
        También puedes borrar los datos del sitio desde la configuración de tu navegador (Chrome, Safari, Firefox, Edge…). Si bloqueas el
        almacenamiento local, la cesta podría no funcionar.
      </p>

      <h2>4. Más información</h2>
      <p>
        Cómo tratamos tus datos está en la <Link href="/privacidad">política de privacidad</Link>. Puedes escribirnos a cualquier duda sobre
        cookies al correo de contacto de la tienda.
      </p>
    </>
  );
}
