import type { CSSProperties } from "react";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Link } from "../router";
import { games, posts, statusLabel, type Game } from "../content";
import { formatDate, money } from "../lib/util";
import { Scene } from "../components/Scene";
import { Gallery } from "../components/Gallery";
import { Cartridge } from "../components/Cartridge";
import { BlobHop } from "../components/BlobHop";
import { PairUp } from "../components/PairUp";
import { PostCard } from "../components/PostCard";

export function GamePage({ game }: { game: Game }) {
  const related = posts.filter((p) => p.game === game.slug).slice(0, 3);
  const others = games.filter((g) => g.slug !== game.slug).slice(0, 3);
  const price = game.price
    ? money(game.price)
    : game.status === "soon"
      ? "To be announced"
      : "Free";

  return (
    <div
      style={
        {
          "--game": game.palette.hero,
          "--game-dark": game.palette.heroDark,
        } as CSSProperties
      }
    >
      <section className="game-hero wrap">
        <div className="game-hero-copy">
          <p className="crumbs">
            <Link to="/games">Games</Link> / <span>{game.genre}</span>
          </p>
          <h1>{game.name}</h1>
          <p className="game-tagline">{game.tagline}</p>
          <p className="lede">{game.summary}</p>
          <div className="actions">
            {game.store.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={`btn ${i ? "btn-ghost" : "btn-primary"}`}
              >
                {s.label}
              </a>
            ))}
            {game.demo === "blob-hop" && (
              <Link to="/play" className="btn btn-ghost">
                <Gamepad2 aria-hidden="true" /> Play the demo
              </Link>
            )}
          </div>
        </div>
        <div className="game-hero-art screen">
          <Scene
            game={game}
            seed={game.shots[0].seed}
            label={`${game.name} key art`}
          />
          <span className="badge badge-on-art" data-status={game.status}>
            {game.status === "soon"
              ? `Coming ${game.when}`
              : statusLabel[game.status]}
          </span>
        </div>
      </section>

      <section className="wrap" aria-label="At a glance">
        <dl className="facts facts-strip">
          <div>
            <dt>Released</dt>
            <dd>
              {game.status === "soon" ? game.when : formatDate(game.date)}
            </dd>
          </div>
          <div>
            <dt>Platforms</dt>
            <dd>{game.platforms.join(", ")}</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd className="num">{price}</dd>
          </div>
          <div>
            <dt>Players</dt>
            <dd>{game.players}</dd>
          </div>
          <div>
            <dt>Playtime</dt>
            <dd>{game.playtime}</dd>
          </div>
        </dl>
      </section>

      {game.demo && (
        <section className="cabinet cabinet-tight" aria-labelledby="demo-title">
          {game.demo === "blob-hop" ? (
            <div className="wrap cabinet-grid">
              <div className="cabinet-copy">
                <h2 id="demo-title">Play the first region</h2>
                <p>
                  The real Thistle Meadow, physics and all. Tap to hop, hold to
                  float. Your best runs are saved on this device.
                </p>
                <Link to="/play" className="text-link text-link-light">
                  Controls and your top runs <ArrowRight aria-hidden="true" />
                </Link>
              </div>
              <BlobHop />
            </div>
          ) : (
            <div className="wrap">
              <h2 id="demo-title">Play it right here</h2>
              <PairUp />
            </div>
          )}
        </section>
      )}

      <section className="wrap game-about">
        <div className="prose">
          <h2>About the game</h2>
          {game.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div>
          <h2>What's inside</h2>
          <ul className="feature-list">
            {game.features.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap" aria-labelledby="shots-title">
        <h2 id="shots-title">Screenshots</h2>
        <Gallery game={game} />
      </section>

      <section className="wrap game-specs">
        <div>
          <h2>Specs</h2>
          <dl className="spec-table">
            {game.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>What people said</h2>
          {game.quotes.map((q) => (
            <blockquote key={q.text} className="quote">
              <p>{q.text}</p>
              <footer>{q.source}</footer>
            </blockquote>
          ))}
          <ul className="awards">
            {game.awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="wrap" aria-labelledby="related-posts">
          <div className="section-head">
            <h2 id="related-posts">Devlog posts about {game.name}</h2>
            <Link to="/devlog" className="text-link">
              All posts <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="post-row">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <section className="wrap" aria-labelledby="more-games">
        <div className="section-head">
          <h2 id="more-games">More from the shelf</h2>
          <Link to="/games" className="text-link">
            All games <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="shelf-row shelf-three">
          {others.map((g) => (
            <Cartridge key={g.slug} game={g} />
          ))}
        </div>
      </section>
    </div>
  );
}
