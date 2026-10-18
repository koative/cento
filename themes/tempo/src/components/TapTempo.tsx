import { useRef, useState, type CSSProperties } from "react";
import { RotateCcw } from "lucide-react";
import { Link } from "../router";
import { styles } from "../content";

const MIN = 60;
const MAX = 220;
const pct = (bpm: number) =>
  `${((Math.min(MAX, Math.max(MIN, bpm)) - MIN) / (MAX - MIN)) * 100}%`;

/**
 * Tap along to a song you love; the average gap between taps becomes a BPM,
 * and the tempo map lights up the styles danced at that speed.
 */
export function TapTempo({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const taps = useRef<number[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const H = `h${headingLevel}` as const;

  const tap = () => {
    const now = performance.now();
    const last = taps.current.at(-1);
    if (last !== undefined && now - last > 2000) taps.current = [];
    taps.current = [...taps.current, now].slice(-8);
    const t = taps.current;
    setCount(t.length);
    if (t.length >= 3)
      setBpm(Math.round((60000 * (t.length - 1)) / (t[t.length - 1] - t[0])));
  };

  const reset = () => {
    taps.current = [];
    setBpm(null);
    setCount(0);
  };

  const matches =
    bpm === null
      ? []
      : styles.filter((s) => bpm >= s.bpm[0] - 4 && bpm <= s.bpm[1] + 4);

  return (
    <div
      className="tap"
      style={{ "--beat": bpm ? `${60 / bpm}s` : "0s" } as CSSProperties}
    >
      <div className="tap-intro">
        <H>Tap the song in your head.</H>
        <p>
          Every style lives at its own speed. Tap the pad along to a track you
          can't sit still to — four taps is enough — and we'll show you what's
          danced at that tempo.
        </p>
        <div className="tap-pad-row">
          <button
            type="button"
            className="tap-pad"
            data-live={bpm ? "" : undefined}
            onClick={tap}
            aria-describedby="tap-readout"
          >
            <span className="tap-ring" aria-hidden="true" />
            <span className="tap-label">
              {count === 0 ? "Tap" : count < 3 ? "Keep going" : "Tap"}
            </span>
          </button>
          <div className="tap-readout" id="tap-readout" aria-live="polite">
            <p className="tap-bpm">
              <strong>{bpm ?? "—"}</strong> BPM
            </p>
            <p>
              {bpm === null
                ? count
                  ? `${count} tap${count === 1 ? "" : "s"}… keep the beat going.`
                  : "Tap with the mouse, a finger, or Space when the pad is focused."
                : matches.length
                  ? `Danced at this speed: ${matches.map((m) => m.name).join(", ")}.`
                  : bpm < MIN + 10
                    ? "That's slow — try tapping twice as fast, on every beat."
                    : "Nothing on the timetable is quite that speed. Try halving it."}
            </p>
            {count > 0 && (
              <button type="button" className="link-btn" onClick={reset}>
                <RotateCcw size={16} aria-hidden="true" /> Start again
              </button>
            )}
          </div>
        </div>
      </div>

      <figure className="tempo-map">
        <figcaption className="sr-only">
          Tempo range of each style, from 60 to 220 beats per minute
        </figcaption>
        <ol>
          {styles.map((s) => (
            <li key={s.slug} data-hit={matches.includes(s) ? "" : undefined}>
              <Link to={`/styles/${s.slug}`}>
                <span className="tm-name">{s.name}</span>
                <span className="tm-track" aria-hidden="true">
                  <span
                    className="tm-bar"
                    style={{
                      left: pct(s.bpm[0]),
                      right: `calc(100% - ${pct(s.bpm[1])})`,
                    }}
                  />
                  {bpm !== null && (
                    <i className="tm-marker" style={{ left: pct(bpm) }} />
                  )}
                </span>
                <span className="tm-range">
                  {s.bpm[0]}–{s.bpm[1]}
                  <span className="sr-only"> beats per minute</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="tm-axis" aria-hidden="true">
          <span className="tm-track">
            {[60, 100, 140, 180, 220].map((n) => (
              <span key={n} style={{ left: pct(n) }}>
                {n}
              </span>
            ))}
          </span>
        </div>
      </figure>
    </div>
  );
}
