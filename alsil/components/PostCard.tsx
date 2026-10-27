import Link from "next/link";
import { formatDate, getCategory, type Post } from "@/lib/blog";

export default function PostCard({ post, headingLevel = 2 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="post">
      <span className="d">
        {post.date ? `${formatDate(post.date)} · ` : ""}
        {getCategory(post.category)?.name}
      </span>
      <H><Link href={`/blog/${post.slug}`}>{post.title}</Link></H>
      <p>{post.description}</p>
      <Link className="more" href={`/blog/${post.slug}`} aria-hidden="true" tabIndex={-1}>Leggi l&apos;articolo&nbsp;&rsaquo;</Link>
    </article>
  );
}
