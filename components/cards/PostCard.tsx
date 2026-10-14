import { Link } from "@/components/ui/Link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getT } from "@/lib/i18n/server";
import type { Post } from "@/lib/types";

export async function PostCard({ post }: { post: Post }) {
  const t = (await getT()).home.card;
  const href = `/blog/${post.slug}`;
  return (
    <article className="group relative">
      <ImagePlaceholder
        label={post.image.placeholder}
        src={post.image.src}
        alt={post.image.src ? post.image.alt : undefined}
        ratio="16 / 10"
        sizes="(min-width: 1024px) 33vw, 100vw"
        parallax
      />
      <p className="eyebrow mt-4 text-[12px] text-vino lg:mt-5">{post.category}</p>
      <h3 className="mt-1.5 text-[19px] leading-snug lg:mt-2 lg:text-[22px]">{post.title}</h3>
      <Link
        href={href}
        className="mt-1 inline-flex min-h-[44px] items-center gap-1 text-[15px] font-semibold after:absolute after:inset-0 hover:text-vino lg:mt-2"
      >
        {t.read} <span aria-hidden="true">→</span>
        <span className="sr-only">: {post.title}</span>
      </Link>
    </article>
  );
}
