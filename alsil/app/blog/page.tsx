import Breadcrumb from "@/components/Breadcrumb";
import CategoryChips from "@/components/CategoryChips";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: verniciatura a polvere e pretrattamento dell'alluminio",
  description: "Articoli tecnici di AL.SIL. su polveri, finiture, pretrattamento e protezione dalla corrosione dell'alluminio pressofuso.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="hero">
      <div className="wrap">
        <Breadcrumb items={[{ name: "Blog", path: "/blog" }]} />
        <h1>Blog</h1>
        <p className="lead">Note tecniche su polveri, finiture e pretrattamento.</p>
        <CategoryChips />
        <div className="grid-2">
          {posts.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
}
