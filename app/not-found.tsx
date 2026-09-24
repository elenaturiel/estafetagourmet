import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-site py-24 lg:py-32">
      <p className="eyebrow text-vino">Error 404</p>
      <h1 className="mt-4 text-[40px] leading-tight tracking-[-0.02em] lg:text-[60px]">
        No encontramos esta página
      </h1>
      <p className="mt-4 max-w-xl text-[17px] text-secundario">
        Puede que el enlace haya cambiado. Vuelve al inicio o date una vuelta por la tienda.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Ir al inicio</ButtonLink>
        <ButtonLink href="/tienda" variant="secondary">
          Ver la tienda
        </ButtonLink>
      </div>
    </div>
  );
}
