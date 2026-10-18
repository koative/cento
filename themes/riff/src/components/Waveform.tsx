import { useMemo } from "react";
import { mmss, waveform } from "../lib/format";
import { PREVIEW } from "../lib/player";

/** Printed waveform with a native range input laid over it, so it scrubs by pointer and keyboard. */
export function Waveform({
  seed,
  pos,
  label,
  onSeek,
}: {
  seed: string;
  pos: number;
  label: string;
  onSeek: (s: number) => void;
}) {
  const bars = useMemo(() => waveform(seed), [seed]);
  const done = (pos / PREVIEW) * bars.length;
  return (
    <div className="wave">
      <div className="wave-bars" aria-hidden="true">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h * 100}%` }}
            data-on={i < done ? "" : undefined}
          />
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={PREVIEW}
        step={1}
        value={Math.floor(pos)}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label={`Seek in ${label}`}
        aria-valuetext={`${mmss(pos)} of ${mmss(PREVIEW)}`}
      />
    </div>
  );
}
