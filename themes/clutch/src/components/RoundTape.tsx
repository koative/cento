import { useEffect, useState, type CSSProperties } from "react";
import {
  Bomb,
  Crosshair,
  Pause,
  Play,
  Scissors,
  SkipBack,
  SkipForward,
  Timer,
} from "lucide-react";
import type { Moment } from "../content";
import { brand } from "../content";
import { howLabel, rounds as expand, type Round } from "../lib/format";

const icons: Record<Round["how"], typeof Bomb> = {
  E: Crosshair,
  P: Bomb,
  D: Scissors,
  T: Timer,
};

const phase = (n: number) =>
  n === 0
    ? "Before round 1"
    : n <= 12
      ? "First half"
      : n <= 24
        ? "Second half"
        : "Overtime";

type Props = {
  tape: string;
  moments: Moment[];
  map: string;
  opponent: string;
  id: string;
};

/**
 * Round-by-round replay of one map: scrub or play through the rounds, watch the score and
 * the round-difference line build up, and read the key moments as they happen.
 */
export function RoundTape({ tape, moments, map, opponent, id }: Props) {
  const rounds = expand(tape);
  const total = rounds.length;
  const [at, setAt] = useState(total);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (at >= total) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setAt((r) => r + 1), 650);
    return () => window.clearTimeout(t);
  }, [playing, at, total]);

  const current = rounds[at - 1];
  const us = current?.us ?? 0;
  const them = current?.them ?? 0;
  const moment = moments.find((m) => m.round === at);
  const play = () => {
    if (playing) return setPlaying(false);
    if (at >= total) setAt(0);
    setPlaying(true);
  };
  const jump = (n: number) => (
    setPlaying(false),
    setAt(Math.max(0, Math.min(total, n)))
  );

  // Round-difference line: one step per round, scaled to the biggest lead either way.
  const peak = Math.max(3, ...rounds.map((r) => Math.abs(r.us - r.them)));
  const points = [[0, 0], ...rounds.map((r) => [r.n, r.us - r.them])]
    .map(([x, d]) => `${x * 10},${30 - (d / peak) * 26}`)
    .join(" ");

  return (
    <section className="tape" aria-label={`Round-by-round replay of ${map}`}>
      <div className="tape-head">
        <div className="scorebug" aria-hidden="true">
          <span className="sb-tag sb-us">{brand.tag}</span>
          <span key={`u${us}`} className="sb-score">
            {us}
          </span>
          <span className="sb-score sb-them-score" key={`t${them}`}>
            {them}
          </span>
          <span className="sb-tag sb-them">{opponent}</span>
        </div>
        <p className="tape-where">
          <strong>{map}</strong>
          <span>
            {at === 0 ? phase(0) : `Round ${at} of ${total} · ${phase(at)}`}
          </span>
        </p>
      </div>

      <ol className="tape-strip" style={{ "--rounds": total } as CSSProperties}>
        {rounds.map((r) => {
          const Icon = icons[r.how];
          return (
            <li
              key={r.n}
              data-ours={r.ours ? "" : undefined}
              data-played={r.n <= at ? "" : undefined}
              data-current={r.n === at ? "" : undefined}
              data-moment={
                moments.some((m) => m.round === r.n) ? "" : undefined
              }
              data-half={r.n === 13 || r.n === 25 ? "" : undefined}
            >
              <button
                type="button"
                tabIndex={-1}
                onClick={() => jump(r.n)}
                aria-label={`Round ${r.n}: ${r.ours ? brand.name : opponent}, ${howLabel[r.how]}`}
              >
                <Icon aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ol>

      <svg
        className="tape-line"
        viewBox={`0 0 ${total * 10} 60`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={`played-${id}`}>
            <rect x="0" y="0" width={at * 10} height="60" />
          </clipPath>
        </defs>
        <line x1="0" x2={total * 10} y1="30" y2="30" className="tape-zero" />
        <polyline points={points} className="tape-future" />
        <polyline
          points={points}
          className="tape-past"
          clipPath={`url(#played-${id})`}
        />
      </svg>

      <div className="tape-controls">
        <button
          type="button"
          className="icon-btn"
          onClick={() => jump(at - 1)}
          aria-label="Previous round"
          disabled={at === 0}
        >
          <SkipBack aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn tape-play"
          onClick={play}
          aria-pressed={playing}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          {playing ? "Pause" : at >= total ? "Replay map" : "Play"}
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={() => jump(at + 1)}
          aria-label="Next round"
          disabled={at === total}
        >
          <SkipForward aria-hidden="true" />
        </button>
        <label className="tape-scrub">
          <span className="sr-only">Scrub through rounds of {map}</span>
          <input
            type="range"
            min={0}
            max={total}
            value={at}
            onChange={(e) => jump(Number(e.target.value))}
            aria-valuetext={
              at === 0
                ? "Before round 1"
                : `Round ${at}: ${brand.tag} ${us}, ${opponent} ${them}`
            }
          />
        </label>
      </div>

      <p
        className="tape-call"
        aria-live={playing ? "off" : "polite"}
        data-moment={moment ? "" : undefined}
      >
        {current ? (
          <>
            <span className="tape-call-round">
              R{at} · {current.ours ? brand.name : opponent} win —{" "}
              {howLabel[current.how]}
            </span>
            {moment && <span className="tape-call-text">{moment.text}</span>}
          </>
        ) : (
          <span className="tape-call-round">
            Press play to watch {map} round by round, or drag the slider.
          </span>
        )}
      </p>

      <ul className="tape-legend" aria-label="Legend">
        {(Object.keys(icons) as Round["how"][]).map((k) => {
          const Icon = icons[k];
          return (
            <li key={k}>
              <Icon aria-hidden="true" /> {howLabel[k]}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
