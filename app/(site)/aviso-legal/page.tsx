import { LegalPage } from "@/components/ui/LegalPage";
import { legalEntity as e } from "@/data/legal";
import { SITE_URL, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de Estafeta Gourmet: datos del titular de la web, condiciones de uso y propiedad intelectual.",
  path: "/aviso-legal",
});

export default function Page() {
  return (
    <LegalPage title="Aviso legal">
      <h2>1. Titular de la web</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la
        información y de comercio electrónico (LSSI-CE), te informamos de que esta web ({site.domainLabel}) es
        titularidad de {e.name}, que opera bajo el nombre comercial <strong>{site.name}</strong>, con NIF {e.taxId} y
        domicilio en {e.address}. {e.registry}
      </p>
      <p>
        Contacto: <a href={`mailto:${e.email}`}>{e.email}</a> · teléfono <a href={site.phone.href}>{site.phone.display}</a>.
      </p>

      <h2>2. Objeto</h2>
      <p>
        Esta web presenta la tienda de productos gourmet de Navarra de la calle Estafeta de Pamplona y permite
        comprar sus productos a distancia. Las compras se rigen por las{" "}
        <a href="/condiciones-de-venta">condiciones de venta</a> y por la página de{" "}
        <a href="/envios-y-devoluciones">envíos y devoluciones</a>.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso y la navegación son gratuitos e implican la aceptación de este aviso. Te comprometes a usar la web y
        sus contenidos de forma lícita y diligente y a no emplearlos para actividades contrarias a la ley, a la buena
        fe o al orden público; a no intentar acceder a zonas restringidas ni dañar o sobrecargar los sistemas; y a no
        usar los contenidos con fines comerciales sin autorización.
      </p>
      <p>
        Hacemos todo lo posible por que la información sea exacta (descripciones, precios, disponibilidad), pero puede
        haber errores o cambios. Si detectas alguno, escríbenos y lo corregimos. Podemos modificar, suspender o retirar
        contenidos o la propia web sin previo aviso.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, fotografías, logotipos, marcas, diseño y código de la web pertenecen a {e.name} o a sus
        respectivos titulares (por ejemplo, las marcas y fotografías de los productores que aparecen en el catálogo) y
        están protegidos por la normativa de propiedad intelectual e industrial. No se pueden reproducir, distribuir
        ni transformar sin autorización expresa, salvo para uso personal y no comercial.
      </p>

      <h2>5. Enlaces</h2>
      <p>
        La web puede enlazar a páginas de terceros (por ejemplo, Google Maps o Instagram). No controlamos esos sitios
        ni nos hacemos responsables de sus contenidos o políticas. Si quieres enlazar a esta web, hazlo a la página
        principal o a una página concreta, sin sugerir una relación con nosotros que no exista.
      </p>

      <h2>6. Responsabilidad</h2>
      <p>
        No respondemos de los daños derivados de interrupciones del servicio, fallos técnicos, virus o usos
        indebidos de la web por parte de terceros, salvo que la ley lo exija. Esto no afecta a los derechos que la
        normativa de consumidores te reconoce al comprar.
      </p>

      <h2>7. Protección de datos y cookies</h2>
      <p>
        Cómo tratamos tus datos está en la <a href="/privacidad">política de privacidad</a> y el uso de cookies, en la{" "}
        <a href="/cookies">política de cookies</a>.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Este aviso se rige por la legislación española. Si eres consumidor, podrás acudir a los juzgados de tu
        domicilio; en otro caso, las partes se someten a los juzgados y tribunales de Pamplona, salvo que la ley
        establezca otro fuero.
      </p>
      <p className="text-[13px]">URL: {SITE_URL}</p>
    </LegalPage>
  );
}
