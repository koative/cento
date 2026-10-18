import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { posts, type Post } from "../content";
import { PostCard, postDate } from "./Journal";

export function Article({ post }: { post: Post }) {
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <>
      <article className="article">
        <header className="article-head">
          <Link to="/journal" className="text-link">
            <ArrowLeft size={16} aria-hidden="true" /> Journal
          </Link>
          <h1>{post.title}</h1>
          <p className="post-meta">
            {post.category} ·{" "}
            <time dateTime={post.date}>{postDate(post.date)}</time> ·{" "}
            {post.readTime} read
          </p>
          <p className="lead">{post.excerpt}</p>
        </header>
        <img
          className="article-img"
          src={post.image.src}
          alt={post.image.alt}
          width={post.image.w}
          height={post.image.h}
        />
        <div className="prose">
          {post.body.map((b, i) => {
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "quote")
              return (
                <blockquote key={i}>
                  <p>{b.text}</p>
                </blockquote>
              );
            if (b.type === "list")
              return (
                <ul key={i}>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{b.text}</p>;
          })}
          <p className="sign-off">— The Bloom studio</p>
        </div>
      </article>
      <section className="section" aria-labelledby="more">
        <h2 id="more">More from the bench</h2>
        <div className="post-grid post-grid-2">
          {more.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
