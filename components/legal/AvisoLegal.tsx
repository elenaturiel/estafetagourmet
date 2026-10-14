/* eslint-disable react/no-unescaped-entities -- textos legales con apóstrofos */
import { Link } from "@/components/ui/Link";
import { SITE_URL } from "@/data/site";
import type { Locale } from "@/lib/i18n/config";
import { legalContext } from "./shared";

export function AvisoLegal({ locale }: { locale: Locale }) {
  const { e, domain, site } = legalContext(locale);
  const mail = <a href={`mailto:${e.email}`}>{e.email}</a>;
  const phone = <a href={site.phone.href}>{site.phone.display}</a>;

  if (locale === "en")
    return (
      <>
        <h2>1. Website holder</h2>
        <p>
          In compliance with Article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE), we inform you
          that this website ({domain}) is owned by {e.name}, which trades under the name <strong>{site.name}</strong>, with tax ID {e.taxId} and
          registered address at {e.address}. {e.registry}
        </p>
        <p>
          Contact: {mail} · telephone {phone}.
        </p>

        <h2>2. Purpose</h2>
        <p>
          This website presents the shop of gourmet food from Navarre on Calle Estafeta in Pamplona and allows its products to be bought at a
          distance. Purchases are governed by the <Link href="/condiciones-de-venta">terms of sale</Link> and by the{" "}
          <Link href="/envios-y-devoluciones">shipping and returns</Link> page.
        </p>

        <h2>3. Terms of use</h2>
        <p>
          Access to and browsing of the website are free and imply acceptance of this notice. You agree to use the website and its contents
          lawfully and diligently and not to use them for activities contrary to the law, good faith or public order; not to try to access
          restricted areas or damage or overload the systems; and not to use the contents for commercial purposes without authorisation.
        </p>
        <p>
          We do everything we can to keep the information accurate (descriptions, prices, availability), but there may be mistakes or changes.
          If you spot one, write to us and we will correct it. We may modify, suspend or withdraw content, or the website itself, without prior
          notice.
        </p>

        <h2>4. Intellectual and industrial property</h2>
        <p>
          The texts, photographs, logos, trademarks, design and code of the website belong to {e.name} or to their respective owners (for
          example, the trademarks and photographs of the producers shown in the catalogue) and are protected by intellectual and industrial
          property law. They may not be reproduced, distributed or altered without express authorisation, except for personal, non-commercial
          use.
        </p>

        <h2>5. Links</h2>
        <p>
          The website may link to third-party pages (for example, Google Maps or Instagram). We do not control those sites and are not
          responsible for their content or policies. If you want to link to this website, link to the home page or to a specific page, without
          suggesting a relationship with us that does not exist.
        </p>

        <h2>6. Liability</h2>
        <p>
          We are not liable for damage arising from service interruptions, technical faults, viruses or improper use of the website by third
          parties, unless the law requires it. This does not affect the rights that consumer law gives you when you buy.
        </p>

        <h2>7. Data protection and cookies</h2>
        <p>
          How we handle your data is described in the <Link href="/privacidad">privacy policy</Link> and the use of cookies in the{" "}
          <Link href="/cookies">cookie policy</Link>.
        </p>

        <h2>8. Applicable law and jurisdiction</h2>
        <p>
          This notice is governed by Spanish law. If you are a consumer, you may go to the courts of your place of residence; otherwise, the
          parties submit to the courts of Pamplona, unless the law establishes a different jurisdiction.
        </p>
        <p className="text-[13px]">URL: {SITE_URL}</p>
      </>
    );

  if (locale === "fr")
    return (
      <>
        <h2>1. Titulaire du site</h2>
        <p>
          Conformément à l'article 10 de la loi espagnole 34/2002 sur les services de la société de l'information et le commerce électronique
          (LSSI-CE), nous vous informons que ce site ({domain}) appartient à {e.name}, qui exerce sous le nom commercial{" "}
          <strong>{site.name}</strong>, numéro fiscal {e.taxId}, dont le siège est situé {e.address}. {e.registry}
        </p>
        <p>
          Contact : {mail} · téléphone {phone}.
        </p>

        <h2>2. Objet</h2>
        <p>
          Ce site présente la boutique de produits gourmets de Navarre de la Calle Estafeta à Pampelune et permet d'acheter ses produits à
          distance. Les achats sont régis par les <Link href="/condiciones-de-venta">conditions de vente</Link> et par la page{" "}
          <Link href="/envios-y-devoluciones">livraison et retours</Link>.
        </p>

        <h2>3. Conditions d'utilisation</h2>
        <p>
          L'accès au site et sa consultation sont gratuits et impliquent l'acceptation de ces mentions. Vous vous engagez à utiliser le site et
          ses contenus de manière licite et diligente et à ne pas les employer pour des activités contraires à la loi, à la bonne foi ou à
          l'ordre public ; à ne pas tenter d'accéder à des zones restreintes ni d'endommager ou de surcharger les systèmes ; et à ne pas
          utiliser les contenus à des fins commerciales sans autorisation.
        </p>
        <p>
          Nous faisons tout notre possible pour que les informations soient exactes (descriptions, prix, disponibilité), mais des erreurs ou
          des changements sont possibles. Si vous en repérez un, écrivez-nous et nous le corrigerons. Nous pouvons modifier, suspendre ou
          retirer des contenus, ou le site lui-même, sans préavis.
        </p>

        <h2>4. Propriété intellectuelle et industrielle</h2>
        <p>
          Les textes, photographies, logos, marques, conception et code du site appartiennent à {e.name} ou à leurs titulaires respectifs (par
          exemple, les marques et photographies des producteurs présentés dans le catalogue) et sont protégés par la législation sur la
          propriété intellectuelle et industrielle. Ils ne peuvent être reproduits, distribués ni transformés sans autorisation expresse, sauf
          pour un usage personnel et non commercial.
        </p>

        <h2>5. Liens</h2>
        <p>
          Le site peut renvoyer vers des pages de tiers (par exemple Google Maps ou Instagram). Nous ne contrôlons pas ces sites et ne sommes
          pas responsables de leurs contenus ni de leurs politiques. Si vous souhaitez créer un lien vers ce site, faites-le vers la page
          d'accueil ou une page précise, sans suggérer un lien avec nous qui n'existe pas.
        </p>

        <h2>6. Responsabilité</h2>
        <p>
          Nous ne répondons pas des dommages dus à des interruptions de service, des pannes techniques, des virus ou une utilisation abusive
          du site par des tiers, sauf si la loi l'exige. Cela n'affecte pas les droits que la législation sur la consommation vous reconnaît
          lors de vos achats.
        </p>

        <h2>7. Protection des données et cookies</h2>
        <p>
          La manière dont nous traitons vos données figure dans la <Link href="/privacidad">politique de confidentialité</Link> et
          l'utilisation des cookies dans la <Link href="/cookies">politique de cookies</Link>.
        </p>

        <h2>8. Droit applicable et juridiction</h2>
        <p>
          Ces mentions sont régies par le droit espagnol. Si vous êtes consommateur, vous pouvez saisir les tribunaux de votre domicile ; dans
          les autres cas, les parties se soumettent aux tribunaux de Pampelune, sauf si la loi prévoit une autre juridiction.
        </p>
        <p className="text-[13px]">URL : {SITE_URL}</p>
      </>
    );

  return (
    <>
      <h2>1. Titular de la web</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE),
        te informamos de que esta web ({domain}) es titularidad de {e.name}, que opera bajo el nombre comercial <strong>{site.name}</strong>,
        con NIF {e.taxId} y domicilio en {e.address}. {e.registry}
      </p>
      <p>
        Contacto: {mail} · teléfono {phone}.
      </p>

      <h2>2. Objeto</h2>
      <p>
        Esta web presenta la tienda de productos gourmet de Navarra de la calle Estafeta de Pamplona y permite comprar sus productos a
        distancia. Las compras se rigen por las <Link href="/condiciones-de-venta">condiciones de venta</Link> y por la página de{" "}
        <Link href="/envios-y-devoluciones">envíos y devoluciones</Link>.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso y la navegación son gratuitos e implican la aceptación de este aviso. Te comprometes a usar la web y sus contenidos de forma
        lícita y diligente y a no emplearlos para actividades contrarias a la ley, a la buena fe o al orden público; a no intentar acceder a
        zonas restringidas ni dañar o sobrecargar los sistemas; y a no usar los contenidos con fines comerciales sin autorización.
      </p>
      <p>
        Hacemos todo lo posible por que la información sea exacta (descripciones, precios, disponibilidad), pero puede haber errores o
        cambios. Si detectas alguno, escríbenos y lo corregimos. Podemos modificar, suspender o retirar contenidos o la propia web sin previo
        aviso.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, fotografías, logotipos, marcas, diseño y código de la web pertenecen a {e.name} o a sus respectivos titulares (por ejemplo,
        las marcas y fotografías de los productores que aparecen en el catálogo) y están protegidos por la normativa de propiedad intelectual
        e industrial. No se pueden reproducir, distribuir ni transformar sin autorización expresa, salvo para uso personal y no comercial.
      </p>

      <h2>5. Enlaces</h2>
      <p>
        La web puede enlazar a páginas de terceros (por ejemplo, Google Maps o Instagram). No controlamos esos sitios ni nos hacemos
        responsables de sus contenidos o políticas. Si quieres enlazar a esta web, hazlo a la página principal o a una página concreta, sin
        sugerir una relación con nosotros que no exista.
      </p>

      <h2>6. Responsabilidad</h2>
      <p>
        No respondemos de los daños derivados de interrupciones del servicio, fallos técnicos, virus o usos indebidos de la web por parte de
        terceros, salvo que la ley lo exija. Esto no afecta a los derechos que la normativa de consumidores te reconoce al comprar.
      </p>

      <h2>7. Protección de datos y cookies</h2>
      <p>
        Cómo tratamos tus datos está en la <Link href="/privacidad">política de privacidad</Link> y el uso de cookies, en la{" "}
        <Link href="/cookies">política de cookies</Link>.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Este aviso se rige por la legislación española. Si eres consumidor, podrás acudir a los juzgados de tu domicilio; en otro caso, las
        partes se someten a los juzgados y tribunales de Pamplona, salvo que la ley establezca otro fuero.
      </p>
      <p className="text-[13px]">URL: {SITE_URL}</p>
    </>
  );
}
