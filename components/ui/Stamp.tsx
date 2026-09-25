import Image from "next/image";
import { useId } from "react";
import { cn } from "@/lib/cn";

/** Sello giratorio: el logotipo con un texto circular alrededor. Decorativo. */
export function Stamp({
  text = "Desde la calle Estafeta · Pamplona · Navarra · ",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const id = `stamp-${useId().replace(/:/g, "")}`;
  return (
    <div aria-hidden="true" className={cn("aspect-square", className)}>
      <div className="relative h-full w-full">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="98" className="fill-crema stroke-vino" strokeWidth="1.5" />
        <text className="fill-vino font-sans text-[14px] font-bold uppercase">
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Image
        src="/logo-estafeta-gourmet.webp"
        alt=""
        width={120}
        height={120}
        sizes="120px"
        className="absolute inset-[24%] h-[52%] w-[52%]"
      />
      </div>
    </div>
  );
}
