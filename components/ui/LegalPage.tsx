import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

/**
 * Plantilla de página legal. El texto de estas páginas es PROVISIONAL y
 * debe revisarlo un profesional antes de publicar la web (ver TODO.md).
 */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="container-site pb-16 lg:pb-24">
        <p
          role="note"
          className="mb-10 max-w-3xl border border-vino/40 bg-papel p-4 text-[14px] text-vino"
        >
          <strong>TODO:</strong> texto provisional pendiente de revisión por un profesional. Los
          datos entre corchetes están por completar.
        </p>
        <div className="legal max-w-3xl space-y-4 text-[16px] leading-[1.65] text-secundario [&_h2]:mt-10 [&_h2]:text-[26px] [&_h2]:leading-tight [&_h2]:text-tinta [&_li]:ml-5 [&_li]:list-disc">
          {children}
        </div>
      </div>
    </>
  );
}
