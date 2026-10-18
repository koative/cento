import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { posts, products, type Post } from "../content";
import { ProductCard } from "../components/ProductCard";
import { formatDate } from "./Journal";

export function Article({ post }: { post: Post }) {
  const next = posts[(posts.indexOf(post) + 1) % posts.length];
  const featured = (post.related ?? []).map((id) =>
    products.find((p) => p.id === id)!,
  );

  return (
    <article className="page article-page">
      <header className="article-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/journal">Journal</Link>
          <span aria-hidden="true">/</span>
          <span>{post.topic}</span>
        </nav>
        <h1>{post.title}</h1>
        <p className="lede">{post.dek}</p>
        <p className="post-meta">
          {post.author} ·{" "}
          <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
          {post.minutes} min read
        </p>
      </header>

      <img className="article-image" src={post.image} alt={post.alt} />

      <div className="article-body">
        {post.body.map((b, i) => {
          if (b.type === "h") return <h2 key={i}>{b.text}</h2>;
          if (b.type === "quote")
            return (
              <blockquote key={i}>
                <p>{b.text}</p>
                <footer>{b.by}</footer>
              </blockquote>
            );
          return <p key={i}>{b.text}</p>;
        })}
      </div>

      {featured.length > 0 && (
        <section className="section" aria-labelledby="featured-title">
          <h2 id="featured-title">In this story</h2>
          <div className="product-grid four">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <aside className="next-post" aria-label="Next entry">
        <Link to={`/journal/${next.slug}`}>
          <span className="fine">Next in the journal</span>
          <span className="next-title">
            {next.title} <ArrowRight size={20} aria-hidden="true" />
          </span>
        </Link>
      </aside>
    </article>
  );
}
