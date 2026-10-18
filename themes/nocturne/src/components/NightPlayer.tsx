import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { Night } from "../content";
import { hhmm, slipOf } from "../lib/format";
import { Turntable } from "./Turntable";

/**
 * The signature piece: a night's slip laid out in time. Scrub the evening with the
 * range input (or press play to run it at a minute per tick) and the deck shows what
 * the room was hearing at that moment.
 */
export function NightPlayer({
  night,
  full = false,
}: {
  night: Night;
  full?: boolean;
}) {
  const slip = useMemo(() => slipOf(night), [night]);
  const { entries, start, end } = slip;
  const [t, setT] = useState(
    () => entries[Math.min(3, entries.length - 1)].start + 7,
  );
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((v) => Math.min(v + 1, end)), 110);
    return () => clearInterval(id);
  }, [playing, end]);

  useEffect(() => {
    if (t >= end) setPlaying(false);
  }, [t, end]);

  const index = entries.reduce((found, e, i) => (e.start <= t ? i : found), 0);
  const current = entries[index];
  const inGroove = t < current.start + current.length;
  const progress = inGroove ? (t - current.start) / current.length : null;
  const status = inGroove
    ? `Side ${current.side}, ${Math.round(t - current.start)} of ${current.length} min`
    : "Changing records";

  const hours: number[] = [];
  for (let h = Math.ceil(start / 60) * 60; h <= end; h += 60) hours.push(h);
  const pct = (m: number) => `${((m - start) / (end - start)) * 100}%`;

  const toggle = () => {
    if (!playing && t >= end) setT(start);
    setPlaying((p) => !p);
  };

  return (
    <div className="player" data-full={full ? "" : undefined}>
      <div className="player-deck">
        <Turntable
          album={current.album}
          side={current.side}
          playing={playing && inGroove}
          progress={progress}
        />
      </div>

      <div className="player-readout">
        <p className="player-clock">
          <time>{hhmm(t)}</time>
          <span>{status}</span>
        </p>
        <p className="player-title">{current.album.title}</p>
        <p className="player-meta">
          {current.album.artist} · {current.album.year} · {current.album.genre}
        </p>
        <p className="sr-only" aria-live="polite">
          {`${hhmm(current.start)}: ${current.album.title} by ${current.album.artist}, side ${current.side}`}
        </p>

        <div className="player-controls">
          <button
            type="button"
            className="btn btn-brass"
            onClick={toggle}
            aria-pressed={playing}
          >
            {playing ? (
              <Pause aria-hidden="true" />
            ) : (
              <Play aria-hidden="true" />
            )}
            {playing
              ? "Pause the night"
              : t >= end
                ? "Play it again"
                : "Play the night"}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={() => {
              setPlaying(false);
              setT(start);
            }}
            aria-label="Back to the first record"
          >
            <RotateCcw aria-hidden="true" />
          </button>
        </div>

        <div className="scrub">
          <div className="scrub-track" aria-hidden="true">
            {entries.map((e, i) => (
              <span
                key={i}
                className="scrub-seg"
                data-current={i === index ? "" : undefined}
                style={{
                  left: pct(e.start),
                  width: pct(start + e.length),
                  background: e.album.color,
                }}
              />
            ))}
            <span className="scrub-needle" style={{ left: pct(t) }} />
          </div>
          <input
            type="range"
            className="scrub-input"
            min={start}
            max={end}
            step={1}
            value={t}
            onChange={(e) => {
              setPlaying(false);
              setT(Number(e.target.value));
            }}
            aria-label="Time of night"
            aria-valuetext={`${hhmm(t)}, ${current.album.title}, side ${current.side}`}
          />
          <div className="scrub-hours" aria-hidden="true">
            {hours.map((h) => (
              <span key={h} style={{ left: pct(h), translate: `-${pct(h)}` }}>
                {hhmm(h)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {full && (
        <ol
          className="slip-list"
          aria-label={`Every side played on ${night.title}`}
        >
          {entries.map((e, i) => (
            <li key={i} aria-current={i === index ? "true" : undefined}>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setT(e.start);
                }}
              >
                <time>{hhmm(e.start)}</time>
                <span
                  className="slip-dot"
                  style={{ background: e.album.color }}
                  aria-hidden="true"
                />
                <span className="slip-what">
                  <strong>{e.album.title}</strong>
                  <span>{e.album.artist}</span>
                </span>
                <span className="slip-side">Side {e.side}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
