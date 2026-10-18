import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { drone, freq } from "../lib/audio";
import { noteName } from "./Staff";

const TUNINGS = [
  { name: "Violin", strings: [55, 62, 69, 76] },
  { name: "Viola", strings: [48, 55, 62, 69] },
  { name: "Cello", strings: [36, 43, 50, 57] },
  { name: "Guitar", strings: [40, 45, 50, 55, 59, 64] },
  { name: "Bass", strings: [28, 33, 38, 43] },
];

export function Tuner() {
  const [tuning, setTuning] = useState(TUNINGS[0]);
  const [pitch, setPitch] = useState(440);
  const [sounding, setSounding] = useState<number | null>(null);
  const stop = useRef<() => void>(() => {});

  // Restart the drone when the reference pitch changes; silence it when leaving the page.
  useEffect(() => {
    stop.current();
    stop.current = sounding === null ? () => {} : drone(freq(sounding, pitch));
  }, [sounding, pitch]);
  useEffect(() => () => stop.current(), []);

  return (
    <section className="tool tuner" aria-labelledby="tuner-h">
      <h2 id="tuner-h">Tuning notes</h2>
      <p>Hold a string's note while you tune it. Press it again to stop.</p>
      <fieldset className="segmented">
        <legend>Instrument</legend>
        {TUNINGS.map((t) => (
          <button
            key={t.name}
            type="button"
            aria-pressed={t === tuning}
            onClick={() => {
              setTuning(t);
              setSounding(null);
            }}
          >
            {t.name}
          </button>
        ))}
      </fieldset>
      <div
        className="strings"
        role="group"
        aria-label={`${tuning.name} strings, lowest first`}
      >
        {tuning.strings.map((midi) => (
          <button
            key={midi}
            type="button"
            className="string"
            aria-pressed={sounding === midi}
            onClick={() => setSounding((s) => (s === midi ? null : midi))}
          >
            <span className="string-name">{noteName(midi)}</span>
            <span className="string-hz">{freq(midi, pitch).toFixed(1)} Hz</span>
            {sounding === midi && <Volume2 aria-hidden="true" />}
          </button>
        ))}
      </div>
      <fieldset className="segmented segmented-small">
        <legend>Reference pitch</legend>
        {[440, 442].map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={p === pitch}
            onClick={() => setPitch(p)}
          >
            A = {p}
          </button>
        ))}
      </fieldset>
      <p className="sr-only" aria-live="polite">
        {sounding === null ? "" : `Sounding ${noteName(sounding)}`}
      </p>
    </section>
  );
}
