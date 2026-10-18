import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { posts, products, type Post } from "../content";
import { PostCard } from "./Journal";
import { ProductCard } from "../components/ProductCard";

export function PostPage({ post }: { post: Post }) {
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const shelf = products.filter((p) => p.stock !== "made").slice(0, 3);
  return (
    <article className="page article">
      <header className="article-head">
        <Link to="/journal" className="text-link back">
          <ArrowLeft size={16} aria-hidden="true" /> Journal
        </Link>
        <h1>{post.title}</h1>
        <p className="lead">{post.excerpt}</p>
        <p className="post-meta">
          <time dateTime={post.date}>{post.dateLabel}</time> · {post.author} ·{" "}
          {post.minutes} min read
        </p>
      </header>
      <img
        className="article-photo"
        src={post.photo.src}
        alt={post.photo.alt}
        width={post.photo.w}
        height={post.photo.h}
      />
      <div className="prose">
        {post.body.map((b, i) =>
          b.type === "h2" ? (
            <h2 key={i}>{b.text}</h2>
          ) : b.type === "quote" ? (
            <blockquote key={i}>
              <p>{b.text}</p>
            </blockquote>
          ) : (
            <p key={i}>{b.text}</p>
          ),
        )}
      </div>
      <section className="section" aria-labelledby="shelf-title">
        <h2 id="shelf-title">On the shelf now</h2>
        <div className="object-grid object-grid-3">
          {shelf.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="section" aria-labelledby="more-title">
        <h2 id="more-title">More from the journal</h2>
        <div className="post-grid post-grid-2">
          {more.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </article>
  );
}
