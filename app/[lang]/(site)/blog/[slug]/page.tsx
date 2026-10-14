import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { PostCard } from "@/components/cards/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ArrowLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SITE_URL, site } from "@/data/site";
import { getPost, getPosts } from "@/lib/catalog";
import { sanityImageUrl } from "@/lib/sanity/client";
import { formatDate } from "@/lib/format";
import { getLocale, getT } from "@/lib/i18n/server";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { localePath } from "@/lib/i18n/config";

type Params = { params: Promise<{ slug: string }> };

/** Letra de rótulo para los títulos con `titleStyle: "rotulo"`. */
const cinzel = Cinzel({ subsets: ["latin"], weight: ["500"], display: "swap" });

/** Las entradas nuevas del panel aparecen sin volver a publicar la web. */
export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    locale: await getLocale(),
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image.src,
    type: "article",
  });
}

/** Cómo se pinta el texto escrito en el panel. */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-[24px] leading-tight lg:mt-12 lg:text-[34px]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-[22px] leading-tight">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-vino pl-6 font-serif text-[24px] leading-snug text-vino italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mt-5">{children}</p>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} className="text-vino underline underline-offset-2" rel="noopener">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  types: {
    image: ({ value }) => {
      const src = sanityImageUrl(value, 1400);
      if (!src) return null;
      return (
        <figure className="my-10">
          <div className="relative aspect-[3/2] overflow-hidden rounded-eg">
            <Image src={src} alt={value.alt ?? ""} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
          </div>
          {value.caption ? (
            <figcaption className="mt-2 text-[13px] text-secundario">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const [post, all, t, locale] = await Promise.all([getPost(slug), getPosts(), getT(), getLocale()]);
  if (!post) notFound();
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const path = `/blog/${post.slug}`;
  const b = t.pages.blog;

  return (
    <article className="pb-12 lg:pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          ...(post.date ? { datePublished: post.date } : {}),
          ...(post.image.src ? { image: post.image.src } : {}),
          url: absoluteUrl(localePath(locale, path)),
          publisher: { "@id": `${SITE_URL}/#tienda`, name: site.name },
        }}
      />
      <header className="container-site pt-5 lg:pt-10">
        <Breadcrumbs
          items={[
            { name: t.shop.breadcrumb.home, path: "/" },
            { name: t.common.nav.blog, path: "/blog" },
            { name: post.title, path },
          ]}
        />
        <div className="mx-auto mt-6 max-w-3xl text-center lg:mt-10">
          <p className="eyebrow text-vino">{post.category}</p>
          <h1
            className={
              post.titleStyle === "rotulo"
                ? `${cinzel.className} mt-3 text-[30px] leading-[1.08] tracking-[0.1em] uppercase sm:text-[40px] lg:mt-4 lg:text-[64px] lg:leading-[1.05] lg:tracking-[0.12em]`
                : "mt-3 text-[30px] leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:mt-4 lg:text-[60px] lg:leading-[1.04]"
            }
          >
            {post.title}
          </h1>
          {post.date ? (
            <p className="mt-4 text-[14px] text-secundario">
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            </p>
          ) : null}
        </div>
        {post.cover ? (
          <div className="mx-auto mt-6 max-w-[360px] lg:mt-10">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              sizes="360px"
              priority
              className="h-auto w-full rounded-eg"
            />
          </div>
        ) : (
          <div className="mx-auto mt-6 max-w-5xl lg:mt-10">
            <ImagePlaceholder
              label={post.image.placeholder}
              src={post.image.src}
              alt={post.image.alt}
              ratio="16 / 9"
              sizes="(min-width: 1024px) 1024px, 100vw"
              priority
              className="rounded-eg"
            />
          </div>
        )}
      </header>

      <div className="container-site">
        <div className="mx-auto mt-8 max-w-[680px] text-[17px] leading-[1.7] text-tinta lg:mt-12 lg:text-[18px]">
          {b.spanishOnly ? <p className="mb-4 text-[13px] text-secundario">{b.spanishOnly}</p> : null}
          {post.body?.length ? (
            <PortableText value={post.body} components={components} />
          ) : (
            <p className="mt-5">{post.excerpt}</p>
          )}
          <ArrowLink href="/blog" className="mt-10">
            {b.back}
          </ArrowLink>
        </div>

        {more.length ? (
          <section aria-labelledby="mas-entradas" className="mt-14 border-t border-linea pt-10 lg:mt-20 lg:pt-14">
            <h2 id="mas-entradas" className="text-[26px] leading-tight tracking-[-0.02em] lg:text-[40px]">
              {b.more}
            </h2>
            <ul className="mt-6 grid gap-7 md:grid-cols-3 md:gap-5 lg:mt-8">
              {more.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
