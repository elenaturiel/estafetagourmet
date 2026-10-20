import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostEditor } from "@/components/admin/PostEditor";
import { isAdmin } from "@/lib/admin-auth";
import { portableToMarkdown } from "@/lib/admin-markdown";
import { getPost } from "@/lib/admin-posts";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Entrada · Panel", robots: { index: false, follow: false } };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect("/admin");
  const { id } = await params;
  const post = id === "nueva" ? null : await getPost(id);
  if (id !== "nueva" && !post) notFound();
  return (
    <AdminShell logout wide>
      <PostEditor
        post={
          post
            ? {
                id: post.id,
                title: post.title,
                slug: post.slug,
                category: post.category,
                excerpt: post.excerpt,
                coverAssetId: post.coverAssetId,
                coverUrl: post.coverUrl,
                coverAlt: post.coverAlt,
                publishedAt: post.publishedAt,
                sentAt: post.sentAt,
                body: portableToMarkdown(post.body),
              }
            : null
        }
      />
    </AdminShell>
  );
}
