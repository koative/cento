import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { games, posts, team, type Post } from "../content";
import { formatDate } from "../lib/util";
import { Scene } from "../components/Scene";
import { Avatar } from "../components/PixelArt";
import { Cartridge } from "../components/Cartridge";

export function PostPage({ post }: { post: Post }) {
  const game = games.find((g) => g.slug === post.game);
  const author = team.find((p) => p.name === post.author)!;
  const i = posts.indexOf(post);
  const newer = posts[i - 1];
  const older = posts[i + 1];

  return (
    <article className="page wrap post">
      <header className="post-head">
        <p className="crumbs">
          <Link to="/devlog">Devlog</Link> / <span>{post.tag}</span>
        </p>
        <h1>{post.title}</h1>
        <p className="lede">{post.excerpt}</p>
        <div className="byline">
          <Avatar person={author} />
          <p>
            <strong>{author.name}</strong>, {author.role.toLowerCase()}
            <br />
            <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
            {post.minutes} min read
            {game && (
              <>
                {" · "}
                <Link to={`/games/${game.slug}`}>{game.name}</Link>
              </>
            )}
          </p>
        </div>
      </header>

      <div className="prose post-body">
        {post.body.map((b, n) => {
          switch (b.kind) {
            case "p":
              return <p key={n}>{b.text}</p>;
            case "h":
              return <h2 key={n}>{b.text}</h2>;
            case "list":
              return (
                <ul key={n}>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            case "quote":
              return (
                <blockquote key={n} className="quote">
                  <p>{b.text}</p>
                  <footer>{b.by}</footer>
                </blockquote>
              );
            case "shot": {
              const g = games.find((x) => x.slug === b.game)!;
              return (
                <figure key={n} className="post-shot">
                  <div className="screen">
                    <Scene
                      game={g}
                      seed={b.seed}
                      label={`${g.name}: ${b.caption}`}
                    />
                  </div>
                  <figcaption>{b.caption}</figcaption>
                </figure>
              );
            }
          }
        })}
      </div>

      <aside className="post-aside" aria-label="About the author">
        <Avatar person={author} />
        <div>
          <h2>{author.name}</h2>
          <p>{author.bio}</p>
          <Link to="/studio" className="text-link">
            Meet the rest of the team <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <nav className="post-nav" aria-label="More posts">
        {older ? (
          <Link to={`/devlog/${older.slug}`} className="post-nav-link">
            <span>
              <ArrowLeft aria-hidden="true" /> Older
            </span>
            {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link
            to={`/devlog/${newer.slug}`}
            className="post-nav-link post-nav-next"
          >
            <span>
              Newer <ArrowRight aria-hidden="true" />
            </span>
            {newer.title}
          </Link>
        )}
      </nav>

      {game && (
        <section className="post-game" aria-labelledby="post-game-title">
          <h2 id="post-game-title">The game in this post</h2>
          <div className="shelf-row shelf-one">
            <Cartridge game={game} />
          </div>
        </section>
      )}
    </article>
  );
}
