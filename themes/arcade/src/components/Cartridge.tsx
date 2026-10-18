import type { CSSProperties } from "react";
import { statusLabel, type Game } from "../content";
import { money } from "../lib/util";
import { Link } from "../router";
import { Scene } from "./Scene";

/** A game on the shelf: a cartridge whose label is the key art. */
export function Cartridge({
  game,
  headingLevel = 3,
}: {
  game: Game;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <article
      className="cart"
      style={
        {
          "--label": game.palette.hero,
          "--label-ink": game.palette.ink,
        } as CSSProperties
      }
    >
      <Link to={`/games/${game.slug}`} className="cart-link">
        <div className="cart-shell">
          <div className="cart-label">
            <Scene game={game} seed={game.shots[0].seed} />
          </div>
          <H className="cart-title">{game.name}</H>
        </div>
      </Link>
      <p className="cart-meta">
        <span className="badge" data-status={game.status}>
          {game.status === "soon" ? game.when : statusLabel[game.status]}
        </span>
        <span>{game.genre}</span>
      </p>
      <p className="cart-sub">
        {game.platforms.join(" · ")}
        <span className="num">
          {game.price
            ? money(game.price)
            : game.status === "soon"
              ? "Wishlist"
              : "Free"}
        </span>
      </p>
    </article>
  );
}
