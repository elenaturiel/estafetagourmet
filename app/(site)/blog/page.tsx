import { PostCard } from "@/components/cards/PostCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPosts } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: maridajes, temporada y productores de Navarra",
  description:
    "Notas de temporada, maridajes de vinos y quesos navarros y el trabajo de nuestros productores, desde la tienda de la calle Estafeta de Pamplona.",
  path: "/blog",
});

/** Las entradas nuevas del panel aparecen sin volver a publicar la web. */
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="De la huerta a la despensa"
        intro="Notas de temporada, maridajes y el trabajo de nuestros productores."
      />
      <div className="container-site pb-16 lg:pb-24">
        <h2 className="sr-only">Artículos</h2>
        <ul className="grid gap-10 md:grid-cols-3 md:gap-5">
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
