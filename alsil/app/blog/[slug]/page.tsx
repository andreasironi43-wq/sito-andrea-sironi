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
        <header className="hero" style={{ paddingBottom: 24 }}>
          <div className="wrap">
            <Breadcrumb items={[{ name: "Blog", path: "/blog" }, { name: cat?.name || "", path: `/blog/categoria/${post.category}` }, { name: post.title, path: `/blog/${post.slug}` }]} />
            {cat && <Link href={`/blog/categoria/${cat.slug}`} className="tag" style={{ textDecoration: "none" }}>{cat.name}</Link>}
            <h1 style={{ maxWidth: "24ch", fontSize: "clamp(1.9rem, 4.6vw, 3rem)" }}>{post.title}</h1>
            <p className="lead">{post.description}</p>
            {post.date && <p className="muted mono" style={{ fontSize: ".85rem" }}><time dateTime={post.date}>{formatDate(post.date)}</time></p>}
          </div>
        </header>
        <div className="section" style={{ paddingTop: 8 }}>
          <div className="wrap article-layout">
            <nav className="toc" aria-labelledby="toc-title">
              <h2 id="toc-title">Indice</h2>
              <ol>
                {toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
              </ol>
            </nav>
            <div className="prose">{post.body.map(renderBlock)}</div>
          </div>
        </div>
      </article>

      <section className="section section-alt" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title">{related.length ? "Articoli correlati" : "Approfondisci"}</h2>
          {related.length ? (
            <div className="grid-3">{related.map((p) => <PostCard key={p.slug} post={p} headingLevel={3} />)}</div>
          ) : (
            <div className="grid-2">
              <Link href="/ciclo" className="card card-link"><h3>Il ciclo in 19 fasi</h3><p className="muted" style={{ margin: 0 }}>Pretrattamento, applicazione, cottura e controlli.</p></Link>
              <Link href="/per-ambiente" className="card card-link"><h3>Cicli per ambiente</h3><p className="muted" style={{ margin: 0 }}>Marino, terreno e cemento, cloro, ambienti poco aggressivi.</p></Link>
            </div>
          )}
        </div>
      </section>

      <CtaBand title="Devi scegliere polvere e colore per un pezzo?" text="Indicaci la destinazione d'uso: il tipo di polvere lo scelgono i nostri tecnici." />

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
