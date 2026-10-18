import { Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import { Link } from "../router";
import { mmss } from "../lib/format";
import {
  close,
  current,
  PREVIEW,
  seek,
  skip,
  toggle,
  usePlayer,
} from "../lib/player";
import { Cover } from "./Cover";

/** The player bar that keeps a preview going while you browse tour dates and merch. */
export function Dock() {
  const player = usePlayer();
  const now = current(player);
  if (!now) return null;
  const { release, track } = now;

  return (
    <>
      <div className="dock-space" aria-hidden="true" />
      <section className="dock" aria-label="Now playing">
        <div
          className="dock-progress"
          style={{ width: `${(player.pos / PREVIEW) * 100}%` }}
          aria-hidden="true"
        />
        <Link
          to={`/music/${release.slug}`}
          className="dock-cover"
          aria-label={`Open ${release.title}`}
        >
          <Cover release={release} />
        </Link>
        <p className="dock-title">
          <strong>{track.title}</strong>
          <span>{release.title}</span>
        </p>
        <div className="dock-controls">
          <button
            type="button"
            onClick={() => skip(-1)}
            aria-label="Previous track"
          >
            <SkipBack aria-hidden="true" />
          </button>
          <button
            type="button"
            className="dock-play"
            onClick={toggle}
            aria-label={player.playing ? "Pause" : "Play"}
          >
            {player.playing ? (
              <Pause aria-hidden="true" />
            ) : (
              <Play aria-hidden="true" />
            )}
          </button>
          <button type="button" onClick={() => skip(1)} aria-label="Next track">
            <SkipForward aria-hidden="true" />
          </button>
        </div>
        <label className="dock-seek">
          <span className="sr-only">Seek in {track.title}</span>
          <span className="dock-time">{mmss(player.pos)}</span>
          <input
            type="range"
            min={0}
            max={PREVIEW}
            step={1}
            value={Math.floor(player.pos)}
            onChange={(e) => seek(Number(e.target.value))}
          />
          <span className="dock-time">{mmss(PREVIEW)}</span>
        </label>
        <button
          type="button"
          className="dock-close"
          onClick={close}
          aria-label="Close player"
        >
          <X aria-hidden="true" />
        </button>
      </section>
    </>
  );
}
