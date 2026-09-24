import { LegalPage } from "@/components/ui/LegalPage";
import { legalEntity as e } from "@/data/legal";
import { SITE_URL, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de Estafeta Gourmet: datos del titular de la web y condiciones de uso.",
  path: "/aviso-legal",
});

export default function Page() {
  return (
    <LegalPage title="Aviso legal">
      <h2>Titular de la web</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de
        comercio electrónico (LSSI-CE), te informamos de que esta web ({site.domainLabel}) es
        titularidad de {e.name}, con NIF {e.taxId} y domicilio en {e.address}. {e.registry}.
      </p>
      <p>
        Contacto: {e.email} · teléfono {site.phone.display}.
      </p>
      <h2>Condiciones de uso</h2>
      <p>
        El acceso a la web es gratuito e implica la aceptación de estas condiciones. Te
        comprometes a hacer un uso adecuado de los contenidos y a no emplearlos para actividades
        ilícitas.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, fotografías, logotipos y el diseño de la web pertenecen a {e.name} o a sus
        autores, y no pueden reproducirse sin autorización.
      </p>
      <h2>Legislación aplicable</h2>
      <p>[Legislación y jurisdicción aplicables: revisar con un profesional.]</p>
      <p className="text-[13px]">URL: {SITE_URL}</p>
    </LegalPage>
  );
}
