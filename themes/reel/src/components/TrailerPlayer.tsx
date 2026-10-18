import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { Captions, Maximize, Pause, Play, RotateCcw } from "lucide-react";
import { Link } from "../router";
import type { Film } from "../content";
import { timecode } from "../lib/format";

/**
 * A trailer cut from production stills: each shot drifts across its frame (a rostrum move),
 * shots dissolve into each other, and subtitles carry the dialogue. Silent by design.
 */
export function TrailerPlayer({
  film,
  headingLevel = 2,
}: {
  film: Film;
  headingLevel?: 2 | 3;
}) {
  const shots = film.trailer;
  const starts = shots.reduce<number[]>(
    (acc, s, i) => [...acc, i ? acc[i - 1] + shots[i - 1].dur : 0],
    [],
  );
  const total = starts[starts.length - 1] + shots[shots.length - 1].dur;

  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [captions, setCaptions] = useState(true);
  const time = useRef(0);
  const root = useRef<HTMLElement>(null);
  const [still] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const next = Math.min(total, time.current + (now - last) / 1000);
      last = now;
      time.current = next;
      setT(next);
      if (next >= total) setPlaying(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);

  const seek = (to: number) => {
    time.current = Math.max(0, Math.min(total, to));
    setT(time.current);
  };

  const toggle = () => {
    if (!playing && time.current >= total) seek(0);
    setPlaying((p) => !p);
  };

  const onKey = (e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLAnchorElement
    )
      return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") toggle();
    else if (k === "j") seek(time.current - 5);
    else if (k === "l") seek(time.current + 5);
    else if (k === "c") setCaptions((c) => !c);
    else return;
    e.preventDefault();
  };

  const current = starts.reduce(
    (at, s, i) => (s <= Math.min(t, total - 0.001) ? i : at),
    0,
  );
  const shot = shots[current];
  const ended = t >= total && !playing;
  const fresh = t === 0 && !playing;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <section
      ref={root}
      className="player"
      aria-label={`${film.title} trailer`}
      onKeyDown={onKey}
      data-playing={playing ? "" : undefined}
    >
      <div className="player-frame" onClick={ended ? undefined : toggle}>
        {shots.map((s, i) => {
          const p = still
            ? 0
            : Math.max(0, Math.min(1, (t - starts[i]) / s.dur));
          const [x, y, sc] = s.from.map((v, j) => v + (s.to[j] - v) * p);
          return (
            <img
              key={i}
              src={s.img.src}
              alt=""
              className="player-shot"
              data-on={i === current ? "" : undefined}
              style={{ transform: `scale(${sc}) translate(${x}%, ${y}%)` }}
            />
          );
        })}
        <div className="player-bars" aria-hidden="true" />
        {captions && shot.line && !fresh && !ended && (
          <p className="player-sub" key={current}>
            {shot.who && <span>{shot.who}: </span>}
            {shot.line}
          </p>
        )}
        {fresh && (
          <div className="player-card">
            <Heading className="player-title">{film.title}</Heading>
            <p>
              {film.form} · {film.year} · Trailer {timecode(total).slice(3, 8)}
            </p>
            <span className="player-big" aria-hidden="true">
              <Play />
            </span>
          </div>
        )}
        {ended && (
          <div
            className="player-card player-end"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="player-title">{film.title}</p>
            <p>{film.release}</p>
            <div className="player-end-actions">
              <button type="button" className="btn btn-ghost" onClick={toggle}>
                <RotateCcw aria-hidden="true" /> Watch again
              </button>
              <Link
                to={`/screenings?film=${film.slug}`}
                className="btn btn-primary"
              >
                Find a screening
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="player-controls">
        <button
          type="button"
          className="icon-btn"
          onClick={toggle}
          aria-label={playing ? "Pause trailer" : "Play trailer"}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <div className="scrub">
          <input
            type="range"
            min={0}
            max={total}
            step={0.1}
            value={t}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Trailer position"
            aria-valuetext={`${timecode(t)} of ${timecode(total)}, shot ${current + 1} of ${shots.length}`}
            style={{ "--p": `${(t / total) * 100}%` } as CSSProperties}
          />
          <span className="scrub-cuts" aria-hidden="true">
            {starts.slice(1).map((s) => (
              <i key={s} style={{ left: `${(s / total) * 100}%` }} />
            ))}
          </span>
        </div>
        <span className="tc" aria-hidden="true">
          {timecode(t)} <span>/ {timecode(total)}</span>
        </span>
        <button
          type="button"
          className="icon-btn"
          aria-pressed={captions}
          aria-label="Subtitles"
          onClick={() => setCaptions((c) => !c)}
        >
          <Captions aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label="Full screen"
          onClick={() => root.current?.requestFullscreen?.()}
        >
          <Maximize aria-hidden="true" />
        </button>
      </div>

      <details className="transcript">
        <summary>Read the trailer transcript</summary>
        <ol>
          {shots.map((s, i) =>
            s.line ? (
              <li key={i}>
                <button
                  type="button"
                  className="tc-link"
                  onClick={() => seek(starts[i])}
                >
                  {timecode(starts[i])}
                </button>{" "}
                {s.who && <strong>{s.who}: </strong>}
                {s.line}
              </li>
            ) : null,
          )}
        </ol>
        <p className="quiet">
          A silent trailer cut from production stills. Keys: Space or K
          play/pause, J and L skip five seconds, C toggles subtitles.
        </p>
      </details>
    </section>
  );
}
