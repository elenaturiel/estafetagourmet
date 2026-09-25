import { CookieSettingsButton } from "@/components/layout/CookieBanner";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de cookies",
  description:
    "Qué cookies usa la web de Estafeta Gourmet, para qué sirven y cómo aceptarlas, rechazarlas o cambiar tu elección en cualquier momento.",
  path: "/cookies",
});

export default function Page() {
  return (
    <LegalPage title="Política de cookies">
      <h2>Qué son las cookies</h2>
      <p>
        Son pequeños archivos que la web guarda en tu navegador. Algunas son necesarias para que la
        tienda funcione y otras sirven para medir cómo se usa la web.
      </p>
      <h2>Cookies que usamos</h2>
      <ul>
        <li>
          Técnicas (necesarias): guardan tu cesta y tu elección sobre las cookies. Se almacenan en
          tu navegador (localStorage) y no requieren consentimiento.
        </li>
        <li>
          Analítica (opcional): [herramienta por definir]. Solo se cargan si las aceptas.
        </li>
      </ul>
      <h2>Cómo cambiar tu elección</h2>
      <p>
        Puedes aceptar o rechazar las cookies de analítica en cualquier momento. Rechazar es tan
        sencillo como aceptar.
      </p>
      <CookieSettingsButton className="rounded-eg border border-tinta px-5 font-semibold text-tinta hover:bg-tinta hover:text-crema" />
    </LegalPage>
  );
}
