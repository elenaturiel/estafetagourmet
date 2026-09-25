import { LegalPage } from "@/components/ui/LegalPage";
import { legalEntity as e } from "@/data/legal";
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
      <h2>Responsable del tratamiento</h2>
      <p>
        {e.name}, NIF {e.taxId}, {e.address}. Contacto: {e.email}.
      </p>
      <h2>Qué datos tratamos y para qué</h2>
      <ul>
        <li>Pedidos: nombre, dirección, correo y teléfono para gestionar y enviar tu compra.</li>
        <li>Formulario de contacto: nombre, correo y mensaje para responderte.</li>
        <li>
          Newsletter (Club Estafeta): tu correo para enviarte novedades, lanzamientos y recordatorios,
          solo si te suscribes. Puedes darte de baja desde el enlace de cualquier correo.
        </li>
      </ul>
      <h2>Base legal</h2>
      <p>
        La ejecución del contrato de compra, tu consentimiento (contacto y newsletter) y el
        cumplimiento de obligaciones legales. [Revisar con un profesional.]
      </p>
      <h2>Conservación</h2>
      <p>[Plazos de conservación de cada tipo de dato.]</p>
      <h2>Destinatarios</h2>
      <p>
        Brevo (Sendinblue SAS, Francia) para el envío de la newsletter. [Resto de proveedores que
        tratan datos por cuenta de la tienda: plataforma de comercio electrónico, pasarela de pago,
        empresa de transporte, alojamiento web…]
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes acceder, rectificar y suprimir tus datos, así como oponerte o limitar su
        tratamiento y solicitar su portabilidad, escribiendo a {e.email}. También puedes reclamar
        ante la Agencia Española de Protección de Datos (aepd.es).
      </p>
    </LegalPage>
  );
}
