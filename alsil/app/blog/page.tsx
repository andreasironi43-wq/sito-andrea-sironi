import Breadcrumb from "@/components/Breadcrumb";
import CategoryChips from "@/components/CategoryChips";
import CtaBand from "@/components/CtaBand";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: verniciatura a polvere e pretrattamento dell'alluminio",
  description: "Appunti tecnici di AL.SIL. su polveri, finiture, pretrattamento e protezione dalla corrosione dell'alluminio pressofuso.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <section className="page-head" style={{ paddingBottom: 72 }}>
        <div className="wrap">
          <Breadcrumb items={[{ name: "Blog", path: "/blog" }]} />
          <p className="eyebrow">Blog</p>
          <h1>Come si tratta l&apos;alluminio,<br /><em>spiegato.</em></h1>
          <p className="lead mt" style={{ maxWidth: "58ch" }}>Appunti tecnici su polveri, finiture e pretrattamento, per chi progetta componenti in pressofuso.</p>
          <CategoryChips />
          <div className="posts">
            {posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
      <CtaBand title="Un caso specifico?" sub="Valutiamolo insieme." text="Gli articoli spiegano il principio. Sul vostro pezzo si ragiona meglio con il disegno davanti." />
    </>
  );
}
