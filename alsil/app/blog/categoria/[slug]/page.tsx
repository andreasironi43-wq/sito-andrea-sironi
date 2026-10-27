import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryChips from "@/components/CategoryChips";
import PostCard from "@/components/PostCard";
import { categoriesWithPosts, getCategory, postsIn } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return categoriesWithPosts().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const cat = getCategory((await params).slug);
  if (!cat) return {};
  return pageMetadata({ title: `${cat.name} – Blog`, description: cat.description, path: `/blog/categoria/${cat.slug}` });
}

export default async function CategoryPage({ params }: Props) {
  const cat = getCategory((await params).slug);
  if (!cat) notFound();
  return (
    <section className="page-head" style={{ paddingBottom: 110 }}>
      <div className="wrap">
        <Breadcrumb items={[{ name: "Blog", path: "/blog" }, { name: cat.name, path: `/blog/categoria/${cat.slug}` }]} />
        <p className="eyebrow">Categoria</p>
        <h1>{cat.name}</h1>
        <p className="lead mt">{cat.description}</p>
        <CategoryChips current={cat.slug} />
        <div className="posts">
          {postsIn(cat.slug).map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
}
