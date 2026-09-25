import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  const href = `/blog#${post.slug}`;
  return (
    <article id={post.slug} className="group relative">
      <ImagePlaceholder
        label={post.image.placeholder}
        src={post.image.src}
        alt={post.image.src ? post.image.alt : undefined}
        ratio="16 / 10"
        sizes="(min-width: 1024px) 33vw, 100vw"
        parallax
      />
      <p className="eyebrow mt-5 text-[12px] text-vino">{post.category}</p>
      <h3 className="mt-2 text-[20px] leading-snug lg:text-[22px]">{post.title}</h3>
      <Link
        href={href}
        className="mt-2 inline-flex min-h-[44px] items-center gap-1 text-[15px] font-semibold after:absolute after:inset-0 hover:text-vino"
      >
        Leer <span aria-hidden="true">→</span>
        <span className="sr-only">: {post.title}</span>
      </Link>
    </article>
  );
}
