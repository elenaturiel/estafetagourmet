import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Stamp } from "@/components/ui/Stamp";
import { site } from "@/data/site";

export function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-title" className="relative overflow-hidden bg-crema-oscuro py-16 lg:py-24">
      <Stamp
        text="Novedades de temporada · Estafeta Gourmet · "
        className="absolute -top-10 -right-10 hidden w-[180px] opacity-90 lg:block"
      />
      <div data-reveal className="container-site relative text-center">
        <p className="eyebrow text-vino">Newsletter</p>
        <h2
          id="newsletter-title"
          className="mx-auto mt-4 max-w-3xl text-[36px] leading-[1.05] tracking-[-0.02em] lg:text-[56px]"
        >
          Recibe las novedades <em className="font-normal text-vino italic">de temporada</em>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] text-secundario">
          Productos nuevos, maridajes y{" "}
          <strong className="font-semibold text-tinta">{site.newsletterIncentive}</strong>.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
