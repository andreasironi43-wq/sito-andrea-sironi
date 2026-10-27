import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import { formatDate, getCategory, getPost, posts, relatedPosts, type Block } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { company, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}`, type: "article" });
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2": return <h2 key={i} id={b.id}>{b.text}</h2>;
    case "h3": return <h3 key={i}>{b.text}</h3>;
    case "p": return <p key={i}>{b.text}</p>;
    case "ul": return <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
  }
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const cat = getCategory(post.category);
  const toc = post.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const related = relatedPosts(post);
  const url = `${siteUrl()}/blog/${post.slug}`;

  return (
    <>
      <article>
        <header className="page-head">
          <div className="narrow">
            <Breadcrumb items={[{ name: "Blog", path: "/blog" }, { name: cat?.name || "", path: `/blog/categoria/${post.category}` }, { name: post.title, path: `/blog/${post.slug}` }]} />
            <p className="eyebrow">
              {post.date && <><time dateTime={post.date}>{formatDate(post.date)}</time> · </>}
              {cat && <Link href={`/blog/categoria/${cat.slug}`} style={{ color: "inherit" }}>{cat.name}</Link>}
            </p>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 56px)" }}>{post.title}</h1>
            <p className="lead mt">{post.description}</p>
          </div>
        </header>
        <section style={{ paddingTop: 32 }}>
          <div className="wrap article-layout">
            <nav className="toc" aria-labelledby="toc-title">
              <h2 id="toc-title">Indice</h2>
              <ol>
                {toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
              </ol>
            </nav>
            <div className="prose">
              {post.body.map(renderBlock)}
              <div className="links"><Link href="/blog">&lsaquo;&nbsp;Tutti gli articoli</Link></div>
            </div>
          </div>
        </section>
      </article>

      <section className="band" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title">{related.length ? "Articoli correlati" : "Approfondisci"}</h2>
          {related.length ? (
            <div className="posts">{related.map((p) => <PostCard key={p.slug} post={p} headingLevel={3} />)}</div>
          ) : (
            <div className="tiles">
              <Link href="/ciclo" className="tile"><div className="txt"><h3>Il ciclo in 19 fasi</h3><p>Pretrattamento, applicazione, cottura e controlli.</p></div></Link>
              <Link href="/per-ambiente" className="tile"><div className="txt"><h3>Cicli per ambiente</h3><p>Marino, terreno e cemento, cloro, ambienti poco aggressivi.</p></div></Link>
            </div>
          )}
        </div>
      </section>

      <CtaBand title="Polvere e colore da scegliere?" sub="Indicateci dove andrà il pezzo." text="Il tipo di polvere lo scelgono i nostri tecnici in base alla destinazione d'uso." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          ...(post.date ? { datePublished: post.date } : {}),
          inLanguage: "it-IT",
          mainEntityOfPage: url,
          url,
          image: `${url}/opengraph-image`,
          author: { "@type": "Organization", name: company.name, "@id": `${siteUrl()}/#organization` },
          publisher: { "@type": "Organization", name: company.name, "@id": `${siteUrl()}/#organization` },
        }}
      />
    </>
  );
}
