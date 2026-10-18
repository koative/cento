import { Link } from "../router";
import { posts, type Post } from "../content";

export function PostCard({
  post,
  lead = false,
}: {
  post: Post;
  lead?: boolean;
}) {
  return (
    <article className="post-card" data-lead={lead || undefined}>
      <Link to={`/journal/${post.slug}`}>
        <img
          src={post.photo.src}
          alt={post.photo.alt}
          width={post.photo.w}
          height={post.photo.h}
          loading="lazy"
        />
        <p className="post-meta">
          <time dateTime={post.date}>{post.dateLabel}</time> · {post.author}
        </p>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </Link>
    </article>
  );
}

export function Journal() {
  const [first, ...rest] = posts;
  return (
    <div className="page">
      <header className="page-head">
        <h1>Journal</h1>
        <p className="lead">
          Notes from the studio: what is in the kiln, how things are made, and
          how to look after them.
        </p>
      </header>
      <div className="journal-list">
        <PostCard post={first} lead />
        {rest.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
