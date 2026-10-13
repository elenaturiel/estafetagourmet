import { LegalPage } from "@/components/ui/LegalPage";
import { legalEntity as e } from "@/data/legal";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de privacidad",
  description:
    "Cómo trata Estafeta Gourmet tus datos personales: pedidos, formulario de contacto y newsletter, y cómo ejercer tus derechos.",
  path: "/privacidad",
});

export default function Page() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        Esta política explica qué datos personales recogemos en {site.name}, para qué los usamos y qué derechos tienes,
        conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        {e.name}, NIF {e.taxId}, {e.address}. Contacto para temas de privacidad:{" "}
        <a href={`mailto:${e.email}`}>{e.email}</a>.
      </p>

      <h2>2. Qué datos tratamos, para qué y con qué base legal</h2>
      <h3>Compras (pedidos)</h3>
      <ul>
        <li>
          <strong>Datos:</strong> nombre, dirección de envío y facturación, correo, teléfono, contenido del pedido y,
          en bebidas alcohólicas, la declaración de mayoría de edad.
        </li>
        <li><strong>Finalidad:</strong> gestionar, cobrar, enviar y facturar tu pedido y atender garantías y devoluciones.</li>
        <li><strong>Base legal:</strong> ejecución del contrato de compra y cumplimiento de obligaciones legales (fiscales y contables).</li>
      </ul>
      <h3>Formulario de contacto, WhatsApp y teléfono</h3>
      <ul>
        <li><strong>Datos:</strong> nombre, correo o teléfono y el mensaje que nos envíes.</li>
        <li><strong>Finalidad:</strong> responder a tu consulta.</li>
        <li><strong>Base legal:</strong> tu consentimiento (al escribirnos) o la aplicación de medidas precontractuales a petición tuya.</li>
      </ul>
      <h3>Newsletter (Club Estafeta)</h3>
      <ul>
        <li><strong>Datos:</strong> tu correo electrónico (y tu nombre, si lo das).</li>
        <li>
          <strong>Finalidad:</strong> enviarte novedades, lanzamientos, artículos del blog, recordatorios y otros avisos de la
          tienda, solo si te suscribes. La suscripción se confirma con un correo (doble confirmación).
        </li>
        <li><strong>Base legal:</strong> tu consentimiento, que puedes retirar en cualquier momento con el enlace «darse de baja» de cualquier correo.</li>
      </ul>
      <h3>Navegación</h3>
      <p>
        Los datos de uso de la web solo se miden con tu permiso (ver la <a href="/cookies">política de cookies</a>). Los
        servidores guardan registros técnicos (dirección IP, fecha y página) por seguridad y para que la web funcione.
      </p>

      <h2>3. Cuánto tiempo los conservamos</h2>
      <ul>
        <li>Pedidos y facturas: el tiempo exigido por la normativa fiscal y mercantil (por regla general, 6 años) y después, bloqueados mientras puedan surgir responsabilidades.</li>
        <li>Consultas: el tiempo necesario para atenderlas y, después, el plazo de prescripción de posibles reclamaciones.</li>
        <li>Newsletter: hasta que te des de baja o nos lo pidas.</li>
      </ul>

      <h2>4. Destinatarios y proveedores</h2>
      <p>No vendemos tus datos. Los compartimos solo con proveedores que los tratan por nuestra cuenta, con contrato de encargado del tratamiento:</p>
      <ul>
        <li><strong>Brevo</strong> (Sendinblue SAS, Francia): envío de la newsletter y gestión de la lista de suscriptores.</li>
        <li><strong>Vercel</strong>: alojamiento de la web.</li>
        <li><strong>Sanity</strong>: gestión del contenido del blog (no almacena datos de clientes).</li>
        <li><strong>Plataforma de comercio electrónico, pasarela de pago y empresa de transporte</strong>: para cobrar y entregar tu pedido (se concretarán al activar la venta online).</li>
        <li><strong>Google Maps</strong>: el mapa de la sección «Visítanos».</li>
        <li>Administraciones públicas, cuando una ley lo exija.</li>
      </ul>
      <p>
        Algunos proveedores (por ejemplo, Vercel) pueden tratar datos fuera del Espacio Económico Europeo; en ese caso
        se apoyan en garantías como las cláusulas contractuales tipo de la Comisión Europea.
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong>, <strong>suprimirlos</strong>,{" "}
        <strong>oponerte</strong> a su tratamiento, <strong>limitarlo</strong> y pedir su <strong>portabilidad</strong>, así
        como retirar tu consentimiento cuando sea la base del tratamiento. Escribe a{" "}
        <a href={`mailto:${e.email}`}>{e.email}</a> indicando el derecho que quieres ejercer y acompañando una copia de
        un documento que acredite tu identidad. Respondemos en el plazo de un mes. Si crees que no hemos atendido bien
        tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" rel="noopener">aepd.es</a>).
      </p>

      <h2>6. Menores</h2>
      <p>
        La web no está dirigida a menores de 14 años y no recogemos sus datos a sabiendas. Las bebidas alcohólicas solo se
        venden a mayores de 18 años (ver <a href="/condiciones-de-venta">condiciones de venta</a>).
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos (conexión cifrada, acceso
        restringido y proveedores con garantías). Ningún sistema es infalible: si hubiera una brecha que te afectara, te lo
        comunicaremos como exige la ley.
      </p>

      <h2>8. Cambios en esta política</h2>
      <p>Si la modificamos de forma relevante, lo avisaremos en la web. La fecha de la última revisión aparece arriba.</p>
    </LegalPage>
  );
}
