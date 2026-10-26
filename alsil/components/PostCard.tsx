import Link from "next/link";
import { formatDate, getCategory, type Post } from "@/lib/blog";

export default function PostCard({ post, headingLevel = 2 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="card">
      <span className="tag">{getCategory(post.category)?.name}</span>
      <H style={{ fontSize: "1.2rem" }}>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </H>
      <p className="muted" style={{ margin: 0 }}>{post.description}</p>
      {post.date && <p className="muted mono" style={{ margin: "12px 0 0", fontSize: ".82rem" }}>{formatDate(post.date)}</p>}
    </article>
  );
}
