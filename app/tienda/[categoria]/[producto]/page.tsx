import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ArrowLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { isPlaceholder, site } from "@/data/site";
import {
  getAllProducts,
  getCategory,
  getProducerMap,
  getProduct,
  productByline,
  productHref,
} from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { productJsonLd } from "@/lib/structured-data";

type Params = { params: Promise<{ categoria: string; producto: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ categoria: p.categorySlug, producto: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categoria, producto } = await params;
  const [product, category] = await Promise.all([
    getProduct(categoria, producto),
    getCategory(categoria),
  ]);
  if (!product || !category) return {};
  const description = isPlaceholder(product.description)
    ? `${product.name} de pequeños productores navarros. Cómpralo online en ${site.name} con envío en 24–48 h o recógelo en la calle Estafeta de Pamplona.`
    : product.description;
  return pageMetadata({
    title: `${product.name} · ${category.name}`,
    description,
    path: productHref(product),
    image: product.image.src,
  });
}

export default async function ProductPage({ params }: Params) {
  const { categoria, producto } = await params;
  const [product, category, producers] = await Promise.all([
    getProduct(categoria, producto),
    getCategory(categoria),
    getProducerMap(),
  ]);
  if (!product || !category) notFound();

  const producer = product.producerSlug ? producers[product.producerSlug] : undefined;
  const href = productHref(product);
  const byline = productByline(product, producer);

  return (
    <div className="container-site pt-8 pb-16 lg:pt-10 lg:pb-24">
      <JsonLd data={productJsonLd(product, href, producer)} />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Tienda", path: "/tienda" },
          { name: category.name, path: `/tienda/${category.slug}` },
          { name: product.name, path: href },
        ]}
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ImagePlaceholder
          label={product.image.placeholder}
          src={product.image.src}
          alt={product.image.alt}
          ratio="1 / 1"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
        <div className="max-w-xl">
          <h1 className="text-[36px] leading-[1.05] tracking-[-0.02em] lg:text-[52px]">
            {product.name}
          </h1>
          {byline ? <p className="mt-3 text-[15px] text-secundario">{byline}</p> : null}
          <p className="mt-6 text-[24px] font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-6 text-[17px] leading-[1.6] text-secundario">{product.description}</p>
          <div className="mt-8 max-w-sm">
            <AddToCartButton
              variant="primary"
              size="md"
              item={{
                id: product.slug,
                name: product.name,
                href,
                price: product.price,
                byline,
                imageLabel: product.image.placeholder,
              }}
            />
          </div>
          <ul className="mt-8 space-y-1 border-t border-linea pt-6 text-[15px] text-secundario">
            <li>Envío a toda la península en {site.shipping.leadTime}.</li>
            <li>Recogida en tienda: {site.address.street}, Pamplona.</li>
          </ul>
          <ArrowLink href={`/tienda/${category.slug}`} className="mt-6">
            Ver toda la categoría {category.name}
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
