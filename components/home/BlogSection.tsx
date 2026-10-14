import { PostCard } from "@/components/cards/PostCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getPosts } from "@/lib/catalog";
import { getT } from "@/lib/i18n/server";

export async function BlogSection() {
  const [posts, t] = await Promise.all([getPosts(3), getT()]);
  return (
    <Section tone="crema" aria-labelledby="blog-title">
      <SectionHeader
        id="blog-title"
        eyebrow={t.home.blog.eyebrow}
        title={t.home.blog.title}
        subtitle={t.home.blog.subtitle}
        action={<ArrowLink href="/blog">{t.home.blog.link}</ArrowLink>}
      />
      <ul data-reveal-stagger className="grid gap-7 md:grid-cols-3 md:gap-5">
        {posts.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
