import { CookieSettingsButton } from "@/components/layout/CookieBanner";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de cookies",
  description:
    "Qué cookies y almacenamiento usa la web de Estafeta Gourmet, para qué sirven y cómo aceptarlas, rechazarlas o cambiar tu elección en cualquier momento.",
  path: "/cookies",
});

export default function Page() {
  return (
    <LegalPage title="Política de cookies">
      <h2>1. Qué son las cookies</h2>
      <p>
        Son pequeños archivos que una web guarda en tu navegador o dispositivo. Esta web usa también el almacenamiento
        local del navegador (localStorage), que funciona de forma parecida y se trata igual a efectos de esta política.
        Algunas son necesarias para que la tienda funcione y otras, opcionales, sirven para medir cómo se usa la web o
        para cargar contenidos de terceros.
      </p>

      <h2>2. Qué usamos</h2>
      <h3>Necesarias (no requieren consentimiento)</h3>
      <ul>
        <li>
          <strong>Cesta de la compra</strong> (<code>eg-cart-v1</code>, localStorage): recuerda los productos que has
          añadido. Se conserva hasta que la vacíes o borres los datos del navegador.
        </li>
        <li>
          <strong>Tu elección sobre las cookies</strong> (<code>eg-cookie-consent-v1</code>, localStorage): para no
          volver a preguntarte.
        </li>
        <li>
          <strong>Ventana de la newsletter</strong> (localStorage): recuerda si ya la has visto o cerrado, para no
          mostrártela de nuevo.
        </li>
      </ul>
      <h3>De terceros</h3>
      <ul>
        <li>
          <strong>Mapa de Google Maps</strong> (Google LLC): la sección «Visítanos» muestra un mapa de Google Maps. Al
          cargarlo, Google puede instalar sus propias cookies y recibe datos como tu dirección IP. Más información en
          la <a href="https://policies.google.com/technologies/cookies" rel="noopener">política de cookies de Google</a>.
        </li>
      </ul>
      <h3>Opcionales (solo con tu permiso)</h3>
      <ul>
        <li>
          <strong>Analítica de uso</strong>: mide qué páginas se visitan para mejorar la web, de forma agregada. Solo se
          activa si pulsas «Aceptar analítica» y no se carga si la rechazas. [Herramienta por definir: se indicará aquí
          con sus cookies y su duración cuando se active.]
        </li>
      </ul>

      <h2>3. Cómo aceptar, rechazar o cambiar tu elección</h2>
      <p>
        La primera vez que entras te mostramos un aviso con los botones «Rechazar» y «Aceptar analítica», con el mismo
        peso: rechazar es tan sencillo como aceptar. Mientras no elijas, no se carga nada opcional. Puedes cambiar tu
        decisión en cualquier momento aquí:
      </p>
      <CookieSettingsButton className="rounded-eg border border-tinta px-5 font-semibold text-tinta hover:bg-tinta hover:text-crema" />
      <p>
        También puedes borrar los datos del sitio desde la configuración de tu navegador (Chrome, Safari, Firefox,
        Edge…). Si bloqueas el almacenamiento local, la cesta podría no funcionar.
      </p>

      <h2>4. Más información</h2>
      <p>
        Cómo tratamos tus datos está en la <a href="/privacidad">política de privacidad</a>. Puedes escribirnos a
        cualquier duda sobre cookies al correo de contacto de la tienda.
      </p>
    </LegalPage>
  );
}
