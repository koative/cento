import { RotateCw, X } from "lucide-react";
import { shows } from "../content";
import { Link } from "../router";
import { clock } from "../lib/format";
import { chapterAt, episodeById, player, usePlayer } from "../lib/player";
import { Cover } from "./Cover";
import { PlayButton } from "./Controls";

/** The mini player that follows the listener across pages once an episode is loaded. */
export function Dock() {
  const { id, rate, progress } = usePlayer();
  const ep = episodeById(id);
  if (!ep) return null;
  const show = shows.find((s) => s.slug === ep.show)!;
  const pos = progress[ep.id] ?? 0;
  const chapter = ep.chapters[chapterAt(ep, pos)];

  return (
    <>
      <div className="dock-spacer" />
      <section className="dock" aria-label="Now playing">
        <span
          className="dock-progress"
          aria-hidden="true"
          style={{ transform: `scaleX(${pos / ep.duration})` }}
        />
        <Link
          to={`/episodes/${ep.id}`}
          className="dock-cover"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Cover show={show} />
        </Link>
        <div className="dock-text">
          <Link to={`/episodes/${ep.id}`} className="dock-title">
            {ep.title}
          </Link>
          <p className="dock-sub">
            <span>{show.title}</span>
            <span className="dock-chapter">{chapter.title}</span>
          </p>
        </div>
        <p className="dock-time">
          {clock(pos)} <span aria-hidden="true">/</span> {clock(ep.duration)}
        </p>
        <div className="dock-controls">
          <PlayButton ep={ep} />
          <button
            type="button"
            className="icon-btn dock-skip"
            aria-label="Forward 30 seconds"
            onClick={() => player.skip(ep.id, 30)}
          >
            <RotateCw aria-hidden="true" />
            <span className="icon-num">30</span>
          </button>
          <button
            type="button"
            className="rate-btn dock-rate"
            aria-label={`Playback speed ${rate} times. Change speed`}
            onClick={player.cycleRate}
          >
            {rate}×
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close player"
            onClick={player.close}
          >
            <X aria-hidden="true" />
          </button>
        </div>
      </section>
    </>
  );
}
