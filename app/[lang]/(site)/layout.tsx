import { SiteChrome } from "@/components/layout/SiteChrome";
import "../../navidad.css"; // Navidad: estilos temporales (quitar tras las fiestas)

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
