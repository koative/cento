import { Link } from "../router";
import { posts, team, type Post } from "../content";
import { Img, PostCard } from "../components/Cards";
import { longDate } from "../lib/plan";

export function Article({ post }: { post: Post }) {
  const author = team.find((t) => t.name === post.author);
  const related = [
    ...posts.filter(
      (p) => p.slug !== post.slug && p.category === post.category,
    ),
    ...posts.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  return (
    <div className="page article-page">
      <article>
        <header className="article-head">
          <p className="crumbs">
            <Link to="/journal">Journal</Link> / {post.category}
          </p>
          <h1>{post.title}</h1>
          <p className="meta">
            {post.author} · {longDate(post.date)} · {post.minutes} min read
          </p>
        </header>
        <figure className="article-cover frame">
          <Img photo={post.image} lazy={false} />
        </figure>
        <div className="prose article-body">
          {post.body.map((s, i) => (
            <section key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </section>
          ))}
          {author && (
            <aside className="byline">
              <p>
                <strong>{author.name}</strong>, {author.role.toLowerCase()}.{" "}
                {author.bio}
              </p>
            </aside>
          )}
          <p>
            <Link to="/planner" className="text-link">
              Count back from your own date in the planner
            </Link>
          </p>
        </div>
      </article>

      <section className="related" aria-labelledby="rel-title">
        <h2 id="rel-title">Keep reading</h2>
        <div className="post-grid">
          {related.map((p) => (
            <PostCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
