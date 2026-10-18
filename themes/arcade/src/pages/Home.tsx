import { ArrowRight, Gamepad2 } from "lucide-react";
import { Link } from "../router";
import { games, home, posts, studio, team } from "../content";
import { money } from "../lib/util";
import { Scene } from "../components/Scene";
import { Cartridge } from "../components/Cartridge";
import { BlobHop } from "../components/BlobHop";
import { Avatar } from "../components/PixelArt";
import { JobList, PostCard } from "../components/PostCard";

export function Home() {
  const featured = games.find((g) => g.slug === home.featured)!;
  const next = games.find((g) => g.slug === home.next.slug)!;
  const nextPost = posts.find((p) => p.game === next.slug)!;
  const [lead, ...rest] = posts.slice(0, 3);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/play" className="btn btn-primary btn-lg">
              <Gamepad2 aria-hidden="true" /> Play Blob Hop free
            </Link>
            <Link to="/games" className="btn btn-ghost btn-lg">
              See all seven games
            </Link>
          </div>
        </div>
        <Link
          to={`/games/${featured.slug}`}
          className="hero-art"
          aria-label={`${featured.name}: ${featured.tagline}`}
        >
          <div className="screen">
            <Scene game={featured} seed={43} />
          </div>
          <p className="hero-caption">
            <strong>{featured.name}</strong>
            <span>
              Out now · {featured.platforms.join(", ")} ·{" "}
              <span className="num">{money(featured.price!)}</span>
            </span>
          </p>
          <span className="sticker" aria-hidden="true">
            v1.3
            <br />
            out now
          </span>
        </Link>
      </section>

      <section className="shelf wrap" aria-labelledby="shelf-title">
        <div className="section-head">
          <h2 id="shelf-title">{home.shelf.title}</h2>
          <p>{home.shelf.text}</p>
          <Link to="/games" className="text-link">
            Browse and filter <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="shelf-row">
          {games.map((g) => (
            <Cartridge key={g.slug} game={g} />
          ))}
        </div>
      </section>

      <section className="cabinet" aria-labelledby="play-title">
        <div className="wrap cabinet-grid">
          <div className="cabinet-copy">
            <h2 id="play-title">{home.play.title}</h2>
            <p>{home.play.text}</p>
            <Link to="/play" className="text-link text-link-light">
              Your top runs, and a second game <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <BlobHop />
        </div>
      </section>

      <section className="next wrap" aria-labelledby="next-title">
        <div className="next-art">
          <Scene
            game={next}
            seed={next.shots[0].seed}
            label={next.shots[0].caption}
            className="next-main"
          />
          <Scene
            game={next}
            seed={next.shots[1].seed}
            label={next.shots[1].caption}
          />
          <Scene
            game={next}
            seed={next.shots[2].seed}
            label={next.shots[2].caption}
          />
        </div>
        <div className="next-copy">
          <h2 id="next-title">{home.next.title}</h2>
          <p className="next-name">{next.name}</p>
          <p>{home.next.text}</p>
          <dl className="facts facts-inline">
            <div>
              <dt>Release</dt>
              <dd>{next.when}</dd>
            </div>
            <div>
              <dt>Platforms</dt>
              <dd>{next.platforms.join(", ")}</dd>
            </div>
            <div>
              <dt>Genre</dt>
              <dd>{next.genre}</dd>
            </div>
          </dl>
          <div className="actions">
            <a
              href={next.store[0].href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              {next.store[0].label}
            </a>
            <Link to={`/games/${next.slug}`} className="btn btn-ghost">
              About the game
            </Link>
          </div>
          <p className="small">
            From the devlog:{" "}
            <Link to={`/devlog/${nextPost.slug}`}>{nextPost.title}</Link>
          </p>
        </div>
      </section>

      <section className="pull wrap" aria-label="Press">
        <blockquote>
          <p>{home.quote.text}</p>
          <footer>{home.quote.source}</footer>
        </blockquote>
      </section>

      <section className="devlog-teaser wrap" aria-labelledby="devlog-title">
        <div className="section-head">
          <h2 id="devlog-title">From the devlog</h2>
          <p>
            Design notes, art breakdowns and the occasional spreadsheet, written
            by whoever did the work.
          </p>
          <Link to="/devlog" className="text-link">
            All posts <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="devlog-grid">
          <PostCard post={lead} big />
          <div className="devlog-stack">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="studio-teaser" aria-labelledby="studio-title">
        <div className="wrap studio-teaser-grid">
          <div>
            <h2 id="studio-title">{home.studio.title}</h2>
            <p>{home.studio.text}</p>
            <ul className="mini-principles">
              {studio.principles.slice(0, 3).map((p) => (
                <li key={p.title}>{p.title}</li>
              ))}
            </ul>
            <Link to="/studio" className="text-link">
              Meet the team <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="crew" aria-label="The team">
            {team.map((p) => (
              <li key={p.name}>
                <Avatar person={p} />
                <span>{p.name.split(" ")[0]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="jobs-teaser wrap" aria-labelledby="jobs-title">
        <div className="section-head">
          <h2 id="jobs-title">{home.jobs.title}</h2>
          <p>{home.jobs.text}</p>
          <Link to="/jobs" className="text-link">
            How we hire <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <JobList />
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-inner">
          <h2 id="close-title">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <Link to="/play" className="btn btn-sun btn-lg">
            <Gamepad2 aria-hidden="true" /> Play the demo
          </Link>
        </div>
      </section>
    </>
  );
}
