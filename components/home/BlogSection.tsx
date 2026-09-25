import { PostCard } from "@/components/cards/PostCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getPosts } from "@/lib/catalog";

export async function BlogSection() {
  const posts = await getPosts(3);
  return (
    <Section tone="papel" aria-labelledby="blog-title">
      <SectionHeader
        id="blog-title"
        eyebrow="Blog"
        title="De la huerta a la despensa"
        subtitle="Notas de temporada, maridajes y el trabajo de nuestros productores."
        action={<ArrowLink href="/blog">Ver todo el blog</ArrowLink>}
      />
      <ul className="grid gap-10 md:grid-cols-3 md:gap-5">
        {posts.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
