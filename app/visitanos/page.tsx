import { AboutSection } from "@/components/home/AboutSection";
import { VisitSection } from "@/components/home/VisitSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Visítanos en la calle Estafeta, 70 de Pamplona",
  description:
    "Nuestra tienda de productos gourmet navarros está en la calle Estafeta, 70, en el casco viejo de Pamplona. Horario, teléfono, cómo llegar y formulario de contacto.",
  path: "/visitanos",
});

export default function VisitPage() {
  return (
    <>
      <VisitSection headingLevel="h1" />
      <AboutSection />
    </>
  );
}
