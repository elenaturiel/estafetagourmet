import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ProductCard, tagClass } from "@/components/cards/ProductCard";
import { FreeShippingMeter } from "@/components/cart/FreeShippingMeter";
import { CheckCircleIcon, PinIcon, TruckIcon } from "@/components/ui/icons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { isPlaceholder, site } from "@/data/site";
import {
  getAllProducts,
  getCategory,
  getProducerMap,
  getProduct,
  getProducts,
  getProductsBySlugs,
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
  // "Combina con": maridajes definidos en los datos o, si no hay, otros de la categoría.
  const pairs = product.pairsWith?.length
    ? await getProductsBySlugs(product.pairsWith)
    : (await getProducts({ category: product.categorySlug })).filter((p) => p.slug !== product.slug);
  const href = productHref(product);
  const byline = productByline(product, producer);
  const cartItem = {
    id: product.slug,
    name: product.name,
    href,
    price: product.price,
    byline,
    imageLabel: product.image.placeholder,
  };

  return (
    <div className="container-site pt-8 pb-28 lg:pt-10 lg:pb-24">
      <JsonLd data={productJsonLd(product, href, producer)} />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Tienda", path: "/tienda" },
          { name: category.name, path: `/tienda/${category.slug}` },
          { name: product.name, path: href },
        ]}
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="relative lg:sticky lg:top-40 lg:self-start">
          <ImagePlaceholder
            label={product.image.placeholder}
            src={product.image.src}
            alt={product.image.alt}
            ratio="4 / 5"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="rounded-eg"
          />
          {product.tags?.length ? (
            <ul className="absolute top-4 left-4 flex flex-col items-start gap-1.5" aria-label="Etiquetas">
              {product.tags.map((tag) => (
                <li key={tag} className={tagClass(tag)}>
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="max-w-xl">
          {byline ? (
            <p className="text-[13px] font-semibold tracking-[0.1em] text-secundario uppercase">{byline}</p>
          ) : null}
          <h1 className="mt-2 text-[38px] leading-[1.03] tracking-[-0.02em] lg:text-[56px]">
            {product.name}
          </h1>
          <p className="mt-5 text-[28px] font-semibold tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-1 text-[13px] text-secundario">IVA incluido</p>
          <p className="mt-6 text-[17px] leading-[1.6] text-secundario">{product.description}</p>

          <div id="comprar" className="mt-8">
            <AddToCartButton
              variant="primary"
              size="md"
              item={cartItem}
            />
          </div>
          <div className="mt-5 rounded-eg border border-linea bg-papel p-4">
            <FreeShippingMeter subtotal={null} />
          </div>

          <ul className="mt-6 grid gap-3 text-[15px]">
            <li className="flex items-center gap-3">
              <TruckIcon className="shrink-0 text-vino" /> Envío a toda la península en {site.shipping.leadTime}
            </li>
            <li className="flex items-center gap-3">
              <PinIcon className="shrink-0 text-vino" /> Recogida en tienda: {site.address.street}, Pamplona
            </li>
            <li className="flex items-center gap-3">
              <CheckCircleIcon className="shrink-0 text-vino" /> Seleccionado y catado en nuestra tienda
            </li>
          </ul>

          <div className="mt-8 border-t border-linea">
            <details className="group border-b border-linea" open>
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between font-serif text-[20px] [&::-webkit-details-marker]:hidden">
                Detalles
                <span aria-hidden="true" className="text-vino transition-transform group-open:rotate-45">+</span>
              </summary>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 pb-5 text-[15px]">
                <dt className="text-secundario">Categoría</dt>
                <dd>{category.name}</dd>
                {producer ? (
                  <>
                    <dt className="text-secundario">Productor</dt>
                    <dd>{producer.name}</dd>
                    <dt className="text-secundario">Origen</dt>
                    <dd>{producer.locality}, Navarra</dd>
                  </>
                ) : null}
                <dt className="text-secundario">Formato</dt>
                <dd>[peso o volumen]</dd>
              </dl>
            </details>
            <details className="group border-b border-linea">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between font-serif text-[20px] [&::-webkit-details-marker]:hidden">
                Conservación y maridaje
                <span aria-hidden="true" className="text-vino transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-[15px] text-secundario">[Cómo conservarlo y con qué acompañarlo]</p>
            </details>
            <details className="group border-b border-linea">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between font-serif text-[20px] [&::-webkit-details-marker]:hidden">
                Envíos y devoluciones
                <span aria-hidden="true" className="text-vino transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-[15px] text-secundario">
                Envío a toda la península en {site.shipping.leadTime}. Envío gratis desde{" "}
                {site.shipping.freeShippingFrom} €. Consulta las{" "}
                <a href="/envios-y-devoluciones" className="text-vino underline underline-offset-2">
                  condiciones de envío y devolución
                </a>
                .
              </p>
            </details>
          </div>
        </div>
      </div>

      {pairs.length ? (
        <section aria-labelledby="combina-title" className="mt-20 border-t border-linea pt-14 lg:mt-28">
          <p className="eyebrow text-vino">Maridaje</p>
          <h2 id="combina-title" className="mt-3 text-[32px] leading-tight tracking-[-0.02em] lg:text-[44px]">
            Combina con
          </h2>
          <ul className="rail -mx-6 mt-8 auto-cols-[72%] gap-4 px-6 sm:auto-cols-[42%] lg:mx-0 lg:grid-flow-row lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
            {pairs.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} producer={p.producerSlug ? producers[p.producerSlug] : undefined} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Barra fija de compra en móvil */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-linea bg-crema/95 px-6 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-[16px] leading-tight">{product.name}</p>
          <p className="text-[15px] font-semibold">{formatPrice(product.price)}</p>
        </div>
        <div className="w-[150px] shrink-0">
          <AddToCartButton variant="primary" label="Añadir" item={cartItem} />
        </div>
      </div>
    </div>
  );
}
