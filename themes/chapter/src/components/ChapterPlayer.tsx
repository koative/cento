import { RotateCcw, RotateCw } from "lucide-react";
import type { Episode } from "../content";
import { clock, spoken } from "../lib/format";
import { chapterAt, player, usePlayer } from "../lib/player";
import { PlayButton, QueueButton } from "./Controls";

const BARS = 140;

/** Speech-like bar heights, stable per episode, dipping at each chapter break. */
function waveform(ep: Episode) {
  const seed = [...ep.id].reduce(
    (n, c) => (n * 31 + c.charCodeAt(0)) % 9973,
    7,
  );
  const breaks = ep.chapters
    .slice(1)
    .map((c) => Math.round((c.start / ep.duration) * BARS));
  return Array.from({ length: BARS }, (_, i) => {
    const near = Math.min(...breaks.map((b) => Math.abs(b - i)), 9);
    const v =
      Math.abs(Math.sin(i * 0.43 + seed) * Math.cos(i * 0.13 + seed * 0.7)) *
        0.7 +
      ((i * seed) % 7) / 23;
    return Math.max(0.08, Math.min(1, v) * Math.min(1, near / 3 + 0.15));
  });
}

export function ChapterPlayer({ ep }: { ep: Episode }) {
  const { id, rate, progress } = usePlayer();
  const pos = progress[ep.id] ?? 0;
  const current = chapterAt(ep, pos);
  const loaded = id === ep.id;
  const bars = waveform(ep);
  const done = pos / ep.duration;

  return (
    <section className="cplayer" aria-label={`Player: ${ep.title}`}>
      <div className="cplayer-wave">
        <svg
          viewBox={`0 0 ${BARS * 4} 100`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {bars.map((h, i) => (
            <rect
              key={i}
              x={i * 4 + 0.6}
              y={50 - h * 46}
              width="2.6"
              height={h * 92}
              rx="1.3"
              className={i / BARS < done ? "bar played" : "bar"}
            />
          ))}
        </svg>
        <ol className="cplayer-marks" aria-hidden="true">
          {ep.chapters.map((c, i) => (
            <li
              key={c.start}
              style={{ left: `${(c.start / ep.duration) * 100}%` }}
              data-current={i === current ? "" : undefined}
            >
              {i + 1}
            </li>
          ))}
        </ol>
        <span
          className="cplayer-head"
          style={{ left: `${done * 100}%` }}
          aria-hidden="true"
        />
        <input
          type="range"
          min={0}
          max={ep.duration}
          step={1}
          value={pos}
          aria-label="Seek within episode"
          aria-valuetext={`${spoken(pos)} of ${spoken(ep.duration)}, chapter ${current + 1}: ${ep.chapters[current].title}`}
          onChange={(e) => player.seek(ep.id, Number(e.target.value))}
        />
      </div>

      <div className="cplayer-bar">
        <p className="cplayer-time">
          <span>{clock(pos)}</span>
          <span aria-hidden="true">/</span>
          <span>{clock(ep.duration)}</span>
        </p>
        <div className="cplayer-controls">
          <button
            type="button"
            className="icon-btn"
            aria-label="Back 15 seconds"
            onClick={() => player.skip(ep.id, -15)}
          >
            <RotateCcw aria-hidden="true" />
            <span className="icon-num">15</span>
          </button>
          <PlayButton ep={ep} label className="play-big" />
          <button
            type="button"
            className="icon-btn"
            aria-label="Forward 30 seconds"
            onClick={() => player.skip(ep.id, 30)}
          >
            <RotateCw aria-hidden="true" />
            <span className="icon-num">30</span>
          </button>
          <button
            type="button"
            className="rate-btn"
            aria-label={`Playback speed ${rate} times. Change speed`}
            onClick={player.cycleRate}
          >
            {rate}×
          </button>
        </div>
        <QueueButton ep={ep} label />
      </div>

      <p className="cplayer-now" aria-live="polite">
        {loaded ? "Now: " : "Starts at: "}
        <strong>
          {current + 1}. {ep.chapters[current].title}
        </strong>
      </p>

      <ol className="chapters">
        {ep.chapters.map((c, i) => {
          const end = ep.chapters[i + 1]?.start ?? ep.duration;
          const fill = Math.max(
            0,
            Math.min(1, (pos - c.start) / (end - c.start)),
          );
          return (
            <li key={c.start} data-current={i === current ? "" : undefined}>
              <button
                type="button"
                onClick={() => player.play(ep.id, c.start)}
                aria-label={`Play chapter ${i + 1} from ${clock(c.start)}: ${c.title}`}
              >
                <span className="ch-time">{clock(c.start)}</span>
                <span className="ch-body">
                  <span className="ch-title">{c.title}</span>
                  <span className="ch-note">{c.note}</span>
                </span>
                <span
                  className="ch-fill"
                  aria-hidden="true"
                  style={{ transform: `scaleX(${fill})` }}
                />
              </button>
            </li>
          );
        })}
      </ol>
      <p className="quiet">
        Demo player: the playhead runs on a timer and no audio is streamed.
      </p>
    </section>
  );
}
