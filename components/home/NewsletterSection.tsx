import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { site } from "@/data/site";

export function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-title" className="bg-crema-oscuro py-16 lg:py-20">
      <div className="container-site text-center">
        <h2 id="newsletter-title" className="text-[30px] leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
          Recibe las novedades de temporada
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[16px] text-secundario">
          Productos nuevos, maridajes y {site.newsletterIncentive}.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
