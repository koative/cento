import { useState, type KeyboardEvent } from "react";
import type { Game } from "../content";
import { Scene } from "./Scene";

/** Screenshot viewer: one large frame, thumbnails as a keyboard-operable tab list. */
export function Gallery({ game }: { game: Game }) {
  const [index, setIndex] = useState(0);
  const shot = game.shots[index];

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + game.shots.length) % game.shots.length;
    setIndex(next);
    (e.currentTarget.children[next] as HTMLElement).focus();
  };

  return (
    <div className="gallery">
      <figure
        className="gallery-main"
        id={`${game.slug}-shot`}
        role="tabpanel"
        aria-labelledby={`${game.slug}-tab-${index}`}
      >
        <div className="screen">
          <Scene
            game={game}
            seed={shot.seed}
            label={`${game.name} screenshot: ${shot.caption}`}
          />
        </div>
        <figcaption>
          <span className="num">
            {index + 1}/{game.shots.length}
          </span>
          {shot.caption}
        </figcaption>
      </figure>
      <div
        className="gallery-thumbs"
        role="tablist"
        aria-label={`${game.name} screenshots`}
        onKeyDown={onKey}
      >
        {game.shots.map((s, i) => (
          <button
            key={s.seed}
            id={`${game.slug}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls={`${game.slug}-shot`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
          >
            <Scene game={game} seed={s.seed} />
            <span className="sr-only">Screenshot {i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
