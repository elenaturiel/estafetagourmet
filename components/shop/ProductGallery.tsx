"use client";

import { useState, type ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";
import { fmt } from "@/lib/i18n/config";
import { useT } from "@/lib/i18n/client";
import type { Image } from "@/lib/types";

/**
 * Foto grande del producto con miniaturas debajo. En los lotes, la primera es
 * el conjunto y las siguientes cada producto que lleva. Con una sola foto se
 * ve igual que antes (sin miniaturas).
 */
export function ProductGallery({ images, children }: { images: Image[]; children?: ReactNode }) {
  const t = useT().shop.product;
  const [current, setCurrent] = useState(0);
  const main = images[Math.min(current, images.length - 1)];

  return (
    <div>
      <div className="relative">
        <ImagePlaceholder
          key={main.src ?? "placeholder"}
          label={main.placeholder}
          src={main.src}
          alt={main.alt}
          ratio="4 / 5"
          blend
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={current === 0}
          className="rounded-eg"
        />
        {children}
      </div>
      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7" aria-label={t.photos}>
          {images.map((img, i) => (
            <li key={img.src ?? i}>
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={i === 0 ? t.viewAll : fmt(t.view, { name: img.alt })}
                aria-current={i === current ? "true" : undefined}
                className={cn(
                  "block w-full overflow-hidden rounded-eg ring-offset-2 ring-offset-crema transition-shadow",
                  i === current ? "ring-2 ring-vino" : "hover:ring-2 hover:ring-linea",
                )}
              >
                <ImagePlaceholder
                  label=""
                  src={img.src}
                  alt=""
                  ratio="4 / 5"
                  blend
                  sizes="120px"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
