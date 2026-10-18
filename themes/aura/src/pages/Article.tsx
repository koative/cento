import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { posts, products, type Post } from "../content";
import { ProductCard } from "../components/ProductCard";
import { PostCard, formatDate } from "./Journal";

export function Article({ post }: { post: Post }) {
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="page article-page">
      <header className="article-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/journal">Journal</Link>
          <span aria-hidden="true">/</span>
          <span>{post.category}</span>
        </nav>
        <h1>{post.title}</h1>
        <p className="lede">{post.dek}</p>
        <p className="post-meta">
          {post.author} ·{" "}
          <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
          {post.minutes} min read
        </p>
      </header>
      <figure className="article-figure">
        <img src={post.image} alt={post.alt} width={1400} height={1050} />
      </figure>
      <div className="prose">
        {post.sections.map((s, i) => (
          <section key={i}>
            {s.heading && <h2>{s.heading}</h2>}
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            {s.list && (
              <ol>
                {s.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ol>
            )}
          </section>
        ))}
        <p className="article-end">
          <Link to="/ritual" className="text-link">
            Build a ritual around this{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Mentioned in this story</h2>
        </div>
        <div className="product-grid three">
          {post.products.map((id) => (
            <ProductCard
              key={id}
              product={products.find((p) => p.id === id)!}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Keep reading</h2>
          <Link to="/journal" className="text-link">
            All stories <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="post-grid two">
          {others.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </article>
  );
}
