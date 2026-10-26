import Link from "next/link";
import { categoriesWithPosts } from "@/lib/blog";

export default function CategoryChips({ current }: { current?: string }) {
  return (
    <nav aria-label="Categorie del blog">
      <ul className="chips">
        <li><Link href="/blog" aria-current={!current ? "page" : undefined}>Tutti</Link></li>
        {categoriesWithPosts().map((c) => (
          <li key={c.slug}>
            <Link href={`/blog/categoria/${c.slug}`} aria-current={current === c.slug ? "page" : undefined}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
