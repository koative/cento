import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import type { Episode } from "../content";
import { clock } from "../lib/format";

const RATES = [1, 1.25, 1.5, 2];

/** Deterministic bar heights per episode so every waveform is its own but stable between renders. */
function bars(seed: string, count: number) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return Array.from({ length: count }, (_, i) => {
    h = (h * 1103515245 + 12345) >>> 0;
    const speech =
      0.45 + (0.4 * Math.abs(Math.sin(i / 3.1)) * ((h >>> 8) % 100)) / 100;
    return i % 17 === 0 ? 0.12 : speech; // little pauses between sentences
  });
}

/**
 * Episode player. The template ships without audio files, so the transport runs a silent
 * clock: play, seek, skip, speed and chapters all behave as they would with a real file.
 */
export function Player({
  ep,
  compact = false,
}: {
  ep: Episode;
  compact?: boolean;
}) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const wave = bars(ep.slug, compact ? 72 : 120);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setT((x) => Math.min(ep.duration, x + rate)),
      1000,
    );
    return () => clearInterval(id);
  }, [playing, rate, ep.duration]);

  useEffect(() => {
    if (t >= ep.duration) setPlaying(false);
  }, [t, ep.duration]);

  const seek = (to: number) => setT(Math.min(ep.duration, Math.max(0, to)));
  const chapter =
    [...ep.chapters].reverse().find((c) => c.at <= t) ?? ep.chapters[0];
  const progress = t / ep.duration;

  return (
    <div className="player" data-compact={compact ? "" : undefined}>
      <div className="player-bar">
        <button
          type="button"
          className="player-play"
          aria-label={
            playing ? `Pause episode ${ep.number}` : `Play episode ${ep.number}`
          }
          onClick={() => {
            if (t >= ep.duration) setT(0);
            setPlaying((p) => !p);
          }}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>

        <div className="player-track">
          <svg
            viewBox={`0 0 ${wave.length * 4} 40`}
            preserveAspectRatio="none"
            className="player-wave"
            aria-hidden="true"
          >
            {wave.map((v, i) => (
              <rect
                key={i}
                x={i * 4}
                y={20 - v * 18}
                width={2.4}
                height={v * 36}
                rx={1.2}
                data-played={i / wave.length < progress ? "" : undefined}
              />
            ))}
          </svg>
          <input
            type="range"
            className="player-seek"
            min={0}
            max={ep.duration}
            step={1}
            value={t}
            aria-label="Seek"
            aria-valuetext={`${clock(t)} of ${clock(ep.duration)}`}
            onChange={(e) => seek(Number(e.target.value))}
          />
        </div>

        <span className="player-time num">
          {clock(t)} <span aria-hidden="true">/</span> {clock(ep.duration)}
        </span>
      </div>

      <div className="player-tools">
        <button
          type="button"
          className="player-tool"
          onClick={() => seek(t - 15)}
          aria-label="Back 15 seconds"
        >
          <RotateCcw aria-hidden="true" />
          <span aria-hidden="true">15</span>
        </button>
        <button
          type="button"
          className="player-tool"
          onClick={() => seek(t + 30)}
          aria-label="Forward 30 seconds"
        >
          <RotateCw aria-hidden="true" />
          <span aria-hidden="true">30</span>
        </button>
        <button
          type="button"
          className="player-tool"
          aria-label={`Playback speed ${rate}×, change`}
          onClick={() =>
            setRate(RATES[(RATES.indexOf(rate) + 1) % RATES.length])
          }
        >
          <span className="num">{rate}×</span>
        </button>
        <p className="player-now">
          <span className="sr-only">Now: </span>
          {chapter.title}
        </p>
      </div>

      {!compact && (
        <ol className="chapters">
          {ep.chapters.map((c) => (
            <li key={c.at}>
              <button
                type="button"
                aria-current={c === chapter && t > 0 ? "true" : undefined}
                onClick={() => {
                  seek(c.at);
                  setPlaying(true);
                }}
              >
                <span className="num">{clock(c.at)}</span>
                {c.title}
              </button>
            </li>
          ))}
        </ol>
      )}
      <p className="player-note">
        Preview player: this template ships without audio, so the clock runs
        silently.
      </p>
    </div>
  );
}
