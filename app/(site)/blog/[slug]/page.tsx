import type { Metadata } from "next";
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
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

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
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image.src,
    type: "article",
  });
}

const dateFormat = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

/** Cómo se pinta el texto escrito en el panel. */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-12 text-[28px] leading-tight lg:text-[34px]">{children}</h2>,
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
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const path = `/blog/${post.slug}`;

  return (
    <article className="pb-16 lg:pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          ...(post.date ? { datePublished: post.date } : {}),
          ...(post.image.src ? { image: post.image.src } : {}),
          url: absoluteUrl(path),
          publisher: { "@id": `${SITE_URL}/#tienda`, name: site.name },
        }}
      />
      <header className="container-site pt-8 lg:pt-10">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]}
        />
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="eyebrow text-vino">{post.category}</p>
          <h1 className="mt-4 text-[38px] leading-[1.04] tracking-[-0.02em] lg:text-[60px]">{post.title}</h1>
          {post.date ? (
            <p className="mt-4 text-[14px] text-secundario">
              <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
            </p>
          ) : null}
        </div>
        <div className="mx-auto mt-10 max-w-5xl">
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
      </header>

      <div className="container-site">
        <div className="mx-auto mt-12 max-w-[680px] text-[18px] leading-[1.7] text-tinta">
          <p className="font-serif text-[22px] leading-snug text-secundario">{post.excerpt}</p>
          {post.body?.length ? (
            <PortableText value={post.body} components={components} />
          ) : (
            <p className="mt-5 text-secundario">[Texto del artículo]</p>
          )}
          <ArrowLink href="/blog" className="mt-10">
            Volver al blog
          </ArrowLink>
        </div>

        {more.length ? (
          <section aria-labelledby="mas-entradas" className="mt-20 border-t border-linea pt-14">
            <h2 id="mas-entradas" className="text-[30px] leading-tight tracking-[-0.02em] lg:text-[40px]">
              Sigue leyendo
            </h2>
            <ul className="mt-8 grid gap-10 md:grid-cols-3 md:gap-5">
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
