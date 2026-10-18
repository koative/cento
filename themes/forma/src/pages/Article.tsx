import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { posts, projectBySlug, type Post } from "../content";
import { longDate, readMinutes } from "../lib/format";

export function Article({ post }: { post: Post }) {
  const project = post.project ? projectBySlug(post.project) : undefined;
  const more = posts.filter((p) => p !== post).slice(0, 3);

  return (
    <article className="article">
      <header className="wrap article-head">
        <h1>{post.title}</h1>
        <p className="article-dek">{post.excerpt}</p>
        <p className="post-meta">
          {post.category} · By {post.author} ·{" "}
          <time dateTime={post.date}>{longDate(post.date)}</time> ·{" "}
          {readMinutes(post)} min read
        </p>
      </header>

      <figure className="wrap case-cover">
        <img
          src={post.image.src}
          alt={post.image.alt}
          width={post.image.w}
          height={post.image.h}
        />
      </figure>

      <div className="wrap prose article-body">
        {post.body.map((b, i) =>
          "p" in b ? (
            <p key={i}>{b.p}</p>
          ) : "h" in b ? (
            <h2 key={i}>{b.h}</h2>
          ) : (
            <blockquote key={i}>
              <p>{b.quote}</p>
              {b.by && <footer>{b.by}</footer>}
            </blockquote>
          ),
        )}
        {project && (
          <aside className="article-project">
            <img
              src={project.cover.src}
              alt=""
              width={project.cover.w}
              height={project.cover.h}
              loading="lazy"
            />
            <div>
              <p>
                This entry is about <strong>{project.name}</strong>,{" "}
                {project.place}, {project.year}.
              </p>
              <Link to={"/projects/" + project.slug} className="text-link">
                View the project <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        )}
      </div>

      <section className="wrap band">
        <div className="band-head">
          <h2>More from the journal</h2>
          <Link to="/journal" className="text-link">
            All entries <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="posts-row">
          {more.map((p) => (
            <Link key={p.slug} to={"/journal/" + p.slug} className="post-link">
              <span className="post-meta">
                {p.category} · {longDate(p.date)}
              </span>
              <span className="post-title">{p.title}</span>
              <span className="post-excerpt">{p.excerpt}</span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
