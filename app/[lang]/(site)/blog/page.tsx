import type { Metadata } from "next";
import { getLocale, getT } from "@/lib/i18n/server";
import { PostCard } from "@/components/cards/PostCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPosts } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.pages.blog.metaTitle, description: t.pages.blog.metaDescription, path: "/blog" });
}

/** Las entradas nuevas del panel aparecen sin volver a publicar la web. */
export const revalidate = 300;

export default async function BlogPage() {
  const [posts, t] = await Promise.all([getPosts(), getT()]);
  const b = t.pages.blog;
  return (
    <>
      <PageHeader
        eyebrow={b.eyebrow}
        title={b.title}
        intro={b.intro}
      />
      <div className="container-site pb-12 lg:pb-24">
        {b.spanishOnly ? <p className="mb-6 text-[14px] text-secundario">{b.spanishOnly}</p> : null}
        <h2 className="sr-only">{b.articles}</h2>
        <ul className="grid gap-7 md:grid-cols-3 md:gap-5">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
