import { SITE_URL, isPlaceholder, site } from "@/data/site";
import type { Product, Producer } from "@/lib/types";
import { absoluteUrl } from "@/lib/seo";

/** Datos estructurados de la tienda física (schema.org LocalBusiness). */
export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "@id": `${SITE_URL}/#tienda`,
    name: site.name,
    description: site.description,
    url: SITE_URL,
    telephone: site.phone.international,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: "Pamplona",
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    sameAs: [site.instagram.href],
  };
  if (!isPlaceholder(site.email)) data.email = site.email;
  // Solo se publica el horario cuando los días estén confirmados (data/site.ts).
  if (site.hours.structured.length) {
    data.openingHoursSpecification = site.hours.structured.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    }));
  }
  return data;
}

/** Datos estructurados de una ficha de producto (schema.org Product). */
export function productJsonLd(product: Product, path: string, producer?: Producer) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    url: absoluteUrl(path),
    category: product.categorySlug,
  };
  if (!isPlaceholder(product.description)) data.description = product.description;
  if (product.image.src) data.image = absoluteUrl(product.image.src);
  if (producer && !isPlaceholder(producer.name)) {
    data.brand = { "@type": "Brand", name: producer.name };
  }
  // La oferta solo se declara con precio real: Google rechaza ofertas sin precio.
  if (product.price !== null) {
    data.offers = {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(path),
      seller: { "@id": `${SITE_URL}/#tienda` },
    };
  }
  return data;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
